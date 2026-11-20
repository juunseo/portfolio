#!/usr/bin/env python3
"""원천 데이터에서 이력서·지원서용 텍스트 추출.

예시
    python scripts/extract.py --list
    python scripts/extract.py --type project --detail short
    python scripts/extract.py --role autonomy --detail full --out out/autonomy.md
    python scripts/extract.py --tag Nav2,YOLO11n --detail line
    python scripts/extract.py --ids PRJ-01 --detail full --format txt
    python scripts/extract.py --target TGT-HYUNDAI-ROBOTICS --profile

규칙
    - status가 template인 항목은 항상 제외, --strict면 confirmed만 사용
    - --role / --tag / --target 필터는 프로젝트·연구·수상에만 적용 (학력·교육·병역은 기본 이력으로 유지)
    - mine이 team인 항목(팀원 담당)은 추출에서 제외
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import PLACEHOLDER, load_all, norm_tag, ordered_records, period_label, summary_of  # noqa: E402

FILTERED_TYPES = {"project", "research", "award"}
DETAILS = ("line", "short", "full")

# 섹션별로 요약 아래 한 줄로 붙이는 핵심 정보
FACTS = {
    "education": [("degree", "학위"), ("major", "전공"), ("minor", "복수·부전공"), ("gpa", "학점")],
    "training": [("hours", "이수 시간"), ("completion", "수료 여부")],
    "military": [("branch", "군별"), ("rank", "계급"), ("specialty", "주특기"), ("discharge", "전역 구분")],
    "award": [("rank", "상훈")],
}


def facts_line(rec: dict) -> str:
    parts = []
    for key, label in FACTS.get(rec["type"], []):
        value = rec.get(key)
        if value in (None, ""):
            continue
        parts.append(f"{label} {value}시간" if key == "hours" else f"{label} {value}")
    return " · ".join(parts)


# ---------- 선택 ----------

def target_score(rec: dict, target: dict) -> int:
    keys = [norm_tag(k) for k in target.get("keywords", []) if k and not PLACEHOLDER.search(k)]
    tags = [norm_tag(t) for t in rec.get("tags", [])]
    tag_hits = sum(1 for k in keys if any(k in t or t in k for t in tags))
    role_hits = len(set(rec.get("roles", [])) & set(target.get("roles", [])))
    return tag_hits + 2 * role_hits


def select(db: dict, args) -> tuple[list[dict], dict | None]:
    records = [r for r in ordered_records(db["records"], db["taxonomy"]) if r["status"] != "template"]
    if args.strict:
        records = [r for r in records if r["status"] == "confirmed"]
    if args.ids:
        wanted = [i.strip() for i in args.ids.split(",") if i.strip()]
        found = {r["id"]: r for r in records}
        missing = [i for i in wanted if i not in found]
        if missing:
            sys.exit(f"없는 ID: {', '.join(missing)} (--list로 확인)")
        records = [found[i] for i in wanted]
    if args.type:
        types = {t.strip() for t in args.type.split(",")}
        records = [r for r in records if r["type"] in types]
    if args.role:
        records = [r for r in records if r["type"] not in FILTERED_TYPES or args.role in r.get("roles", [])]
    if args.tag:
        keys = [norm_tag(t) for t in args.tag.split(",") if t.strip()]
        records = [
            r for r in records
            if r["type"] not in FILTERED_TYPES or any(norm_tag(t) in keys for t in r.get("tags", []))
        ]

    target = None
    if args.target:
        target = next((t for t in db["targets"] if t["id"] == args.target), None)
        if not target:
            sys.exit(f"없는 지원처 ID: {args.target} (data/targets.json 확인)")
        scored = [(target_score(r, target), r) for r in records]
        keep = [r for s, r in scored if r["type"] not in FILTERED_TYPES or s > 0]
        rank = {r["id"]: s for s, r in scored}
        order = {k: v["order"] for k, v in db["taxonomy"]["types"].items()}
        records = sorted(keep, key=lambda r: (order[r["type"]], -rank[r["id"]]))
    return records, target


def focus_roles(args, target: dict | None) -> set[str]:
    roles = set()
    if args.role:
        roles.add(args.role)
    if target:
        roles |= set(target.get("roles", []))
    return roles


def pick_items(items: list[dict], roles: set[str]) -> list[dict]:
    items = [i for i in items if i.get("mine", "self") != "team"]
    if not roles:
        return items
    hit = [i for i in items if not i.get("roles") or set(i["roles"]) & roles]
    return hit or items


# ---------- 출력 ----------

class Writer:
    def __init__(self, fmt: str):
        self.fmt, self.lines = fmt, []

    def h(self, level: int, text: str):
        self.blank()
        if self.fmt == "md":
            self.lines.append(f"{'#' * level} {text}")
        else:
            self.lines.append(("■ " if level <= 2 else "□ ") + text)
        self.blank()

    def p(self, text: str):
        if text:
            self.lines.append(text)
            self.blank()

    def li(self, text: str, depth: int = 0):
        if text:
            self.lines.append("  " * depth + "- " + text)

    def label(self, text: str):
        self.lines.append(f"**{text}**" if self.fmt == "md" else f"▶ {text}")

    def blank(self):
        if self.lines and self.lines[-1] != "":
            self.lines.append("")

    def text(self) -> str:
        return "\n".join(self.lines).strip() + "\n"


def meta_line(rec: dict) -> str:
    parts = [rec.get("org", ""), period_label(rec.get("period"))]
    team = rec.get("team") or {}
    if team:
        size = f"{team['size']}인 팀" if team.get("size") else ""
        parts.append(", ".join(p for p in (size, team.get("my_role", "")) if p))
    return " · ".join(p for p in parts if p)


def contrib_suffix(item: dict, tax: dict) -> str:
    mine = item.get("mine", "self")
    return "" if mine == "self" else f" ({tax['contribution'][mine]['label']})"


def render_line(w: Writer, rec: dict):
    meta = " · ".join(p for p in (rec.get("org", ""), period_label(rec.get("period"))) if p)
    title = f"**{rec['title']}**" if w.fmt == "md" else rec["title"]
    line = summary_of(rec)
    head = f"{title} ({meta})" if meta else title
    w.li(f"{head}: {line}" if line else head)


def render_project(w: Writer, rec: dict, detail: str, roles: set[str], tax: dict):
    w.h(3, rec["title"])
    w.p(meta_line(rec))
    w.p(summary_of(rec, "short"))
    if detail == "full":
        if rec.get("problem"):
            w.label("문제")
            w.li(rec["problem"])
            if rec.get("goal"):
                w.li("목표: " + rec["goal"])
            w.blank()
    work = pick_items(rec.get("my_work", []), roles)
    if work:
        w.label("내가 한 일")
        for item in work:
            w.li(item["text"] + contrib_suffix(item, tax))
        w.blank()
    if rec.get("results"):
        w.label("결과")
        for item in rec["results"]:
            w.li(item["text"])
        w.blank()
    if detail == "full":
        if rec.get("decisions"):
            w.label("기술 선택 근거")
            for d in rec["decisions"]:
                w.li(f"{d['choice']}: {d['reason']}")
            w.blank()
        trouble = pick_items(rec.get("troubleshooting", []), roles)
        if trouble:
            w.label("문제 해결")
            for t in trouble:
                w.li(t["title"] + contrib_suffix(t, tax))
                w.li("문제: " + t["problem"], 1)
                w.li("원인: " + t["cause"], 1)
                w.li("해결: " + t["fix"], 1)
                w.li("결과: " + t["result"], 1)
            w.blank()
        if rec.get("lessons"):
            w.label("배운 점")
            for item in rec["lessons"]:
                w.li(item)
            w.blank()
        if rec.get("next"):
            w.label("다음 과제")
            for item in rec["next"]:
                w.li(item)
            w.blank()
    if rec.get("tags"):
        w.p("기술: " + ", ".join(rec["tags"]))
    if detail == "full" and rec.get("links"):
        w.p("링크: " + " · ".join(f"{l['label']} {l['url']}" for l in rec["links"]))


def render_generic(w: Writer, rec: dict, detail: str):
    w.h(3, rec["title"])
    w.p(meta_line(rec))
    w.p(summary_of(rec, "short"))
    w.p(facts_line(rec))
    for m in rec.get("modules", []):
        hours = f" ({m['hours']}시간)" if m.get("hours") else ""
        note = m.get("detail", "")
        w.li(f"{m['name']}{hours}: {note}" if note else f"{m['name']}{hours}")
    if rec.get("courses"):
        w.li("관련 과목: " + ", ".join(rec["courses"]))
    if rec["type"] == "research" and detail == "full":
        for key, name in (("question", "연구 물음"), ("method", "방법"), ("result", "결과"), ("limits", "한계")):
            w.li(f"{name}: {rec.get(key, '')}")
    w.blank()


def render(db: dict, records: list[dict], args, target: dict | None) -> str:
    tax = db["taxonomy"]
    w = Writer(args.format)
    roles = focus_roles(args, target)
    if args.profile:
        prof = db["profile"]
        w.h(1, prof["name"])
        w.p(prof["headline"])
        for line in prof.get("intro", []):
            w.li(line)
        w.blank()
        contact = " · ".join(f"{k}: {v}" for k, v in prof.get("contact", {}).items() if v)
        w.p(contact)
    if target:
        w.p(f"지원처: {target['company']} · {target['position']}")
        if target.get("pitch"):
            w.p(f"연결 지점: {target['pitch']}")

    current = None
    for rec in records:
        if rec["type"] != current:
            current = rec["type"]
            w.h(2, tax["types"][current]["label"])
        if args.detail == "line":
            render_line(w, rec)
        elif rec["type"] == "project":
            render_project(w, rec, args.detail, roles, tax)
        else:
            render_generic(w, rec, args.detail)
    return w.text()


def as_json(records: list[dict], roles: set[str]) -> str:
    out = []
    for rec in records:
        rec = dict(rec)
        for key in ("my_work", "troubleshooting"):
            if key in rec:
                rec[key] = pick_items(rec[key], roles)
        out.append(rec)
    return json.dumps(out, ensure_ascii=False, indent=2) + "\n"


def print_list(db: dict):
    tax = db["taxonomy"]
    for rec in ordered_records(db["records"], tax):
        status = tax["status"][rec["status"]]["label"]
        roles = ",".join(rec.get("roles", []))
        print(f"{rec['id']:<22} {tax['types'][rec['type']]['label']:<6} {status:<6} {rec['title']}  [{roles}]")
    print()
    for tgt in db["targets"]:
        print(f"{tgt['id']:<22} 지원처   {tgt['company']} · {tgt['position']}")
    print("\n직무 키: " + ", ".join(f"{k}({v['label']})" for k, v in tax["roles"].items()))


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    p = argparse.ArgumentParser(description="이력서·지원서용 텍스트 추출")
    p.add_argument("--list", action="store_true", help="ID 목록 출력")
    p.add_argument("--ids", help="쉼표로 구분한 ID (입력 순서 유지)")
    p.add_argument("--type", help="education,training,military,award,project,research 중 쉼표 구분")
    p.add_argument("--role", help="직무 키 (research, robotics, autonomy, vision, llm, eval)")
    p.add_argument("--tag", help="기술 태그, 쉼표 구분 (하나라도 맞으면 포함)")
    p.add_argument("--target", help="data/targets.json의 지원처 ID")
    p.add_argument("--detail", choices=DETAILS, default="short", help="line: 한 줄, short: 요약, full: 상세")
    p.add_argument("--format", choices=("md", "txt", "json"), default="md")
    p.add_argument("--profile", action="store_true", help="맨 위에 이름·소개 포함")
    p.add_argument("--strict", action="store_true", help="confirmed 항목만 사용")
    p.add_argument("--out", help="저장할 파일 경로 (없으면 화면 출력)")
    args = p.parse_args()

    db = load_all()
    if args.list:
        print_list(db)
        return 0
    if args.role and args.role not in db["taxonomy"]["roles"]:
        sys.exit(f"없는 직무 키: {args.role}")

    records, target = select(db, args)
    if not records and not args.profile:
        print("조건에 맞는 항목 없음", file=sys.stderr)
        return 1
    text = as_json(records, focus_roles(args, target)) if args.format == "json" else render(db, records, args, target)

    gaps = list(dict.fromkeys(PLACEHOLDER.findall(text)))
    if gaps:
        print(f"[알림] 빈칸 {len(gaps)}종 남음: {' '.join(gaps[:6])}{' ...' if len(gaps) > 6 else ''}", file=sys.stderr)

    if args.out:
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(text, encoding="utf-8")
        print(f"저장: {out}", file=sys.stderr)
    else:
        sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
