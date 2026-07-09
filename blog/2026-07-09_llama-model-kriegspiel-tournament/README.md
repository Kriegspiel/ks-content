---
title: "Llama models playing Kriegspiel in the dark"
slug: "llama-model-kriegspiel-tournament"
summary: "An in-progress report on Llama model self-play in Berkeley + Any Kriegspiel, with proper outcomes separated from resignations and technical timeouts."
publishedAt: "2026-07-09"
updatedAt: "2026-07-09"
author: "Kriegspiel Team"
tags: ["research", "bots", "llm", "tournament", "berkeley-any"]
draft: true
lifecycle: draft
---

This is an in-progress report. The games are still running, so the tables below are a snapshot, not a final tournament result.

The experiment is simple: let three Llama-family language models play hidden-information chess against each other on the Kriegspiel platform, then count only games that reached an ordinary chess ending. The models were:

| Model label | Platform bot |
| --- | --- |
| Llama 3.1 8B | `llm_llama31_8b` |
| Llama 4 Scout | `llm_llama4_scout` |
| Llama 4 Maverick | `llm_llama4_maverick` |

All archived Llama-vs-Llama games in this snapshot used the `berkeley_any` ruleset: Berkeley Kriegspiel with the `Any?` pawn-capture question enabled.

One unexpectedly good sign is that the bots are not just playing ordinary chess moves in the dark. They do make use of the `Any?` question when it is available, which means the games are exercising a real Kriegspiel rule rather than only a hidden-board version of regular chess.

## Snapshot

Snapshot time: `2026-07-09 13:56 UTC`.

| Pair | Archived games | Proper outcomes | Still needed for 20 proper outcomes |
| --- | ---: | ---: | ---: |
| Llama 4 Maverick vs Llama 4 Scout | 93 | 12 | 8 |
| Llama 4 Maverick vs Llama 3.1 8B | 89 | 8 | 12 |
| Llama 4 Scout vs Llama 3.1 8B | 92 | 2 | 18 |
| Total | 274 | 22 | 38 |

We call an outcome proper when the game ends by checkmate or stalemate/draw. In this snapshot, the proper outcomes are:

| Pair | Checkmates | Stalemates / draws | Proper total |
| --- | ---: | ---: | ---: |
| Llama 4 Maverick vs Llama 4 Scout | 10 | 2 | 12 |
| Llama 4 Maverick vs Llama 3.1 8B | 7 | 1 | 8 |
| Llama 4 Scout vs Llama 3.1 8B | 1 | 1 | 2 |
| Total | 18 | 4 | 22 |

Among proper outcomes, the current score is:

| Pair | Llama 4 Maverick wins | Llama 4 Scout wins | Llama 3.1 8B wins | Draws |
| --- | ---: | ---: | ---: | ---: |
| Llama 4 Maverick vs Llama 4 Scout | 10 | 0 | - | 2 |
| Llama 4 Maverick vs Llama 3.1 8B | 6 | - | 1 | 1 |
| Llama 4 Scout vs Llama 3.1 8B | - | 0 | 1 | 1 |

That makes Maverick the clear early leader among proper outcomes. The important caveat is sample size: Maverick vs Scout has only 12 proper outcomes, Maverick vs 3.1 8B has 8, and Scout vs 3.1 8B has only 2. The direction is visible, but the confidence bands are still wide.

## Why we ignore resignation and timeout

The archive contains many more completed games than proper outcomes:

| End reason | Count |
| --- | ---: |
| Timeout | 174 |
| Resignation | 78 |
| Checkmate | 18 |
| Stalemate | 4 |

Timeouts and resignations are real platform results, but they are not clean chess evidence for this experiment.

Timeout is mostly a technical outcome. It can happen when a bot is delayed by provider API latency, provider overload, process scheduling, or other runtime issues. A timeout tells us something about tournament operations and provider reliability, but it is not the same as one model outplaying another on the board.

Resignation is also operational in these bot-vs-bot games. LLM Kriegspiel games can become extremely long. To keep the tournament moving, bot-vs-bot LLM games receive randomized per-color turn limits in the 128-256 range. When a bot reaches its visible limit, it resigns. This avoids games lasting indefinitely, but it means resignation is partly a length-control mechanism rather than a pure chess conclusion.

For that reason, this report treats only checkmates and stalemates/draws as proper outcomes.

## How the bots are prompted

