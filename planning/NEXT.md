# Tomorrow's plan — 2026-09-07

Tracked objects, in priority order (per `prompts/00-daily-review.md`).
Process-integrity item first.

0. **Process integrity — one clean night confirmed under the corrected
   merge logic, watch continues.** Last night's PR (#192) opened and
   merged within about 90 seconds the same session, right after the
   17-PR backlog (#175-#191) was cleared. `main` is current and no new
   PR is stuck tonight. One data point is not resolution — keep
   verifying each night that the current PR merges (or, if it doesn't,
   that `unstable` vs. `dirty`/`blocked` is being read correctly) before
   treating this as closed. Three asks remain open and unanswered in
   `#nexus`: (a) fix or retire the `nexus` Vercel project's failing
   check (open since 08-21, 16 days); (b) auto-merge for planning PRs
   (open since 08-09, 28 days) — less urgent procedurally now that the
   merge logic is fixed, but still unanswered; (c) the deposit-crediting
   bug below (16 days, financially live).
1. **Deposit-crediting bug — live, unresolved, 16 days.**
   `/api/v1/deposits/scan` on production has been hitting `RPC
   getTransaction HTTP 429` on the same three stuck Solana signatures
   and completing with `credited:0` every 2-minute run since
   2026-08-21. Any on-chain USDC deposit landing in this window is very
   likely not being credited. Needs Dennis's decision on the RPC
   provider/rate limit, not another nightly re-check.
2. **Launch readiness** (`marketing/token-launch-checklist.md`): the
   T-14 / T-48h / T-0 steps still describe Solana tooling (pump.fun,
   Squads, Solscan, Bubblemaps Solana) and need a rewrite pass for the
   Uniswap v4 / Robinhood Chain venue — 38 days unpicked since the
   2026-07-30 re-venue. Reusable building blocks already merged: #156
   (wallet connect, chain IDs 46630/4663), #160 (`/live` chain reads),
   #162 (trustless vault enumeration).
3. **Rienda M1-M5**: last report 2026-07-31 (spec complete; token +
   Uniswap v4 fee-burn hook contracts, 26 passing tests; M1 in
   development). Now 37 days stale — keep asking Dennis directly for a
   fresh status.
4. **Health checks — still egress-blocked, 38th consecutive confirmed
   night** on `nexus.vdmnexus.com`, `verify.vdmnexus.com`, and
   `www.vdmnexus.com` (proxy `connect_rejected` on all three, confirmed
   directly tonight). Needs Dennis's call: allowlist these hosts for
   the scheduled session's egress policy, or move health checks
   elsewhere.
5. **Standing blocked items**: #106 (cards-v1 spec, 105 days) —
   merge-or-close decision. #95 (Polymarket agent, 106 days) — blocked
   on Spanish counsel. Legal memo — status-tracking only (email
   drafted, awaiting Dennis send). May manual-submission backlog — one
   line, no more.

## Process watch

The 2026-09-05 session cleared a seventeen-PR backlog (#175-#191) caused
by treating `mergeable_state: unstable` as unmergeable, and fixed the
underlying logic. Tonight (2026-09-06) is the first full night under the
fix with a clean result: this session's own PR merged in under two
minutes. Continue watching for a few more nights — including a night
where the `nexus` Vercel check is still failing — before calling this
resolved rather than one good data point.
