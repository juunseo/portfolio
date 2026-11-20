#!/usr/bin/env python3
"""원천 데이터(data/*.json) 검증 + 인덱스 생성.

    python scripts/build.py          검증 후 dist/index.json, dist/portfolio.js 생성
    python scripts/build.py --check  검증만 수행 (오류가 있으면 종료 코드 1)

표준 라이브러리만 사용. serve.py(편집 모드)도 이 모듈의 함수를 그대로 사용.
"""
from __future__ import annotations

import argparse
import copy
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
DIST = ROOT / "dist"

# 대괄호로 감싼 문구는 모두 '빈칸'으로 취급
PLACEHOLDER = re.compile(r"\[[^\[\]\n]{1,80}\]")

# 문장 규칙: AI 문체 흔적으로 자주 지적되는 기호 (경고)
BANNED_CHARS = {
    "—": "em dash(—)",
    "–": "en dash(–)",
    "“": "둥근 따옴표(“)",
    "”": "둥근 따옴표(”)",
    "‘": "둥근 따옴표(‘)",
    "’": "둥근 따옴표(’)",
}
# 근거 없이 부풀리는 표현 (경고)
PUFFERY = ["혁신적", "획기적", "성공적으로", "효과적으로", "다양한", "핵심적인", "탁월한", "열정", "극대화", "시너지"]

ATTACHMENT_TYPES = {"image", "video", "file", "link"}


def load_json(name: str):
    with open(DATA / name, encoding="utf-8") as f:
        return json.load(f)


def load_all(override: dict | None = None) -> dict:
    """data/를 읽어 하나로 묶음. override={파일명: 내용}이면 그 파일은 디스크 대신 주어진 내용 사용."""
    override = override or {}

    def get(name: str):
        return copy.deepcopy(override[name]) if name in override else load_json(name)

    taxonomy = get("taxonomy.json")
    records = []
    for type_key, meta in taxonomy["types"].items():
        for rec in get(meta["file"]):
            rec.setdefault("type", type_key)
            rec["_file"] = meta["file"]
            records.append(rec)
    return {
        "profile": get("profile.json"),
        "taxonomy": taxonomy,
        "records": records,
        "targets": get("targets.json"),
    }


# ---------- 공용 헬퍼 (extract.py, serve.py에서도 사용) ----------

def ym(value: str) -> str:
    """'2026-07' → '2026.07'. 빈칸 표시는 그대로."""
    if not value:
        return ""
    return value.replace("-", ".") if re.fullmatch(r"\d{4}-\d{2}(-\d{2})?", value) else value


def period_label(period: dict | None) -> str:
    if not period:
        return ""
    start, end, note = ym(period.get("start", "")), ym(period.get("end", "")), period.get("note", "")
    if start and end:
        label = start if start == end else f"{start} ~ {end}"
    elif end:
        label = f"~ {end}"
    elif start:
        label = f"{start} ~"
    else:
        label = ""
    if note:
        label = f"{label} ({note})" if label else note
    return label


def summary_of(rec: dict, key: str = "line") -> str:
    summ = rec.get("summary") or {}
    if key == "short":
        return summ.get("short") or summ.get("line") or rec.get("subtitle", "")
    return summ.get("line") or rec.get("subtitle", "")


def sort_key_end(rec: dict) -> str:
    period = rec.get("period") or {}
    end = period.get("end") or period.get("start") or ""
    return end if re.match(r"\d{4}", end) else "0000"


def norm_tag(tag: str) -> str:
    return re.sub(r"[\s\-_·()./]", "", tag).lower()


