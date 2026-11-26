/* Renders every section from window.PORTFOLIO (data.js). No dependencies. */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- small SVG library ---------- */
  const SVG = {
    laurel: '<svg viewBox="0 0 28 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M22 38C10 34 4 24 6 8"/><path d="M6 8c4 1 7 4 8 8-4 1-7-1-8-8zM5 16c4 0 7 2 9 6-4 2-8 0-9-6zM6 24c4-1 7 1 10 4-3 3-8 2-10-4zM9 31c3-2 7-1 10 1-2 4-7 4-10-1z"/></svg>',
    play: "&#9654;",
    chart: '<svg viewBox="0 0 200 120" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 100 L50 70 L80 85 L120 40 L150 55 L190 15"/><path d="M150 15h40v40" opacity=".6"/><g opacity=".35"><path d="M10 110h180"/><path d="M10 10v100"/></g><g fill="#fff" stroke="none"><circle cx="120" cy="40" r="4"/><circle cx="190" cy="15" r="4"/></g></svg>',
    card: '<svg viewBox="0 0 200 130" fill="none" stroke="#fff" stroke-width="3"><rect x="10" y="15" width="180" height="100" rx="12"/><path d="M10 45h180" stroke-width="12" opacity=".6"/><rect x="28" y="80" width="50" height="12" rx="3" opacity=".7"/><circle cx="160" cy="88" r="10" opacity=".7"/><circle cx="146" cy="88" r="10" opacity=".7"/></svg>',
    shield: '<svg viewBox="0 0 160 190" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"><path d="M80 8 150 34v56c0 44-32 78-70 92C42 168 10 134 10 90V34z"/><path d="M80 30 128 48v42c0 30-22 54-48 64-26-10-48-34-48-64V48z" opacity=".5"/><path d="M52 96l18 18 40-44" stroke-width="5"/></svg>',
  };

  /* ---------- state ---------- */
  let profile = null;
  let audioCtx = null;

  /* ============================================================
     Intro ("tudum")
     ============================================================ */
  function buildIntro() {
    const name = D.name.toUpperCase();
    const accent = Math.min(2, name.replace(/\s/g, "").length - 1); // third letter glows red
    let k = 0;
    $("intro-name").innerHTML = [...name].map((ch, i) => {
      if (ch === " ") return '<span style="width:.3em"></span>';
      const cls = k === accent ? ' class="is-accent"' : "";
      k++;
      return `<span style="--i:${i}"${cls}>${esc(ch)}</span>`;
    }).join("");
    $("intro-tag").textContent = D.tagline;
  }

  function playIntro(withSound, then) {
    const intro = $("intro");
    intro.classList.remove("is-done");
    intro.setAttribute("aria-hidden", "false");
    // restart CSS animations
    const clone = intro.cloneNode(true);
    intro.replaceWith(clone);
    clone.querySelector("#intro-skip").addEventListener("click", finish);
    if (withSound) tudum();
    const t = setTimeout(finish, reduced ? 400 : 3600);
    let done = false;
    function finish() {
      if (done) return; done = true; clearTimeout(t);
      clone.classList.add("is-done");
      clone.setAttribute("aria-hidden", "true");
      then && then();
    }
  }

  /* A short two-note sting synthesised with the Web Audio API.
     Only ever started from a click, so it plays reliably. */
  function tudum() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtx, now = ctx.currentTime;
      const notes = [[0, 110, .9], [.45, 73.42, 1.8]]; // A2 then D2
      notes.forEach(([at, f, dur]) => {
        [1, 2, 3].forEach((h, i) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = i === 0 ? "sawtooth" : "sine"; o.frequency.value = f * h;
          g.gain.setValueAtTime(0, now + at);
          g.gain.linearRampToValueAtTime(.18 / (i + 1), now + at + .03);
          g.gain.exponentialRampToValueAtTime(.0001, now + at + dur);
          o.connect(g).connect(ctx.destination); o.start(now + at); o.stop(now + at + dur + .05);
        });
      });
    } catch (e) { /* audio is optional */ }
  }

  /* ============================================================
     Who's watching
     ============================================================ */
  function buildProfiles() {
    $("profiles-grid").innerHTML = D.profiles.map((p) => `
      <button class="profile" type="button" data-id="${esc(p.id)}">
        <span class="profile__tile" style="background:linear-gradient(160deg, ${esc(p.color)}, #0b0b0b 140%)">
          ${p.kind === "photo" ? `<img src="${esc(D.photo)}" alt=""><span class="ribbon">Main</span>` : esc(p.glyph)}
        </span>
        <span class="profile__name">${esc(p.name)}</span>
        <span class="profile__blurb">${esc(p.blurb)}</span>
      </button>`).join("");
    $("profiles-note").textContent = `Every profile watches the same true story of ${D.name}. It only changes what plays first.`;
    $("profiles-grid").addEventListener("click", (e) => {
      const b = e.target.closest(".profile"); if (!b) return;
      chooseProfile(b.dataset.id);
    });
  }

  function showProfiles() {
    const p = $("profiles");
    p.hidden = false; p.classList.remove("is-leaving");
    $("app").hidden = true;
    window.scrollTo(0, 0);
  }

  function chooseProfile(id) {
    profile = D.profiles.find((p) => p.id === id) || D.profiles[0];
    try { sessionStorage.setItem("portfolio.profile", profile.id); } catch (e) {}
    const p = $("profiles");
    p.classList.add("is-leaving");
    setTimeout(() => { p.hidden = true; }, reduced ? 0 : 500);
    $("app").hidden = false;
    applyProfile();
    window.scrollTo(0, 0);
  }

  function applyProfile() {
    const av = $("nav-avatar");
    av.innerHTML = profile.kind === "photo" ? `<img src="${esc(D.photo)}" alt="">` : esc(profile.glyph);
    av.style.background = profile.kind === "photo" ? "" : profile.color;
    $("profile-hint").textContent = `Watching as ${profile.name} · ${profile.blurb}`;
    renderEpisodes();
    renderPicks();
  }

  /* ============================================================
     Rails: horizontal rows with arrows
     ============================================================ */
  function wrapRails() {
    document.querySelectorAll("[data-rail]").forEach((rail) => {
      const wrap = document.createElement("div"); wrap.className = "rail-wrap";
      rail.parentNode.insertBefore(wrap, rail); wrap.appendChild(rail);
      const mk = (dir) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = `rail-arrow rail-arrow--${dir}`; b.innerHTML = dir === "prev" ? "&#8249;" : "&#8250;";
        b.setAttribute("aria-label", dir === "prev" ? "Scroll back" : "Scroll forward");
        b.addEventListener("click", () => rail.scrollBy({ left: (dir === "prev" ? -1 : 1) * rail.clientWidth * .8, behavior: "smooth" }));
        wrap.appendChild(b); return b;
      };
      const prev = mk("prev"), next = mk("next");
      const update = () => {
        prev.disabled = rail.scrollLeft < 8;
        next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8;
      };
      rail.addEventListener("scroll", update, { passive: true });
      new ResizeObserver(update).observe(rail);
      rail._update = update;
    });
  }

  /* ============================================================
     Hero + episodes
     ============================================================ */
  function renderHero() {
    document.title = `${D.name} · ${D.tagline}`;
    ["nav-initial", "hero-initial", "outro-initial"].forEach((id) => { $(id).textContent = D.initial; });
    $("hero-img").src = D.photo; $("hero-img").alt = D.name;
    const name = D.name.toUpperCase();
    const accent = 2;
    let k = 0;
    $("hero-title").innerHTML = [...name].map((ch) => {
      if (ch === " ") return " ";
      const out = k === accent ? `<span class="is-accent">${esc(ch)}</span>` : esc(ch); k++; return out;
    }).join("");
    $("hero-tagline").textContent = D.tagline;
    $("hero-meta").innerHTML = [`<span class="match">${esc(D.hero.match)}</span>`]
      .concat(D.hero.badges.map((b, i) => i === 0 ? `<span class="badge">${esc(b)}</span>` : `<span>${esc(b)}</span>`))
      .join('<span class="dot"></span>');
    $("hero-role").textContent = D.role;
    $("hero-summary").textContent = D.hero.summary;
    $("hero-stat").innerHTML = `${esc(D.hero.stat.label)}<strong>${esc(D.hero.stat.value)}</strong>`;
    $("play-intro").addEventListener("click", () => playIntro(true));
  }

  function renderEpisodes() {
    const first = profile ? profile.first : null;
    const list = D.episodes.slice().sort((a, b) => (a.id === first ? -1 : b.id === first ? 1 : 0));
    $("episodes-rail").innerHTML = list.map((e, i) => `
      <button class="ep ${i === 0 ? "is-first" : ""}" type="button" data-target="${esc(e.id)}">
        <span class="ep__art art art--${esc(e.theme)}"></span>
        <span class="ep__play">${SVG.play}</span>
        <span class="ep__n">Episode ${esc(e.n)}</span>
        <span class="ep__title">${esc(e.title)}</span>
        <span class="ep__sub">${esc(e.sub)}</span>
        <span class="ep__bar" style="--p:${i === 0 ? 65 : 10 + i * 12}%"><i></i></span>
      </button>`).join("");
    $("episodes-rail")._update && $("episodes-rail")._update();
  }

  /* ============================================================
     Resume
     ============================================================ */
  function renderResume() {
    const r = D.resume;
    const item = (x) => `<div class="paper__item"><span class="when">${esc(x.when || "")}</span><strong>${esc(x.title)}</strong><span class="sub">${esc(x.sub || "")}</span>${x.bullets ? `<ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}</div>`;
    $("paper").innerHTML = `
      <div class="paper__head">
        <div><div class="paper__name">${esc(r.fullName)}</div></div>
        <div class="paper__contact">${r.contact.map(esc).join("<br>")}</div>
      </div>
      <div>
        <h4>Education</h4>${r.education.map(item).join("")}
        <h4>Work Experience</h4>${r.experience.map(item).join("")}
        <h4>Projects</h4>${r.projects.map(item).join("")}
      </div>
      <div>
        <h4>Skills</h4><div class="paper__kv">${r.skills.map((s) => `<div><b>${esc(s.label)}:</b> ${esc(s.items)}</div>`).join("")}</div>
        <h4>Certifications</h4><p style="margin:0">${esc(r.certifications)}</p>
        <h4>Achievements</h4><ul style="padding-left:14px;list-style:disc">${r.achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
      </div>`;
    $("resume-view").href = D.resumeUrl; $("resume-download").href = D.resumeUrl; $("hero-resume").href = D.resumeUrl === "#" ? "#resume" : D.resumeUrl;
    $("resume-stats").innerHTML = r.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("");
  }

  /* ============================================================
     Moments + certifications
     ============================================================ */
  function renderMoments() {
    $("moments-rail").innerHTML = D.moments.map((m) => `
      <article class="moment">
        <span class="moment__tag">${esc(m.tag)}</span>
        <span class="laurel">${SVG.laurel}<span class="laurel__r">${SVG.laurel}</span></span>
        <h3 class="moment__title">${esc(m.title)}</h3>
        <span class="moment__org">${esc(m.org)}</span>
        <p class="moment__text">${esc(m.text)}</p>
        ${m.link ? `<a class="moment__link" href="${esc(m.link)}" target="_blank" rel="noopener">View certificate ↗</a>` : ""}
      </article>`).join("");
    $("cert-title").textContent = `Certified · ${D.certifications.length} credentials`;
    const issuers = [...new Set(D.certifications.map((c) => c.issuer))];
    $("issuers").innerHTML = issuers.map((i) => `<span>${esc(i)}</span>`).join("");
    $("certs-rail").innerHTML = D.certifications.map((c, i) => `
      <a class="cert" href="${esc(c.link || "#")}" ${c.link && c.link !== "#" ? 'target="_blank" rel="noopener"' : ""}>
        <span class="cert__issuer">${esc(c.issuer)}<small>#${String(i + 1).padStart(2, "0")}</small></span>
        <span class="cert__title">${esc(c.title)}</span>
      </a>`).join("");
  }

  /* ============================================================
     Skills
     ============================================================ */
  function renderSkills() {
    const cats = $("skill-cats");
    cats.innerHTML = D.skillGroups.map((g, i) => `
      <li><button class="cat ${i === 0 ? "is-active" : ""}" type="button" role="tab" data-i="${i}" aria-selected="${i === 0}">
        <span class="cat__name">${esc(g.name)}</span>
        <span class="cat__sub">${g.skills.length} skills · ${esc(g.sub)}</span>
      </button></li>`).join("");
    cats.addEventListener("click", (e) => {
      const b = e.target.closest(".cat"); if (!b) return;
      cats.querySelectorAll(".cat").forEach((c) => { c.classList.toggle("is-active", c === b); c.setAttribute("aria-selected", c === b); });
      showGroup(+b.dataset.i);
    });
    const grid = $("skill-grid"), used = $("skill-used");
    const palettes = ["#4c1d95,#1e1b4b", "#7f1d1d,#1a0505", "#0c4a6e,#04131c", "#78350f,#1a1003", "#14532d,#02110a", "#3f3f46,#18181b", "#9d174d,#1f0a14"];
    function showGroup(i) {
      const g = D.skillGroups[i];
      used.textContent = "";
      grid.innerHTML = g.skills.map((s, j) => `
        <button class="skill" type="button" style="--i:${j}" data-used="${esc(s.used.join("|"))}" data-name="${esc(s.name)}">
          <span class="skill__mono" style="background:linear-gradient(135deg,${palettes[i % palettes.length]})">${esc(s.mono)}</span>
          ${esc(s.name)}
          ${s.used.length ? `<span class="skill__used">${s.used.length} ✦</span>` : ""}
        </button>`).join("");
    }
    const show = (b) => {
      grid.querySelectorAll(".skill").forEach((x) => x.classList.toggle("is-active", x === b));
      const list = b.dataset.used ? b.dataset.used.split("|") : [];
      used.innerHTML = list.length
        ? `<b>${esc(b.dataset.name)}</b> appears in: ${list.map((p) => `<span class="chip">${esc(p)}</span>`).join(" ")}`
        : `<b>${esc(b.dataset.name)}</b> is not in a shipped Original yet. Coming soon to the series.`;
    };
    grid.addEventListener("mouseover", (e) => { const b = e.target.closest(".skill"); if (b) show(b); });
    grid.addEventListener("click", (e) => { const b = e.target.closest(".skill"); if (b) show(b); });
    grid.addEventListener("focusin", (e) => { const b = e.target.closest(".skill"); if (b) show(b); });
    showGroup(0);
  }

  /* ============================================================
     Projects
     ============================================================ */
  function renderProjects() {
    const rail = $("projects-rail");
    rail.innerHTML = D.projects.map((p) => `
      <article class="project">
        <span class="art art--${esc(p.theme)}"></span>
        <span class="project__icon">${SVG[p.icon] || SVG.chart}</span>
        <span class="project__badge"><span class="nav__n">${esc(D.initial)}</span> Original</span>
        <span class="project__kicker">${esc(p.kicker)}</span>
        <h3 class="project__title">${esc(p.title)}</h3>
        <p class="project__text">${esc(p.text)}</p>
        <div class="project__tags">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <div class="project__actions">
          ${p.link ? `<a class="btn btn--light btn--sm" href="${esc(p.link)}" ${/^https?:/.test(p.link) ? 'target="_blank" rel="noopener"' : ""}>▶&nbsp; View Project</a>` : ""}
          ${p.repo && p.repo !== "#" ? `<a class="btn btn--ghost btn--sm" href="${esc(p.repo)}" target="_blank" rel="noopener">Source ↗</a>` : ""}
        </div>
      </article>`).join("");
    const bar = $("projects-progress");
    const upd = () => { const max = rail.scrollWidth - rail.clientWidth; bar.style.width = (max <= 0 ? 100 : 20 + 80 * rail.scrollLeft / max) + "%"; };
    rail.addEventListener("scroll", upd, { passive: true }); new ResizeObserver(upd).observe(rail); upd();
  }

  /* ============================================================
     About
     ============================================================ */
  function renderAbout() {
    const a = D.about;
    $("about-img").src = D.photo; $("about-img").alt = D.name;
    $("about-name").textContent = D.name;
    $("about-quote").textContent = a.quote;
    $("about-cite").textContent = D.name;
    $("about-facts").innerHTML = a.facts.map((f) => `<div class="fact"><span class="fact__label">${esc(f.label)}</span><span class="fact__value">${esc(f.value)}</span>${f.sub ? `<span class="fact__sub">${esc(f.sub)}</span>` : ""}</div>`).join("");
    $("about-chips").innerHTML = a.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("");
  }

  /* ============================================================
     Journey
     ============================================================ */
  function renderJourney() {
    $("journey-kicker").textContent = `${D.seasons.length} Seasons`;
    const tabs = $("seasons"), panel = $("season-panel");
    tabs.innerHTML = D.seasons.map((s, i) => `<button class="season-tab ${i === 0 ? "is-active" : ""}" type="button" role="tab" data-i="${i}"><small>Season ${esc(s.n)}</small><span>${esc(s.title)}</span></button>`).join("");
    const show = (i) => {
      const s = D.seasons[i];
      tabs.querySelectorAll(".season-tab").forEach((t, j) => t.classList.toggle("is-active", j === i));
      panel.innerHTML = `
        <div class="season__head"><span class="season__n">S${esc(s.n)}</span><h3 class="season__title">${esc(s.title)}</h3><span class="season__when">${esc(s.when)} · ${s.episodes.length} episode${s.episodes.length === 1 ? "" : "s"}</span></div>
        <div class="season__list">${s.episodes.map((e, j) => `
          <article class="epi" style="--i:${j}"><span class="epi__n">E${String(j + 1).padStart(2, "0")}</span><span class="epi__when">${esc(e.when)}</span><div class="epi__title">${esc(e.title)}</div><p class="epi__text">${esc(e.text)}</p></article>`).join("")}</div>`;
    };
    tabs.addEventListener("click", (e) => { const b = e.target.closest(".season-tab"); if (b) show(+b.dataset.i); });
    show(0);
  }

  /* ============================================================
     Top picks
     ============================================================ */
  function renderPicks() {
    $("picks-title").textContent = `${D.shortName}'s Top Picks`;
    const first = profile ? profile.first : null;
    const list = D.picks.slice().sort((a, b) => (a.target === first ? -1 : b.target === first ? 1 : 0));
    $("picks-rail").innerHTML = list.map((p) => `
      <button class="pick" type="button" data-target="${esc(p.target)}">
        <span class="art art--${esc(p.theme)}"></span>
        <span class="pick__ghost">${esc(p.n)}</span>
        <span class="pick__n"><span class="nav__n">${esc(D.initial)}</span> Episode ${esc(p.n)}</span>
        <span class="pick__title">${esc(p.title)}</span>
        <span class="pick__text">${esc(p.text)}</span>
        <span class="pick__tags">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</span>
      </button>`).join("");
    $("picks-rail")._update && $("picks-rail")._update();
  }

  /* ============================================================
     Outro
     ============================================================ */
  function renderOutro() {
    $("outro-name").textContent = D.name;
    $("outro-role").textContent = D.role;
    $("outro-actions").innerHTML = `
      <a class="btn btn--red" href="mailto:${esc(D.email)}">▶&nbsp; Let's Build</a>
      <a class="btn btn--ghost" href="${esc(D.links.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a class="btn btn--ghost" href="${esc(D.links.github)}" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="btn btn--ghost" href="mailto:${esc(D.email)}">Email ↗</a>`;
    $("outro-note").textContent = `© ${new Date().getFullYear()} ${D.name}. ${D.footer.note}`;
    $("nav-contact").href = `mailto:${D.email}`;
    $("watch-again").addEventListener("click", showProfiles);
    $("nav-avatar").addEventListener("click", showProfiles);
    $("replay-intro").addEventListener("click", () => { window.scrollTo({ top: 0 }); playIntro(true); });
  }

  /* ============================================================
     Scroll behaviour: nav, active link, reveal, card targets
     ============================================================ */
  function wireScroll() {
    const nav = $("nav");
    const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const links = [...nav.querySelectorAll(".nav__links a")];
    const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => io.observe(s));

    document.querySelectorAll(".section, .outro").forEach((s) => s.classList.add("reveal"));
    const ro = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach((s) => ro.observe(s));

    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-target]"); if (!b) return;
      const t = $(b.dataset.target); if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  }

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    buildIntro(); buildProfiles();
    renderHero(); renderResume(); renderMoments(); renderSkills(); renderProjects(); renderAbout(); renderJourney(); renderOutro();
    wrapRails(); wireScroll();

    const force = /[?&#]intro/.test(location.href);
    let saved = null; try { saved = sessionStorage.getItem("portfolio.profile"); } catch (e) {}
    if (saved && !force) {
      // returning within the same tab: skip straight to the site
      $("intro").classList.add("is-done");
      chooseProfile(saved);
    } else {
      playIntro(false, showProfiles);
    }
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
