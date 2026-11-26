# Streaming-style portfolio

A single-page developer portfolio styled like a streaming service: a name
"tudum" intro, a *Who's watching?* profile picker, a hero with a
*Continue Exploring* row, and the rest of the site framed as episodes.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Edit your content

Everything on the page comes from **`data.js`**. Open it and replace:

| Field | What it drives |
| --- | --- |
| `name`, `shortName`, `initial`, `tagline`, `role` | Intro, hero, nav logo, footer, "Top Picks" title |
| `photo` | Hero, About and the "Me" profile tile. Drop `assets/portrait.jpg` and point this at it. A portrait around 1200×1500 px with the face in the upper half works best. |
| `email`, `links`, `resumeUrl` | Contact buttons and the resume buttons. Put a PDF at `assets/resume.pdf`. |
| `hero` | Badges, summary and the small stat card (CGPA by default). |
| `profiles` | The four *Who's watching?* tiles. `first` is the section each profile leads with. |
| `episodes` | The *Continue Exploring* cards. `id` must match a section id. |
| `resume` | The one-page resume card. |
| `moments`, `certifications` | *Top Moments* cards and the *Certified* row. |
| `skillGroups` | *My Skill Universe*. `used` lists project titles shown on hover. |
| `projects` | *The Originals*. `icon` is `chart`, `card` or `shield`; `theme` is `crimson`, `gold`, `teal`, `violet` or `ember`. |
| `about`, `seasons`, `picks`, `footer` | About, Journey, Top Picks and the footer note. |

The third letter of the name is highlighted red in the intro and hero. Change
`accent` in `app.js` if you want a different letter.

## Run it locally

```bash
python3 -m http.server 8080      # from the repo root
# open http://localhost:8080/portfolio/
```

Add `?intro` to the URL to force the opening sequence again. Within one tab the
site remembers the chosen profile and skips straight to the page on reload.

## Deploy

GitHub Pages is already set up for this repo's dashboard. Once this branch is
merged, the portfolio is live at `https://<user>.github.io/stock-analyzer/portfolio/`.
To host it on its own domain, copy the `portfolio/` folder into a new
repository and enable Pages there, or drop the folder onto Netlify or Vercel.

## Notes

- Fonts load from Google Fonts (Bebas Neue, Inter, Playfair Display). Without
  network access the page falls back to system fonts.
- The "tudum" sting is synthesised with the Web Audio API and only plays after a
  click (Play Intro, Replay opening). Browsers block autoplayed audio.
- Respects `prefers-reduced-motion`: animations collapse to instant.
- Not affiliated with Netflix. The design borrows the layout pattern only; no
  logos, trademarks or copyrighted audio are used.
