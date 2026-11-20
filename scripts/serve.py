#!/usr/bin/env python3
"""편집 모드 로컬 서버.

    python scripts/serve.py                 http://127.0.0.1:8000 에서 열람·편집
    python scripts/serve.py --port 8080
    python scripts/serve.py --no-browser

화면에서 고친 내용은 data/*.json에, 첨부 파일은 media/<항목 ID>/에 저장하고
저장할 때마다 검증 후 dist/를 다시 만듦. 127.0.0.1에만 열림. 표준 라이브러리만 사용.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
import threading
import unicodedata
import webbrowser
from datetime import date
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build  # noqa: E402

ROOT = build.ROOT
DATA = build.DATA
MEDIA = ROOT / "media"
MAX_UPLOAD = 95 * 1024 * 1024  # GitHub 파일당 100MB 제한보다 작게
ID_RE = re.compile(r"^[A-Z]{2,5}-[A-Z0-9][A-Z0-9-]{0,40}$")
IMAGE_EXT = {"png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp"}
VIDEO_EXT = {"mp4", "webm", "mov", "m4v", "ogv"}
LOCK = threading.Lock()


class ApiError(Exception):
    def __init__(self, message: str, status: int = 400, details: list[str] | None = None):
        super().__init__(message)
        self.status, self.details = status, details or []


# ---------- 파일 도우미 ----------

def write_json(name: str, obj) -> None:
    tmp = DATA / f".{name}.tmp"
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
        f.write("\n")
    tmp.replace(DATA / name)


def safe_name(name: str) -> str:
    name = unicodedata.normalize("NFC", Path(name.replace("\\", "/")).name)
    name = re.sub(r"[\\/:*?\"<>|#%&{}$!`'@+=;\[\]\x00-\x1f]", "", name)
    name = re.sub(r"\s+", "-", name).strip(".-")
    stem, dot, ext = name.rpartition(".")
    if not dot:
        stem, ext = name, ""
    stem = (stem or "file")[:80]
    return f"{stem}.{ext.lower()[:10]}" if ext else stem


def unique_path(folder: Path, name: str) -> Path:
    path = folder / name
    stem, suffix = path.stem, path.suffix
    n = 2
    while path.exists():
        path = folder / f"{stem}-{n}{suffix}"
        n += 1
    return path


def in_media(rel: str) -> Path:
    path = (ROOT / rel).resolve()
    if MEDIA.resolve() not in path.parents:
        raise ApiError(f"media/ 밖의 경로: {rel}")
    return path


def remove_files(paths: list[str]) -> None:
    for rel in paths:
        path = in_media(rel)
        if path.is_file():
            path.unlink()
        folder = path.parent
        if folder != MEDIA.resolve() and folder.is_dir() and not any(folder.iterdir()):
            folder.rmdir()


def kind_of(name: str) -> str:
    ext = name.rsplit(".", 1)[-1].lower() if "." in name else ""
    if ext in IMAGE_EXT:
        return "image"
    if ext in VIDEO_EXT:
        return "video"
    return "file"


# ---------- 저장 로직 ----------

def rebuild(override: dict) -> tuple[dict, list[str]]:
    """override 내용으로 검증 → 통과하면 파일에 쓰고 dist/ 재생성. 저장일을 profile.updated에 기록."""
    profile = dict(override.get("profile.json") or build.load_json("profile.json"))
    profile["updated"] = date.today().isoformat()
    override["profile.json"] = profile
    db = build.load_all(override)
    errors, warnings = build.validate(db)
    if errors:
        raise ApiError("검증 오류로 저장하지 않았습니다.", 422, errors)
    for name, content in override.items():
        write_json(name, content)
    index = build.build_index(db)
    bundle = build.write_dist(db, index)
    return bundle, warnings


def type_meta(type_key: str) -> dict:
    meta = build.load_json("taxonomy.json")["types"].get(type_key)
    if not meta:
        raise ApiError(f"알 수 없는 항목 종류: {type_key}")
    return meta


def all_ids() -> set[str]:
    return {r["id"] for r in build.load_all()["records"]}


def save_record(payload: dict) -> tuple[dict, list[str]]:
    rec = payload.get("record") or {}
    original_id = payload.get("original_id")
    rec_id = str(rec.get("id", "")).strip().upper()
    rec["id"] = rec_id
    meta = type_meta(rec.get("type", ""))
    if not ID_RE.match(rec_id) or not rec_id.startswith(meta["prefix"] + "-"):
        raise ApiError(f"ID는 {meta['prefix']}-로 시작하는 영문 대문자·숫자·하이픈 조합이어야 합니다. 예: {meta['prefix']}-01")
    if not str(rec.get("title", "")).strip():
        raise ApiError("제목을 입력해 주세요.")

    items = build.load_json(meta["file"])
    if original_id:
        if rec_id != original_id:
            raise ApiError("저장된 항목의 ID는 바꿀 수 없습니다.")
        pos = next((i for i, r in enumerate(items) if r.get("id") == original_id), None)
        if pos is None:
            raise ApiError(f"{original_id} 항목을 찾지 못했습니다.", 404)
        items[pos] = rec
    else:
        if rec_id in all_ids():
            raise ApiError(f"{rec_id}는 이미 있는 ID입니다.")
        items.append(rec)

    bundle, warnings = rebuild({meta["file"]: items})
    remove_files(payload.get("delete_files") or [])
    return bundle, warnings


def delete_record(payload: dict) -> tuple[dict, list[str]]:
    rec_id = payload.get("id", "")
    meta = type_meta(payload.get("type", ""))
    items = build.load_json(meta["file"])
    kept = [r for r in items if r.get("id") != rec_id]
    if len(kept) == len(items):
        raise ApiError(f"{rec_id} 항목을 찾지 못했습니다.", 404)
    bundle, warnings = rebuild({meta["file"]: kept})
    folder = MEDIA / rec_id
    if ID_RE.match(rec_id) and folder.is_dir():
        shutil.rmtree(folder)
    return bundle, warnings


def save_profile(payload: dict) -> tuple[dict, list[str]]:
    profile = payload.get("profile")
    if not isinstance(profile, dict) or not str(profile.get("name", "")).strip():
        raise ApiError("이름을 입력해 주세요.")
    return rebuild({"profile.json": profile})


# ---------- HTTP ----------

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        if "/api/" in self.path:
            sys.stderr.write(f"[편집] {self.command} {self.path.split('?')[0]} {args[1] if len(args) > 1 else ''}\n")

    def send_json(self, status: int, obj) -> None:
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length") or 0)
        if length > 20 * 1024 * 1024:
            raise ApiError("요청이 너무 큽니다.", 413)
        return json.loads(self.rfile.read(length).decode("utf-8") or "{}")

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/ping":
            return self.send_json(200, {"ok": True, "max_upload": MAX_UPLOAD})
        if path == "/api/data":
            db = build.load_all()
            return self.send_json(200, build.make_bundle(db, build.build_index(db)))
        if path.startswith("/.git") or path.startswith("/private"):
            return self.send_error(HTTPStatus.NOT_FOUND)
        return super().do_GET()

    def do_POST(self):
        url = urlparse(self.path)
        try:
            if url.path == "/api/upload":
                return self.send_json(200, self.handle_upload(parse_qs(url.query)))
            routes = {
                "/api/save": save_record,
                "/api/delete-record": delete_record,
                "/api/save-profile": save_profile,
            }
            if url.path in routes:
                payload = self.read_json()
                with LOCK:
                    bundle, warnings = routes[url.path](payload)
                return self.send_json(200, {"bundle": bundle, "warnings": warnings})
            if url.path == "/api/delete-files":
                payload = self.read_json()
                with LOCK:
                    remove_files(payload.get("paths") or [])
                return self.send_json(200, {"ok": True})
            return self.send_json(404, {"error": "없는 경로"})
        except ApiError as e:
            return self.send_json(e.status, {"error": str(e), "details": e.details})
        except Exception as e:  # noqa: BLE001
            return self.send_json(500, {"error": f"서버 오류: {e}"})

    def handle_upload(self, query: dict) -> dict:
        rec_id = (query.get("id") or [""])[0]
        name = safe_name((query.get("name") or ["file"])[0])
        length = int(self.headers.get("Content-Length") or 0)
        if not ID_RE.match(rec_id):
            self.close_connection = True
            raise ApiError("항목 ID가 올바르지 않습니다.")
        if length <= 0:
            raise ApiError("빈 파일입니다.")
        if length > MAX_UPLOAD:
            self.close_connection = True
            raise ApiError("95MB를 넘는 파일은 GitHub에 올라가지 않습니다. 유튜브·드라이브 링크로 첨부해 주세요.", 413)

        folder = MEDIA / rec_id
        folder.mkdir(parents=True, exist_ok=True)
        with LOCK:
            dest = unique_path(folder, name)
            dest.touch()
        tmp = dest.with_name(dest.name + ".part")
        remaining = length
        with open(tmp, "wb") as f:
            while remaining > 0:
                chunk = self.rfile.read(min(1024 * 1024, remaining))
                if not chunk:
                    break
                f.write(chunk)
                remaining -= len(chunk)
        if remaining:
            tmp.unlink(missing_ok=True)
            dest.unlink(missing_ok=True)
            raise ApiError("업로드가 중간에 끊겼습니다.")
        tmp.replace(dest)
        rel = dest.relative_to(ROOT).as_posix()
        return {"type": kind_of(dest.name), "path": rel, "name": dest.name, "size": length}


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description="포트폴리오 편집 모드 서버")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()

    MEDIA.mkdir(exist_ok=True)
    db = build.load_all()
    errors, _ = build.validate(db)
    if errors:
        print("데이터 검증 오류가 있어 편집 서버를 시작하지 않습니다.")
        for e in errors:
            print(f"  - {e}")
        return 1
    build.write_dist(db, build.build_index(db))

    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    url = f"http://127.0.0.1:{args.port}/"
    print(f"편집 모드: {url}")
    print("끝내려면 이 창에서 Ctrl+C")
    if not args.no_browser:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n종료")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
