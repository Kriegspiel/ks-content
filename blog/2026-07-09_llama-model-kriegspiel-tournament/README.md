---
title: "Llama models playing Kriegspiel in the dark"
slug: "llama-model-kriegspiel-tournament"
summary: "A draft setup note and early bracket results for choosing the strongest LLM bots through family-level Kriegspiel tournaments."
publishedAt: "2026-07-09"
updatedAt: "2026-07-11"
author: "Kriegspiel Team"
tags: ["research", "bots", "llm", "tournament", "berkeley-any"]
draft: true
lifecycle: draft
---

We are adding a large set of LLM-powered bots to the Kriegspiel platform. That
is exciting, but it creates a practical problem: many models either perform very
similarly or perform badly enough that they are not useful opponents. Listing
every available model as a first-class bot would make the bot roster noisy
without necessarily giving players better games.

The tournament is our filter. We want to find the strongest and most reliable
bots before deciding which ones should be promoted, compared across families, or
used as long-running opponents on the platform.

## Family brackets

The first step is to run tournaments within a single LLM family. A Llama bot
plays other Llama bots, a Nemotron bot plays other Nemotron bots, a Mistral bot
plays other Mistral bots, a GLM bot plays other GLM bots, and so on.

That gives each family its own bracket:

| Family bracket | What it compares |
| --- | --- |
| Llama | Llama-family model bots against each other. |
| Nemotron | Nemotron-family model bots against each other. |
| Mistral | Mistral-family model bots against each other. |
| Gemma | Gemma-family model bots against each other. |
| Gemini | Gemini-family model bots against each other. |
| GLM | GLM-family model bots against each other. |

This post starts with the Llama bracket. The same method can be reused for the
other families as more model bots are enabled.

Family brackets keep the first comparison simple. Models in the same family
often share architecture, provider behavior, prompt sensitivity, and failure
modes. Before asking whether the best Llama is stronger than the best Mistral or
Gemini, or GLM, we first need to know which Llama, Mistral, Gemini, or GLM bot
should represent its family at all.

## Tournament setup

The tournament is bot-vs-bot self-play on the live Kriegspiel platform. Each
game uses the platform backend as referee, so the bots receive only the private
player state and public referee messages that a real player would be allowed to
see.

LLM games can become long and expensive, especially when both sides keep making
legal but unproductive moves. To cap spend, each bot receives a per-game move
limit. The limit is deliberately high enough that a reasonable human game should
usually finish before reaching it, but low enough to stop games that drift
forever.

Because each game is bot-versus-bot, the limit is randomized independently for
each side. At the start of a game, the system picks two random numbers in the
range 128-256:

| Side | Limit |
| --- | --- |
| White bot | Random move limit from 128 to 256. |
| Black bot | Random move limit from 128 to 256. |

If a side reaches its own limit, that bot resigns. Randomizing the limits avoids
a systematic bias where White would always hit the cap first simply because
White moves first.

## Outcome categories

The archive can contain several kinds of completed games:

| Outcome | How we treat it |
| --- | --- |
| Checkmate | Proper outcome. |
| Stalemate or draw | Proper outcome. |
| Resignation after move cap | Operational outcome. |
| Timeout | Operational outcome. |

For this tournament, a proper outcome is a game that reaches an ordinary chess
ending: checkmate, stalemate, insufficient material, repetition, or another draw
condition handled by the platform rules. These outcomes say something about the
quality of the moves inside the game.

Resignation is different in this setup. A bot may resign because it hit the
randomized move cap, not because the model understood that the position was
lost. That makes resignation useful for operations, but not clean evidence of
chess strength.

Timeout is also operational. LLM APIs can be slow, unavailable, rate-limited, or
delayed by provider-side load. A timeout tells us something about runtime
reliability and provider latency, but it is not the same as being outplayed on
the board.

For the result tables, we will therefore focus on proper outcomes. Resignations
and timeouts will still be reported, but they will not decide which model is the
best player in the bracket.

## LLM bot gameplay

The Llama bots use the shared `bot-openai-compatible` runtime. The runtime is
conservative by design: the backend remains the source of truth, and a model
answer is never played unless it passes local validation against the
server-provided action list.

On each turn, the runtime builds two messages for the model:

1. A system prompt that explains the simplified rules, the hidden-information
   boundary, and the required response format.
2. A user prompt that contains the current player-visible game state and the
   legal actions available on this turn.

The model is not asked to invent the full hidden board. It is asked to rank
legal actions using only the state it has been given.

## System prompt

The system prompt has a stable structure:

| Prompt part | Purpose |
| --- | --- |
| Role | Tells the model it is playing Kriegspiel. |
| Rules summary | Gives the simplified rules for the active variant. |
| Information boundary | Tells the model to use only the private state and public messages supplied in the prompt. |
| Output contract | Requires compact JSON shaped like `{"m":["e2e4","d2d4","ask_any"]}`. |
| Ranking rule | Requires exactly `n` unique actions ordered from best to worst. |
| Legality rule | Requires every action to match one item in the supplied legal action list. |

The rules summary is variant-specific. For this Llama run, the games use
`berkeley_any`: Berkeley Kriegspiel with the `Any?` pawn-capture question
enabled.

## User prompt