The Llama bots use the shared `bot-openai-compatible` runtime. The runtime is intentionally conservative: the backend remains the source of truth, and the model never gets to move unless its answer passes local validation against the server-provided action list.

The system prompt contains:

| Prompt part | Purpose |
| --- | --- |
| Role | Tells the model it is playing Kriegspiel. |
| Information boundary | Tells it to use only provided private information and legal actions. |
| Output contract | Requires compact JSON shaped like `{"m":["e2e4","d2d4","ask_any"]}`. |
| Ranking rule | Requires exactly `n` unique entries ordered best to worst. |
| Legality rule | Requires every move entry to match one item in the supplied `moves` list. |
| Ruleset summary | Injects the concise rules summary for the current variant, here Berkeley + Any. |

The user prompt for each turn is a compact JSON snapshot. Its keys are deliberately short:

| Key | Meaning |
| --- | --- |
| `c` | The bot's color. |
| `t` | The side to move. |
| `mn` | Move number. |
| `fen` | The bot's private FEN from the API. |
| `mat` | Public material summary, such as known piece counts. |
| `hist` | Recent scorecard turns from the viewer's perspective. |
| `act` | Possible action kinds, such as `move` or `ask_any`. |
| `moves` | Server-provided legal UCI moves. |
| `n` | Target number of ranked candidates. Normally this is 10, capped by available actions. |
| `res` | CrazyKrieg reserve summary when that ruleset is active. |
| `rej` | Recently rejected candidate actions for the current turn. |
| `fb` | Retry feedback, including rejected moves and fresh referee announcements. |

The `hist` field is the compact scorecard. It carries recent entries for both white and black, but only as visible from the bot's allowed perspective. Depending on the ruleset and perspective, scorecard entries can include move-complete messages, illegal-move rejections, capture announcements, check announcements, pawn-capture question answers, and the move UCI when the server exposes it to that player. The prompt does not expose a hidden omniscient board.

The model is asked for a prioritized move list, not a single move. A typical response is:

```json
{"m":["e2e4","d2d4","g1f3","b1c3","c2c4","f2f4","e2e3","d2d3","g2g3","b2b3"]}
```

The runtime then:

1. Parses the JSON response.
2. Deduplicates the ranked entries.
3. Rejects anything not present in the server-provided legal move list.
4. Tries the remaining candidates in order.
5. Records rejected attempts in `rej`.
6. Adds retry text in `fb`.
7. If the whole batch fails, asks the model for another ranked batch, up to the configured retry limit.
8. Falls back to a deterministic legal action if the model response is malformed, unavailable, or empty.

In the current production configuration, the bot asks for 10 ranked candidates per call when at least 10 actions are available, and can ask for up to 5 batches in a single turn if earlier batches fail.

## What the current result suggests

The cleanest early signal is Maverick's strength in proper games:

| Pair | Proper outcome result |
| --- | --- |
| Maverick vs Scout | Maverick 10 wins, 2 draws, Scout 0 wins |
| Maverick vs Llama 3.1 8B | Maverick 6 wins, Llama 3.1 8B 1 win, 1 draw |
| Scout vs Llama 3.1 8B | Llama 3.1 8B 1 win, 1 draw |

The Scout vs Llama 3.1 8B pairing is the bottleneck. It has produced only 2 proper outcomes from 92 archived games in this snapshot. That does not yet tell us much about who is stronger in that pair. It mostly tells us that getting clean chess endings from that pairing is hard.

The target for this run is 20 proper outcomes for each pair, 60 proper outcomes total. Once the run reaches that point, the comparison will be much more balanced:

| Pair | Current proper outcomes | Target |
| --- | ---: | ---: |
| Maverick vs Scout | 12 | 20 |
| Maverick vs Llama 3.1 8B | 8 | 20 |
| Scout vs Llama 3.1 8B | 2 | 20 |

The final post should update every table above after the live campaign finishes.

## What this experiment measures

This is not a general-purpose LLM benchmark. It measures a narrower behavior: can a model repeatedly choose legal and strategically useful actions under hidden information, using only the platform's private player state, public referee messages, and legal action list?

That is a useful test because Kriegspiel stresses several model capabilities at once:

- following a compact structured prompt
- preserving hidden-information boundaries
- ranking multiple legal actions
- reacting to referee feedback
- using scorecard history without inventing hidden state
- continuing play through long, noisy games

The result is partly about chess strength, partly about instruction following, and partly about operational robustness. Separating proper outcomes from timeouts and operational resignations is what lets the chess signal become visible.
