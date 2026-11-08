# Stock Analyzer: a daily, rules-based brief

Every weekday morning before the market opens, this repository pulls free public data
from the web, scores every stock in the NIFTY 200 plus your own watchlist,
checks whether the overall market is worth being in, and publishes a ranked
brief with a concrete action, a stop-loss and a position size for each name,
plus a short list of "Today's picks" and the backtested evidence behind that
rule. The dashboard (`index.html`) renders it on your phone or laptop.

**What it is:** a disciplined screener plus a news digest. It tells you which
names on your list have trend, momentum, relative strength, volume and headlines
lined up, and how much to risk if you act.

**What it is not:** a prediction engine. Nothing here forecasts prices. Its job
is to stop you buying stretched stocks, averaging down into broken ones, or
sizing a trade so large that one loss hurts. Treat every "Accumulate" as a
candidate to research, not an order to place.

## Quick start

```bash
python3 analyze.py            # live run: scores the universe, writes data/latest.json and a dated archive
python3 backtest.py           # optional: refresh the evidence panel (data/backtest.json)
python3 -m http.server 8080   # then open http://localhost:8080/
```

No dependencies beyond Python 3.11+. The dashboard loads `data/latest.json`.
To preview the layout without network access, `python3 analyze.py --offline`
writes a synthetic `data/sample-brief.json` (clearly labelled, never committed)
that the dashboard falls back to when no live brief exists yet.

## Make it daily (3 steps)

1. Push this repository to GitHub. The cron in
   `.github/workflows/daily-stock-brief.yml` runs at 08:45 IST Monday to
   Friday on the default branch and commits the brief back to the repo.
2. Turn on GitHub Pages for the repo (Settings, Pages, deploy from branch, root).
   The dashboard is then live at `https://<user>.github.io/<repo>/`.
3. Optional: add an `ANTHROPIC_API_KEY` repository secret. The workflow then
   asks Claude for a short pre-market narrative that cross-checks the scores
   against the headlines. Without the key the brief is still complete.

You can also trigger a run any time from the Actions tab (workflow_dispatch).
Dated archives are pruned after `keep_archive_days` (default 60) so the repo
stays small.

## How a stock is scored (0 to 100)

| Component | Max | What earns points |
|---|---|---|
| Trend | 30 | Price above the 50-day and 200-day averages, 50 above 200, 20-day average rising |
| Momentum | 25 | RSI(14) in the 45 to 65 band (full marks), MACD histogram positive and rising |
| Relative strength | 15 | 60-day return versus the benchmark (NIFTY 50 by default), +10% beats it for full marks |
| Volume | 10 | Above-average volume on an up day confirms; heavy volume on a down day scores zero |
| News | 20 | Recency-weighted sentiment of the last week's headlines from a finance lexicon |

Score bands map to actions: **Accumulate** (70+), **Hold / add on dips**
(55 to 69), **Watch** (40 to 54), **Avoid / reduce** (below 40). Two things
override the band:

- **Risk flags** such as RSI above 70 or price more than 2 ATR above the 20-day
  average downgrade Accumulate to Hold. Strong stocks are often the worst
  entries on the day they look strongest.
- **Market regime.** The benchmark's position against its 50 and 200-day
  averages, its 20-day return and the volatility index classify the tape as
  risk-on (full exposure), neutral (60%) or risk-off (25%). In risk-off, no
  stock gets an Accumulate; the best setups become starter-size holds.

## Deep dive: the six-part Wall Street breakdown

`deepdive.py` runs the six classic analyst prompts (full breakdown, financials,
valuation, competitors, risk map, chart read) for one ticker, but with the
"[PASTE DATA]" parts filled automatically:

| Prompt asks for | What the pipeline supplies |
|---|---|
| Latest filings and multiple periods | Four fiscal years and five quarters of revenue, margins, EPS, cash flow, debt, cash, equity and share count from Yahoo's fundamentals feed, with growth, margins, net debt, ROE, interest cover and dilution derived |
| P/E, EV/EBITDA, P/S, FCF yield, history and peers | Multiples computed from price times shares; the same multiples reconstructed at each past fiscal year-end; a peer table with identical metrics (banks switch to P/E, P/B, ROE) |
| 3 to 5 competitors | The `peers` list in `watchlist.json`, or `--peers A,B,C` |
| Price and volume data | 26 weekly bars, 20 daily bars, moving averages, RSI, MACD, ATR, swing support and resistance, 52-week range, volume trend |
| Recent earnings and catalysts | Three Google News searches: results, company news, outlook and analyst views |

