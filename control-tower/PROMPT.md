# Build prompt: "Control Tower" portfolio

Use this prompt to reproduce the Control Tower portfolio with any AI coding
assistant or hand it to a developer. Replace the bracketed facts with your own.

---

Build me a single-page personal portfolio website called **Control Tower**, themed
as an automotive assembly line meets a supply chain control tower. Plain HTML, CSS
and vanilla JavaScript only: no frameworks, no build step, no dependencies, so it
runs from a folder and deploys on GitHub Pages. All content must live in one file,
`data.js`, exposed as `window.CT`, and every section renders from it.

**Who it is for.** [Saravanan B], [Supply Chain Analyst] at [Ford Global Technical
& Business Center, Chennai]. [8] years across supply chain management, packaging
development, procurement and process automation. [17] automation tools in
production (VBA, Power Automate, SQL/BigQuery, Alteryx). Business-side owner of an
[SAP EWM rollout for 2 plants]. [$0.7M] packaging savings. Open to relocation to
[Germany, Netherlands, Luxembourg, Poland], [EU Blue Card eligible], [60-day notice].

**Visual system.** Industrial dark. Background #0a0c10 with a faint 48px grid,
panels #10141b, text #e9edf2, muted #96a0b0. One accent: andon amber #ffb000, with
signal green #2ee59d for "OK" states and red #ff4d4f only for tail lamps and brake
calipers. Fonts: Barlow Condensed for headlines (uppercase, tight), Barlow for body,
IBM Plex Mono for labels, part numbers and status text. Hazard-stripe accents
(amber/black 135° repeating gradient) on the belt edge, the photo plate and the
footer top. Respect `prefers-reduced-motion`: every animation collapses to its end
state.

**Sections, in order.**

1. **Boot sequence** (full-screen overlay, ~3.5s, skippable, plays once per tab).
   An instrument-cluster arc with ticks; the needle sweeps while a number counts
   from 0 to [66] over the label "HRS / WK RETURNED". Beneath it a monospace log
   types five lines: "CONTROL TOWER v2 · [CHENNAI]", "SUPPLIER NETWORK … OK",
   "SAP EWM · 2 PLANTS … LIVE", "BIGQUERY KPI FEED … OK", "AUTOMATION CELL … 17
   ACTIVE". Then the name fades up in condensed caps. Fade out to the page.

2. **Nav.** Fixed. "CT" monogram in an amber box + "CONTROL TOWER". Links: The
   Line, BOM, Work Orders, Routes, Shift Log, Dispatch. Right side: a pulsing green
   dot with a live clock "LIVE · CHENNAI HH:MM IST" (Asia/Kolkata) and an amber
   "Download CV" button. Nav turns solid with blur after 30px of scroll; active
   link underlines via IntersectionObserver.

3. **Hero.** Left: amber eyebrow "[role] · [org]", the name at clamp(56px, 9vw,
   132px) with each letter rising in from below with a staggered delay, a
   monospace tag line, a 3–4 sentence summary, buttons "Start the line ↓" (amber)
   and "View CV" (ghost). Right: the portrait in a "plate": bordered card, hazard
   stripe across the top, the photo (transparent-background cutout) fading out at
   the bottom, and a monospace ID tag "ID · SCA · CHN | [ROLE]". Behind the hero
   text, a faint blueprint outline of the car (stroke only, ~7% opacity, light blue)
   that draws itself with a stroke-dashoffset animation. Below: a **KPI row** of
   four stat tiles with hero figures that count up when scrolled into view:
   [8 Years in supply chain], [17 Automations in production], [66+ Hours returned
   per week], [$0.7M Packaging savings], each with a one-line note and an amber
   underline that grows in. Then a full-width **andon ticker**: a seamless marquee
   of monospace plant facts separated by amber diamonds.

