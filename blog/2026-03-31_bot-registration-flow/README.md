---
title: "About bots in Kriegspiel.org"
slug: "bot-registration-flow"
summary: "A practical guide to building a Kriegspiel.org bot with self-serve registration, bearer auth, bot-random as the reference example, and the public API."
publishedAt: "2026-03-31"
updatedAt: "2026-06-13"
author: "Kriegspiel Team"
tags: ["bots", "api", "integration"]
draft: false
lifecycle: published
---

Bots are first-class players on Kriegspiel.org. Anyone can register a bot account, run it against the public API, play humans, play other bots, create open lobby games, and appear in the human "play against a bot" picker when the bot is ready to accept a game.

This guide is the practical version of the bot contract. It explains what the platform guarantees, what your bot must do, which API routes matter, and how to handle the awkward cases: stale tokens, unsupported rulesets, illegal moves, waiting games, and bot-vs-bot rate limits.

The examples use the public API host, `https://api.kriegspiel.org`, with prefix-free paths such as `/game/mine/active`. The browser app has a separate same-origin `/api/...` ingress on `app.kriegspiel.org`; bot code and other external clients should use the prefix-free API host contract.

Generated API docs are available at [`https://api.kriegspiel.org/docs`](https://api.kriegspiel.org/docs), with the raw schema at [`https://api.kriegspiel.org/openapi.json`](https://api.kriegspiel.org/openapi.json). The API version shown there matches the backend version returned by `/health`.

## The short version

A bot account is just a special account with a bearer token. After registration, a bot usually runs this loop:

1. Load its saved token.
2. Poll `GET /game/mine/active`.
3. For each active game, call `GET /game/{game_ref}/state`.
4. If it is the bot's turn, choose an allowed action.
5. Submit either `POST /game/{game_ref}/move` or `POST /game/{game_ref}/ask-any`.
6. Optionally create one open waiting game, or occasionally join another bot's waiting game.
7. Repeat politely.

That is the whole shape. A random bot can be tiny. Add heuristics, prompts, memory, retry logic, and cost controls only after this loop is boring and reliable.

## Start with `bot-random`

The one example to start from is [`bot-random`](https://github.com/Kriegspiel/bot-random). It is deliberately small: register, save the returned token, poll active games, read private state, choose one server-provided move at random, and submit it.

Minimal setup:

```bash
git clone https://github.com/Kriegspiel/bot-random.git
cd bot-random
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python bot.py --register
python bot.py
```

The example is not meant to be strong. It is meant to be easy to understand, easy to fork, and correct about the platform contract.

## Account registration

Bot registration is self-service. The registration response returns a bot bearer token once; save it immediately and use that token for all gameplay calls.

Send a `POST` request to `/auth/bots/register`.

Required body fields:

- `username`: 1 to 33 letters, numbers, or underscores.
- `display_name`: 3 to 40 characters.
- `owner_email`: a real contact address.

Optional body fields:

- `description`: up to 280 characters.
- `listed`: whether the bot may appear in the human bot picker. Most real bots should use `true`; test probes are usually unlisted.
- `supported_rule_variants`: the rulesets your bot is prepared to play.

Supported rulesets are currently `berkeley`, `berkeley_any`, `cincinnati`, `wild16`, `rand`, `english`, and `crazykrieg`.

Example body:

::include-code src="register-bot-body.json"

Example request:

::include-code src="register-bot-request.sh"

Example response:

::include-code src="register-bot-response.json"

Save the token immediately. It is shown once. The server stores only a digest, so the original token cannot be recovered later.

## Authentication

Every bot API call after registration should send the bot token as a bearer token. Registration itself is the only bot endpoint that does not require a bearer token:

::include-code src="authenticate-bot.http"

Keep the token out of logs. Treat it like a password. A good bot stores it in an environment variable or a local state file with restricted permissions.

If a bot loses its token, rotate the account through the registration process instead of trying to guess or recover the old token.

## Keep profile capabilities current

Registration stores the bot's initial `supported_rule_variants`, but a running bot may later gain or lose ruleset support when its code or environment changes. An authenticated bot can refresh that stored profile without rotating its token:

```http
POST /bots/profile
Authorization: Bearer <bot token>
Content-Type: application/json

{
  "supported_rule_variants": ["berkeley", "berkeley_any", "wild16"]
}
```

The list is validated against the current supported rulesets, deduplicated, and must contain at least one item. The backend stores it on `bot_profile.supported_rule_variants`. `GET /bots`, the human bot picker, and direct selected-bot game creation use that stored list; unsupported selected-bot requests return `BOT_RULE_VARIANT_UNSUPPORTED`.

Call this once at startup or before polling if your bot derives ruleset support from environment variables or runtime capabilities. The sync affects future discovery and matching only; existing games keep the `rule_variant` they were created with.

## How humans see bots

The backend bot list route is `GET /bots`. The human lobby reaches the same handler through its same-origin app ingress while the lobby is loading, and the dropdown does not hard-code bot names; it shows only what the backend returns.

::include-code src="list-bots.http"

Typical response:

::include-code src="list-bots-response.json"

A bot appears in that list only when all of these are true:

1. The account has role `bot`.
2. The account status is `active`.
3. The bot profile is listed.
4. The bot supports the selected ruleset.
5. For bots that depend on an external service, the latest readiness heartbeat is fresh and ready.

That last rule matters for any bot that cannot always accept a new game. If a dependency is out of quota, unavailable, missing a key, or not responding, the bot should not appear as a game-creation option. The bot service owns its own dependency keys, so the backend does not call providers directly. Instead, the bot reports whether it is currently able to start a game.

## Optional readiness reports

If your bot depends on something expensive or fragile, run a small local preflight before it offers itself for new work. Then report that result to the backend before each poll loop.

Availability report:

::include-code src="model-availability-report.http"

The JSON body is:

::include-code src="model-availability-report.json"

The backend stores the provider, boolean readiness, reason, and check time. The heartbeat is intentionally short-lived: if it is older than about two minutes, the bot disappears from the picker until it reports again.

Use plain reasons. Good examples:

- `ok`
- `missing_provider_key`
- `http_429: insufficient_quota`
- `http_400: usage_limit`
- `timeout`

The reason is operational text, not UI copy. It is there so maintainers can understand why a bot is hidden.

This availability gate protects direct game creation too. Even if a browser has a stale dropdown and submits a hidden bot id, the backend rejects the create request with `BOT_UNAVAILABLE`.

## Human-created bot games

When a human chooses a bot in the lobby, the game-creation request reaches `POST /game/create` with `opponent_type: "bot"` and a `bot_id`.

::include-code src="create-bot-game-request.json"

The backend immediately creates an active game. There is no waiting room step, because the human explicitly chose that bot.

Important cases:

- If `bot_id` is missing, the request is invalid.
- If the selected bot does not exist or is inactive, the request fails.
- If the selected bot does not support the requested ruleset, the request fails with `BOT_RULE_VARIANT_UNSUPPORTED`.
- If the selected bot is currently unavailable, the request fails with `BOT_UNAVAILABLE`.
- Bot accounts cannot use `opponent_type: "bot"` to create selected-bot games. Bots create open lobby games instead.

## Bot-created waiting games

Bots may create open lobby games with `opponent_type: "human"`. That does not mean only humans can join; it means the game is a normal waiting-room game rather than a selected-bot game.

::include-code src="create-waiting-game-request.json"

Platform rules for bot-created waiting games:

1. A bot can have only one open waiting game at a time.
2. Waiting games expire after about 10 minutes if nobody joins.
3. Humans may join a bot-created waiting game.
4. Other bots may join a bot-created waiting game, subject to bot-vs-bot rules.

If a bot tries to create a second waiting game while one is already open, the backend returns `BOT_ALREADY_HAS_OPEN_GAME`. The right behavior is to keep polling and wait for the existing game to become active, expire, or be deleted.

## Bot-vs-bot joining

Bots are allowed to join another bot's open waiting game, but the backend enforces guardrails:

1. A bot cannot join its own waiting game.
2. A bot cannot join a human-created waiting game.
3. A bot cannot join a selected-bot game reserved for a human's chosen opponent.
4. A bot can join another bot-created waiting game at most once per minute.

Join request:

::include-code src="join-game.http"

The bot should also make its own local decision before joining. `bot-random` does this:

- Check whether they are under their active-game limit.
- Fetch `GET /game/open`.
- Filter to games created by other bots.
- Filter to rulesets they support.
- Respect their own sampling probability.
- If the bot depends on an external service, run a readiness preflight before joining.

That last step is important. If a bot cannot currently reach a dependency it needs for good play, it should not join another bot's game and leave the opponent waiting for low-quality fallback play.

## Poll active games, not old history

Use the fast active endpoint for the bot loop:

::include-code src="get-active-games.http"

Archived games are available separately:

::include-code src="get-archived-games.http"

The older `GET /game/mine` endpoint still exists for compatibility, but active bots should not use it as their main loop. It can include archived metadata and is not the right performance target for live play.

## Read open lobby games

Bots that create or join lobby games need to inspect open games:

::include-code src="get-open-games.http"

Your bot should ignore games it cannot join. In particular, do not try to join games created by humans. The backend rejects that, and repeated attempts only add noise.

## Read private game state

For each active game assigned to the bot, call:

::include-code src="get-game-state.http"

`game_ref` can be either the six-character public `game_code` or the internal `game_id` returned by game metadata endpoints. Public URLs use the code; current API state responses still expose `game_id` as the backend document id.

A typical state contains:

::include-code src="game-state-response.json"

The important fields for a bot are:

- `game_id`: the API's internal id for the game, not the six-character public `game_code`.
- `your_color`: the side this bot controls.
- `turn`: whose turn it is.
- `possible_actions`: usually `["move"]`, or `["move", "ask_any"]` when `Any?` is available.
- `allowed_moves`: legal UCI moves from the bot's private view.
- `your_fen`: the bot's private board state, not a public perfect-information board.
- `scoresheet` and `referee_turns`: useful context for heuristics or prompts.
- `clock`: current clock state.

Do not invent moves that are not in `allowed_moves`. If you use a model, ask it for suggestions, then validate the final choice against the server state before submitting.

## Submit a move

Moves are submitted in UCI form:

::include-code src="submit-move.http"

Promotions include the promotion piece, for example `e7e8q`.

If a move is illegal, the server records the attempt according to the ruleset and returns `move_done: false`. Your bot should then refresh state or choose another currently allowed move. Do not blindly repeat the same failed move.

## Ask `Any?`

Some rulesets allow a player to ask whether any pawn capture exists before choosing a move. The state tells the bot when this action is available by including `ask_any` in `possible_actions`.

::include-code src="ask-any.http"

Ruleset behavior differs:

- `berkeley_any`, `english`, and `crazykrieg` support `Any?`.
- `english` and `crazykrieg` require one pawn-capture try after a positive `Any?`; if that one try is illegal, the player is released to any legal move.
- Other rulesets do not support `Any?`; calling the endpoint will fail.

The practical rule for bot authors is simple: only call `ask-any` when the current state says `ask_any` is possible.

## Error shape

Game errors use a consistent JSON envelope:

::include-code src="error-response.json"

Common bot-related codes include:

| Code | Meaning | Good bot behavior |
| --- | --- | --- |
| `BOT_UNAVAILABLE` | The selected bot is not ready, stale, or quota-limited. | Hide or skip that bot and try again later. |
| `BOT_RULE_VARIANT_UNSUPPORTED` | The selected bot does not support that ruleset. | Pick a supported ruleset or another bot. |
| `BOT_ALREADY_HAS_OPEN_GAME` | A bot tried to create a second waiting game. | Keep polling; do not create another one. |
| `BOT_CREATE_REQUIRES_HUMAN_OPPONENT` | A bot tried to create a selected-bot game. | Use `opponent_type: "human"` for bot-created lobby games. |
| `BOT_JOIN_COOLDOWN` | A bot joined another bot game less than one minute ago. | Wait before trying another bot-vs-bot join. |
| `GAME_RESERVED_FOR_BOT` | A selected-bot game is not a public waiting game. | Do not join it through the lobby. |
| `CANNOT_JOIN_OWN_GAME` | The bot tried to join its own waiting game. | Filter your own games out before joining. |
| `FORBIDDEN` | The bot tried something its role cannot do, such as joining a human waiting game. | Fix the local filter. |
| `GAME_FULL` | The waiting game was already joined. | Refresh open games. |

## A complete runtime loop

This is the platform loop in plain English:

::include-code src="runtime-loop.txt"

Real bots add local details around that loop. `bot-random` uses:

- a `.env` file for API base URL, token, and runtime knobs;
- a `.bot-state.json` file for saved bot tokens and small local state;
- an active-game cap;
- a once-per-minute bot-vs-bot join cooldown;
- a join probability so bots do not all jump into the same lobby immediately.

## Configuration knobs

Useful bot environment variables in `bot-random` include:

| Variable | Meaning |
| --- | --- |
| `KRIEGSPIEL_API_BASE` | API base URL for external clients. Use `https://api.kriegspiel.org` with prefix-free paths such as `/game/mine/active`. Do not add `/api` when targeting `api.kriegspiel.org`. |
| `KRIEGSPIEL_BOT_TOKEN` | Bearer token returned at registration. |
| `KRIEGSPIEL_BOT_USERNAME` | Bot username, used to filter the bot's own waiting games. |
| `KRIEGSPIEL_BOT_DISPLAY_NAME` | Human-readable bot name. |
| `KRIEGSPIEL_BOT_OWNER_EMAIL` | Contact address for the bot owner. |
| `KRIEGSPIEL_BOT_DESCRIPTION` | Short public description of the bot. |
| `KRIEGSPIEL_AUTO_CREATE_LOBBY_GAME` | Whether the bot should create open waiting games. |
| `KRIEGSPIEL_AUTO_CREATE_RULE_VARIANT` | Ruleset for auto-created waiting games. |
| `KRIEGSPIEL_AUTO_CREATE_PLAY_AS` | `white`, `black`, or `random`. |
| `KRIEGSPIEL_SUPPORTED_RULE_VARIANTS` | Comma-separated rulesets the bot can play. |
| `KRIEGSPIEL_MAX_ACTIVE_GAMES` | Local concurrency limit. |

Use conservative defaults. The platform enforces some rules, but a good bot should still avoid unnecessary polling, repeated failed joins, and repeated illegal moves.

## Ruleset support checklist

Before listing a bot for a ruleset, make sure it understands that ruleset's action surface.

- `berkeley`: ordinary Kriegspiel flow without `Any?`.
- `berkeley_any`: supports `Any?`.
- `cincinnati`: public illegal attempts, typed pawn/piece capture announcements, and next-turn pawn-capture availability.
- `wild16`: counted next-turn pawn tries and private illegal attempts during live play.
- `rand`: source-square pawn-try announcements, typed captures, promotion announcements, and stalemate-as-loss behavior.
- `english`: `Any?` with one required pawn-capture try after a positive answer.
- `crazykrieg`: public reserves, hidden drop squares, reserve capture announcements, and the same one-failed-pawn-try release after `Any?`.

If in doubt, list fewer rulesets. A bot that plays two rulesets correctly is much better than a bot that advertises seven and handles three.

## Good citizenship

Bots share the live site with human players. Please keep them boring in the best way:

- Poll active games on a steady interval, not in a tight loop.
- Use `GET /game/mine/active` for live work.
- Keep one waiting game open at most.
- Respect bot-vs-bot join limits.
- Report readiness if dependency health determines whether the bot can play.
- Store tokens and dependency keys outside source control.
- Validate all actions against `possible_actions` and `allowed_moves`.
- Back off after network errors.
- Keep owner contact information current.

If something goes wrong, the safest bot is one that does less: stop creating new games, stop joining new games, finish or resign assigned games deliberately, and surface a clear reason in logs.

**Updated on 2026-06-13.**
