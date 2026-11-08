#!/usr/bin/env python3
"""
Backtest of the price-only part of the daily score, across the universe.

Answers "does a high score mean anything?" with numbers instead of claims.
At every ~monthly point over the last four years, each stock is scored with the
same trend / momentum / relative-strength / volume rules the daily brief uses
(news is excluded: historical headlines are not available), and its return over
the next 20 and 60 trading days is compared with the benchmark.

Outputs data/backtest.json with results by score bucket and for the
"Today's picks" rule, plus caveats. index.html shows the headline numbers next
to the picks.

Usage:
  python3 backtest.py                # universe from watchlist.json, writes data/backtest.json
  python3 backtest.py --years 3 --step 21

Caveats (also written into the output):
  * survivorship bias: today's constituents, so companies that collapsed and left
    the index are missing, which flatters every bucket;
  * no costs, slippage or taxes; returns are close-to-close on adjusted prices;
  * overlapping windows, so the sample is less independent than n suggests;
  * the news component (20 of 100 points) is not tested.
"""
from __future__ import annotations

import argparse
import concurrent.futures as cf
import datetime as dt
import json
import math
import statistics
import sys
from pathlib import Path

import analyze as A

HERE = Path(__file__).resolve().parent
BUCKETS = [("0-39", 0, 40), ("40-54", 40, 55), ("55-69", 55, 70), ("70-100", 70, 101)]
NEUTRAL = {"score": 0.0, "n": 0, "pos": 0, "neg": 0, "neu": 0}


def arrays(h: dict) -> dict:
    c, hi, lo, v = h["close"], h["high"], h["low"], [float(x) for x in h["volume"]]
    _, _, hist = A.macd(c)
    return {"c": c, "v": v, "s20": A.sma(c, 20), "s50": A.sma(c, 50), "s200": A.sma(c, 200),
            "rsi": A.rsi(c), "hist": hist, "atr": A.atr(hi, lo, c), "v20": A.sma(v, 20)}


def ind_at(a: dict, i: int) -> dict:
    c = a["c"]
    at = lambda xs, j: xs[j] if 0 <= j < len(xs) else None  # noqa: E731
    atr, s20 = at(a["atr"], i), at(a["s20"], i)
    rets = [math.log(c[j] / c[j - 1]) for j in range(max(1, i - 19), i + 1)]
    rv = None
    if len(rets) >= 10:
        m = sum(rets) / len(rets)
        rv = math.sqrt(sum((r - m) ** 2 for r in rets) / (len(rets) - 1)) * math.sqrt(252) * 100
    return {
        "close": c[i], "sma20": s20, "sma50": at(a["s50"], i), "sma200": at(a["s200"], i),
        "sma20_slope_pct": A.pct(s20, at(a["s20"], i - 5)),
        "rsi14": at(a["rsi"], i), "macd_hist": at(a["hist"], i), "macd_hist_prev": at(a["hist"], i - 1),
        "atr14": atr, "ret_60d_pct": A.pct(c[i], at(c, i - 60)), "change_1d_pct": A.pct(c[i], at(c, i - 1)),
        "vol_ratio": (a["v"][i] / at(a["v20"], i)) if at(a["v20"], i) else None,
        "realized_vol_20d": rv, "ext_atr": ((c[i] - s20) / atr) if (atr and s20) else None,
    }


def price_only_score(ind: dict, bench_ind: dict) -> tuple[float, list[str], float | None]:
    sc = A.score_stock(ind, NEUTRAL, bench_ind)
    # News contributes a fixed neutral 10 of 100 when absent; rescale the other 80 to 100.
    return round((sc["score"] - 10.0) * 100.0 / 80.0, 1), sc["flags"], sc["rel_60d_pct"]


def summarize(rows: list[dict]) -> dict:
    if not rows:
        return {"n": 0}
    def stats(key):
        xs = [r[key] for r in rows if r[key] is not None]
        if not xs:
            return None
        return {"mean": round(statistics.fmean(xs), 2), "median": round(statistics.median(xs), 2),
                "hit_rate": round(100 * sum(1 for x in xs if x > 0) / len(xs), 1), "n": len(xs)}
    return {"n": len(rows), "excess_20d": stats("ex20"), "excess_60d": stats("ex60"),
            "abs_20d": stats("abs20"), "abs_60d": stats("abs60")}


