/* CONTROL TOWER · renders from window.CT and drives the scroll-linked line */
(function () {
  "use strict";
  const D = window.CT;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  /* ============================================================ boot */
  function boot() {
    const ticks = $("boot-ticks");
    let t = "";
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI + (i / 10) * Math.PI, r1 = 138, r2 = i % 5 === 0 ? 124 : 130;
      t += `<line x1="${200 + r1 * Math.cos(a)}" y1="${200 + r1 * Math.sin(a)}" x2="${200 + r2 * Math.cos(a)}" y2="${200 + r2 * Math.sin(a)}"/>`;
    }
    ticks.innerHTML = t;
    $("boot-name").textContent = D.name.toUpperCase();
    const lines = ["CONTROL TOWER v2 · CHENNAI", "SUPPLIER NETWORK ........ <b>OK</b>", "SAP EWM · 2 PLANTS ....... <b>LIVE</b>", "BIGQUERY KPI FEED ........ <b>OK</b>", "AUTOMATION CELL .......... <b>17 ACTIVE</b>"];
    const log = $("boot-log");
    const total = reduced ? 300 : 3400;
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      $("boot").classList.add("is-done");
      try { sessionStorage.setItem("ct.booted", "1"); } catch (e) {}
    };
    $("boot-skip").addEventListener("click", finish);
    if (!reduced) {
      lines.forEach((l, i) => setTimeout(() => { log.innerHTML += l + "\n"; }, 250 + i * 330));
      const start = performance.now();
      const num = $("boot-num");
      (function tick(now) {
        const p = clamp((now - start - 300) / 2200, 0, 1);
        num.textContent = Math.round(easeOut(p) * 66);
        if (p < 1 && !done) requestAnimationFrame(tick);
      })(start);
      setTimeout(() => $("boot-name").classList.add("is-in"), 2100);
    }
    setTimeout(finish, total);
  }

  /* ============================================================ nav */
  function nav() {
    $("nav-cv").href = D.cv;
    const el = $("nav");
    const onScroll = () => el.classList.toggle("is-solid", window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const links = [...el.querySelectorAll(".nav__links a")];
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    }), { rootMargin: "-35% 0px -55% 0px" });
    links.forEach((a) => { const s = document.querySelector(a.getAttribute("href")); if (s) io.observe(s); });
    const clock = $("clock");
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tickClock = () => { clock.textContent = `LIVE · CHENNAI ${fmt.format(new Date())} IST`; };
    tickClock(); setInterval(tickClock, 15000);
  }

  /* ============================================================ hero */
  function hero() {
    $("hero-eyebrow").textContent = `${D.role} · ${D.org}`;
    let i = 0;
    $("hero-name").innerHTML = D.name.toUpperCase().split(" ").map((w) =>
      `<span class="w">${[...w].map((ch) => `<span style="--i:${i++}">${esc(ch)}</span>`).join("")}</span>`).join(" ");
    $("hero-tag").textContent = D.tag;
    $("hero-summary").textContent = D.summary;
    $("hero-cv").href = D.cv;
    $("hero-photo").src = D.photo; $("hero-photo").alt = D.name;
    $("plate-role").textContent = D.role.toUpperCase();
    $("kpis").innerHTML = D.kpis.map((k) => `
      <div class="kpi reveal">
        <div class="kpi__value" data-count="${k.value}" data-prefix="${esc(k.prefix || "")}" data-suffix="${esc(k.suffix || "")}" data-dec="${k.decimals || 0}">${esc(k.prefix || "")}0${esc(k.suffix || "")}</div>
        <div class="kpi__label">${esc(k.label)}</div><div class="kpi__note">${esc(k.note)}</div>
      </div>`).join("");
    const items = D.ticker.map((t) => `<span>${esc(t)}</span>`).join("");
    $("ticker").innerHTML = items + items;
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count), dec = +el.dataset.dec, pre = el.dataset.prefix, suf = el.dataset.suffix;
    if (reduced) { el.textContent = pre + target.toFixed(dec) + suf; return; }
    const start = performance.now(), dur = 1400;
    (function tick(now) {
      const p = clamp((now - start) / dur, 0, 1);
      el.textContent = pre + (easeOut(p) * target).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ============================================================ the line */
  const PART_ORDER = ["chassis", "body", "wheels", "paint", "glass", "lights"];
  function line() {
    const track = $("line-track");
    track.innerHTML = D.stations.map((s, i) => `
      <article class="station" data-i="${i}">
        <span class="station__n">${esc(s.n)}</span>
        <div class="station__top"><span class="mono">Station ${esc(s.n)} · ${esc(s.where)}</span></div>
        <h3 class="station__title">${esc(s.title)}</h3>
        <div class="station__meta"><b>${esc(s.when)}</b> · <span class="station__part">Fits: ${esc(s.partName)}</span></div>
        <p class="station__lead">${esc(s.lead)}</p>
        <ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </article>`).join("");

    const section = $("line"), car = $("car"), bar = $("line-bar"), counter = $("line-counter"), partEl = $("line-part"), belt = $("belt");
    const cards = [...track.children];
    const layers = {}; car.querySelectorAll(".car__layer").forEach((l) => { layers[l.dataset.part] = l; });
    const wheels = car.querySelectorAll(".wheel");
    const mobile = () => window.matchMedia("(max-width: 900px)").matches;

    function setActive(idx) {
      cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
      PART_ORDER.forEach((p, i) => { if (layers[p]) layers[p].classList.toggle("is-fitted", i <= idx); });
      car.classList.toggle("is-painted", idx >= PART_ORDER.indexOf("paint"));
      const s = D.stations[Math.max(0, idx)];
      counter.textContent = `STATION ${s.n} / ${String(D.stations.length).padStart(2, "0")}`;
      partEl.textContent = (idx >= 0 ? "Fitting: " : "Next: ") + s.partName;
    }

    let target = 0, current = 0, raf = null, maxShift = 0, activeIdx = -1;
    function measure() {
      const vw = window.innerWidth, last = cards[cards.length - 1];
      maxShift = last.offsetLeft + last.offsetWidth / 2 - vw / 2;
    }
    function compute() {
      const vh = window.innerHeight, rect = section.getBoundingClientRect();
      const p = clamp(-rect.top / (section.offsetHeight - vh), 0, 1);
      target = p * maxShift;
      bar.style.width = (p * 100) + "%";
      if (!raf) raf = requestAnimationFrame(frame);
    }
    function frame() {
      current += (target - current) * (reduced ? 1 : 0.14);
      if (Math.abs(target - current) < 0.5) current = target;
      track.style.transform = `translate3d(${-current}px,0,0)`;
      belt.style.backgroundPosition = `${-current * 0.6}px 0`;
      wheels.forEach((w) => { w.style.transform = `rotate(${current * 0.5}deg)`; });
      const vw = window.innerWidth; let best = -1, bestD = Infinity;
      cards.forEach((c, i) => { const cx = c.offsetLeft + c.offsetWidth / 2 - current; const d = Math.abs(cx - vw / 2); if (d < bestD) { bestD = d; best = i; } });
      if (bestD > vw * 0.45) best = -1;
      if (best !== activeIdx) { activeIdx = best; setActive(best); }
      raf = current === target ? null : requestAnimationFrame(frame);
    }

    function desktop() {
      measure(); compute();
      window.addEventListener("scroll", compute, { passive: true });
      window.addEventListener("resize", () => { measure(); compute(); });
    }
    function phone() {
      track.style.transform = ""; belt.style.backgroundPosition = "";
      const io = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) { const i = +en.target.dataset.i; if (i > activeIdx || true) { activeIdx = i; setActive(i); } }
      }), { rootMargin: "-40% 0px -45% 0px" });
      cards.forEach((c) => io.observe(c));
    }
    setActive(-1);
    if (mobile()) phone(); else desktop();
  }

  /* ============================================================ BOM */
  function bom() {
    const cats = ["All", ...new Set(D.bom.map((b) => b.cat))];
    $("bom-filters").innerHTML = cats.map((c, i) => `<button class="chip ${i === 0 ? "is-active" : ""}" type="button" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    const body = $("bom-body");
    body.innerHTML = D.bom.map((b) => `
      <tr class="is-stagger" data-cat="${esc(b.cat)}" data-used="${esc(b.used.join(" "))}">
        <td class="pn">${esc(b.pn)}</td><td class="desc">${esc(b.desc)}</td><td class="cat">${esc(b.cat)}</td>
        <td><div class="qty"><span class="qty__track">${[1,2,3,4,5].map((n) => `<i class="${n <= b.qty ? "on" : ""}"></i>`).join("")}</span><b>${b.qty}/5</b></div></td>
        <td><div class="used">${b.used.length ? b.used.map((u) => `<span>${esc(u)}</span>`).join("") : "<em>—</em>"}</div></td>
      </tr>`).join("");
    const rows = [...body.children];
    $("bom-filters").addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $("bom-filters").querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === b));
      rows.forEach((r) => r.classList.toggle("is-hidden", b.dataset.cat !== "All" && r.dataset.cat !== b.dataset.cat));
    });
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return; io.disconnect();
      rows.forEach((r, i) => setTimeout(() => r.classList.remove("is-stagger"), reduced ? 0 : i * 45));
    }), { threshold: .1 });
    io.observe(body);
    body.addEventListener("mouseover", (e) => { const r = e.target.closest("tr"); if (r) hot(r.dataset.used.split(" ").filter(Boolean)); });
    body.addEventListener("mouseleave", () => hot([]));
  }
  function hot(ids) { document.querySelectorAll(".wo").forEach((w) => w.classList.toggle("is-hot", ids.includes(w.dataset.id))); }

  /* ============================================================ work orders */
  function work() {
    $("work-cards").innerHTML = D.workOrders.map((w) => `
      <article class="wo reveal" data-id="${esc(w.id)}">
        <div class="wo__top"><span class="mono wo__id">${esc(w.id)}</span><span class="mono wo__status ${w.status === "Side project" ? "is-side" : w.status === "Delivered" ? "is-done" : ""}"><i></i>${esc(w.status)}</span></div>
        <h3 class="wo__title">${esc(w.title)}</h3>
        <div class="wo__stack">${esc(w.stack)}</div>
        <p class="wo__text">${esc(w.text)}</p>
        ${w.hrs ? `<div class="wo__hrs"><strong>≈ ${w.hrs}</strong><span>hrs / week returned</span></div>` : ""}
        ${w.link ? `<a class="wo__link" href="${esc(w.link)}" target="_blank" rel="noopener">Source ↗</a>` : ""}
      </article>`).join("");
    const withHrs = D.workOrders.filter((w) => w.hrs).sort((a, b) => b.hrs - a.hrs);
    const max = withHrs[0].hrs;
    $("meters").innerHTML = withHrs.map((w) => `
      <div class="meter"><div class="meter__name"><span>${esc(w.title)}</span><small>${esc(w.id)}</small></div>
      <div class="meter__track"><i data-w="${(w.hrs / max) * 100}"></i></div><div class="meter__val">${w.hrs} h</div></div>`).join("");
    $("meters-total").textContent = withHrs.reduce((s, w) => s + w.hrs, 0) + " h";
    const t = D.takt; $("takt-title").textContent = t.label;
    $("takt").innerHTML = [t.before, t.after].map((r) => `
      <div class="meter"><div class="meter__name"><span>${esc(r.name)}</span></div>
      <div class="meter__track"><i data-w="${(r.hours / t.before.hours) * 100}"></i></div><div class="meter__val">${r.hours} h</div></div>`).join("");
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return; en.target.querySelectorAll("[data-w]").forEach((i, k) => setTimeout(() => { i.style.width = i.dataset.w + "%"; }, k * 80)); io.unobserve(en.target);
    }), { threshold: .3 });
    io.observe($("meters")); io.observe($("takt"));
  }

  /* ============================================================ routes */
  function routes() {
    const W = 1000, H = 520;
    const proj = (lat, lon) => [((lon + 100) / 240) * W, ((65 - lat) / 110) * H];
    const svg = $("map");
    let g = "";
    for (let lon = -100; lon <= 140; lon += 20) { const [x] = proj(0, lon); g += `<line class="grat ${lon % 60 === 0 ? "grat--major" : ""}" x1="${x}" y1="0" x2="${x}" y2="${H}"/>`; }
    for (let lat = -40; lat <= 60; lat += 20) { const [, y] = proj(lat, 0); g += `<line class="grat ${lat === 0 ? "grat--major" : ""}" x1="0" y1="${y}" x2="${W}" y2="${y}"/>`; }
    const byId = Object.fromEntries(D.nodes.map((n) => [n.id, n]));
    let r = "";
    D.routes.forEach((rt) => {
      const a = byId[rt.from], b = byId[rt.to];
      const [x1, y1] = proj(a.lat, a.lon), [x2, y2] = proj(b.lat, b.lon);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dist = Math.hypot(x2 - x1, y2 - y1);
      const cy = my - dist * 0.22, cx = mx;
      r += `<path class="route route--${rt.kind}" d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}"/>`;
    });
    const labelOff = { chn: [14, 22], pe: [14, 4], kr: [-14, -10], us: [14, -12] };
    let n = "";
    D.nodes.forEach((nd) => {
      const [x, y] = proj(nd.lat, nd.lon);
      const rad = nd.kind === "hub" ? 7 : 5;
      n += `<g class="node node--${nd.kind}">${nd.kind === "hub" ? `<circle class="ring" cx="${x}" cy="${y}" r="10"/>` : ""}<circle cx="${x}" cy="${y}" r="${rad}"/>`;
      if (nd.kind !== "next") {
        const [dx, dy] = labelOff[nd.id] || [12, 4], anchor = dx < 0 ? "end" : "start";
        n += `<text class="label" x="${x + dx}" y="${y + dy}" text-anchor="${anchor}">${esc(nd.name)}</text><text class="label label--sub" x="${x + dx}" y="${y + dy + 13}" text-anchor="${anchor}">${esc(nd.sub)}</text>`;
      }
      n += `</g>`;
    });
    const eu = D.nodes.filter((x) => x.kind === "next");
    const [ex, ey] = proj(52, 12);
    n += `<g class="node node--next"><line x1="${ex}" y1="${ey - 8}" x2="${ex - 40}" y2="${ey - 44}" stroke="var(--green)" stroke-width="1" opacity=".6"/>
      <text class="label" x="${ex - 44}" y="${ey - 48}" text-anchor="end">Next destination</text>
      <text class="label label--sub" x="${ex - 44}" y="${ey - 35}" text-anchor="end">${eu.map((e) => esc(e.name)).join(" · ")}</text></g>`;
    svg.innerHTML = g + r + n;
    svg.querySelectorAll(".route").forEach((p) => p.style.setProperty("--len", p.getTotalLength()));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { svg.classList.add("is-in"); io.disconnect(); } }), { threshold: .3 });
    io.observe(svg);
    $("manifest").innerHTML = D.nodes.map((nd) => `<li class="is-${nd.kind} reveal"><i></i><b>${esc(nd.name)}</b><small>${esc(nd.sub)}</small></li>`).join("");
  }

  /* ============================================================ shift log */
  function log() {
    const list = $("log-list");
    list.innerHTML = `<i class="log__fill" id="log-fill"></i>` + D.log.map((l) => `
      <li class="${l.now ? "is-now" : ""}"><span class="log__when">${esc(l.when)}</span><h3 class="log__title">${esc(l.title)}</h3><p class="log__text">${esc(l.text)}</p></li>`).join("");
    const items = [...list.querySelectorAll("li")];
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -30% 0px" });
    items.forEach((li) => io.observe(li));
    const fill = $("log-fill");
    const upd = () => { const r = list.getBoundingClientRect(); fill.style.height = clamp(window.innerHeight * 0.65 - r.top, 0, r.height - 12) + "px"; };
    window.addEventListener("scroll", upd, { passive: true }); upd();
  }

  /* ============================================================ dispatch */
  function dispatch() {
    $("dispatch-meta").innerHTML = ["<b>60-day</b> notice", "<b>EU Blue Card</b> eligible", "Relocation: <b>DE · NL · LU · PL</b>", "Based in <b>Chennai, India</b>"].map((s) => `<span>${s}</span>`).join("");
    $("dispatch-actions").innerHTML = `
      <a class="btn btn--amber" href="mailto:${esc(D.email)}">Email ${esc(D.email)}</a>
      <a class="btn btn--ghost" href="${esc(D.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a class="btn btn--ghost" href="${esc(D.github)}" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="btn btn--ghost" href="${esc(D.cv)}" download>Download CV</a>`;
    $("foot").textContent = `© ${new Date().getFullYear()} ${D.name} · Control Tower is a personal portfolio · Built without frameworks`;
  }

  /* ============================================================ reveals */
  function reveals() {
    document.querySelectorAll(".section__head > *, .section__head, .dispatch__card, .table-wrap, .panel, .map-wrap").forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      en.target.querySelectorAll("[data-count]").forEach(countUp);
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    }), { threshold: .15 });
    document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 6) * 60 + "ms"; io.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    nav(); hero(); line(); bom(); work(); routes(); log(); dispatch(); reveals();
    let booted = false; try { booted = !!sessionStorage.getItem("ct.booted"); } catch (e) {}
    if (booted && !/[?&#]boot/.test(location.href)) $("boot").classList.add("is-done"); else boot();
  });
})();