def walk_strings(obj, path=""):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            if not k.startswith("_"):
                yield from walk_strings(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk_strings(v, f"{path}[{i}]")


def placeholders(obj) -> list[str]:
    found = []
    for _, s in walk_strings(obj):
        found += PLACEHOLDER.findall(s)
    return list(dict.fromkeys(found))


def ordered_records(records: list[dict], taxonomy: dict) -> list[dict]:
    order = {k: v["order"] for k, v in taxonomy["types"].items()}
    by_end = sorted(records, key=sort_key_end, reverse=True)
    return sorted(by_end, key=lambda r: (order.get(r["type"], 99), r.get("status") == "template", -r.get("priority", 0)))


# ---------- 검증 ----------

def validate(db: dict) -> tuple[list[str], list[str]]:
    errors, warnings = [], []
    tax = db["taxonomy"]
    roles, statuses, contribs = set(tax["roles"]), set(tax["status"]), set(tax["contribution"])
    ids = {}

    for rec in db["records"]:
        where = f"{rec['_file']}:{rec.get('id', '?')}"
        rid = rec.get("id")
        if not rid:
            errors.append(f"{where} id 없음")
            continue
        if rid in ids:
            errors.append(f"{where} id 중복 ({ids[rid]})")
        ids[rid] = rec["_file"]

        meta = tax["types"].get(rec["type"])
        if not meta:
            errors.append(f"{where} 알 수 없는 type '{rec['type']}'")
            continue
        if not rid.startswith(meta["prefix"] + "-"):
            errors.append(f"{where} id는 '{meta['prefix']}-'로 시작해야 함")
        if rec.get("status") not in statuses:
            errors.append(f"{where} status는 {sorted(statuses)} 중 하나")
        if not rec.get("title"):
            errors.append(f"{where} 제목 없음")
        if rec.get("status") != "template" and not summary_of(rec):
            warnings.append(f"{where} 한 줄 요약 비어 있음 (이력서 추출 시 제목만 출력)")
        for role in rec.get("roles", []):
            if role not in roles:
                errors.append(f"{where} 알 수 없는 role '{role}'")
        for section in ("my_work", "troubleshooting"):
            for item in rec.get(section, []):
                if item.get("mine", "self") not in contribs:
                    errors.append(f"{where} {section} mine 값 '{item.get('mine')}' 확인")
                for role in item.get("roles", []):
                    if role not in roles:
                        errors.append(f"{where} {section} 알 수 없는 role '{role}'")
        for ev in rec.get("evidence", []):
            if not (ROOT / ev["path"]).exists():
                errors.append(f"{where} 근거 자료 없음: {ev['path']}")
        for att in rec.get("attachments", []):
            kind = att.get("type")
            if kind not in ATTACHMENT_TYPES:
                errors.append(f"{where} 첨부 type '{kind}' 확인")
            elif kind == "link":
                if not att.get("url"):
                    errors.append(f"{where} 링크 첨부에 url 없음")
            elif not att.get("path") or not (ROOT / att["path"]).exists():
                errors.append(f"{where} 첨부 파일 없음: {att.get('path')}")
            if att.get("thumb") and not (ROOT / att["thumb"]).exists():
                warnings.append(f"{where} 썸네일 없음: {att['thumb']}")

    for rec in db["records"]:
        ref = rec.get("project_ref", "")
        if ref and not PLACEHOLDER.search(ref) and ref not in ids:
            errors.append(f"{rec['_file']}:{rec['id']} 관련 프로젝트 '{ref}' 없음")

    seen_targets = set()
    for tgt in db["targets"]:
        if tgt["id"] in seen_targets:
            errors.append(f"targets.json:{tgt['id']} id 중복")
        seen_targets.add(tgt["id"])
        for role in tgt.get("roles", []):
            if role not in roles:
                errors.append(f"targets.json:{tgt['id']} 알 수 없는 role '{role}'")

    # 문장 규칙 (경고)
    sources = [("profile.json", db["profile"])] + [(f"{r['_file']}:{r['id']}", r) for r in db["records"]]
    sources += [(f"targets.json:{t['id']}", t) for t in db["targets"]]
    for where, obj in sources:
        for path, s in walk_strings(obj):
            if path.startswith("attachments"):
                continue
            for ch, name in BANNED_CHARS.items():
                if ch in s:
                    warnings.append(f"{where} {path}: {name}")
            for word in PUFFERY:
                if word in s:
                    warnings.append(f"{where} {path}: 과장 표현 '{word}'")
    return errors, warnings


# ---------- 인덱스 ----------

def build_index(db: dict) -> dict:
    tax = db["taxonomy"]
    records = ordered_records(db["records"], tax)
    by_type = {k: [] for k in tax["types"]}
    by_role = {k: [] for k in tax["roles"]}
    by_status = {k: [] for k in tax["status"]}
    by_year: dict[str, list[str]] = {}
    tags: dict[str, dict] = {}
    rows, todo = [], []
    media_count = 0

    for rec in records:
        rid = rec["id"]
        by_type[rec["type"]].append(rid)
        by_status[rec["status"]].append(rid)
        if rec["status"] == "template":
            continue
        for role in rec.get("roles", []):
            by_role[role].append(rid)
        year = sort_key_end(rec)[:4]
        if year != "0000":
            by_year.setdefault(year, []).append(rid)
        for tag in rec.get("tags", []):
            entry = tags.setdefault(norm_tag(tag), {"label": tag, "ids": []})
            entry["ids"].append(rid)
        media_count += len(rec.get("attachments", []))

        gaps = placeholders({k: v for k, v in rec.items() if k != "attachments"})
        items = list(rec.get("todo", [])) + [f"빈칸 {g}" for g in gaps]
        if items:
            todo.append({"id": rid, "title": rec["title"], "items": items})
        rows.append({
            "id": rid,
            "type": rec["type"],
            "status": rec["status"],
            "title": rec["title"],
            "org": rec.get("org", ""),
            "period": period_label(rec.get("period")),
            "line": summary_of(rec),
            "tags": rec.get("tags", []),
            "roles": rec.get("roles", []),
            "attachments": len(rec.get("attachments", [])),
            "gaps": len(items),
        })

    skills = sorted(tags.values(), key=lambda t: (-len(t["ids"]), t["label"].lower()))
    return {
        "generated": date.today().isoformat(),
        "counts": {k: sum(1 for r in rows if r["type"] == k) for k in by_type},
        "attachments": media_count,
        "records": rows,
        "by_type": by_type,
        "by_role": by_role,
        "by_status": by_status,
        "by_year": dict(sorted(by_year.items(), reverse=True)),
        "by_tag": {k: tags[k] for k in sorted(tags)},
        "skills": [{"label": s["label"], "count": len(s["ids"]), "ids": s["ids"]} for s in skills],
        "todo": todo,
    }


def make_bundle(db: dict, index: dict) -> dict:
    clean = [{k: v for k, v in r.items() if not k.startswith("_")} for r in ordered_records(db["records"], db["taxonomy"])]
    return {
        "profile": db["profile"],
        "taxonomy": db["taxonomy"],
        "records": clean,
        "targets": db["targets"],
        "index": index,
    }


def write_dist(db: dict, index: dict) -> dict:
    DIST.mkdir(exist_ok=True)
    with open(DIST / "index.json", "w", encoding="utf-8", newline="\n") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
        f.write("\n")
    bundle = make_bundle(db, index)
    with open(DIST / "portfolio.js", "w", encoding="utf-8", newline="\n") as f:
        f.write("/* scripts/build.py가 생성한 파일. 직접 수정하지 말고 data/*.json을 고친 뒤 다시 빌드 */\n")
        f.write("window.PORTFOLIO = ")
        json.dump(bundle, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    return bundle


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description="포트폴리오 원천 데이터 검증·인덱스 생성")
    parser.add_argument("--check", action="store_true", help="검증만 수행")
    args = parser.parse_args()

    db = load_all()
    errors, warnings = validate(db)
    for w in warnings:
        print(f"[경고] {w}")
    for e in errors:
        print(f"[오류] {e}")
    if errors:
        print(f"\n오류 {len(errors)}건. dist/ 생성 중단")
        return 1

    index = build_index(db)
    counts = " · ".join(f"{db['taxonomy']['types'][k]['label']} {v}" for k, v in index["counts"].items())
    print(f"검증 통과: {counts}")
    print(f"인덱스: 태그 {len(index['by_tag'])}개, 첨부 {index['attachments']}개, 보완 필요 항목 {len(index['todo'])}건")
    if args.check:
        return 0
    write_dist(db, index)
    print("생성: dist/index.json, dist/portfolio.js")
    return 0


if __name__ == "__main__":
    sys.exit(main())