4. **The Line** (the centrepiece). A section seven viewport-heights tall containing
   a sticky 100vh stage. Scroll progress through the section becomes a horizontal
   translate of a track of six **station cards**, smoothed per frame with a lerp
   (`current += (target - current) * 0.14`). The station nearest the viewport
   centre is active (full opacity, amber border, lifted). A header shows "SEC 01
   THE LINE", "STATION 0X / 06", "Fitting: [part]" and an amber progress bar.
   At the bottom a **conveyor belt** whose rollers move with scroll, with a
   hazard stripe along its top edge.
   On the belt sits a **car drawn in inline SVG as six layers**, each keyed by
   `data-part`, fitted cumulatively as stations are reached:
   - chassis: frame, cross members, coil springs, axles, exhaust with muffler, an
     exposed engine block (visible only before the body goes on)
   - body: sedan side profile with wheel arches, bumpers, door seams, handles,
     wing mirror, fuel cap, grille, character crease; primer grey until painted
   - wheels: tyres, chrome five-spoke rims, hubs, red brake calipers; the wheel
     groups rotate with scroll
   - paint: a state class that swaps the body fill to an amber gradient and adds a
     roof highlight; bumpers and mirror take body colour
   - glass: rear window, door window, windshield with reflection streaks
   - lights: headlamp with a translucent beam cone, daytime running strip, red
     tail lamp, amber lower lamp, indicator; all with a glow filter
   Unfitted layers sit at 10% opacity and slide in from offset positions (body
   from above, wheels from below, glass from above). Each time a new part is
   fitted, ten amber **weld sparks** burst from the roof (CSS keyframes, 0.7s).
   Behind everything a **factory backdrop** SVG that moves at 0.22x the track
   speed for parallax: overhead gantry beam and truss, four hanging lamps with
   soft light cones, steel columns, a mesh panel band, a perspective floor grid,
   and two robot arms that idle-swing on a 6s ease loop.
   The six stations map career phases to parts:
   01 Foundations → Chassis ([B.E. Computer Engineering], [MBA Operations])
   02 [Packaging Engineer, Glovis] → Body shell
   03 [Crisis Sourcing, Ford] → Wheels ("keep the lines rolling")
   04 [Packaging & EWM] → Paint & finish ([$0.7M], [SAP EWM 2 plants])
   05 [Automation Cell] → Glass & electronics ([17 tools], [66 hrs/week])
   06 End of Line → Lights on · PDI passed ("Ready to ship": [Europe targets])
   Each card: station number and site, title, years, "Fits: [part]", one lead
   sentence, three bullets with amber diamond markers, a large ghosted number.
   Under 900px: no pinning. Stations stack vertically and the car becomes a
   sticky header under the nav that builds as cards pass the viewport centre.

5. **Bill of Materials.** Skills as a BOM table: Part No. (monospace amber, e.g.
   AUT-001, DAT-001, BI-001, SYS-001, DOM-001), Description, Category, Qty/5 as a
   five-segment meter, "Where used" as small work-order chips (WO-01 …). Filter
   chips above (All + each category). Rows stagger in when the table enters view.
   Hovering a row highlights the matching work-order cards further down.

6. **Work Orders.** The automation tools as cards: WO id, status dot and label
   (In production = green, Delivered = amber, Side project = blue), condensed
   title, monospace stack line, description, and for tools with a stated figure
   "≈ N hrs / week returned" as a hero number. Sticky right panel with two
   **meter lists** (name, aligned single-hue bar, figure per row, bars animate on
   view): "Hours returned per week" ranked, with a total; and "Validation cycle,
   hours per run": Before · manual [40 h] vs After · VBA tool [1 h].

7. **Route Map.** An SVG on a plain graticule (lon −100…140, lat −45…65, no
   landmasses). Nodes from lat/lon: the hub ([Chennai], white with a pulsing ring),
   delivered programmes ([Struandale SA], [Ulsan], [Dearborn]) in amber, and the
   next destinations ([DE, NL, LU, PL]) in green with one shared callout label.
   Routes are quadratic arcs from the hub: amber ones draw in with
   stroke-dashoffset when in view; green ones are dashed and animate like a
   flight tracker. A legend bottom-left and a manifest list beside the map.
   Behind the whole dispatch card at the end, see section 9.