def run(watchlist: Path, out: Path, years: int, step: int, workers: int) -> dict:
    cfg = json.loads(watchlist.read_text())
    _, uni = A.load_universe(cfg, watchlist)
    symbols = list(dict.fromkeys([e["symbol"] for e in cfg["stocks"]] + uni))
    rng = f"{years}y" if years <= 5 else "10y"
    print(f"fetching {rng} history for {len(symbols)} symbols + {cfg['benchmark']} ...", file=sys.stderr)
    bench = A.fetch_yahoo_history(cfg["benchmark"], rng)
    bidx = {d: i for i, d in enumerate(bench["dates"])}
    ba = arrays(bench)

    def fetch(sym):
        try:
            return sym, A.fetch_yahoo_history(sym, rng)
        except Exception as e:  # noqa: BLE001
            print(f"  ! {sym}: {e}", file=sys.stderr)
            return sym, None

    rows: list[dict] = []
    per_symbol = 0
    with cf.ThreadPoolExecutor(max_workers=workers) as ex:
        for sym, h in ex.map(fetch, symbols):
            if not h or len(h["close"]) < 320:
                continue
            per_symbol += 1
            a = arrays(h)
            c, dates = h["close"], h["dates"]
            for i in range(260, len(c) - 60, step):
                bi = bidx.get(dates[i])
                if bi is None or bi + 60 >= len(bench["close"]) or bi < 60:
                    continue
                ind = ind_at(a, i)
                bind = {"ret_60d_pct": A.pct(bench["close"][bi], bench["close"][bi - 60])}
                score, flags, rel = price_only_score(ind, bind)
                b20 = A.pct(bench["close"][bi + 20], bench["close"][bi]); b60 = A.pct(bench["close"][bi + 60], bench["close"][bi])
                r20 = A.pct(c[i + 20], c[i]); r60 = A.pct(c[i + 60], c[i])
                rows.append({"sym": sym, "date": dates[i], "score": score,
                             "pick": A.pick_eligible(ind, flags, score, rel),
                             "abs20": r20, "abs60": r60, "ex20": r20 - b20, "ex60": r60 - b60})
    if not rows:
        raise SystemExit("no rows: check network or universe")

    by_bucket = {}
    for name, lo, hi in BUCKETS:
        by_bucket[name] = summarize([r for r in rows if lo <= r["score"] < hi])
    picks = [r for r in rows if r["pick"]]
    years_covered = sorted({r["date"][:4] for r in rows})
    by_year = {y: summarize([r for r in picks if r["date"].startswith(y)]) for y in years_covered}
    result = {
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        "benchmark": cfg["benchmark"], "symbols": per_symbol, "observations": len(rows),
        "from": min(r["date"] for r in rows), "to": max(r["date"] for r in rows), "step_days": step,
        "all": summarize(rows),
        "by_bucket": by_bucket,
        "pick_rule": summarize(picks),
        "pick_rule_by_year": by_year,
        "pick_rule_share_pct": round(100 * len(picks) / len(rows), 1),
        "caveats": [
            "Survivorship bias: today's index constituents only; failures that left the index are missing, which flatters results.",
            "No transaction costs, slippage or taxes; close-to-close on adjusted prices.",
            "Overlapping windows: observations are not independent, so treat n as generous.",
            "News (20 of 100 points) is excluded; scores here are the price-only 80 points rescaled to 100.",
            "A positive average excess return with a hit rate near 50% means a few big winners carry the result.",
        ],
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, indent=1))
    return result


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--watchlist", default=str(HERE / "watchlist.json"))
    ap.add_argument("--out", default=str(HERE / "data" / "backtest.json"))
    ap.add_argument("--years", type=int, default=5)
    ap.add_argument("--step", type=int, default=21, help="trading days between observations")
    ap.add_argument("--workers", type=int, default=6)
    a = ap.parse_args(argv)
    r = run(Path(a.watchlist), Path(a.out), a.years, a.step, a.workers)
    print(json.dumps({k: r[k] for k in ("symbols", "observations", "from", "to", "all", "by_bucket", "pick_rule", "pick_rule_share_pct")}, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
