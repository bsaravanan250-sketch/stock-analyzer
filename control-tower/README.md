# Control Tower

A second portfolio concept, built for an automotive supply chain background.
The page is an assembly line: scrolling moves a vehicle down the line and each
station fits a part (chassis, body, wheels, paint, glass, lights) while telling
one phase of the career. Around it: a KPI row, a Bill of Materials for skills,
work orders for the automation tools, a route map and a shift log.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Edit

All content is in **`data.js`**: identity, KPIs, the ticker, the six stations,
the BOM rows, work orders, map nodes and routes, and the shift log. Photo and CV
live in `assets/`. The car drawing is inline SVG in `index.html`; the part layers
are keyed by `data-part` and listed in `PART_ORDER` in `app.js`.

## Run

```bash
python3 -m http.server 8080      # from the repo root
# open http://localhost:8080/control-tower/
```

Add `?boot` to replay the boot sequence. Within a tab it plays once.

## How the line works

`#line` is seven viewport-heights tall with a sticky 100vh stage inside it. Scroll
progress through the section becomes a horizontal translate of the station track,
smoothed per frame. The station nearest the viewport centre is active, and every
part up to that station is fitted on the car. Under 900px the stations stack
vertically and the car becomes a sticky header that builds as you scroll.

Respects `prefers-reduced-motion`.