8. **Shift Log.** Vertical timeline from [2011] to [2026]. Each entry: monospace
   date in amber, condensed title, one line of text. An amber fill line grows down
   the spine with scroll; dots light up as entries enter; the final "Dispatch"
   entry is green.

9. **Dispatch** (footer). A large card with a hazard stripe above it. "SEC 06
   DISPATCH", the headline "READY TO SHIP." at up to 140px, a monospace meta row
   ([60-day] notice · [EU Blue Card] eligible · Relocation [DE · NL · LU · PL] ·
   Based in [Chennai, India]), and buttons: Email (amber), LinkedIn, GitHub,
   Download CV. Behind it, anchored bottom-right, a **port scene** SVG: a gantry
   crane whose trolley slides back and forth carrying a container, stacked
   containers on the quay with a few in amber, a quay edge, water with a drifting
   wave line, and a container ship with a bridge, a red mast light and a gentle
   bob. A left-to-right dark fade keeps the text area clean. Small centred
   footer line: "© year name · Control Tower is a personal portfolio".

**Motion rules.** Scroll-linked work uses requestAnimationFrame and IntersectionObserver,
never scroll-jacking. Section heads and cards reveal with a 26px rise and fade,
staggered 60ms. Hover lifts cards 4px with an amber border. Nothing autoplays sound.

**data.js schema.** `name, role, org, tag, photo, cv, email, linkedin, github,
summary; kpis[{value, prefix?, suffix?, decimals?, label, note}]; ticker[];
stations[{n, part, partName, title, when, where, lead, bullets[]}];
bom[{pn, desc, cat, qty, used[]}]; workOrders[{id, title, stack, hrs|null, text,
status, link?}]; takt{label, before{name, hours}, after{name, hours}};
nodes[{id, name, sub, lat, lon, kind: hub|delivered|next}]; routes[{from, to,
kind}]; log[{when, title, text, now?}]`.

**Deliverables.** `index.html`, `styles.css`, `app.js`, `data.js`,
`assets/portrait.webp` (4:5, background removed), `assets/resume.pdf`,
`assets/favicon.svg`, and a README explaining how to edit `data.js` and run it
with `python3 -m http.server`. Test at 1366px and 390px wide; no horizontal
overflow on mobile; zero console errors.

---

## Companion prompt: the streaming-style version (`portfolio/`)

Build a Netflix-style personal portfolio as a static site rendered from one
`data.js`. Sequence: a "tudum" name intro with glowing condensed letters and a
"THE SERIES" tag; a "Who's watching?" profile picker (Me, Recruiter, Hiring
Manager, Engineer) where the chosen profile reorders the episode row; a hero with
the name at display size, a red accent letter, a match percentage, badges, a
summary, "Play Intro" and "View Resume" buttons, a cut-out portrait fading into
the dark background, and a "Continue Exploring" row of episode cards with
gradient art; then sections framed as a show: "The Full Story" (one-page resume
card with a sticky sidebar and stats), "Top Moments" (gold-laurel award cards)
plus a credentials row, "My Skill Universe" (category tabs; hovering a skill shows
which projects use it), "The Originals" (large project cards with a progress
bar), "About Me" (portrait with red glow, serif pull quote, facts grid), "My
Journey" (season tabs with episode cards), "Top Picks", and a "To Be Continued…"
footer with contact buttons and "Replay opening". Dark #0b0b0b, red #e50914,
Bebas Neue + Inter + Playfair Display. Horizontal rails with hover arrows, scroll
reveals, reduced-motion support, mobile layout. No Netflix logos, trademarks or
audio; the intro sting is synthesised with the Web Audio API on click.
