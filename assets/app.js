/* 포트폴리오 열람·편집 UI
   데이터: dist/portfolio.js (scripts/build.py 생성)
   편집:   scripts/serve.py 실행 시 자동으로 편집 모드 */
(() => {
  "use strict";

  if (!window.PORTFOLIO) {
    document.getElementById("app-error").hidden = false;
    return;
  }

  /* ---------- 데이터 ---------- */
  let P = window.PORTFOLIO;
  const T = P.taxonomy;
  const FILTERED = new Set(["project", "research", "award"]);
  const GAP = /\[[^\[\]\n]{1,80}\]/g;
  const typeOrder = Object.keys(T.types).sort((a, b) => T.types[a].order - T.types[b].order);
  let byId = {};

  function setData(bundle) {
    P = bundle;
    window.PORTFOLIO = bundle;
    byId = Object.fromEntries(P.records.map((r) => [r.id, r]));
  }
  setData(P);

  const state = {
    q: "",
    tag: "",
    selected: new Set(),
    detail: "short",
    fmt: "md",
    target: "",
    withProfile: true,
    editable: false,
    maxUpload: 95 * 1024 * 1024,
  };

  /* ---------- 유틸 ---------- */
  const $ = (s) => document.querySelector(s);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const mark = (s) => esc(s).replace(GAP, (m) => `<span class="gap">${m}</span>`);
  const ym = (v) => (!v ? "" : /^\d{4}-\d{2}(-\d{2})?$/.test(v) ? v.replace(/-/g, ".") : v);
  const normTag = (t) => String(t).replace(/[\s\-_·()./]/g, "").toLowerCase();
  const isGap = (s) => new RegExp(GAP.source).test(s || "");
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const lineOf = (rec) => rec.summary?.line || rec.subtitle || "";
  const shortOf = (rec) => rec.summary?.short || rec.summary?.line || rec.subtitle || "";

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

  function getPath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }
  function setPath(obj, path, value) {
    const keys = path.split(".");
    let o = obj;
    keys.slice(0, -1).forEach((k) => {
      if (typeof o[k] !== "object" || o[k] === null) o[k] = {};
      o = o[k];
    });
    o[keys[keys.length - 1]] = value;
  }

  function toast(msg, ms = 2200) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("show"), ms);
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
    play: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 5.5v9l7-4.5z" fill="currentColor" stroke="none"/></svg>',
    image: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4" width="15" height="12" rx="2"/><circle cx="7.5" cy="8.5" r="1.5"/><path d="m3 14.5 4.5-4 3.5 3 2.5-2 3.5 3"/></svg>',
    sun: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4"/></svg>',
    moon: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5z"/></svg>',
    auto: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="M10 3a7 7 0 0 1 0 14z" fill="currentColor" stroke="none"/></svg>',
  };

  /* ---------- 첨부 ---------- */
  const IMAGE_EXT = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp"]);
  const VIDEO_EXT = new Set(["mp4", "webm", "mov", "m4v", "ogv"]);
  const EXT_CLASS = {
    hwp: "hwp", hwpx: "hwp", doc: "doc", docx: "doc", pdf: "pdf", ppt: "ppt", pptx: "ppt", key: "ppt",
    xls: "xls", xlsx: "xls", csv: "xls", zip: "zip", "7z": "zip", rar: "zip",
  };
  const extOf = (s) => {
    const m = /\.([a-z0-9]+)$/i.exec(s || "");
    return m ? m[1].toLowerCase() : "";
  };
  const kindOf = (name) => (IMAGE_EXT.has(extOf(name)) ? "image" : VIDEO_EXT.has(extOf(name)) ? "video" : "file");
  function youtubeId(url) {
    const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(url || "");
    return m ? m[1] : "";
  }
  const src = (path) => encodeURI(path || "");
  const isMedia = (a) => a.type === "image" || a.type === "video" || (a.type === "link" && !!youtubeId(a.url));
  const mediaOf = (rec) => (rec.attachments || []).filter(isMedia);
  const filesOf = (rec) => (rec.attachments || []).filter((a) => !isMedia(a));

  function thumbOf(a) {
    if (a.type === "image") return src(a.path);
    if (a.type === "video") return a.thumb ? src(a.thumb) : "";
    const id = youtubeId(a.url);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
  }

  function fmtSize(n) {
    if (!n && n !== 0) return "";
    const units = ["B", "KB", "MB", "GB"];
    let i = 0;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return `${n < 10 && i ? n.toFixed(1) : Math.round(n)}${units[i]}`;
  }

  function galleryHTML(rec) {
    const media = mediaOf(rec);
    if (!media.length) return "";
    const tiles = media
      .map((a, i) => {
        const t = thumbOf(a);
        const isImg = a.type === "image";
        let inner = t
          ? `<img src="${esc(t)}" alt="${esc(a.caption || a.name || "")}" loading="lazy">`
          : `<video src="${esc(src(a.path))}#t=0.5" preload="metadata" muted playsinline></video>`;
        if (!isImg) inner += `<span class="play">${icon.play}</span>`;
        const cap = a.caption ? `<figcaption>${mark(a.caption)}</figcaption>` : "";
        return `<figure class="tile"><button type="button" class="tile-btn ${isImg ? "is-image" : "is-video"}" data-view="${esc(rec.id)}" data-index="${i}" aria-label="${esc(a.caption || a.name || "크게 보기")}">${inner}</button>${cap}</figure>`;
      })
      .join("");
    return `<div class="gallery n${Math.min(media.length, 3)}">${tiles}</div>`;
  }

  function filesHTML(rec) {
    const files = filesOf(rec);
    if (!files.length) return "";
    const items = files
      .map((a) => {
        const cap = a.caption ? `<span class="fcap">${mark(a.caption)}</span>` : "";
        if (a.type === "link") {
          return `<li><a class="file" href="${esc(a.url)}" target="_blank" rel="noopener"><span class="ext e-link">${icon.link}</span><span class="fname">${esc(a.name || a.url)}</span>${cap}</a></li>`;
        }
        const ext = extOf(a.name || a.path);
        return `<li><a class="file" href="${esc(src(a.path))}" download="${esc(a.name || "")}"><span class="ext e-${EXT_CLASS[ext] || "etc"}">${esc((ext || "file").toUpperCase().slice(0, 4))}</span><span class="fname">${esc(a.name)}</span>${cap}<span class="fsize">${fmtSize(a.size)}</span></a></li>`;
      })
      .join("");
    return `<section class="block"><h4 class="block-title">첨부 파일</h4><ul class="files">${items}</ul></section>`;
  }

  /* ---------- 크게 보기 ---------- */
  const viewer = { rec: null, i: 0 };

  function openViewer(id, i) {
    viewer.rec = byId[id];
    viewer.i = i;
    showViewer();
    const d = $("#viewer");
    if (!d.open) d.showModal();
  }

  function showViewer() {
    const items = mediaOf(viewer.rec);
    const a = items[viewer.i];
    if (!a) return;
    let html;
    if (a.type === "image") {
      html = `<img src="${esc(src(a.path))}" alt="${esc(a.caption || a.name || "")}">`;
    } else if (a.type === "video") {
      html = `<video src="${esc(src(a.path))}" controls autoplay playsinline${a.thumb ? ` poster="${esc(src(a.thumb))}"` : ""}></video>`;
    } else {
      html = `<iframe src="https://www.youtube-nocookie.com/embed/${youtubeId(a.url)}?autoplay=1" title="${esc(a.name || "YouTube")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }
    $("#viewer-stage").innerHTML = html;
    const parts = [a.caption ? mark(a.caption) : esc(a.name || ""), items.length > 1 ? `<span class="muted">${viewer.i + 1} / ${items.length}</span>` : ""];
    $("#viewer-cap").innerHTML = parts.filter(Boolean).join(" · ");
    $("#viewer-prev").hidden = $("#viewer-next").hidden = items.length < 2;
  }

  function stepViewer(d) {
    const n = mediaOf(viewer.rec).length;
    if (n < 2) return;
    viewer.i = (viewer.i + d + n) % n;
    showViewer();
  }

  /* ---------- 필터 ---------- */
  function matchesQuery(rec, q) {
    if (!q) return true;
    const hay = [
      rec.id, rec.title, rec.subtitle, rec.org, rec.summary?.line, rec.summary?.short,
      ...(rec.tags || []), ...(rec.stack || []),
      ...(rec.my_work || []).map((i) => i.text),
      ...(rec.troubleshooting || []).map((i) => `${i.title} ${i.problem} ${i.fix}`),
      ...(rec.courses || []),
      ...(rec.attachments || []).map((a) => `${a.name || ""} ${a.caption || ""}`),
    ].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
  }

  function visible(rec) {
    if (rec.status === "template") return false;
    if (!matchesQuery(rec, state.q)) return false;
    if (FILTERED.has(rec.type) && state.tag && !(rec.tags || []).some((t) => normTag(t) === state.tag)) return false;
    return true;
  }

  /* ---------- 머리말 ---------- */
  function renderHero() {
    const profile = P.profile;
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
    const meta = [
      profile.target_roles?.length ? `<div><dt>목표 직무</dt><dd>${roleChips(profile.target_roles)}</dd></div>` : "",
      profile.interest_roles?.length ? `<div><dt>관심 직무</dt><dd>${roleChips(profile.interest_roles, true)}</dd></div>` : "",
      profile.target_industries?.length ? `<div><dt>관심 산업</dt><dd>${profile.target_industries.map((i) => `<span class="pill">${esc(i)}</span>`).join("")}</dd></div>` : "",
      contact ? `<div><dt>연락처</dt><dd>${contact}</dd></div>` : "",
    ].join("");
    const counts = typeOrder
      .map((t) => `<a class="stat" href="#sec-${t}">${esc(T.types[t].label)} <b>${P.index.counts[t] || 0}</b></a>`)
      .join("");
    const nameEn = profile.name_en && !isGap(profile.name_en) ? `<small>${esc(profile.name_en)}</small>` : "";

    $("#hero").innerHTML = `
      <div class="wrap">
        <div class="hero-top">
          <p class="eyebrow">PORTFOLIO · ${esc(ym(profile.updated))} 기준</p>
          ${state.editable ? '<button type="button" class="btn sm edit-btn" data-edit-profile>프로필 편집</button>' : ""}
        </div>
        <h1>${esc(profile.name)}${nameEn}</h1>
        ${profile.headline ? `<p class="headline">${mark(profile.headline)}</p>` : ""}
        ${profile.intro?.length ? `<ul class="intro">${profile.intro.map((l) => `<li>${mark(l)}</li>`).join("")}</ul>` : ""}
        ${meta ? `<dl class="hero-meta">${meta}</dl>` : ""}
        <nav class="stats" aria-label="항목 수">${counts}</nav>
      </div>`;
  }

  /* ---------- 사이드 ---------- */
  function renderSide() {
    const idx = P.index;
    $("#toc").innerHTML = typeOrder
      .map((t) => `<li><a href="#sec-${t}"><span>${esc(T.types[t].label)}</span><span class="n">${idx.counts[t] || 0}</span></a></li>`)
      .join("");
    $("#tag-index").innerHTML = idx.skills.length
      ? idx.skills
          .map((s) => {
            const key = normTag(s.label);
            return `<button type="button" class="tag-btn" data-tag="${esc(key)}" aria-pressed="${state.tag === key}" title="${esc(s.ids.join(", "))}">${esc(s.label)}<sup>${s.count}</sup></button>`;
          })
          .join("")
      : '<span class="side-hint">항목에 기술 태그를 넣으면 여기에 모임</span>';
    $("#todo-count").textContent = idx.todo.length ? `${idx.todo.length}건` : "";
    $("#todo-list").innerHTML = idx.todo.length
      ? idx.todo
          .map((t) => `<li><b>${esc(t.title)}</b><ul>${t.items.slice(0, 4).map((i) => `<li>${mark(i)}</li>`).join("")}${t.items.length > 4 ? `<li class="muted">외 ${t.items.length - 4}건</li>` : ""}</ul></li>`)
          .join("")
      : '<li class="muted">없음</li>';
  }

  /* ---------- 카드 ---------- */
  function cardTop(rec) {
    const flags = [];
    if (rec.status !== "confirmed") flags.push(`<span class="badge ${rec.status}">${esc(T.status[rec.status]?.label || rec.status)}</span>`);
    flags.push(`<button type="button" class="id-chip" data-copy="${esc(rec.id)}" title="ID 복사">${esc(rec.id)}</button>`);
    if (state.editable) {
      flags.push(`<button type="button" class="btn sm edit-btn" data-edit="${esc(rec.id)}" data-jump="att">사진·파일</button>`);
      flags.push(`<button type="button" class="btn sm edit-btn" data-edit="${esc(rec.id)}">편집</button>`);
    }
    const pick = `<input type="checkbox" class="pick" data-pick="${esc(rec.id)}" aria-label="${esc(rec.title)} 추출 대상에 넣기" ${state.selected.has(rec.id) ? "checked" : ""}>`;
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
    item.mine && item.mine !== "self" ? `<span class="badge shared">${esc(T.contribution[item.mine]?.label || item.mine)}</span>` : "";

  function linksRow(rec) {
    const links = (rec.links || []).filter((l) => l.url).map((l) => `<a class="link" href="${esc(l.url)}" target="_blank" rel="noopener">${icon.link}${esc(l.label || l.url)}</a>`);
    const docs = (rec.evidence || []).map((e) => `<a class="link" href="${esc(src(e.path))}" target="_blank" rel="noopener">${icon.doc}${esc(e.label)}</a>`);
    const all = [...links, ...docs];
    return all.length ? `<div class="links">${all.join("")}</div>` : "";
  }

  function todoBox(rec) {
    if (!rec.todo?.length) return "";
    return `<div class="todo-box"><b>보완할 것</b><ul>${rec.todo.map((t) => `<li>${mark(t)}</li>`).join("")}</ul></div>`;
  }

  function projectCard(rec) {
    const team = teamLabel(rec);
    const work = (rec.my_work || []).map((i) => `<li>${mark(i.text)}${contribBadge(i)}</li>`).join("");
    const metrics = (rec.results || [])
      .map((r) => `<div class="metric"><b>${esc(r.metric || "결과")}</b><span>${mark(r.text || "")}</span></div>`)
      .join("");
    const trouble = (rec.troubleshooting || [])
      .map(
        (t, i) => `
        <article>
          <h4><span class="no">${String(i + 1).padStart(2, "0")}</span>${esc(t.title || "")}${contribBadge(t)}</h4>
          <dl>
            ${t.problem ? `<dt>문제</dt><dd>${mark(t.problem)}</dd>` : ""}
            ${t.cause ? `<dt>원인</dt><dd>${mark(t.cause)}</dd>` : ""}
            ${t.fix ? `<dt>해결</dt><dd class="fix">${mark(t.fix)}</dd>` : ""}
            ${t.result ? `<dt>결과</dt><dd class="res">${mark(t.result)}</dd>` : ""}
          </dl>
        </article>`
      )
      .join("");
    const decisions = (rec.decisions || []).map((d) => `<div><dt>${esc(d.choice || "")}</dt><dd>${mark(d.reason || "")}</dd></div>`).join("");

    return `
      <article class="card project ${rec.status}${state.selected.has(rec.id) ? " is-selected" : ""}" id="${esc(rec.id)}">
        ${cardTop(rec)}
        ${metaRow(rec)}
        ${team ? `<p class="myrole"><b>내 역할</b><span>${mark(team)}</span></p>` : ""}
        ${lineOf(rec) ? `<p class="line">${mark(lineOf(rec))}</p>` : ""}
        ${rec.summary?.short ? `<p class="short">${mark(rec.summary.short)}</p>` : ""}
        ${galleryHTML(rec)}
        ${work ? `<section class="block"><h4 class="block-title">내가 한 일</h4><ul class="bullets">${work}</ul></section>` : ""}
        ${metrics ? `<section class="block"><h4 class="block-title">결과</h4><div class="metrics">${metrics}</div></section>` : ""}
        ${rec.problem || rec.goal || rec.architecture?.length ? `
        <details class="more">
          <summary>문제 정의와 시스템 구성</summary>
          ${rec.problem ? `<p class="prose">${mark(rec.problem)}</p>` : ""}
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
          <summary>원본 자료 메모 <span class="muted">${rec.materials.length}</span></summary>
          <dl class="decisions block">${rec.materials.map((m) => `<div><dt>${esc(m.label || "")}</dt><dd>${mark(m.detail || "")}</dd></div>`).join("")}</dl>
        </details>` : ""}
        ${filesHTML(rec)}
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
      .map((m) => `<li><b>${esc(m.name || "")}</b>${m.hours ? ` <span class="muted">${m.hours}시간</span>` : ""}${m.detail ? `<br><span class="muted">${mark(m.detail)}</span>` : ""}</li>`)
      .join("");
    const courses = (rec.courses || []).length ? `<p class="prose"><b>관련 과목</b> ${rec.courses.map(mark).join(", ")}</p>` : "";
    return `
      <article class="card ${rec.type} ${rec.status}${state.selected.has(rec.id) ? " is-selected" : ""}" id="${esc(rec.id)}">
        ${cardTop(rec)}
        ${metaRow(rec)}
        ${lineOf(rec) ? `<p class="line">${mark(lineOf(rec))}</p>` : ""}
        ${rec.summary?.short ? `<p class="short">${mark(rec.summary.short)}</p>` : ""}
        ${galleryHTML(rec)}
        ${fields ? `<dl class="fields">${fields}</dl>` : ""}
        ${modules ? `<section class="block"><h4 class="block-title">이수 과정</h4><ul class="bullets">${modules}</ul></section>` : ""}
        ${courses}
        ${filesHTML(rec)}
        ${tagRow(rec)}
        ${linksRow(rec)}
        ${todoBox(rec)}
      </article>`;
  }

  /* ---------- 섹션 ---------- */
  function renderSections() {
    const html = typeOrder
      .map((type) => {
        const label = T.types[type].label;
        const all = P.records.filter((r) => r.type === type && r.status !== "template");
        const shown = all.filter(visible);
        const addBtn = state.editable ? `<button type="button" class="btn sm edit-btn" data-add="${type}">+ ${esc(label)} 추가</button>` : "";
        const note = !FILTERED.has(type) && state.tag ? '<span class="note">기술 필터와 무관하게 표시</span>' : "";
        let body;
        if (shown.length) {
          body = `<div class="cards">${shown.map((r) => (r.type === "project" ? projectCard(r) : genericCard(r))).join("")}</div>`;
        } else if (!all.length) {
          body = state.editable
            ? `<div class="empty">아직 입력한 내용이 없습니다. <button type="button" class="btn sm" data-add="${type}">+ ${esc(label)} 추가</button></div>`
            : '<p class="empty">아직 입력한 내용이 없습니다.</p>';
        } else {
          body = '<p class="empty">조건에 맞는 항목이 없습니다.</p>';
        }
        return `
          <section class="section" id="sec-${type}" aria-labelledby="h-${type}">
            <div class="section-head"><h2 id="h-${type}">${esc(label)}</h2><span class="n">${all.length}</span>${note}${addBtn}</div>
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
    if (state.tag) parts.push(`기술 ${esc(P.index.by_tag[state.tag]?.label || state.tag)}`);
    const note = $("#filter-note");
    note.hidden = !parts.length;
    note.innerHTML = parts.length ? `<span>적용 중: ${parts.join(" · ")}</span><button type="button" id="reset-filter">모두 해제</button>` : "";
  }

  function renderFoot() {
    const idx = P.index;
    $("#foot").innerHTML = `
      <span>${esc(P.profile.name)} 포트폴리오</span>
      <span>데이터 data/*.json · 첨부 media/ · 인덱스 dist/index.json (${esc(idx.generated)} 생성)</span>
      <span>태그 ${Object.keys(idx.by_tag).length}개 · 항목 ${idx.records.length}건 · 첨부 ${idx.attachments || 0}개</span>`;
  }

  function renderAll() {
    renderHero();
    renderSide();
    renderTargets();
    renderSections();
    renderFoot();
    renderExtract();
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
    let recs = P.records.filter((r) => r.status !== "template");
    const usingSelection = state.selected.size > 0;
    recs = usingSelection ? recs.filter((r) => state.selected.has(r.id)) : recs.filter(visible);
    const target = P.targets.find((t) => t.id === state.target) || null;
    if (target) {
      const score = Object.fromEntries(recs.map((r) => [r.id, targetScore(r, target)]));
      recs = recs
        .filter((r) => !FILTERED.has(r.type) || score[r.id] > 0)
        .sort((a, b) => T.types[a.type].order - T.types[b.type].order || score[b.id] - score[a.id]);
    }
    return { recs, target, usingSelection };
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

  const contribSuffix = (item) => ((item.mine || "self") === "self" ? "" : ` (${T.contribution[item.mine]?.label || item.mine})`);
  const metaLine = (rec) => [rec.org, periodLabel(rec.period), teamLabel(rec)].filter(Boolean).join(" · ");

  function renderText(recs, target) {
    const w = new Writer(state.fmt);
    const roles = new Set(target?.roles || []);
    const profile = P.profile;
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
        const head = meta ? `${title} (${meta})` : title;
        w.li(lineOf(rec) ? `${head}: ${lineOf(rec)}` : head);
        continue;
      }
      w.h(3, rec.title);
      w.p(metaLine(rec));
      w.p(shortOf(rec));
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
              if (t.problem) w.li(`문제: ${t.problem}`, 1);
              if (t.cause) w.li(`원인: ${t.cause}`, 1);
              if (t.fix) w.li(`해결: ${t.fix}`, 1);
              if (t.result) w.li(`결과: ${t.result}`, 1);
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
          [["question", "연구 물음"], ["method", "방법"], ["result", "결과"], ["limits", "한계"]].forEach(([k, n]) => rec[k] && w.li(`${n}: ${rec[k]}`));
        }
        w.blank();
      }
    }
    return w.text();
  }

  function cliCommand(recs, target, usingSelection) {
    const args = ["python scripts/extract.py"];
    if (usingSelection) args.push(`--ids ${recs.map((r) => r.id).join(",")}`);
    else if (state.tag) args.push(`--tag "${P.index.by_tag[state.tag]?.label || state.tag}"`);
    if (target) args.push(`--target ${target.id}`);
    args.push(`--detail ${state.detail}`, `--format ${state.fmt}`);
    if (state.withProfile) args.push("--profile");
    return args.join(" ");
  }

  function renderExtract() {
    const { recs, target, usingSelection } = extractionSet();
    $("#scope").innerHTML = usingSelection
      ? `체크한 항목 <b>${state.selected.size}건</b> 기준`
      : `현재 화면에 보이는 항목 기준 (${recs.length}건). 카드 왼쪽 체크박스로 골라 담을 수도 있습니다.`;
    $("#target-hint").textContent = target
      ? `${target.company}: 키워드·직무가 겹치는 프로젝트만 남기고 관련도 순으로 정렬. ${target.notes || ""}`.trim()
      : "지원처를 고르면 data/targets.json의 키워드로 항목을 골라 순서를 바꿉니다.";
    const text = recs.length || state.withProfile ? renderText(recs, target) : "";
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
    const opts = P.targets.filter((t) => t.status !== "template");
    if (state.target && !opts.some((t) => t.id === state.target)) state.target = "";
    $("#target").innerHTML = ['<option value="">지정 안 함</option>', ...opts.map((t) => `<option value="${esc(t.id)}"${t.id === state.target ? " selected" : ""}>${esc(t.company)} · ${esc(t.position)}</option>`)].join("");
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

  /* =====================================================================
     편집 모드 (scripts/serve.py 실행 중일 때만)
     ===================================================================== */
  const api = {
    async post(path, body) {
      const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({ error: `응답 오류 (${res.status})` }));
      if (!res.ok) {
        const err = new Error(data.error || "저장하지 못했습니다.");
        err.details = data.details || [];
        throw err;
      }
      return data;
    },
    upload(file, id, name, onProgress) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/api/upload?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`);
        xhr.upload.onprogress = (e) => { if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total); };
        xhr.onload = () => {
          let data = {};
          try { data = JSON.parse(xhr.responseText); } catch { /* 빈 응답 */ }
          if (xhr.status === 200) resolve(data);
          else reject(new Error(data.error || `업로드 실패 (${xhr.status})`));
        };
        xhr.onerror = () => reject(new Error("업로드 중 연결이 끊겼습니다."));
        xhr.send(file);
      });
    },
  };

  async function detectEditMode() {
    if (location.protocol === "file:") {
      $("#mode-hint").hidden = false;
      return;
    }
    if (!/^https?:$/.test(location.protocol)) return;
    try {
      const res = await fetch("/api/ping", { cache: "no-store" });
      if (!res.ok) return;
      const ping = await res.json();
      if (!ping.ok) return;
      state.editable = true;
      state.maxUpload = ping.max_upload || state.maxUpload;
      document.body.classList.add("editable");
      $("#mode-pill").hidden = false;
      const fresh = await fetch("/api/data", { cache: "no-store" });
      if (fresh.ok) setData(await fresh.json());
      renderAll();
    } catch {
      /* 정적 호스팅(GitHub Pages 등): 보기 전용 */
    }
  }

  /* ---------- 입력 양식 정의 ---------- */
  const statusOptions = () => Object.entries(T.status).filter(([k]) => k !== "template").map(([k, v]) => [k, v.label]);
  const roleOptions = () => Object.entries(T.roles).map(([k, v]) => [k, v.label]);
  const mineOptions = () => Object.entries(T.contribution).map(([k, v]) => [k, v.label]);

  const F = {
    basic: { kind: "heading", label: "기본 정보" },
    title: { key: "title", label: "제목", kind: "text", required: true },
    status: { key: "status", label: "상태", kind: "select", options: statusOptions, default: "draft", hint: "보완 필요: 아직 채울 칸이 남음 · 확정: 이력서에 바로 사용" },
    org: { key: "org", label: "기관·소속", kind: "text" },
    period: { key: "period", label: "기간", kind: "period" },
    summaryH: { kind: "heading", label: "요약" },
    line: { key: "summary.line", label: "한 줄 요약", kind: "text", hint: "이력서 표 한 칸에 들어갈 문장" },
    short: { key: "summary.short", label: "요약 (2~3문장)", kind: "textarea", rows: 3, hint: "자기소개서·요약란용" },
    attachments: { kind: "attachments" },
    etcH: { kind: "heading", label: "분류·링크" },
    tags: { key: "tags", label: "기술 태그", kind: "tags", placeholder: "ROS 2, Nav2, Python", hint: "쉼표로 구분. 왼쪽 기술 인덱스에 모임" },
    roles: { key: "roles", label: "관련 직무", kind: "checks", options: roleOptions, hint: "이력서 추출 시 직무별로 고를 때 사용" },
    links: { key: "links", label: "링크", kind: "objlist", addLabel: "링크 추가", sub: [{ key: "label", label: "이름" }, { key: "url", label: "주소", placeholder: "https://" }] },
    todo: { key: "todo", label: "보완할 것", kind: "lines", hint: "한 줄에 하나. 왼쪽 '보완할 것'에 모임" },
  };

  const FIELDS = {
    education: [
      F.basic, F.title, F.status,
      { key: "kind", label: "구분", kind: "select", options: [["degree", "학위"], ["training", "교육 이수"]], default: "degree" },
      F.org, F.period,
      { key: "degree", label: "학위", kind: "text", placeholder: "학사" },
      { key: "major", label: "전공", kind: "text" },
      { key: "minor", label: "복수·부전공", kind: "text" },
      { key: "gpa", label: "학점", kind: "text", placeholder: "4.0 / 4.5" },
      F.summaryH, F.line, F.short, F.attachments,
      { kind: "heading", label: "과정·과목" },
      { key: "courses", label: "관련 과목", kind: "lines", hint: "한 줄에 하나" },
      { key: "modules", label: "이수 과정", kind: "objlist", addLabel: "과정 추가", sub: [{ key: "name", label: "과정명" }, { key: "hours", label: "시간", kind: "number" }, { key: "detail", label: "내용", wide: true }] },
      F.etcH, F.tags, F.roles, F.links, F.todo,
    ],
    military: [
      F.basic, F.title, F.status,
      { key: "branch", label: "군별", kind: "text", placeholder: "육군 / 해군 / 공군 / 해병대 / 사회복무요원" },
      { key: "rank", label: "최종 계급", kind: "text" },
      { key: "specialty", label: "주특기·병과", kind: "text" },
      { key: "discharge", label: "전역 구분", kind: "text", placeholder: "만기전역" },
      F.org, F.period,
      F.summaryH, F.line, { key: "notes", label: "비고", kind: "textarea", rows: 2, hint: "직무와 이어지는 복무 경험이 있으면 한 줄" },
      F.attachments, F.etcH, F.links, F.todo,
    ],
    award: [
      F.basic, F.title, F.status,
      { key: "rank", label: "상훈", kind: "text", placeholder: "대상 / 최우수상 / 우수상 / 장려상" },
      { key: "org", label: "주최·주관", kind: "text" }, F.period,
      { key: "project_ref", label: "관련 프로젝트", kind: "select", options: () => [["", "없음"], ...P.records.filter((r) => r.type === "project").map((r) => [r.id, `${r.title} (${r.id})`])] },
      F.summaryH, F.line, F.short, F.attachments,
      F.etcH, F.tags, F.roles, F.links, F.todo,
    ],
    project: [
      F.basic, F.title, F.status,
      { key: "subtitle", label: "부제", kind: "text", hint: "무엇을 만들었는지 한 줄" },
      F.org, F.period,
      { key: "team.size", label: "팀 인원", kind: "number" },
      { key: "team.my_role", label: "내 역할", kind: "text" },
      F.summaryH, F.line, F.short, F.attachments,
      { kind: "heading", label: "내용" },
      { key: "problem", label: "문제", kind: "textarea", rows: 3, hint: "누가, 무엇 때문에, 어떤 손해를 보는지" },
      { key: "goal", label: "목표", kind: "textarea", rows: 2 },
      { key: "architecture", label: "시스템 구성", kind: "lines", hint: "한 줄에 하나. 예: 입력 → 처리 → 출력" },
      { key: "my_work", label: "내가 한 일", kind: "objlist", addLabel: "한 일 추가", sub: [{ key: "text", label: "내용", kind: "textarea", rows: 2 }, { key: "mine", label: "수행 구분", kind: "select", options: mineOptions, default: "self", omitDefault: true }, { key: "roles", label: "관련 직무", kind: "checks", options: roleOptions }] },
      { key: "results", label: "결과", kind: "objlist", addLabel: "결과 추가", sub: [{ key: "metric", label: "짧은 수치", placeholder: "정확도 92%" }, { key: "text", label: "설명", wide: true }] },
      { key: "troubleshooting", label: "문제 해결 기록", kind: "objlist", addLabel: "기록 추가", sub: [{ key: "title", label: "제목", wide: true }, { key: "problem", label: "문제", kind: "textarea", rows: 2 }, { key: "cause", label: "원인", kind: "textarea", rows: 2 }, { key: "fix", label: "해결", kind: "textarea", rows: 2 }, { key: "result", label: "결과", kind: "textarea", rows: 2 }, { key: "mine", label: "수행 구분", kind: "select", options: mineOptions, default: "self", omitDefault: true }] },
      { key: "decisions", label: "기술 선택 근거", kind: "objlist", addLabel: "근거 추가", sub: [{ key: "choice", label: "고른 기술·방법", wide: true }, { key: "reason", label: "고른 이유", kind: "textarea", rows: 2 }] },
      { key: "stack", label: "사용 기술 상세", kind: "lines" },
      { key: "lessons", label: "배운 점", kind: "lines" },
      { key: "next", label: "다음 과제", kind: "lines" },
      { key: "materials", label: "원본 자료 메모", kind: "objlist", addLabel: "메모 추가", sub: [{ key: "label", label: "자료 이름", wide: true }, { key: "detail", label: "내용 요약", kind: "textarea", rows: 2 }] },
      F.etcH, F.tags, F.roles, F.links, F.todo,
    ],
    research: [
      F.basic, F.title, F.status,
      { key: "kind", label: "구분", kind: "text", placeholder: "학부연구생 / 논문 / 학회 발표 / 논문 재현" },
      F.org, F.period,
      F.summaryH, F.line, F.short, F.attachments,
      { kind: "heading", label: "내용" },
      { key: "question", label: "연구 물음", kind: "textarea", rows: 2 },
      { key: "method", label: "방법", kind: "textarea", rows: 3 },
      { key: "result", label: "결과", kind: "textarea", rows: 3 },
      { key: "limits", label: "한계", kind: "textarea", rows: 2 },
      { key: "publication", label: "발표·게재", kind: "text" },
      F.etcH, F.tags, F.roles, F.links, F.todo,
    ],
  };

  const PROFILE_FIELDS = [
    { kind: "heading", label: "기본 정보" },
    { key: "name", label: "이름", kind: "text", required: true },
    { key: "name_en", label: "영문 이름", kind: "text" },
    { key: "headline", label: "한 줄 소개", kind: "text" },
    { key: "intro", label: "소개", kind: "lines", rows: 4, hint: "한 줄에 하나. 이름 아래 목록으로 표시" },
    { kind: "heading", label: "희망 분야" },
    { key: "target_roles", label: "목표 직무", kind: "checks", options: roleOptions },
    { key: "interest_roles", label: "관심 직무", kind: "checks", options: roleOptions },
    { key: "target_industries", label: "관심 산업", kind: "tags", hint: "쉼표로 구분" },
    { kind: "heading", label: "연락처" },
    { key: "contact.email", label: "이메일", kind: "text" },
    { key: "contact.github", label: "GitHub 아이디", kind: "text" },
    { key: "contact.blog", label: "블로그·웹사이트", kind: "text", placeholder: "https://" },
  ];

  /* ---------- 편집기 상태 ---------- */
  const ed = { open: false, mode: "", type: "", isNew: false, originalId: "", draft: null, uploads: new Set(), removed: new Set(), dirty: false, busy: false };

  const currentFields = () => (ed.mode === "profile" ? PROFILE_FIELDS : FIELDS[ed.type]);
  const optionsOf = (f) => (typeof f.options === "function" ? f.options() : f.options || []);
  const monthVal = (v) => (/^\d{4}-\d{2}/.test(v || "") ? v.slice(0, 7) : "");

  function nextId(type) {
    const prefix = T.types[type].prefix;
    const nums = P.records
      .filter((r) => r.id.startsWith(`${prefix}-`))
      .map((r) => parseInt(r.id.slice(prefix.length + 1), 10))
      .filter((n) => !Number.isNaN(n));
    return `${prefix}-${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, "0")}`;
  }

  function blankRecord(type) {
    const rec = { id: nextId(type), type, status: "draft", title: "", org: "", period: { start: "", end: "", note: "" }, summary: { line: "", short: "" }, tags: [], roles: [], links: [], attachments: [], todo: [] };
    if (type === "education") rec.kind = "degree";
    if (type === "project") rec.team = { size: null, my_role: "" };
    return rec;
  }

  function openRecordEditor(type, id, jumpToAttachments = false) {
    const rec = id ? byId[id] : null;
    Object.assign(ed, {
      open: true, mode: "record", type, isNew: !rec, originalId: rec ? rec.id : "",
      draft: rec ? clone(rec) : blankRecord(type), uploads: new Set(), removed: new Set(), dirty: false,
    });
    if (!Array.isArray(ed.draft.attachments)) ed.draft.attachments = [];
    $("#editor-title").textContent = `${T.types[type].label} ${rec ? "편집" : "추가"}`;
    $("#editor-delete").hidden = !rec;
    renderEditorForm();
    showEditor(true, !jumpToAttachments);
    if (jumpToAttachments) setTimeout(jumpToDropzone, 80);
  }

  function jumpToDropzone() {
    const zone = $("#dropzone");
    if (!zone) return;
    zone.scrollIntoView({ behavior: "smooth", block: "center" });
    zone.classList.add("flash");
    setTimeout(() => zone.classList.remove("flash"), 1200);
  }

  function openProfileEditor() {
    Object.assign(ed, { open: true, mode: "profile", type: "", isNew: false, originalId: "", draft: clone(P.profile), uploads: new Set(), removed: new Set(), dirty: false });
    $("#editor-title").textContent = "프로필 편집";
    $("#editor-delete").hidden = true;
    renderEditorForm();
    showEditor(true);
  }

  function showEditor(open, focusFirst = true) {
    const el = $("#editor");
    el.classList.toggle("open", open);
    el.setAttribute("aria-hidden", String(!open));
    $("#editor-backdrop").hidden = !open;
    document.body.classList.toggle("editing", open);
    if (open) {
      $("#editor-form").scrollTop = 0;
      if (focusFirst) setTimeout(() => $("#editor-form").querySelector("input:not([type=checkbox]):not([type=file]):not([readonly]), textarea")?.focus({ preventScroll: true }), 60);
    }
  }

  /* ---------- 양식 그리기 ---------- */
  function fieldHTML(f, value) {
    if (f.kind === "heading") return `<h3 class="form-h">${esc(f.label)}</h3>`;
    if (f.kind === "attachments") return attachmentSectionHTML();
    const id = `f-${f.key.replace(/[^\w]/g, "-")}`;
    const ph = esc(f.placeholder || "");
    let input;
    switch (f.kind) {
      case "number":
        input = `<input id="${id}" type="number" min="0" value="${esc(value ?? "")}" placeholder="${ph}" data-in>`;
        break;
      case "textarea":
        input = `<textarea id="${id}" rows="${f.rows || 3}" placeholder="${ph}" data-in>${esc(value ?? "")}</textarea>`;
        break;
      case "lines":
        input = `<textarea id="${id}" rows="${f.rows || 3}" placeholder="${ph}" data-in>${esc((value || []).join("\n"))}</textarea>`;
        break;
      case "tags":
        input = `<input id="${id}" type="text" value="${esc((value || []).join(", "))}" placeholder="${ph}" data-in>`;
        break;
      case "select": {
        const cur = value ?? f.default ?? "";
        input = `<select id="${id}" data-in>${optionsOf(f).map(([k, l]) => `<option value="${esc(k)}"${k === cur ? " selected" : ""}>${esc(l)}</option>`).join("")}</select>`;
        break;
      }
      case "checks":
        input = `<div class="checks" role="group" aria-label="${esc(f.label)}">${optionsOf(f).map(([k, l]) => `<label class="check"><input type="checkbox" value="${esc(k)}"${(value || []).includes(k) ? " checked" : ""}><span>${esc(l)}</span></label>`).join("")}</div>`;
        break;
      case "period": {
        const v = value || {};
        input = `<div class="period"><input type="month" data-p="start" value="${esc(monthVal(v.start))}" aria-label="시작"><span>~</span><input type="month" data-p="end" value="${esc(monthVal(v.end))}" aria-label="종료"><input type="text" data-p="note" value="${esc(v.note || "")}" placeholder="비고 (예: 졸업예정, 재학 중)" aria-label="기간 비고"></div>`;
        break;
      }
      case "objlist":
        input = `<div class="rows">${(value || []).map((row) => rowHTML(f, row)).join("")}</div><button type="button" class="btn sm" data-add-row="${esc(f.key)}">+ ${esc(f.addLabel || "추가")}</button>`;
        break;
      default:
        input = `<input id="${id}" type="text" value="${esc(value ?? "")}" placeholder="${ph}" data-in>`;
    }
    const grouped = ["checks", "period", "objlist"].includes(f.kind);
    const label = grouped
      ? `<span class="fld-label">${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ""}</span>`
      : `<label class="fld-label" for="${id}">${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ""}</label>`;
    const hint = f.hint ? `<p class="fld-hint">${esc(f.hint)}</p>` : "";
    return `<div class="fld k-${f.kind}" data-key="${esc(f.key)}">${label}${input}${hint}</div>`;
  }

  function rowHTML(f, row = {}) {
    const subs = f.sub
      .map((s) => {
        const v = row[s.key];
        const kind = s.kind || "text";
        const aria = `aria-label="${esc(s.label)}"`;
        let input;
        switch (kind) {
          case "textarea":
            input = `<textarea rows="${s.rows || 2}" data-sub="${s.key}" ${aria} placeholder="${esc(s.placeholder || "")}">${esc(v ?? "")}</textarea>`;
            break;
          case "number":
            input = `<input type="number" min="0" data-sub="${s.key}" ${aria} value="${esc(v ?? "")}">`;
            break;
          case "select": {
            const cur = v ?? s.default ?? "";
            input = `<select data-sub="${s.key}" ${aria}>${optionsOf(s).map(([k, l]) => `<option value="${esc(k)}"${k === cur ? " selected" : ""}>${esc(l)}</option>`).join("")}</select>`;
            break;
          }
          case "checks":
            input = `<div class="checks">${optionsOf(s).map(([k, l]) => `<label class="check"><input type="checkbox" data-sub="${s.key}" value="${esc(k)}"${(v || []).includes(k) ? " checked" : ""}><span>${esc(l)}</span></label>`).join("")}</div>`;
            break;
          default:
            input = `<input type="text" data-sub="${s.key}" ${aria} value="${esc(v ?? "")}" placeholder="${esc(s.placeholder || "")}">`;
        }
        const wide = s.wide || kind === "textarea" || kind === "checks";
        return `<div class="sub${wide ? " wide" : ""}"><span class="sub-label">${esc(s.label)}</span>${input}</div>`;
      })
      .join("");
    return `<div class="row">${subs}<div class="row-tools"><button type="button" class="btn icon sm" data-row="up" aria-label="위로">↑</button><button type="button" class="btn icon sm" data-row="down" aria-label="아래로">↓</button><button type="button" class="btn icon sm" data-row="del" aria-label="이 줄 삭제">✕</button></div></div>`;
  }

  function attachmentSectionHTML() {
    const newNote = ed.isNew ? "<p class=\"fld-hint\">첫 파일을 올리면 위의 ID가 고정됩니다. 저장하지 않고 닫으면 올린 파일도 함께 지워집니다.</p>" : "";
    return `
      <section class="att-editor" id="att-section">
        <h3 class="form-h">사진·영상·파일</h3>
        <div class="dropzone" id="dropzone">
          <p><b>사진·영상·파일을 여기로 끌어오기</b> 또는 <label class="linklike">파일 선택<input type="file" id="att-input" multiple hidden></label></p>
          <p class="fld-hint">사진·영상은 본문에 썸네일로, hwp·docx·pdf 같은 문서는 첨부 파일로 표시. 여러 개 한 번에 가능, 파일당 ${fmtSize(state.maxUpload)}까지</p>
        </div>
        ${newNote}
        <div class="att-link">
          <input type="url" id="att-url" placeholder="큰 영상은 유튜브·드라이브 링크로 https://" aria-label="링크 주소">
          <input type="text" id="att-url-name" placeholder="이름 (선택)" aria-label="링크 이름">
          <button type="button" class="btn sm" id="att-url-add">링크 추가</button>
        </div>
        <ul class="att-list" id="att-list"></ul>
      </section>`;
  }

  function renderEditorForm() {
    const form = $("#editor-form");
    let html = '<div class="form-error" id="form-error" hidden></div>';
    if (ed.mode === "record") {
      const prefix = T.types[ed.type].prefix;
      html += ed.isNew
        ? `<div class="fld"><label class="fld-label" for="f-id">ID</label><input id="f-id" type="text" value="${esc(ed.draft.id)}" data-id spellcheck="false" autocomplete="off"><p class="fld-hint" id="f-id-hint">${esc(prefix)}-로 시작하는 영문 대문자·숫자. 저장 후에는 바뀌지 않음 (첨부 폴더 이름으로 사용)</p></div>`
        : `<div class="fld"><span class="fld-label">ID</span><p class="fld-static"><code>${esc(ed.draft.id)}</code></p></div>`;
      html += `<button type="button" class="att-jump" data-jump-att>${icon.image}<span>사진·영상·파일 추가</span><small>${ed.draft.attachments.length ? `${ed.draft.attachments.length}개 첨부됨` : "아래 첨부 칸으로 이동"}</small></button>`;
    }
    html += currentFields().map((f) => fieldHTML(f, f.key ? getPath(ed.draft, f.key) : undefined)).join("");
    form.innerHTML = html;
    renderAttList();
    setMsg("");
    bindDropzone();
  }

  /* ---------- 첨부 목록 ---------- */
  function attPreview(a) {
    if (a._progress !== undefined) return `<span class="att-thumb loading" data-progress-text>${Math.round(a._progress * 100)}%</span>`;
    const t = thumbOf(a);
    if (t) return `<span class="att-thumb"><img src="${esc(t)}" alt="" loading="lazy">${a.type !== "image" ? `<i class="play-sm">${icon.play}</i>` : ""}</span>`;
    if (a.type === "video") return `<span class="att-thumb"><video src="${esc(src(a.path))}#t=0.5" preload="metadata" muted></video><i class="play-sm">${icon.play}</i></span>`;
    if (a.type === "link") return `<span class="att-thumb e-link">${icon.link}</span>`;
    const ext = extOf(a.name || a.path);
    return `<span class="att-thumb e-${EXT_CLASS[ext] || "etc"}">${esc((ext || "file").toUpperCase().slice(0, 4))}</span>`;
  }

  function renderAttList() {
    const list = $("#att-list");
    if (!list) return;
    const atts = ed.draft.attachments;
    const jumpNote = $("#editor-form [data-jump-att] small");
    if (jumpNote) jumpNote.textContent = atts.length ? `${atts.length}개 첨부됨` : "아래 첨부 칸으로 이동";
    if (!atts.length) {
      list.innerHTML = '<li class="att-empty">아직 첨부한 파일이 없습니다.</li>';
      return;
    }
    const typeLabel = (a) => ({ image: "사진", video: "영상", file: "파일", link: youtubeId(a.url) ? "유튜브" : "링크" })[a.type] || "파일";
    list.innerHTML = atts
      .map((a, i) => {
        const uploading = a._progress !== undefined;
        return `
        <li class="att-item" data-key="${esc(a._key || "")}">
          ${attPreview(a)}
          <div class="att-meta">
            <p class="att-name"><span class="badge shared">${typeLabel(a)}</span> ${esc(a.name || a.url || "")} <span class="muted">${fmtSize(a.size)}</span></p>
            ${uploading ? `<progress max="1" value="${a._progress}"></progress>` : `<input type="text" class="att-cap" data-cap="${i}" value="${esc(a.caption || "")}" placeholder="설명 (선택, 썸네일 아래 표시)" aria-label="설명">`}
          </div>
          ${uploading ? "" : `<div class="att-tools"><button type="button" class="btn icon sm" data-att="up" data-i="${i}" aria-label="앞으로">↑</button><button type="button" class="btn icon sm" data-att="down" data-i="${i}" aria-label="뒤로">↓</button><button type="button" class="btn icon sm" data-att="del" data-i="${i}" aria-label="첨부 빼기">✕</button></div>`}
        </li>`;
      })
      .join("");
  }

  function updateProgress(item, p) {
    item._progress = p;
    const li = $("#att-list")?.querySelector(`[data-key="${item._key}"]`);
    if (!li) return;
    const bar = li.querySelector("progress");
    if (bar) bar.value = p;
    const text = li.querySelector("[data-progress-text]");
    if (text) text.textContent = `${Math.round(p * 100)}%`;
  }

  function videoThumb(file) {
    return new Promise((resolve) => {
      let finished = false;
      const url = URL.createObjectURL(file);
      const v = document.createElement("video");
      const done = (blob) => {
        if (finished) return;
        finished = true;
        URL.revokeObjectURL(url);
        resolve(blob);
      };
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.addEventListener("loadeddata", () => { v.currentTime = Math.min(1, (v.duration || 3) / 3); }, { once: true });
      v.addEventListener("seeked", () => {
        try {
          const w = Math.min(960, v.videoWidth || 960);
          const h = Math.round(((v.videoHeight || 540) * w) / (v.videoWidth || 960));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(v, 0, 0, w, h);
          canvas.toBlob((b) => done(b), "image/jpeg", 0.82);
        } catch {
          done(null);
        }
      }, { once: true });
      v.addEventListener("error", () => done(null), { once: true });
      setTimeout(() => done(null), 15000);
      v.src = url;
    });
  }

  /* 새 항목은 첫 업로드 때 ID를 확정·고정 (첨부 폴더 이름이 되므로) */
  function uploadId() {
    if (!ed.isNew) return ed.draft.id;
    const input = $("#f-id");
    const prefix = T.types[ed.type].prefix;
    const id = input.value.trim().toUpperCase();
    if (!new RegExp(`^${prefix}-[A-Z0-9][A-Z0-9-]{0,40}$`).test(id)) {
      toast(`ID를 ${prefix}-01처럼 먼저 정해 주세요`, 3000);
      input.focus();
      return "";
    }
    if (byId[id]) {
      toast(`${id}는 이미 있는 ID입니다. 다른 ID로 바꿔 주세요`, 3000);
      input.focus();
      return "";
    }
    input.value = id;
    input.readOnly = true;
    $("#f-id-hint").textContent = "첨부 파일을 올려서 ID가 고정되었습니다.";
    ed.draft.id = id;
    return id;
  }

  async function addFiles(fileList) {
    const id = uploadId();
    if (!id) return;
    for (const file of [...fileList]) {
      if (file.size > state.maxUpload) {
        toast(`${file.name}: ${fmtSize(state.maxUpload)} 초과. 유튜브·드라이브 링크로 첨부해 주세요`, 4000);
        continue;
      }
      const item = { type: kindOf(file.name), name: file.name, size: file.size, _progress: 0, _key: Math.random().toString(36).slice(2) };
      ed.draft.attachments.push(item);
      ed.dirty = true;
      renderAttList();
      try {
        const att = await api.upload(file, id, file.name, (p) => updateProgress(item, p));
        ed.uploads.add(att.path);
        if (att.type === "video") {
          updateProgress(item, 1);
          const blob = await videoThumb(file);
          if (blob) {
            try {
              const thumb = await api.upload(blob, id, `${att.name}.thumb.jpg`);
              att.thumb = thumb.path;
              ed.uploads.add(thumb.path);
            } catch { /* 썸네일 없이 진행 */ }
          }
        }
        Object.keys(item).forEach((k) => delete item[k]);
        Object.assign(item, att, { caption: "" });
      } catch (e) {
        ed.draft.attachments.splice(ed.draft.attachments.indexOf(item), 1);
        toast(`${file.name}: ${e.message}`, 4000);
      }
      renderAttList();
    }
  }

  function addLink() {
    const url = $("#att-url").value.trim();
    if (!/^https?:\/\//i.test(url)) {
      toast("http:// 또는 https://로 시작하는 주소를 넣어 주세요");
      return;
    }
    const yt = youtubeId(url);
    const name = $("#att-url-name").value.trim() || (yt ? "YouTube 영상" : url.replace(/^https?:\/\//, "").slice(0, 60));
    ed.draft.attachments.push({ type: "link", url, name, caption: "" });
    $("#att-url").value = "";
    $("#att-url-name").value = "";
    ed.dirty = true;
    renderAttList();
  }

  function removeAttachment(i) {
    const a = ed.draft.attachments[i];
    ed.draft.attachments.splice(i, 1);
    const sessionFiles = [];
    for (const p of [a.path, a.thumb].filter(Boolean)) {
      if (ed.uploads.has(p)) {
        ed.uploads.delete(p);
        sessionFiles.push(p);
      } else {
        ed.removed.add(p);
      }
    }
    if (sessionFiles.length) api.post("/api/delete-files", { paths: sessionFiles }).catch(() => {});
    ed.dirty = true;
    renderAttList();
  }

  function moveItem(arr, i, d) {
    const j = i + d;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  function bindDropzone() {
    const zone = $("#dropzone");
    if (!zone) return;
    ["dragenter", "dragover"].forEach((t) => zone.addEventListener(t, (e) => { e.preventDefault(); zone.classList.add("over"); }));
    ["dragleave", "drop"].forEach((t) => zone.addEventListener(t, () => zone.classList.remove("over")));
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
    });
  }

  /* ---------- 값 읽기·저장 ---------- */
  function readField(wrap, f) {
    const el = wrap.querySelector("[data-in]");
    switch (f.kind) {
      case "number": return el.value === "" ? null : Number(el.value);
      case "select": return el.value;
      case "tags": return el.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
      case "lines": return el.value.split("\n").map((s) => s.trim()).filter(Boolean);
      case "checks": return [...wrap.querySelectorAll("input[type=checkbox]:checked")].map((i) => i.value);
      case "period": {
        const g = (k) => wrap.querySelector(`[data-p="${k}"]`).value.trim();
        return { start: g("start"), end: g("end"), note: g("note") };
      }
      case "objlist": return [...wrap.querySelectorAll(":scope > .rows > .row")].map((row) => readRow(row, f)).filter(Boolean);
      default: return el.value.trim();
    }
  }

  function readRow(row, f) {
    const obj = {};
    for (const s of f.sub) {
      const kind = s.kind || "text";
      if (kind === "checks") {
        const v = [...row.querySelectorAll(`[data-sub="${s.key}"]:checked`)].map((i) => i.value);
        if (v.length) obj[s.key] = v;
        continue;
      }
      const v = row.querySelector(`[data-sub="${s.key}"]`).value.trim();
      if (v === "") continue;
      if (kind === "number") obj[s.key] = Number(v);
      else if (!(s.omitDefault && v === s.default)) obj[s.key] = v;
    }
    const hasContent = f.sub.some((s) => !["select", "checks"].includes(s.kind || "text") && obj[s.key] !== undefined);
    return hasContent ? obj : null;
  }

  function collect() {
    const form = $("#editor-form");
    const draft = ed.draft;
    if (ed.mode === "record" && ed.isNew) draft.id = form.querySelector("[data-id]").value.trim().toUpperCase();
    for (const f of currentFields()) {
      if (!f.key) continue;
      const wrap = form.querySelector(`.fld[data-key="${CSS.escape(f.key)}"]`);
      if (wrap) setPath(draft, f.key, readField(wrap, f));
    }
    if (ed.mode === "record") {
      draft.attachments = draft.attachments
        .filter((a) => a._progress === undefined)
        .map((a) => {
          const out = { ...a };
          if (!out.caption) delete out.caption;
          return out;
        });
      if (draft.type === "award" && !draft.project_ref) delete draft.project_ref;
    }
    return draft;
  }

  function setMsg(text) { $("#editor-msg").textContent = text; }

  function showError(err) {
    const box = $("#form-error");
    box.hidden = false;
    box.innerHTML = `<b>${esc(err.message)}</b>${err.details?.length ? `<ul>${err.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}`;
    $("#editor-form").scrollTop = 0;
  }

  function setBusy(on, msg = "") {
    ed.busy = on;
    ["#editor-save", "#editor-delete", "#editor-cancel"].forEach((s) => ($(s).disabled = on));
    setMsg(msg);
  }

  async function saveEditor() {
    if (ed.busy) return;
    if (ed.draft.attachments?.some((a) => a._progress !== undefined)) {
      toast("업로드가 끝난 뒤에 저장해 주세요");
      return;
    }
    const draft = collect();
    $("#form-error").hidden = true;
    setBusy(true, "저장 중…");
    try {
      const res = ed.mode === "profile"
        ? await api.post("/api/save-profile", { profile: draft })
        : await api.post("/api/save", { record: draft, original_id: ed.isNew ? null : ed.originalId, delete_files: [...ed.removed] });
      setData(res.bundle);
      ed.uploads.clear();
      ed.removed.clear();
      ed.dirty = false;
      renderAll();
      const warns = res.warnings || [];
      const note = warns.length ? ` · 확인할 것 ${warns.length}건: ${warns[0].replace(/^[^ ]+ /, "")}` : "";
      await closeEditor(true);
      toast(`저장했습니다${note}`, warns.length ? 4200 : 2000);
      if (draft.id) setTimeout(() => document.getElementById(draft.id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    } catch (e) {
      showError(e);
    } finally {
      setBusy(false, ed.open ? "" : "");
    }
  }

  async function closeEditor(force = false) {
    if (!ed.open) return;
    if (!force && ed.dirty && !confirm("저장하지 않은 변경 내용이 있습니다. 닫을까요?")) return;
    if (ed.uploads.size) {
      try { await api.post("/api/delete-files", { paths: [...ed.uploads] }); } catch { /* 무시 */ }
      ed.uploads.clear();
    }
    ed.open = false;
    showEditor(false);
  }

  async function deleteRecord() {
    if (!ed.originalId) return;
    if (!confirm(`${ed.draft.title || ed.originalId} 항목을 삭제할까요? 첨부 파일도 함께 지워집니다.`)) return;
    setBusy(true, "삭제 중…");
    try {
      const res = await api.post("/api/delete-record", { id: ed.originalId, type: ed.type });
      state.selected.delete(ed.originalId);
      setData(res.bundle);
      ed.uploads.clear();
      ed.dirty = false;
      await closeEditor(true);
      renderAll();
      toast("삭제했습니다");
    } catch (e) {
      showError(e);
    } finally {
      setBusy(false);
    }
  }

  function bindEditor() {
    const form = $("#editor-form");
    form.addEventListener("submit", (e) => e.preventDefault());
    form.addEventListener("input", (e) => {
      ed.dirty = true;
      const cap = e.target.closest("[data-cap]");
      if (cap) ed.draft.attachments[Number(cap.dataset.cap)].caption = cap.value;
    });
    form.addEventListener("change", (e) => {
      ed.dirty = true;
      if (e.target.id === "att-input" && e.target.files.length) {
        addFiles(e.target.files);
        e.target.value = "";
      }
    });
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.id === "att-url") { e.preventDefault(); addLink(); }
    });
    form.addEventListener("click", (e) => {
      if (e.target.closest("[data-jump-att]")) return jumpToDropzone();
      const addRow = e.target.closest("[data-add-row]");
      if (addRow) {
        const f = currentFields().find((x) => x.key === addRow.dataset.addRow);
        const rows = addRow.parentElement.querySelector(":scope > .rows");
        rows.insertAdjacentHTML("beforeend", rowHTML(f, {}));
        rows.lastElementChild.querySelector("input, textarea")?.focus();
        ed.dirty = true;
        return;
      }
      const rowBtn = e.target.closest("[data-row]");
      if (rowBtn) {
        const row = rowBtn.closest(".row");
        const act = rowBtn.dataset.row;
        if (act === "del") row.remove();
        else if (act === "up" && row.previousElementSibling) row.parentElement.insertBefore(row, row.previousElementSibling);
        else if (act === "down" && row.nextElementSibling) row.parentElement.insertBefore(row.nextElementSibling, row);
        ed.dirty = true;
        return;
      }
      const attBtn = e.target.closest("[data-att]");
      if (attBtn) {
        const i = Number(attBtn.dataset.i);
        if (attBtn.dataset.att === "del") removeAttachment(i);
        else {
          moveItem(ed.draft.attachments, i, attBtn.dataset.att === "up" ? -1 : 1);
          ed.dirty = true;
          renderAttList();
        }
        return;
      }
      if (e.target.closest("#att-url-add")) addLink();
    });
    $("#editor-save").addEventListener("click", saveEditor);
    $("#editor-cancel").addEventListener("click", () => closeEditor());
    $("#editor-close").addEventListener("click", () => closeEditor());
    $("#editor-backdrop").addEventListener("click", () => closeEditor());
    $("#editor-delete").addEventListener("click", deleteRecord);
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && ed.open) {
        e.preventDefault();
        saveEditor();
      }
    });
    // 편집 중 드롭존 밖에 파일을 떨어뜨려도 브라우저가 파일을 열지 않게
    ["dragover", "drop"].forEach((t) => window.addEventListener(t, (e) => { if (ed.open && !e.target.closest?.("#dropzone")) e.preventDefault(); }));
    window.addEventListener("beforeunload", (e) => {
      if (ed.open && (ed.dirty || ed.uploads.size)) {
        e.preventDefault();
        e.returnValue = "";
      }
    });
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

    document.addEventListener("click", async (e) => {
      const view = e.target.closest("[data-view]");
      if (view) return openViewer(view.dataset.view, Number(view.dataset.index));
      const edit = e.target.closest("[data-edit]");
      if (edit) return openRecordEditor(byId[edit.dataset.edit].type, edit.dataset.edit, edit.dataset.jump === "att");
      const add = e.target.closest("[data-add]");
      if (add) return openRecordEditor(add.dataset.add);
      if (e.target.closest("[data-edit-profile]")) return openProfileEditor();
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        if (await copyText(copy.dataset.copy)) toast(`${copy.dataset.copy} 복사`);
        return;
      }
      if (e.target.closest("#reset-filter")) {
        state.q = "";
        state.tag = "";
        $("#q").value = "";
        renderSide();
        renderSections();
      }
    });
    document.addEventListener("change", (e) => {
      const pick = e.target.closest("[data-pick]");
      if (!pick) return;
      const id = pick.dataset.pick;
      if (pick.checked) state.selected.add(id);
      else state.selected.delete(id);
      pick.closest(".card")?.classList.toggle("is-selected", pick.checked);
      renderExtract();
    });

    // 크게 보기
    const dlg = $("#viewer");
    $("#viewer-close").addEventListener("click", () => dlg.close());
    $("#viewer-prev").addEventListener("click", () => stepViewer(-1));
    $("#viewer-next").addEventListener("click", () => stepViewer(1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => { $("#viewer-stage").innerHTML = ""; });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") stepViewer(-1);
      if (e.key === "ArrowRight") stepViewer(1);
    });

    // 추출
    $("#open-extract").addEventListener("click", () => openDrawer(true));
    $("#close-extract").addEventListener("click", () => openDrawer(false));
    $("#drawer-backdrop").addEventListener("click", () => openDrawer(false));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || dlg.open) return;
      if (ed.open) closeEditor();
      else if ($("#drawer").classList.contains("open")) openDrawer(false);
    });
    $("#target").addEventListener("change", (e) => { state.target = e.target.value; renderExtract(); });
    document.querySelectorAll('input[name="detail"]').forEach((r) => r.addEventListener("change", (e) => { state.detail = e.target.value; renderExtract(); }));
    document.querySelectorAll('input[name="fmt"]').forEach((r) => r.addEventListener("change", (e) => { state.fmt = e.target.value; renderExtract(); }));
    $("#with-profile").addEventListener("change", (e) => { state.withProfile = e.target.checked; renderExtract(); });
    $("#copy").addEventListener("click", async () => { if (await copyText($("#output").value)) toast("추출 결과 복사"); });
    $("#download").addEventListener("click", () => {
      const tgt = P.targets.find((t) => t.id === state.target);
      const name = `${P.profile.name}_${tgt ? tgt.company : "포트폴리오"}_${state.detail}.${state.fmt === "md" ? "md" : "txt"}`;
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
  renderAll();
  bind();
  bindEditor();
  detectEditMode();
})();