```bash
python3 deepdive.py RELIANCE.NS          # with ANTHROPIC_API_KEY: Claude answers all six, saved as a report
python3 deepdive.py HDFCBANK.NS --no-ai  # without: the six prompts, pre-filled with real data, for any assistant
python3 -m http.server 8080              # then open report.html?symbol=RELIANCE.NS
```

Each run writes `data/deepdive/<SYMBOL>.json` (data pack plus report),
`<SYMBOL>-prompts.md`, and updates `index.json` so the dashboard card shows a
"Deep dive" link. The "Deep dive" GitHub Action runs it on demand for any
symbol. The report page always shows the data each answer was given, so you
can check the model against the numbers.

Known gaps: Yahoo's feed is not the filing. It lacks segment revenue, order
books, NPAs and management commentary, and quarterly cash flow is often empty
for Indian companies. For banks, "revenue" follows Yahoo's definition, not NII.

## Position sizing

Each card shows a stop 2 ATR below the close and a quantity sized so that
hitting the stop loses `risk_per_trade_pct` of your capital (default 1%),
capped at `max_position_pct` of capital in one name (default 10%). Change
capital in the dashboard and the quantities recompute. Change the defaults in
`watchlist.json`.

## Universe, watchlist and "Today's picks"

- **Universe** (`universe.json`, about 220 NIFTY 200 symbols): every name is
  priced and scored daily, concurrently, in well under a minute. Headlines are
  fetched only for the top `news_top_n` (default 30) by price-only score plus
  your watchlist, to stay polite to the news feed; other names score the news
  component as neutral and the card says so. Constituents change twice a year;
  a symbol that stops resolving is logged under `errors`, not fatal. Swap the
  file for NIFTY 100 or 500 if you want a narrower or wider net.
- **Watchlist** (`stocks` in `watchlist.json`): your own names. Always scored,
  always get headlines, marked with a star, and filterable with "My stocks".
- **Today's picks:** up to five names that pass a stricter rule than the score
  alone: score 65+, price above a 50-day average that is itself above the
  200-day, RSI 45 to 68, not extended, no bad-news cluster, not lagging the
  index over 60 days, and average daily turnover above `min_turnover` (₹10 Cr).
  Each shows an entry zone (20-day average to close), a 2 ATR stop, a 2R target
  and a quantity for your capital. In a risk-off regime the list is empty by
  design; in neutral it tells you to halve size.

This is a screen, not a forecast. Which is why the next section exists.

## Backtest: what the score has been worth

`backtest.py` re-scores every universe stock at monthly points over the last
four years with the same price rules (news excluded) and measures the next 20
and 60 trading days against NIFTY. Results land in `data/backtest.json` and the
headline numbers appear above the picks. A weekly GitHub Action refreshes it.

Read it honestly: the picks rule has shown a modest positive tilt with a hit
rate only a little above a coin flip, which means a few strong winners carry
the average. The sample uses today's constituents (survivorship bias flatters
it), ignores costs, and the windows overlap. It is enough to justify the rule
as a filter and the stop as non-negotiable; it is not enough to size up.

Yahoo Finance symbols: NSE is `TICKER.NS`, BSE is `TICKER.BO`, US is the plain
ticker. For a US set-up use `"market": "US"`, `"benchmark": "^GSPC"`,
`"volatility_index": "^VIX"` and a US universe file. The `news` field is the
phrase searched on Google News.

## Data sources and their limits

- **Prices:** Yahoo Finance chart API, end-of-day, typically delayed. Free and
  keyless, but unofficial. If Yahoo changes or rate-limits, the run records the
  error per symbol and the dashboard shows it. `errors` in the JSON lists them.
- **Headlines:** Google News RSS, last 7 days per name. Sentiment is a word
  lexicon, which is blunt: it cannot tell "profit falls less than feared" from
  bad news. The optional Claude narrative exists to add that judgement.
- **No fundamentals yet.** Valuation, earnings dates, promoter pledges and
  institutional flows are not in the score. An earnings release can invalidate
  a technical setup overnight. Check the calendar before acting.
- **No backtest.** The weights are sensible defaults, not optimised. Expect
  the signal to be modest; the value is in the discipline and the sizing.

## Tests

```bash
python3 -m unittest discover -s tests -v
```

## Disclaimer

This tool is for information and education. It is not investment advice, and
nothing in it is a recommendation to buy or sell any security. Markets can
move against every signal here. You alone are responsible for your decisions.
