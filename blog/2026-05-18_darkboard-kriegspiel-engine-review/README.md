---
title: "Darkboard, kriegspiel, and the path to a new bot"
slug: "darkboard-kriegspiel-engine-review"
summary: "A concise review of the public Darkboard record, source-code availability, and the best first implementation path for a new Python bot."
publishedAt: "2026-05-18"
updatedAt: "2026-06-27"
author: "Kriegspiel Team"
tags: ["research", "bots", "implementation", "darkboard"]
draft: true
lifecycle: draft
---

Darkboard is the best-known historical computer player for chess Kriegspiel.

The short version: the original Darkboard source code does not appear to be public. The papers, thesis, and tournament records are still useful. They are enough to build a Darkboard-inspired bot, but not enough to claim an exact port.

For our platform, the best first target is not a literal clone of the 2006 metaposition/minimax engine. It is the later Monte Carlo Tree Search "approach C" described by Paolo Ciancarini and Gian Piero Favini in 2009 and 2010: short-horizon search over the player's own move attempts and the referee messages those attempts can produce. A scaffold for that work lives at [Kriegspiel/bot-darkboard-mcts](https://github.com/Kriegspiel/bot-darkboard-mcts).

## What Darkboard was

Darkboard was a Java Kriegspiel player developed in the Bologna research line around Paolo Ciancarini and Gian Piero Favini. The core papers are:

| Year | Source | Why it matters |
| --- | --- | --- |
| 2007 | [Representing Kriegspiel States with Metapositions](https://www.ijcai.org/Proceedings/07/Papers/394.pdf), IJCAI 2007 | The compact public description of the metaposition idea and the first Darkboard player. |
| 2007 | [A Program to Play Kriegspiel](https://journals.sagepub.com/doi/abs/10.3233/ICG-2007-30102), ICGA Journal 30(1), 3-24 | The longer journal article for the original full-playing program. The [University of Bologna record](https://cris.unibo.it/handle/11585/45708) confirms the citation. |
| 2009 | [Monte Carlo Tree Search Techniques in the Game of Kriegspiel](https://www.ijcai.org/Proceedings/09/Papers/086.pdf), IJCAI 2009 | The conference paper that introduces approaches A, B, and C. |
| 2010 | [Monte Carlo Tree Search in Kriegspiel](https://www.ics.uci.edu/~dechter/courses/ics-295/fall-2019/papers/2010-mtc-aij.pdf), *Artificial Intelligence* 174(11), 670-684 | The mature version of the MCTS work. The [University of Bologna record](https://cris.unibo.it/handle/11585/93679) confirms the journal citation and DOI. |
| 2010 | [The dark side of the board: advances in chess Kriegspiel](https://amsdottorato.unibo.it/2403/1/favini_gianpiero_tesi.pdf), Gian Piero Favini's PhD thesis | The broadest public synthesis of the research program and implementation architecture. |

There is also a [University of Bologna software record for Darkboard](https://cris.unibo.it/handle/11585/108391). It confirms the software item and says Darkboard won the only two Computer Olympiad Kriegspiel tournaments then held: [Turin 2006](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=72) and [Pamplona 2009](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=206). ICGA's [Darkboard program page](https://www.game-ai-forum.org/icga-tournaments/program.php?id=242) lists both gold medals: 6.0/8 in 2006 and 8.0/8 in 2009.

## What the public record says

Darkboard is best read as two related systems.

The first system is the 2006 metaposition player. It tried to represent uncertainty directly instead of collapsing it into a few sampled hidden boards. A metaposition is an abstract board-like object that contains every board still compatible with the player's observations, plus extra possibilities when the abstraction is conservative. Darkboard searched over pseudolegal moves from that object, then updated the object after the player's move attempt, the referee's answer, and the opponent's public move message.

The 2007 papers describe three main evaluation ideas:

- Material safety: whether friendly pieces are exposed to likely captures or recaptures.
- Position: ordinary chess features adapted to hidden information, including pawn advancement, open files, controlled squares, and king pressure.
- Information: the size and freshness of uncertainty, including an age matrix that rewards probing stale squares.

Favini's thesis shows that this was a full player, not just a paper model. It describes local umpires, ICC connectivity, baseline players, extended PGN, and a Java class structure with `Darkboard`, `Metaposition`, `LocalUmpire`, `ICCUmpire`, `ICCDriver`, and related classes.

The second system is the 2009/2010 MCTS line. The IJCAI 2009 paper is useful because it says what failed: naive MCTS over sampled full boards performed barely above random. The problem is that sampled boards do not preserve enough chess structure, piece coordination, or defensive correlation.

The successful MCTS version moved the search closer to what the player actually perceives. It searched over move attempts and possible referee messages. The 2010 article reports that approach C beat the minimax Darkboard benchmark, reached roughly 1750 ICC Elo after thousands of online games, and won the 2009 Computer Olympiad event with a perfect 8.0/8 score.

## Source-code availability

I did not find a public source release for the original Darkboard code. The [software record](https://cris.unibo.it/handle/11585/108391) confirms the item, authors, year, and tournament claims, but does not expose downloadable files. The papers describe algorithms and results. The thesis describes Java architecture, class names, and data structures. Public searches did not turn up the original engine.

So the honest name for new work is "Darkboard-inspired." It is not the original Darkboard unless the original source appears and can be licensed.

## First ruleset

The first target should be `wild16`, the Internet Chess Club / ICGA Computer Olympiad ruleset.

The sources put Darkboard in the ICC rules family. Favini's thesis also calls the setting "Cincinnati style," which is confusing for our platform because we model Cincinnati and Wild 16 separately. The closest match to the public Darkboard / ICC tournament behavior is `wild16`:

| Public Darkboard / ICC behavior | Platform ruleset match |
| --- | --- |
| Opponent does not see failed illegal attempts | `wild16` |
| Captures announce pawn vs piece and square | `wild16` |
| Checks announce rank, file, long diagonal, short diagonal, knight, or double | `wild16` |
| Next player hears counted pawn tries | `wild16` |
| No Berkeley-style `Any?` question | `wild16` |

Other rulesets can come later. Starting with Berkeley or Berkeley+Any would move the first implementation away from the tournament setting described in the sources.

## Why not clone the 2006 engine first?

The 2006 metaposition design is attractive, but it is not the fastest route to a useful bot. It requires:

- a compact pseudopiece board representation
- correct `pseudo` updates for every relevant referee message
- correct `meta` updates for opponent moves
- safety heuristics
- position heuristics
- entropy and age heuristics
- pruning and weighted maximax
- enough tests to prevent hidden-state leaks and impossible inferences

The public papers give concepts and architecture, not the full code, constants, tuning corpus, or every evaluation detail. A metaposition clone would be a long research project before it became a useful bot. The later MCTS papers give a better first step.

## Best first implementation

Implement approach C from the 2009/2010 MCTS work.

The three MCTS variants are:

- Approach A: sample full hidden boards and run random simulations. This performed poorly.
- Approach B: simulate the player's perception using probability matrices and referee-message outcomes.
- Approach C: use a one-move horizon plus quiescence, evaluating many immediate referee outcomes quickly.

Approach C is narrow, but that is the point. It avoids fragile full-board generation, fits the public API model, and can become useful incrementally. It also matches how a platform bot must behave: public state in, legal attempts out, referee announcements back.

The bot should live as a separate runtime in [Kriegspiel/bot-darkboard-mcts](https://github.com/Kriegspiel/bot-darkboard-mcts), not inside `ks-game`. `ks-game` should remain the deterministic referee and serialization library. The bot should see only the player-visible API state.

## Python shape

A practical Python layout would look like this:

| Module | Responsibility |
| --- | --- |
| `darkboard_mcts.api` | Poll active games, submit moves, persist bot state. |
| `darkboard_mcts.belief` | Store player-visible state, material counts, and opponent probability matrices. |
| `darkboard_mcts.evidence` | Translate referee log entries into belief updates. |
| `darkboard_mcts.model` | Estimate legality, capture, check, pawn-try, and retaliation probabilities. |
| `darkboard_mcts.tree` | Represent the three-tier MCTS tree: player move, own referee outcome, opponent outcome. |
| `darkboard_mcts.uct` | UCT selection, expansion, and backup. |
| `darkboard_mcts.quiescence` | Extend evaluation through capture and recapture chains. |
| `darkboard_mcts.evaluation` | Weighted one-move outcome value, initially mostly material balance. |
| `darkboard_mcts.priors` | Opening and game-log priors for opponent piece distributions. |
| `darkboard_mcts.benchmarks` | Offline matches and fixed-position tests. |

The belief state needs three opponent matrices:

- `Pk`: opponent king probability by square
- `Pw`: opponent pawn probability by square
- `Pc`: opponent non-pawn piece probability by square

The matrices should be normalized against public material information. In `wild16`, captures reveal whether the captured man was a pawn or a piece, so the bot can keep better public counts than it could under Berkeley-style announcements.

The belief state should update after:

- failed illegal attempts
- legal non-captures
- captures, with square and pawn/piece type
- check direction announcements
- counted pawn tries
- opponent captures
- ordinary opponent moves with no capture
- game-ending announcements

The first version can use hand-built priors and generic diffusion. Later versions should learn aggregate priors from completed `wild16` games.

The referee-message model should estimate:

- opponent control of a square
- move legality
- capture probability by captured type
- check probability by direction
- recapture and retaliation probability
- likely opponent movement by piece class

The exact constants are not public in a copy-pasteable way. We should start conservative, expose them in a config file, and tune them through self-play and bot-vs-bot matches.

Search should then:

1. Build a root from the current belief state.
2. Expand candidate moves from the legal attempts the API exposes.
3. Use UCT to allocate time among moves.
4. For a new node, compute possible referee outcomes and their probabilities.
5. Score the weighted material result.
6. Continue through quiescence when capture/recapture chains are likely.
7. Back up values with the max-style operator described for C.
8. Return the most-visited or best-valued root child, with the final selection rule tested empirically.

The bot also needs a fallback move policy. If search times out, the API state changes, or the belief state cannot be loaded, it should choose a safe deterministic move rather than lose the turn.

## What else we need

A useful bot needs:

- A Wild 16 benchmark harness against random, simple heuristics, model bots when available, and self-play across 1, 2, 4, and 8 second move budgets.
- A game-log corpus for aggregate priors: opening square density, pawn movement, king safety, recapture rates, and capture-chain lengths.
- Clear naming: always call this Darkboard-inspired unless the original source is found and licensed.
- Strict integration boundaries: no backend-hidden board state.
- Runtime deployment work later: bot registration, token management, systemd unit, health logging, availability reporting, supported ruleset metadata, and active-game caps.

If we ever introduce per-opponent modeling, define privacy and retention rules first.

## Conclusion

Darkboard matters because it shows why ordinary chess-engine assumptions fail in hidden-information chess. The 2006 work is the representation lesson: keep uncertainty explicit. The 2009/2010 work is the implementation lesson: search over perception, not guessed reality.

For this platform, the practical path is direct: build a `wild16` bot using approach C, test it hard, and only then decide whether a full metaposition evaluator is worth reviving.

You can already play that ruleset today: start a Wild 16 game at [app.kriegspiel.org](https://app.kriegspiel.org/).
