---
title: "Darkboard, kriegspiel, and the path to a new bot"
slug: "darkboard-kriegspiel-engine-review"
summary: "A detailed review of the public Darkboard papers, tournament record, source-code availability, and a proposed Python implementation plan."
publishedAt: "2026-05-18"
updatedAt: "2026-05-24"
author: "Kriegspiel Team"
tags: ["research", "bots", "implementation", "darkboard"]
draft: false
lifecycle: published
---

Darkboard is the best-known historical computer player for chess Kriegspiel.

Disclaimer: the important public material is rich enough to guide a serious reimplementation, but not rich enough to claim an exact reconstruction of the original program.

This post reviews the public sources I found, separates the 2006 Darkboard line from the later 2009 Monte Carlo Tree Search line, and proposes a Python implementation path. A new research scaffold for that implementation now lives at [Kriegspiel/bot-darkboard-mcts](https://github.com/Kriegspiel/bot-darkboard-mcts).

The short version is this: the original Darkboard source code does not appear to be publicly available. The public papers and thesis do, however, describe enough of the design to build a new bot inspired by it. For our platform, the most practical first implementation target is not a literal metaposition/minimax clone of 2006 Darkboard, but the later MCTS "approach C" described by Paolo Ciancarini and Gian Piero Favini in 2009 and 2010.

## What Darkboard was

Darkboard was a Java Kriegspiel player developed in the Bologna research line around Paolo Ciancarini and Gian Piero Favini. The core papers are:

| Year | Source | Why it matters |
| --- | --- | --- |
| 2007 | [Representing Kriegspiel States with Metapositions](https://www.ijcai.org/Proceedings/07/Papers/394.pdf), IJCAI 2007 | The compact public description of the metaposition idea and the first Darkboard player. |
| 2007 | [A Program to Play Kriegspiel](https://journals.sagepub.com/doi/abs/10.3233/ICG-2007-30102), ICGA Journal 30(1), 3-24 | The longer journal article for the original full-playing program. The [University of Bologna record](https://cris.unibo.it/handle/11585/45708) confirms the citation. |
| 2009 | [Monte Carlo Tree Search Techniques in the Game of Kriegspiel](https://www.ijcai.org/Proceedings/09/Papers/086.pdf), IJCAI 2009 | The conference paper that introduces approaches A, B, and C. |
| 2010 | [Monte Carlo Tree Search in Kriegspiel](https://www.ics.uci.edu/~dechter/courses/ics-295/fall-2019/papers/2010-mtc-aij.pdf), *Artificial Intelligence* 174(11), 670-684 | The mature version of the MCTS work. The [University of Bologna record](https://cris.unibo.it/handle/11585/93679) confirms the journal citation and DOI. |
| 2010 | [The dark side of the board: advances in chess Kriegspiel](https://amsdottorato.unibo.it/2403/1/favini_gianpiero_tesi.pdf), Gian Piero Favini's PhD thesis | The broadest public synthesis of the research program and implementation architecture. |

There is also a [University of Bologna software record for Darkboard](https://cris.unibo.it/handle/11585/108391). That record calls Darkboard a program to play Kriegspiel and states that it won the only two Computer Olympiad Kriegspiel tournaments then held: Turin 2006 and Pamplona 2009. The record lists the item as software, but the attachments are not publicly exposed.

The tournament trail is public as well. ICGA's program page for [Darkboard](https://www.game-ai-forum.org/icga-tournaments/program.php?id=242) lists two gold medals: [KriegSpiel, 2006, Turin](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=72), where Darkboard scored 6.0 out of 8, and [KriegSpiel, 2009, Pamplona](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=206), where Darkboard scored 8.0 out of 8. The Chessprogramming wiki's [KriegSpiel](https://www.chessprogramming.org/KriegSpiel), [11th Computer Olympiad](https://www.chessprogramming.org/11th_Computer_Olympiad), and [14th Computer Olympiad](https://www.chessprogramming.org/14th_Computer_Olympiad) pages are useful secondary indexes, but the ICGA pages are the cleaner tournament references.

## A short history of Darkboard

Darkboard's history is interesting because it is not the story of one chess engine getting gradually stronger in the ordinary way. It is closer to two connected research engines wearing the same name: first a metaposition player that tried to keep uncertainty symbolic, then a Monte Carlo player that learned to search over what the player would actually hear from the referee.

The first public chapter is [Turin 2006](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=72). Kriegspiel was still a tiny Computer Olympiad event. It was an unusually sharp test for game AI. Ordinary chess programs assume both players can see the board. In Kriegspiel, the most important facts are missing: where the opponent's pieces are, whether a capture is possible, and even whether a chosen move is legal. Darkboard's 6.0/8 gold medal mattered because it showed that a program could be competitive without pretending the hidden board was just an ordinary chess position with a few unknown pieces.

The 2007 papers turned that tournament result into a research claim. [Representing Kriegspiel States with Metapositions](https://www.ijcai.org/Proceedings/07/Papers/394.pdf) describes the compact idea: instead of enumerating every possible hidden board, represent a larger abstract object that contains all boards still compatible with the player's observations. The longer ICGA Journal article, [A Program to Play Kriegspiel](https://journals.sagepub.com/doi/abs/10.3233/ICG-2007-30102), frames Darkboard as a full playing system rather than just a representation trick. That distinction matters. The engine was not only storing uncertainty; it was trying to make moves that balanced material, position, and information.

Favini's thesis, [The dark side of the board](https://amsdottorato.unibo.it/2403/1/favini_gianpiero_tesi.pdf), gives the best glimpse of the engineering culture around the project. Darkboard had local umpires, ICC connectivity, baseline players, extended PGN, and a Java class structure built around the practical messiness of real games. This is one reason the original program is still compelling: it was not a toy proof-of-concept hidden in a paper. It sat at the intersection of an academic idea, an online playing environment, and tournament pressure.

Then comes the second chapter. By [Pamplona 2009](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=206), the strongest public Darkboard line was no longer just the 2006 metaposition/minimax story. The IJCAI 2009 paper, [Monte Carlo Tree Search Techniques in the Game of Kriegspiel](https://www.ijcai.org/Proceedings/09/Papers/086.pdf), is unusually candid about what did not work. The naive plan, sampling full hidden boards and playing out random games, performed barely above random. That failure is the useful part of the history: it says that Kriegspiel punishes engines that convert uncertainty into a single guessed reality too early.

The mature 2010 article, [Monte Carlo Tree Search in Kriegspiel](https://www.ics.uci.edu/~dechter/courses/ics-295/fall-2019/papers/2010-mtc-aij.pdf), made the pivot clear. The successful approach searched over short sequences of the player's own actions and the referee messages those actions could produce. In other words, it treated perception as part of the game tree. That version is reported as beating the minimax Darkboard benchmark, reaching roughly 1750 ICC Elo after thousands of online games, and winning the 2009 Computer Olympiad event with a perfect 8.0/8 score.

That arc is the reason I do not read Darkboard as a frozen historical artifact. It is a record of several good research instincts arriving in sequence: represent uncertainty explicitly; use information as an evaluation target; do not trust arbitrary sampled hidden boards; search at the level of legal attempts and referee feedback; and keep the implementation close enough to real rules that it can survive online play. A new Python bot should inherit that arc, not merely copy one snapshot of it.

## Source-code availability

I did not find a public source release for the original Darkboard code.

The public record says quite a lot about the program, but it does not expose the source:

- The [Darkboard software record](https://cris.unibo.it/handle/11585/108391) confirms the software item, authors, year, and tournament claims, but does not provide downloadable files.
- The IJCAI and journal papers describe algorithms and experimental results, not a code archive.
- Favini's thesis describes the Java architecture, class names, and data structures, but it is a thesis, not a source package.
- Searches for public GitHub, SourceForge, and downloadable Darkboard source code did not turn up the original engine.

That matters for how we describe any new work. We should not call a new bot "the Darkboard code" or an exact port. The honest framing is "Darkboard-inspired" or "from-public-sources reimplementation."

## Which ruleset should a new bot play?

The first target should be `wild16`, the Internet Chess Club / ICGA Computer Olympiad ruleset.

The sources consistently place Darkboard in the ICC rules family. Ciancarini's Kriegspiel page says the most common ruleset is the one defined by the Internet Chess Club, where Kriegspiel is Wild 16, and that it was also used for the ICGA Computer Olympiad. The ICGA tournament rules page describes the same setting: Kriegspiel is called "Wild 16" on ICC, illegal attempts are private, captures announce square and pawn/piece type, checks announce direction, and the referee announces a count of pawn tries.

Favini's thesis also describes Darkboard as playing under the ICC ruleset and calls it "Cincinnati style." That name can be confusing in our current platform because we model Cincinnati and Wild 16 separately. In our codebase, the closest match to the ICGA/ICC tournament behavior is `wild16`:

| Public Darkboard / ICC behavior | Platform ruleset match |
| --- | --- |
| Opponent does not see failed illegal attempts | `wild16` |
| Captures announce pawn vs piece and square | `wild16` |
| Checks announce rank, file, long diagonal, short diagonal, knight, or double | `wild16` |
| Next player hears counted pawn tries | `wild16` |
| No Berkeley-style `Any?` question | `wild16` |

So the new Python bot should start as a `wild16` bot. Other rulesets can come later, but starting with Berkeley or Berkeley+Any would move us away from the tournament setting described in the Darkboard sources.

## The 2006 idea: metapositions

The 2007 IJCAI paper introduces Darkboard through metapositions. The problem is simple to state and brutal to implement: in Kriegspiel, a player has a huge information set of possible hidden boards, but cannot enumerate or search that set directly. A metaposition is an abstract board-like object that represents a superset of the current information set.

The public description gives the key pieces:

- A metaposition `M` contains at least every state compatible with the player's observations.
- The strategy space for `M` is the set of moves legal in at least one represented state. These are pseudolegal moves from the player's perspective.
- A `pseudo` function updates a metaposition after the player's move attempt and the referee's answer.
- A `meta` function updates the metaposition after the opponent's unknown move and the public referee message.
- An evaluation function scores the resulting metaposition.

The thesis expands the implementation picture. Darkboard represents uncertainty with pseudopieces: enemy "ghost" pieces that may exist on many squares at once. The simplified architecture includes `Player`, `HumanPlayer`, `AIPlayer`, `RandomPlayer`, `SemirandomPlayer`, `Darkboard`, `Umpire`, `LocalUmpire`, `RemoteUmpire`, `ICCUmpire`, `ICCDriver`, `ExtendedPGNGame`, `Communicator`, and `Metaposition`. The implementation is Java and was described as runnable on Java Runtime Environment 1.3.1 or later.

This was not just a referee engine. It was a full player system:

- `LocalUmpire` supported local play against humans or artificial players.
- `ICCUmpire` and `ICCDriver` supported play on ICC.
- `RandomPlayer` and `SemirandomPlayer` served as baselines.
- `Darkboard` implemented metaposition search.
- Extended PGN support recorded hidden-information details such as rejected moves and referee messages.

The evaluation function in the public paper has three major components.

### Material safety

Material safety asks how exposed a friendly piece is. This is not exactly a capture probability. It is a risk signal: whether a piece is protected, whether it was just moved, and whether it is likely to be lost next. This matters because blind recapture chains are common in Kriegspiel. A move that looks good in ordinary chess can be reckless when the destination square is probably protected by unseen material.

### Position

The positional terms are analogous to ordinary chess evaluation, but adapted for hidden information. The paper names pawn advancement, multiple queens, open files, friendly pawns on open files, and controlled squares. It also includes a special component for checkmating progress, especially pushing possible enemy kings toward board edges in endgames.

### Information

Information is where metapositions are most distinctive. The program can score not only material or placement, but the size and freshness of uncertainty. Favini and Ciancarini describe a form of chessboard entropy: opponent moves increase uncertainty, player probes and successful move attempts decrease it. Darkboard uses an age matrix to encourage exploring squares that have not been tested recently, weighted by practical importance.

This is the most attractive part of the 2006 design. It gives the bot a native reason to ask informative questions. A pure board sampler can miss that, because any sampled hidden state becomes too concrete during evaluation.

## Why I would not start with a metaposition clone

The metaposition approach is implementable, but it is not the lowest-risk first implementation.

It needs a lot of hand-built machinery:

- a compact pseudopiece board representation
- correct `pseudo` updates for every relevant referee message
- correct `meta` updates for opponent moves
- safety heuristics
- position heuristics
- entropy and age heuristics
- pruning and weighted maximax
- enough tests to prevent hidden-state leaks and impossible inferences

The public papers give the architecture and concepts, but not the full original constants, code, tuning corpus, or every detail of the evaluation function. That makes a literal clone a long research project before it becomes a useful bot.

The later MCTS papers point to a better first version.

## The 2009/2010 idea: MCTS over perceived messages

The 2009 IJCAI paper and 2010 *Artificial Intelligence* article describe three Monte Carlo Tree Search approaches.

Approach A is the naive translation of earlier MCTS ideas: generate plausible full hidden boards, run random simulations, and use UCT. It failed. The paper says it performed little better than random play. The reasons are important:

- Generated boards were not realistic enough.
- The generated positions did not preserve correlations such as pieces protecting each other.
- Random simulations underestimated coordination and defense.
- Kriegspiel has no automatic progress signal like Go territory or Scrabble board occupation.

Approach B changes the simulation target. Instead of generating full hidden boards, it simulates the player's perception: referee messages and material outcomes. It maintains probability matrices for the opponent's king, pawns, and generic pieces. It estimates move legality, capture probability, check probability, opponent retaliation, and opponent movement without committing to one concrete hidden board.

Approach C takes B to the extreme. It uses a one-move simulation horizon plus quiescence. Because the model can compute weighted probabilities of immediate referee outcomes, the algorithm can evaluate many more nodes. It blurs the line between MCTS and a UCT-guided evaluation function.

That sounds myopic, but the experiments favor it. The 2010 paper reports that C consistently beat the minimax Darkboard benchmark and reached about 1750 ICC Elo after thousands of human games. It also states that this approach won the 2009 Computer Olympiad Kriegspiel tournament with a perfect score.

For us, Approach C is the sweet spot:

- It is more fully specified than the metaposition evaluator.
- It does not need exact hidden-board generation.
- It matches how a bot can operate through our API: public state in, legal attempts out, referee announcements back.
- It can become useful incrementally.
- It is easier to benchmark against existing bots.

## Proposed Python implementation

The proposed repo is [Kriegspiel/bot-darkboard-mcts](https://github.com/Kriegspiel/bot-darkboard-mcts). The initial scaffold is deliberately small: a Python package, a `BeliefState` value object, a placeholder chooser, tests, and an implementation plan. The point is to create the shape of the work before pretending the research implementation exists.

The implementation should live as a bot runtime, not inside `ks-game`.

`ks-game` should remain the deterministic referee and serialization library. A Darkboard-style bot should be a client of the game API. That separation keeps hidden-information safety clear: the bot sees only what a player is allowed to see, submits attempts, and updates its own belief model from referee announcements.

### Module shape

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

### Belief state

Approach C needs three main opponent matrices:

- `Pk`: probability that the opponent king is on each square
- `Pw`: probability that an opponent pawn is on each square
- `Pc`: probability that an opponent non-pawn piece is on each square

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

The first version can use hand-built priors and generic diffusion. Later versions should learn priors from completed `wild16` games on this platform.

### Referee-message model

The 2010 paper describes two sets of assumptions.

The first set models chess-like constraints from the probability matrices:

- probability that an opponent controls a square
- probability that a move is legal, based on path occupancy and pin/control risk
- probability of capturing a pawn or piece on the target square
- probability of giving check based on king density over attacked squares
- normalization after a square is known empty or occupied

The second set models the opponent:

- high chance of recapture after the bot captures
- chance that a checking piece is captured
- chance that the opponent captures one of our exposed pieces
- probabilities of moving king, pawn, or generic piece based on remaining material
- random-walk updates for king and piece densities
- one-way Markov-chain updates for pawns

The exact constants are not public in a copy-pasteable way. We should start conservative, expose them in a config file, and tune them through self-play and bot-vs-bot matches.

### Search

The first serious version should implement Approach C:

1. Build a root from the current belief state.
2. Expand candidate moves from the legal attempts the API exposes.
3. Use UCT to allocate time among moves.
4. For a new node, compute possible referee outcomes and their probabilities.
5. Score the weighted material result.
6. Continue through quiescence when capture/recapture chains are likely.
7. Back up values with the max-style operator described for C.
8. Return the most-visited or best-valued root child, with the final selection rule tested empirically.

The bot should also keep a fallback move policy. If the search times out, the API state changes, or the belief state cannot be loaded, it should fall back to a safe deterministic heuristic rather than losing the turn.

## What else we need

A good implementation plan is not enough. The surrounding pieces matter.

### A Wild 16 benchmark harness

We need repeatable offline matches against existing bots:

- random bot
- random-any where applicable, though it is not a Wild 16 match
- simple heuristics bot
- GPT bot if model availability allows
- self-play across time budgets

The MCTS papers report 1, 2, 4, and 8 seconds per move. Those are good first time budgets to copy.

### A game-log corpus

Darkboard benefited from ICC game statistics. We do not need personal opponent modeling in v1, but we do need aggregate priors. Completed public or platform-owned Wild 16 games can provide:

- opening square density by piece class and ply
- pawn movement tendencies
- king-safety patterns
- common recapture rates
- capture/retaliation chain lengths

This needs care. If we ever introduce per-opponent modeling, we should explicitly design privacy and retention rules first.

### Clear naming

The repo is named `bot-darkboard-mcts`, but the docs should always say "Darkboard-inspired." If the implementation becomes strong, it still will not be the original Darkboard unless the original source appears and the authors' licensing allows a port.

### Integration boundaries

The bot should not receive hidden board state from backend internals. It should use the same public game-state API that other bots use. This keeps the implementation honest and avoids accidentally building a privileged bot.

### Deployment notes

Once the bot becomes real runtime code, the deployment work belongs outside this initial scaffold:

- bot registration
- bot token management
- systemd unit
- health logging
- availability reporting
- supported ruleset metadata: `["wild16"]`
- a cap on active games and bot-vs-bot join frequency

## Reading order for implementers

If you want to build this bot, read the sources in this order:

1. [Representing Kriegspiel States with Metapositions](https://www.ijcai.org/Proceedings/07/Papers/394.pdf) for the original abstraction.
2. [A Program to Play Kriegspiel](https://journals.sagepub.com/doi/abs/10.3233/ICG-2007-30102) for the longer original-program writeup.
3. Favini's [PhD thesis](https://amsdottorato.unibo.it/2403/1/favini_gianpiero_tesi.pdf) for implementation architecture and broader context.
4. [Monte Carlo Tree Search Techniques in the Game of Kriegspiel](https://www.ijcai.org/Proceedings/09/Papers/086.pdf) for the first MCTS formulation.
5. [Monte Carlo Tree Search in Kriegspiel](https://www.ics.uci.edu/~dechter/courses/ics-295/fall-2019/papers/2010-mtc-aij.pdf) for the mature approach and experiments.
6. The ICGA pages for [Darkboard](https://www.game-ai-forum.org/icga-tournaments/program.php?id=242), [Turin 2006](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=72), and [Pamplona 2009](https://www.game-ai-forum.org/icga-tournaments/tournament.php?id=206) for the tournament record.
7. The new [bot-darkboard-mcts repository](https://github.com/Kriegspiel/bot-darkboard-mcts) for the implementation plan and scaffold.

## Conclusion

Darkboard is not just a historical curiosity. It is a compact case study in why ordinary chess engines do not transfer cleanly to hidden-information chess. The 2006 metaposition player shows how to represent uncertainty without collapsing it into a few sampled boards. The 2009/2010 MCTS player shows that short-horizon, perception-level search can outperform a more hand-tuned minimax system.

For a modern Kriegspiel platform, the practical path is to start with a Wild 16 bot using Approach C. Build the belief state. Build the referee-message model. Benchmark it hard. Only then decide whether to revive the full metaposition evaluator.

That is a good step-by-step plan: respectful of the public research, honest about what is missing, and small enough to turn into working Python.
