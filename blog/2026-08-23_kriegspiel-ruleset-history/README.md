---
title: "A history of Kriegspiel rulesets"
slug: "kriegspiel-ruleset-history"
summary: "A draft tour through major Kriegspiel rules traditions, from English problem rules to Berkeley, ICC Wild 16, Cincinnati, RAND, and the current platform variants."
publishedAt: "2026-08-23"
updatedAt: "2026-08-23"
author: "Kriegspiel Team"
tags: ["rules", "history", "variants"]
draft: true
lifecycle: draft
---

Kriegspiel is not one rulebook. It is a family of hidden-information chess
traditions that agree on the broad idea and then disagree about the referee.
What does the referee announce? Are illegal attempts private? Can a player ask
whether any pawn captures exist? Does a capture reveal the square, the piece
type, both, or neither? What happens at stalemate? Those details change the
game.

This draft maps the rules traditions that matter most for the platform and the
research literature: English problem rules, Berkeley, ICC Wild 16, Cincinnati,
RAND, and the platform's newer `berkeley_any` and `crazykrieg` variants.

## The core problem

All Kriegspiel rulesets start from the same dramatic constraint. Each player
sees their own pieces, not the opponent's. A referee knows the full position and
decides whether attempted moves are legal. The rest of the game is shaped by
how much the referee says.

That means ruleset design is really information design. A small announcement
can turn an impossible deduction into a forced mate. A hidden illegal attempt
can make one version feel like silent search and another feel like public
probing. A pawn-try rule can decide whether a problem has a unique solution.

## English rules and the problem tradition

The English problem tradition is closely associated with Gerald Frank
Anderson's *Are There Any? A Chess Problem Book*. Its famous question is right
there in the title: before moving, a player may ask whether there are any legal
pawn captures.

In composed problems, that question is not a side feature. It is often the
mechanism that lets White distinguish hidden black replies. Some problems use a
failed pawn capture as a test, then finish with a mate that only works because
the answer revealed the structure of the position.

This tradition gives Kriegspiel a puzzle language. The core question is not
only "what move wins?" but "what sequence of questions, tries, and deductions
wins no matter what the hidden reply was?"

## Berkeley rules

The Berkeley line around Jason Wolfe and Stuart Russell gives a modern,
well-documented ruleset for research. Wolfe's Berkeley pages include:

- [Berkeley Kriegspiel rules](https://w01fe.com/berkeley/kriegspiel/rules.html)
- [Berkeley problem database](https://w01fe.com/berkeley/kriegspiel/problems.html)
- [Berkeley PGN notation](https://w01fe.com/berkeley/kriegspiel/notation.html)

Berkeley is especially important because it couples a rules page with a problem
database and notation. That makes it more than a way to play. It is a benchmark
environment: positions, hidden histories, and player-perspective records can be
named and tested.

On this platform, `berkeley` is the base version. `berkeley_any` extends that
family with an explicit `Any?` interaction, making it closer to the problem
tradition without becoming identical to every English-rule convention.

## ICC Wild 16

The Internet Chess Club ruleset, also known as Wild 16, is the most important
computer-tournament ruleset. The ICGA Computer Olympiad used this family for
the Kriegspiel events won by Darkboard in 2006 and 2009.

The important Wild 16 features are:

- failed illegal attempts are private
- captures announce the square and whether the captured unit was a pawn or a
  piece
- check announcements identify the line or type of check
- pawn-try information is counted for the next player
- there is no Berkeley-style `Any?` question

Wild 16 matters because the strongest public computer-player trail points
toward it. Darkboard, Favini's thesis, and the Bologna MCTS papers all make the
most sense when read against the ICC/Computer Olympiad environment.

## Cincinnati

Cincinnati is another historically important rules family, but the name can be
slippery. Some public research text uses "Cincinnati style" while also
describing behavior that, in this platform, is closer to Wild 16.

For platform purposes, `cincinnati` has a distinct identity:

- illegal attempts are public
- captures announce square and pawn or piece type
- the next turn has a binary pawn-capture availability signal

Public illegal attempts make the game feel very different. A player can learn
not only from their own rejected moves, but from the opponent's failed probes.
That makes the board more talkative and changes the value of speculative tries.

## RAND

RAND rules are important partly because of Lloyd Shapley. Shapley's
*The Invisible Chessboard* and related UCLA material sit in a tradition where
problem logic, game theory, and hidden-information chess meet.

On this platform, `rand` has several defining features:

- source-square pawn-try announcements
- typed pawn or piece captures
- public illegal attempts
- promotion announcements
- stalemate is a loss

RAND is one of the clearest examples of how referee language changes the
mathematics of the game. A source-square pawn-try announcement is more
informative than a bare yes/no answer, and stalemate-as-loss changes endgame
incentives.

## English and CrazyKrieg

The platform's `english` ruleset uses `Any?` with one required pawn-capture try
after a positive answer. If that try is illegal, the player is released and may
make any legal move. This captures an important problem-tradition rhythm:
question, forced test, then deduction.

`crazykrieg` adds crazyhouse-like reserves to the hidden-information setting.
Its information design is deliberately explicit in some places and hidden in
others:

- reserves are public
- drop squares are hidden
- captures announce exact reserve identity
- the same one-failed-pawn-try release after `Any?` applies

CrazyKrieg is not just chess Kriegspiel with drops. Public reserves create a
new public resource economy, while hidden drop squares keep the central
uncertainty intact.

## Comparison table

| Ruleset | Illegal attempts | Pawn-try / Any? | Capture announcements | Other rules |
| --- | --- | --- | --- | --- |
| English problem tradition | Public illegal announcement | `Are there any?` is central | Depends on convention | Problem texts may depend on specific `Any?`, try, and stalemate conventions |
| Berkeley | Public illegal announcement | No `Any?` in base platform variant | Capture square only | -- |
| Berkeley Any | Public illegal announcement | `Any?` supported; positive answer requires a legal pawn capture | Capture square only | -- |
| Wild 16 | Private illegal announcement | Counted next-turn pawn tries | Square plus pawn/piece type | -- |
| Cincinnati | Public illegal announcement | Binary next-turn pawn-capture availability | Square plus pawn/piece type | -- |
| RAND | Public illegal announcement | Source-square pawn-try announcements | Square plus pawn/piece type | Stalemated player loses; promotions announced, but not the promoted piece |
| English | Public illegal announcement | `Any?` plus one required pawn-capture try | Capture square only | -- |
| CrazyKrieg | Public illegal announcement | `Any?` plus one required pawn-capture try | Capture square plus exact reserve identity | Crazyhouse rules with public reserves and hidden drop squares |

This table is intentionally a draft. Each row should be checked against the
platform rules pages and source traditions before publication.

## Why this history matters for the site

Rulesets are not cosmetic variants. They determine what kind of reasoning a
player can do, what a bot can infer, what a composed problem means, and whether
an old paper is actually comparable to a modern platform game.

A Darkboard-style bot should start from Wild 16 because the Computer Olympiad
trail points there. Berkeley problems should be evaluated under Berkeley rules
because their notation and database assume that environment. Anderson-style
problems should not be casually translated into another ruleset without noting
which `Any?` and capture-announcement assumptions changed.

## Publication checklist

- Verify every platform ruleset row against the current rule documents.
- Add direct citations for Berkeley, ICC/Wild 16, Ciancarini, Anderson, Shapley,
  and Ferguson.
- Decide whether to include examples from existing platform games.
- Add one worked position showing how a different announcement changes the
  solution.
- Make the comparison table precise enough to be used as operator memory.
