/* 포트폴리오 열람 UI. 데이터는 dist/portfolio.js (scripts/build.py 생성) */
(() => {
  "use strict";

  const P = window.PORTFOLIO;
  if (!P) {
    document.getElementById("app-error").hidden = false;
    return;
  }
  const { profile, taxonomy: T, records, targets, index } = P;
  const FILTERED = new Set(["project", "research", "award"]);
  const GAP = /\[[^\[\]\n]{1,80}\]/g;
  const typeOrder = Object.keys(T.types).sort((a, b) => T.types[a].order - T.types[b].order);
  const byId = Object.fromEntries(records.map((r) => [r.id, r]));

  const state = {
    q: "",
    role: "",
    tag: "",
    showTemplates: false,
    selected: new Set(),
    detail: "short",
    fmt: "md",
    target: "",
    withProfile: true,
  };

  /* ---------- 유틸 ---------- */
  const $ = (s) => document.querySelector(s);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const mark = (s) => esc(s).replace(GAP, (m) => `<span class="gap">${m}</span>`);
  const ym = (v) => (!v ? "" : /^\d{4}-\d{2}(-\d{2})?$/.test(v) ? v.replace(/-/g, ".") : v);
  const normTag = (t) => String(t).replace(/[\s\-_·()./]/g, "").toLowerCase();
  const isGap = (s) => new RegExp(GAP.source).test(s || "");

  function periodLabel(p) {
    if (!p) return "";
    const s = ym(p.start), e = ym(p.end), note = p.note || "";
    let label = s && e ? (s === e ? s : `${s} ~ ${e}`) : e ? `~ ${e}` : s ? `${s} ~` : "";
    if (note) label = label ? `${label} (${note})` : note;
    return label;
  }

  function teamLabel(rec) {
    const t = rec.team;
    if (!t) return "";
    return [t.size ? `${t.size}인 팀` : "", t.my_role || ""].filter(Boolean).join(", ");
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("show"), 1600);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* 저장 불가 환경 */ } },
  };

  const icon = {
    link: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 12l4-4M9 5.5l1.2-1.2a3.2 3.2 0 0 1 4.5 4.5L13.5 10M11 14.5l-1.2 1.2a3.2 3.2 0 0 1-4.5-4.5L6.5 10"/></svg>',
    doc: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 2.5h5.5L15 6v11.5H6zM11 2.5V6.5h4"/></svg>',
    sun: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4"/></svg>',
    moon: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5z"/></svg>',
    auto: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="M10 3v14" /><path d="M10 3a7 7 0 0 1 0 14z" fill="currentColor" stroke="none"/></svg>',
  };

  /* ---------- 필터 ---------- */
  function matchesQuery(rec, q) {
    if (!q) return true;
    const hay = [
      rec.id, rec.title, rec.subtitle, rec.org, rec.summary?.line, rec.summary?.short,
      ...(rec.tags || []), ...(rec.stack || []),
      ...(rec.my_work || []).map((i) => i.text),
      ...(rec.troubleshooting || []).map((i) => `${i.title} ${i.problem} ${i.fix}`),
      ...(rec.courses || []),
    ].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
  }

  function visible(rec) {
    if (rec.status === "template" && !state.showTemplates) return false;
    if (!matchesQuery(rec, state.q)) return false;
    if (FILTERED.has(rec.type)) {
      if (state.role && !(rec.roles || []).includes(state.role)) return false;
      if (state.tag && !(rec.tags || []).some((t) => normTag(t) === state.tag)) return false;
    }
    return true;
  }

  /* ---------- 머리말 ---------- */
  function renderHero() {
    const roleChips = (keys, soft) =>
      keys.map((k) => `<span class="pill role${soft ? " soft" : ""}">${esc(T.roles[k]?.label || k)}</span>`).join("");
    const c = profile.contact || {};
    const contact = [
      ["이메일", c.email, c.email && !isGap(c.email) ? `mailto:${c.email}` : ""],
      ["GitHub", c.github, c.github && !isGap(c.github) ? (c.github.startsWith("http") ? c.github : `https://github.com/${c.github}`) : ""],
      ["블로그", c.blog, c.blog && !isGap(c.blog) ? c.blog : ""],
    ]
      .filter(([, v]) => v)
      .map(([k, v, href]) => `<span class="pill">${esc(k)} ${href ? `<a href="${esc(href)}">${esc(v)}</a>` : mark(v)}</span>`)
      .join("");
    const counts = typeOrder
      .map((t) => `<a class="stat" href="#sec-${t}">${esc(T.types[t].label)} <b>${index.counts[t] || 0}</b></a>`)
      .join("");
    const nameEn = profile.name_en && !isGap(profile.name_en) ? `<small>${esc(profile.name_en)}</small>` : "";

    $("#hero").innerHTML = `
      <div class="wrap">
        <p class="eyebrow">PORTFOLIO · ${esc(ym(profile.updated))} 기준</p>
        <h1>${esc(profile.name)}${nameEn}</h1>
        <p class="headline">${mark(profile.headline)}</p>
        ${profile.intro?.length ? `<ul class="intro">${profile.intro.map((l) => `<li>${mark(l)}</li>`).join("")}</ul>` : ""}
        <dl class="hero-meta">
          <div><dt>목표 직무</dt><dd>${roleChips(profile.target_roles || [])}</dd></div>
          <div><dt>관심 직무</dt><dd>${roleChips(profile.interest_roles || [], true)}</dd></div>
          <div><dt>관심 산업</dt><dd>${(profile.target_industries || []).map((i) => `<span class="pill">${esc(i)}</span>`).join("")}</dd></div>
          ${contact ? `<div><dt>연락처</dt><dd>${contact}</dd></div>` : ""}
        </dl>
        <nav class="stats" aria-label="항목 수">${counts}</nav>
      </div>`;
  }

  /* ---------- 사이드 ---------- */
  function renderSide() {
    $("#toc").innerHTML = typeOrder
      .map((t) => `<li><a href="#sec-${t}"><span>${esc(T.types[t].label)}</span><span class="n">${index.counts[t] || 0}</span></a></li>`)
      .join("");
    $("#tag-index").innerHTML = index.skills.length
      ? index.skills
          .map((s) => {
            const key = normTag(s.label);
            return `<button type="button" class="tag-btn" data-tag="${esc(key)}" aria-pressed="${state.tag === key}" title="${esc(s.ids.join(", "))}">${esc(s.label)}<sup>${s.count}</sup></button>`;
          })
          .join("")
      : '<span class="side-hint">항목에 tags를 입력하면 표시</span>';
    $("#todo-count").textContent = index.todo.length ? `${index.todo.length}건` : "";
    $("#todo-list").innerHTML = index.todo.length
      ? index.todo
          .map((t) => `<li><b>${esc(t.title)}</b><ul>${t.items.slice(0, 4).map((i) => `<li>${mark(i)}</li>`).join("")}${t.items.length > 4 ? `<li class="muted">외 ${t.items.length - 4}건</li>` : ""}</ul></li>`)
          .join("")
      : '<li class="muted">없음</li>';
  }

  /* ---------- 카드 ---------- */
  function cardTop(rec) {
    const flags = [];
    if (rec.status !== "confirmed") flags.push(`<span class="badge ${rec.status}">${esc(T.status[rec.status].label)}</span>`);
    flags.push(`<button type="button" class="id-chip" data-copy="${esc(rec.id)}" title="ID 복사">${esc(rec.id)}</button>`);
    const pick = rec.status === "template" ? "" : `<input type="checkbox" class="pick" data-pick="${esc(rec.id)}" aria-label="${esc(rec.title)} 추출 대상에 넣기" ${state.selected.has(rec.id) ? "checked" : ""}>`;
    return `
      <div class="card-top">
        ${pick}
        <div class="card-title">
          <h3>${mark(rec.title)}</h3>
          ${rec.subtitle ? `<p class="subtitle">${mark(rec.subtitle)}</p>` : ""}
        </div>
        <div class="card-flags">${flags.join("")}</div>
      </div>`;
  }

  function metaRow(rec) {
    const parts = [rec.org, periodLabel(rec.period)].filter(Boolean);
    return parts.length ? `<p class="meta">${parts.map((p) => `<span>${mark(p)}</span>`).join("")}</p>` : "";
  }

  const tagRow = (rec) =>
    rec.tags?.length ? `<div class="tags">${rec.tags.map((t) => `<span class="pill">${esc(t)}</span>`).join("")}</div>` : "";

  const contribBadge = (item) =>
    item.mine && item.mine !== "self" ? `<span class="badge shared">${esc(T.contribution[item.mine].label)}</span>` : "";

  function linksRow(rec) {
    const links = (rec.links || []).map((l) => `<a class="link" href="${esc(l.url)}" target="_blank" rel="noopener">${icon.link}${esc(l.label)}</a>`);
    const docs = (rec.evidence || []).map((e) => `<a class="link" href="${esc(e.path)}" target="_blank" rel="noopener">${icon.doc}${esc(e.label)}</a>`);
    const all = [...links, ...docs];
    return all.length ? `<div class="links">${all.join("")}</div>` : "";
  }

  function todoBox(rec) {
    if (!rec.todo?.length || rec.status === "template") return "";
    return `<div class="todo-box"><b>보완할 것</b><ul>${rec.todo.map((t) => `<li>${mark(t)}</li>`).join("")}</ul></div>`;
  }

  function projectCard(rec) {
    const team = teamLabel(rec);
    const work = (rec.my_work || []).map((i) => `<li>${mark(i.text)}${contribBadge(i)}</li>`).join("");
    const metrics = (rec.results || [])
      .map((r) => `<div class="metric"><b>${esc(r.metric || "결과")}</b><span>${mark(r.text)}</span></div>`)
      .join("");
    const trouble = (rec.troubleshooting || [])
      .map(
        (t, i) => `
        <article>
          <h4><span class="no">${String(i + 1).padStart(2, "0")}</span>${esc(t.title)}${contribBadge(t)}</h4>
          <dl>
            <dt>문제</dt><dd>${mark(t.problem)}</dd>
            <dt>원인</dt><dd>${mark(t.cause)}</dd>
            <dt>해결</dt><dd class="fix">${mark(t.fix)}</dd>
            <dt>결과</dt><dd class="res">${mark(t.result)}</dd>
          </dl>
        </article>`
      )
      .join("");
    const decisions = (rec.decisions || []).map((d) => `<div><dt>${esc(d.choice)}</dt><dd>${mark(d.reason)}</dd></div>`).join("");

    return `
      <article class="card project ${rec.status}${state.selected.has(rec.id) ? " is-selected" : ""}" id="${esc(rec.id)}">
        ${cardTop(rec)}
        ${metaRow(rec)}
        ${team ? `<p class="myrole"><b>내 역할</b><span>${mark(team)}</span></p>` : ""}
        <p class="line">${mark(rec.summary.line)}</p>
        ${work ? `<section class="block"><h4 class="block-title">내가 한 일</h4><ul class="bullets">${work}</ul></section>` : ""}
        ${metrics ? `<section class="block"><h4 class="block-title">결과</h4><div class="metrics">${metrics}</div></section>` : ""}
        ${rec.problem ? `
        <details class="more">
          <summary>문제 정의와 시스템 구성</summary>
          <p class="prose">${mark(rec.problem)}</p>
          ${rec.goal ? `<p class="prose"><b>목표</b> ${mark(rec.goal)}</p>` : ""}
          ${rec.architecture?.length ? `<section class="block"><h4 class="block-title">구성</h4><ol class="flow">${rec.architecture.map((a) => `<li>${esc(a)}</li>`).join("")}</ol></section>` : ""}
        </details>` : ""}
        ${decisions ? `<details class="more"><summary>기술 선택 근거 <span class="muted">${rec.decisions.length}</span></summary><dl class="decisions block">${decisions}</dl></details>` : ""}
        ${trouble ? `<details class="more"><summary>문제 해결 기록 <span class="muted">${rec.troubleshooting.length}</span></summary><div class="trouble block">${trouble}</div></details>` : ""}
        ${rec.lessons?.length || rec.next?.length ? `
        <details class="more">
          <summary>배운 점과 다음 과제</summary>
          ${rec.lessons?.length ? `<section class="block"><h4 class="block-title">배운 점</h4><ul class="bullets">${rec.lessons.map((l) => `<li>${mark(l)}</li>`).join("")}</ul></section>` : ""}
          ${rec.next?.length ? `<section class="block"><h4 class="block-title">다음 과제</h4><ul class="bullets">${rec.next.map((l) => `<li>${mark(l)}</li>`).join("")}</ul></section>` : ""}
        </details>` : ""}
        ${rec.materials?.length ? `
        <details class="more">
          <summary>원본 자료 요약 <span class="muted">${rec.materials.length}건 · 원본은 로컬 보관</span></summary>
          <dl class="decisions block">${rec.materials.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${mark(m.detail)}</dd></div>`).join("")}</dl>
        </details>` : ""}
        ${tagRow(rec)}
        ${linksRow(rec)}
        ${todoBox(rec)}
      </article>`;
  }

  const FIELD_LABELS = {
    degree: "학위", major: "전공", minor: "복수·부전공", gpa: "학점", branch: "군별", rank: "계급·등급",
    specialty: "주특기", discharge: "전역 구분", notes: "비고", project_ref: "관련 프로젝트", kind: "구분",
    question: "연구 물음", method: "방법", result: "결과", limits: "한계", publication: "발표·게재",
  };

  function genericCard(rec) {
    const fields = Object.entries(FIELD_LABELS)
      .filter(([k]) => rec[k] && !(rec.type === "education" && k === "kind"))
      .map(([k, label]) => {
        let v = rec[k];
        if (k === "project_ref" && byId[v]) v = `${byId[v].title} (${v})`;
        return `<dt>${esc(label)}</dt><dd>${mark(v)}</dd>`;
      })
      .join("");
    const modules = (rec.modules || [])
      .map((m) => `<li><b>${esc(m.name)}</b>${m.hours ? ` <span class="muted">${m.hours}시간</span>` : ""}${m.detail ? `<br><span class="muted">${mark(m.detail)}</span>` : ""}</li>`)
      .join("");
    const courses = (rec.courses || []).length ? `<p class="prose"><b>관련 과목</b> ${rec.courses.map(mark).join(", ")}</p>` : "";
    const short = rec.summary.short ? `<p class="short">${mark(rec.summary.short)}</p>` : "";
    return `
      <article class="card ${rec.type} ${rec.status}${state.selected.has(rec.id) ? " is-selected" : ""}" id="${esc(rec.id)}">
        ${cardTop(rec)}
        ${metaRow(rec)}
        <p class="line">${mark(rec.summary.line)}</p>
        ${short}
        ${fields ? `<dl class="fields">${fields}</dl>` : ""}
        ${modules ? `<section class="block"><h4 class="block-title">이수 과정</h4><ul class="bullets">${modules}</ul></section>` : ""}
        ${courses}
        ${tagRow(rec)}
        ${linksRow(rec)}
        ${todoBox(rec)}
      </article>`;
  }

  /* ---------- 섹션 ---------- */
  function renderSections() {
    const html = typeOrder
      .map((type) => {
        const all = records.filter((r) => r.type === type);
        const shown = all.filter(visible);
        const filled = all.filter((r) => r.status !== "template").length;
        const note = !FILTERED.has(type) && (state.role || state.tag) ? '<span class="note">직무·기술 필터와 무관하게 표시</span>' : "";
        let body;
        if (shown.length) {
          body = `<div class="cards">${shown.map((r) => (r.type === "project" ? projectCard(r) : genericCard(r))).join("")}</div>`;
        } else if (!filled && !state.showTemplates) {
          body = `<p class="empty">아직 입력한 내용이 없습니다. 상단의 '작성 양식 보기'를 켜면 입력할 항목이 보입니다. (data/${esc(T.types[type].file)})</p>`;
        } else {
          body = '<p class="empty">조건에 맞는 항목이 없습니다.</p>';
        }
        return `
          <section class="section" id="sec-${type}" aria-labelledby="h-${type}">
            <div class="section-head"><h2 id="h-${type}">${esc(T.types[type].label)}</h2><span class="n">${filled}</span>${note}</div>
            ${body}
          </section>`;
      })
      .join("");
    $("#sections").innerHTML = html;
    renderFilterNote();
  }

  function renderFilterNote() {
    const parts = [];
    if (state.q) parts.push(`검색 "${esc(state.q)}"`);
    if (state.role) parts.push(`직무 ${esc(T.roles[state.role].label)}`);
    if (state.tag) parts.push(`기술 ${esc(index.by_tag[state.tag]?.label || state.tag)}`);
    const note = $("#filter-note");
    note.hidden = !parts.length;
    note.innerHTML = parts.length ? `<span>적용 중: ${parts.join(" · ")}</span><button type="button" id="reset-filter">모두 해제</button>` : "";
  }

  function renderFoot() {
    $("#foot").innerHTML = `
      <span>${esc(profile.name)} 포트폴리오</span>
      <span>데이터 data/*.json · 인덱스 dist/index.json (${esc(index.generated)} 생성)</span>
      <span>태그 ${Object.keys(index.by_tag).length}개 · 항목 ${index.records.length}건</span>`;
  }

  /* ---------- 이력서 추출 (scripts/extract.py와 같은 규칙) ---------- */
  function targetScore(rec, tgt) {
    const keys = (tgt.keywords || []).filter((k) => k && !isGap(k)).map(normTag);
    const tags = (rec.tags || []).map(normTag);
    const tagHits = keys.filter((k) => tags.some((t) => t.includes(k) || k.includes(t))).length;
    const roleHits = (rec.roles || []).filter((r) => (tgt.roles || []).includes(r)).length;
    return tagHits + 2 * roleHits;
  }

  function extractionSet() {
    let recs = records.filter((r) => r.status !== "template");
    const usingSelection = state.selected.size > 0;
    recs = usingSelection ? recs.filter((r) => state.selected.has(r.id)) : recs.filter(visible);
    const target = targets.find((t) => t.id === state.target) || null;
    if (target) {
      const score = Object.fromEntries(recs.map((r) => [r.id, targetScore(r, target)]));
      recs = recs
        .filter((r) => !FILTERED.has(r.type) || score[r.id] > 0)
        .sort((a, b) => T.types[a.type].order - T.types[b.type].order || score[b.id] - score[a.id]);
    }
    return { recs, target, usingSelection };
  }

  function focusRoles(target) {
    const roles = new Set();
    if (state.role) roles.add(state.role);
    (target?.roles || []).forEach((r) => roles.add(r));
    return roles;
  }

  function pickItems(items, roles) {
    const mine = (items || []).filter((i) => (i.mine || "self") !== "team");
    if (!roles.size) return mine;
    const hit = mine.filter((i) => !i.roles?.length || i.roles.some((r) => roles.has(r)));
    return hit.length ? hit : mine;
  }

  class Writer {
    constructor(fmt) { this.fmt = fmt; this.lines = []; }
    blank() { if (this.lines.length && this.lines[this.lines.length - 1] !== "") this.lines.push(""); }
    h(level, text) { this.blank(); this.lines.push(this.fmt === "md" ? `${"#".repeat(level)} ${text}` : `${level <= 2 ? "■" : "□"} ${text}`); this.blank(); }
    p(text) { if (text) { this.lines.push(text); this.blank(); } }
    li(text, depth = 0) { if (text) this.lines.push(`${"  ".repeat(depth)}- ${text}`); }
    label(text) { this.lines.push(this.fmt === "md" ? `**${text}**` : `▶ ${text}`); }
    text() { return this.lines.join("\n").trim() + "\n"; }
  }

  const contribSuffix = (item) => ((item.mine || "self") === "self" ? "" : ` (${T.contribution[item.mine].label})`);

  function metaLine(rec) {
    return [rec.org, periodLabel(rec.period), teamLabel(rec)].filter(Boolean).join(" · ");
  }

  function renderText(recs, target) {
    const w = new Writer(state.fmt);
    const roles = focusRoles(target);
    if (state.withProfile) {
      w.h(1, profile.name);
      w.p(profile.headline);
      (profile.intro || []).forEach((l) => w.li(l));
      w.blank();
      w.p(Object.entries(profile.contact || {}).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" · "));
    }
    if (target) {
      w.p(`지원처: ${target.company} · ${target.position}`);
      if (target.pitch) w.p(`연결 지점: ${target.pitch}`);
    }
    let current = null;
    for (const rec of recs) {
      if (rec.type !== current) {
        current = rec.type;
        w.h(2, T.types[current].label);
      }
      if (state.detail === "line") {
        const meta = [rec.org, periodLabel(rec.period)].filter(Boolean).join(" · ");
        const title = state.fmt === "md" ? `**${rec.title}**` : rec.title;
        w.li(meta ? `${title} (${meta}): ${rec.summary.line}` : `${title}: ${rec.summary.line}`);
        continue;
      }
      w.h(3, rec.title);
      w.p(metaLine(rec));
      w.p(rec.summary.short || rec.summary.line);
      if (rec.type === "project") {
        const full = state.detail === "full";
        if (full && rec.problem) {
          w.label("문제");
          w.li(rec.problem);
          if (rec.goal) w.li(`목표: ${rec.goal}`);
          w.blank();
        }
        const work = pickItems(rec.my_work, roles);
        if (work.length) { w.label("내가 한 일"); work.forEach((i) => w.li(i.text + contribSuffix(i))); w.blank(); }
        if (rec.results?.length) { w.label("결과"); rec.results.forEach((i) => w.li(i.text)); w.blank(); }
        if (full) {
          if (rec.decisions?.length) { w.label("기술 선택 근거"); rec.decisions.forEach((d) => w.li(`${d.choice}: ${d.reason}`)); w.blank(); }
          const trouble = pickItems(rec.troubleshooting, roles);
          if (trouble.length) {
            w.label("문제 해결");
            trouble.forEach((t) => {
              w.li(t.title + contribSuffix(t));
              w.li(`문제: ${t.problem}`, 1);
              w.li(`원인: ${t.cause}`, 1);
              w.li(`해결: ${t.fix}`, 1);
              w.li(`결과: ${t.result}`, 1);
            });
            w.blank();
          }
          if (rec.lessons?.length) { w.label("배운 점"); rec.lessons.forEach((l) => w.li(l)); w.blank(); }
          if (rec.next?.length) { w.label("다음 과제"); rec.next.forEach((l) => w.li(l)); w.blank(); }
        }
        if (rec.tags?.length) w.p(`기술: ${rec.tags.join(", ")}`);
        if (full && rec.links?.length) w.p(`링크: ${rec.links.map((l) => `${l.label} ${l.url}`).join(" · ")}`);
      } else {
        (rec.modules || []).forEach((m) => w.li(`${m.name}${m.hours ? ` (${m.hours}시간)` : ""}${m.detail ? `: ${m.detail}` : ""}`));
        if (rec.courses?.length) w.li(`관련 과목: ${rec.courses.join(", ")}`);
        if (rec.type === "research" && state.detail === "full") {
          [["question", "연구 물음"], ["method", "방법"], ["result", "결과"], ["limits", "한계"]].forEach(([k, n]) => w.li(`${n}: ${rec[k] || ""}`));
        }
        w.blank();
      }
    }
    return w.text();
  }

  function cliCommand(recs, target, usingSelection) {
    const args = ["python scripts/extract.py"];
    if (usingSelection) args.push(`--ids ${recs.map((r) => r.id).join(",")}`);
    else {
      if (state.role) args.push(`--role ${state.role}`);
      if (state.tag) args.push(`--tag "${index.by_tag[state.tag]?.label || state.tag}"`);
    }
    if (target) args.push(`--target ${target.id}`);
    args.push(`--detail ${state.detail}`, `--format ${state.fmt}`);
    if (state.withProfile) args.push("--profile");
    return args.join(" ");
  }

  function renderExtract() {
    const { recs, target, usingSelection } = extractionSet();
    $("#scope").innerHTML = usingSelection
      ? `체크한 항목 <b>${state.selected.size}건</b> 기준`
      : `현재 화면에 보이는 항목 기준 (작성 양식 제외 ${recs.length}건). 카드 왼쪽 체크박스로 골라 담을 수도 있습니다.`;
    const tgtHint = $("#target-hint");
    tgtHint.textContent = target
      ? `${target.company}: 키워드·직무가 겹치는 프로젝트만 남기고 관련도 순으로 정렬. ${target.notes || ""}`.trim()
      : "지원처를 고르면 data/targets.json의 키워드로 항목을 골라 순서를 바꿉니다.";
    const text = recs.length ? renderText(recs, target) : "";
    $("#output").value = text || "조건에 맞는 항목이 없습니다.";
    const gaps = [...new Set(text.match(GAP) || [])];
    const warn = $("#gap-warn");
    warn.hidden = !gaps.length;
    warn.textContent = gaps.length ? `빈칸 ${gaps.length}종이 남아 있습니다: ${gaps.slice(0, 4).join(" ")}${gaps.length > 4 ? " …" : ""}` : "";
    $("#cli").textContent = cliCommand(recs, target, usingSelection);
    const cnt = $("#sel-count");
    cnt.hidden = !state.selected.size;
    cnt.textContent = state.selected.size;
  }

  function renderTargets() {
    const opts = targets.filter((t) => t.status !== "template");
    $("#target").innerHTML = ['<option value="">지정 안 함</option>', ...opts.map((t) => `<option value="${esc(t.id)}">${esc(t.company)} · ${esc(t.position)}</option>`)].join("");
  }

  function openDrawer(open) {
    const d = $("#drawer");
    d.classList.toggle("open", open);
    d.setAttribute("aria-hidden", String(!open));
    $("#drawer-backdrop").hidden = !open;
    if (open) {
      renderExtract();
      $("#close-extract").focus();
    } else {
      $("#open-extract").focus();
    }
  }

  /* ---------- 테마 ---------- */
  const THEMES = ["auto", "light", "dark"];
  function applyTheme(mode) {
    const root = document.documentElement;
    if (mode === "auto") delete root.dataset.theme;
    else root.dataset.theme = mode;
    const btn = $("#theme");
    btn.innerHTML = icon[mode === "auto" ? "auto" : mode === "light" ? "sun" : "moon"];
    btn.title = `테마: ${{ auto: "시스템", light: "밝게", dark: "어둡게" }[mode]}`;
    store.set("pf-theme", mode);
  }

  /* ---------- 이벤트 ---------- */
  function bind() {
    let qTimer;
    $("#q").addEventListener("input", (e) => {
      clearTimeout(qTimer);
      qTimer = setTimeout(() => { state.q = e.target.value.trim(); renderSections(); }, 120);
    });
    $("#tag-index").addEventListener("click", (e) => {
      const b = e.target.closest("[data-tag]");
      if (!b) return;
      state.tag = state.tag === b.dataset.tag ? "" : b.dataset.tag;
      renderSide();
      renderSections();
      $("#sec-project").scrollIntoView({ behavior: "smooth" });
    });
    $("#show-templates").addEventListener("change", (e) => { state.showTemplates = e.target.checked; renderSections(); });

    document.addEventListener("click", async (e) => {
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        if (await copyText(copy.dataset.copy)) toast(`${copy.dataset.copy} 복사`);
        return;
      }
      if (e.target.closest("#reset-filter")) {
        state.q = ""; state.role = ""; state.tag = "";
        $("#q").value = "";
        renderSide(); renderSections();
      }
    });
    document.addEventListener("change", (e) => {
      const pick = e.target.closest("[data-pick]");
      if (!pick) return;
      const id = pick.dataset.pick;
      pick.checked ? state.selected.add(id) : state.selected.delete(id);
      pick.closest(".card")?.classList.toggle("is-selected", pick.checked);
      renderExtract();
    });

    $("#open-extract").addEventListener("click", () => openDrawer(true));
    $("#close-extract").addEventListener("click", () => openDrawer(false));
    $("#drawer-backdrop").addEventListener("click", () => openDrawer(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && $("#drawer").classList.contains("open")) openDrawer(false); });

    $("#target").addEventListener("change", (e) => { state.target = e.target.value; renderExtract(); });
    document.querySelectorAll('input[name="detail"]').forEach((r) => r.addEventListener("change", (e) => { state.detail = e.target.value; renderExtract(); }));
    document.querySelectorAll('input[name="fmt"]').forEach((r) => r.addEventListener("change", (e) => { state.fmt = e.target.value; renderExtract(); }));
    $("#with-profile").addEventListener("change", (e) => { state.withProfile = e.target.checked; renderExtract(); });
    $("#copy").addEventListener("click", async () => { if (await copyText($("#output").value)) toast("추출 결과 복사"); });
    $("#download").addEventListener("click", () => {
      const tgt = targets.find((t) => t.id === state.target);
      const name = `${profile.name}_${tgt ? tgt.company : "포트폴리오"}_${state.detail}.${state.fmt === "md" ? "md" : "txt"}`;
      const url = URL.createObjectURL(new Blob([$("#output").value], { type: "text/plain;charset=utf-8" }));
      const a = Object.assign(document.createElement("a"), { href: url, download: name });
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
    $("#clear-sel").addEventListener("click", () => {
      state.selected.clear();
      document.querySelectorAll("[data-pick]").forEach((p) => { p.checked = false; p.closest(".card")?.classList.remove("is-selected"); });
      renderExtract();
    });
    $("#theme").addEventListener("click", () => {
      const cur = store.get("pf-theme") || "auto";
      applyTheme(THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length]);
    });
    window.addEventListener("beforeprint", () => document.querySelectorAll("details.more").forEach((d) => (d.open = true)));
  }

  /* ---------- 시작 ---------- */
  applyTheme(THEMES.includes(store.get("pf-theme")) ? store.get("pf-theme") : "auto");
  renderHero();
  renderSide();
  renderTargets();
  renderSections();
  renderFoot();
  renderExtract();
  bind();
})();