The user prompt for each turn is a compact JSON snapshot. Its keys are short so
that the bot spends fewer tokens on repeated field names and more of its context
on the actual position.

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
| `n` | Target number of ranked candidates, capped by available actions. |
| `res` | CrazyKrieg reserve summary when that ruleset is active. |
| `rej` | Recently rejected candidate actions for the current turn. |
| `fb` | Retry feedback, including rejected moves and fresh referee announcements. |

The `hist` field is the compact scorecard. It carries recent entries for both
White and Black, but only as visible from the bot's allowed perspective.
Depending on the ruleset and perspective, scorecard entries can include
move-complete messages, illegal-move rejections, capture announcements, check
announcements, pawn-capture question answers, and the move UCI when the server
exposes it to that player. The prompt does not expose an omniscient board.

## Expected response

The model is asked for a prioritized move list, not a single move. A typical
response is:

```json
{"m":["e2e4","d2d4","g1f3","b1c3","c2c4","f2f4","e2e3","d2d3","g2g3","b2b3"]}
```

The runtime then:

1. Parses the JSON response.
2. Deduplicates the ranked entries.
3. Rejects anything not present in the server-provided legal action list.
4. Tries the remaining candidates in order.
5. Records rejected attempts in `rej`.
6. Adds retry text in `fb`.
7. If the whole batch fails, asks the model for another ranked batch, up to the
   configured retry limit.
8. Falls back to a deterministic legal action if the model response is
   malformed, unavailable, or empty.

In the current production configuration, the bot asks for 10 ranked candidates
per call when at least 10 actions are available, and can ask for up to 5 batches
in a single turn if earlier batches fail.

## Llama bracket

The Llama-family result gives a clear winner. In the table below, each score is
shown from the row bot's perspective as wins-losses-draws.

| Bot \ Opponent | Llama 3.1 8B | Llama 4 Scout | Llama 4 Maverick |
| --- | ---: | ---: | ---: |
| Llama 3.1 8B | - | 3-1-1 | 1-2-8 |
| Llama 4 Scout | 1-1-3 | - | 0-3-17 |
| Llama 4 Maverick | 8-2-1 | 17-3-0 | - |

Aggregating games from both table directions gives:

| Model | Wins | Losses | Draws |
| --- | ---: | ---: | ---: |
| Llama 4 Maverick | 30 | 6 | 26 |
| Llama 3.1 8B | 7 | 12 | 13 |
| Llama 4 Scout | 5 | 24 | 21 |

Maverick is the only Llama model that should stay visible by default. Llama 3.1
8B and Llama 4 Scout can remain available for players who explicitly want to
try them, but hiding them from the default bot list keeps the public experience
cleaner.

## Mistral bracket

The first Mistral-family result is already useful. In the table below, each
score is shown from the row bot's perspective as wins-losses-draws.

| Bot \ Opponent | Nemo | Small 3.2 | Large 3 |
| --- | ---: | ---: | ---: |
| Nemo | - | 0-1-4 | 0-0-1 |
| Small 3.2 | 4-1-0 | - | 3-0-1 |
| Large 3 | 1-0-0 | 1-0-3 | - |

Aggregating games from both table directions gives:

| Model | Wins | Losses | Draws |
| --- | ---: | ---: | ---: |
| Small 3.2 | 8 | 2 | 8 |
| Large 3 | 2 | 3 | 5 |
| Nemo | 1 | 6 | 5 |

The surprising result is how well Small 3.2 performs. It is the clear Mistral
bot to keep visible. Large 3 can remain available for players who explicitly
want to try it, but it should not be promoted as a broadly visible opponent.

## Gemma bracket

The Gemma-family result is less one-sided than the Llama bracket. Gemma 3 4B is
surprisingly competitive in parts of the bracket, especially for a smaller
model. As above, each score is shown from the row bot's perspective as
wins-losses-draws.

| Bot \ Opponent | Gemma 3 4B | Gemma 3 27B | Gemma 4 31B |
| --- | ---: | ---: | ---: |
| Gemma 3 4B | - | 2-0-4 | 1-2-0 |
| Gemma 3 27B | 4-0-2 | - | 1-0-6 |
| Gemma 4 31B | 0-2-1 | 6-0-1 | - |

Aggregating games from both table directions gives:

| Model | Wins | Losses | Draws |
| --- | ---: | ---: | ---: |
| Gemma 4 31B | 8 | 4 | 8 |
| Gemma 3 4B | 5 | 6 | 7 |
| Gemma 3 27B | 5 | 8 | 13 |

Even with the interesting Gemma 3 4B result, Gemma 4 31B is the Gemma model to
keep visible by default. The other Gemma models can remain available for
history and for players who explicitly want to try them.

## What the remaining result sections should add

Once each family run has enough games, the data section should report:

- the snapshot time
- the models included
- archived games by pair
- proper outcomes by pair
- checkmates, stalemates, and draws
- wins, losses, and draws among proper outcomes
- resignation and timeout counts as operational context

The goal is not to make a general-purpose LLM benchmark. It is narrower: can a
model repeatedly choose legal and useful Kriegspiel actions under hidden
information, using only its private board, public referee messages, and the
legal action list?

That is the signal we want before deciding which LLM bots deserve a permanent
place on the platform.
