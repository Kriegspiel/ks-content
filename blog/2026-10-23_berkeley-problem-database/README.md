---
title: "The Berkeley Kriegspiel problem database"
slug: "berkeley-problem-database"
summary: "A draft guide to Jason Wolfe and Stuart Russell's Berkeley Kriegspiel problem database, filtered PGN records, and why the set matters for benchmarks and solver work."
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "Kriegspiel Team"
tags: ["berkeley", "problems", "benchmarks"]
draft: true
lifecycle: draft
---

The Berkeley Kriegspiel problem database is one of the most practical public
resources in the research trail around Jason Wolfe and Stuart Russell. It does
something rare for hidden-information chess: it gives named problems, recorded
histories, and a notation format that can preserve what a player knew, not only
what was true on the hidden board.

This draft explains what the database is, why filtered PGN matters, and how the
problem set could guide future platform benchmarks or solver work.

Primary starting points:

- [Berkeley problem database](https://w01fe.com/berkeley/kriegspiel/problems.html)
- [Berkeley rules](https://w01fe.com/berkeley/kriegspiel/rules.html)
- [Berkeley PGN notation](https://w01fe.com/berkeley/kriegspiel/notation.html)
- [Efficient Belief-State AND-OR Search, with Application to Kriegspiel](https://people.eecs.berkeley.edu/~russell/papers/ijcai05-krieg.pdf)

## Why the database matters

Most Kriegspiel sources explain ideas. The Berkeley database gives testable
objects. That distinction matters because hidden-information claims are easy to
state and hard to reproduce.

If a paper says a method solves a problem, a reader needs to know the exact
rules, the initial visible position, the hidden history, the referee messages,
and the player's perspective. Ordinary chess notation is not enough, because an
ordinary PGN record reveals too much.

The Berkeley pages solve that by placing three things near each other:

1. a concrete rules page
2. a filtered PGN notation
3. a database of problems

Together, those sources make a small benchmark ecosystem.

## Filtered PGN is the key idea

In ordinary chess, a PGN game is a complete visible history. In Kriegspiel, that
would leak information. The player on move does not know the opponent's pieces,
the opponent's exact moves, or sometimes even why a try failed.

Filtered PGN records the game from a player's perspective. It can preserve:

- attempted moves
- accepted moves
- rejected illegal attempts
- referee announcements
- visible own-piece moves
- hidden opponent movement as experienced by the player
- check or capture information in the form the ruleset allows

That makes filtered PGN a natural bridge between composed problems and software
tests. A solver can be given the same information the player had, not the
omniscient referee state.

## What the problems test

The database includes mate and near-miss instances. Both are useful.

Mate problems test whether a method can find a forcing strategy under
uncertainty. The strategy may need to branch on referee messages rather than on
visible opponent moves. A correct solution is a policy, not just a line.

Near-miss problems are just as important. They test whether a solver can avoid
being fooled by a move that almost works but fails under one hidden reply or one
referee response. In ordinary chess, a near-miss is often a tactical refutation.
In Kriegspiel, it can be an information refutation: the player cannot tell which
mate is needed at the decisive moment.

This is exactly the kind of distinction a belief-state search algorithm should
handle.

## Relationship to Wolfe and Russell

The database belongs beside Wolfe and Russell's Berkeley research line,
especially the IJCAI 2005 paper on efficient belief-state AND-OR search. That
paper frames Kriegspiel as a partially observable search problem, where a
program must reason over sets of possible worlds and observation-conditioned
plans.

The problem database gives concrete cases where that framing can be tested.
Instead of asking whether an engine plays good full games, one can ask whether
it solves small, carefully shaped positions.

That makes Berkeley complementary to Bologna. Bologna gives a broad trail
toward practical Darkboard play, metapositions, MCTS, and ICC tournaments.
Berkeley gives a tighter trail around rules, notation, problems, and
belief-state search.

## What the platform could do with it

The database suggests several possible platform features:

- import selected problems as static study pages
- render filtered PGN as player-perspective replay
- create backend tests for legal attempts and referee messages under Berkeley
  rules
- create solver benchmarks for `ks-game` or a future problem-solver package
- compare Berkeley problems with English `Any?` problems from Anderson and
  Ciancarini
- use near-miss positions as regression tests for hidden-information safety

The most immediate value is probably not a user-facing puzzle interface. It is
a benchmark harness. A small set of imported Berkeley problems could become
repeatable tests for:

- ruleset fidelity
- player projection
- notation parsing
- belief-state search
- problem-solution validation

## Import questions

Before importing anything, the project needs to answer practical questions:

- What rights apply to the problem database and notation?
- Should imported problems preserve Berkeley labels exactly?
- Should filtered PGN be stored as source material, parsed data, or both?
- How much of the original hidden state is needed to validate a solution?
- Should problem pages show only player-perspective information, or also a
  referee view after the solution?
- Do we need a dedicated `ks-content/problems/` collection, or should problems
  remain inside blog posts until the interface is designed?

The answer may be phased. Start with a blog explanation and a few manually
checked examples. Move to structured imports only after the notation and rights
questions are settled.

## A possible benchmark shape

A future benchmark could represent each problem as:

```yaml
id: berkeley-example
ruleset: berkeley
source: "Berkeley Kriegspiel problem database"
sourceUrl: "https://w01fe.com/berkeley/kriegspiel/problems.html"
initialPerspective: white
filteredPgn: "..."
stipulation: "White to move and mate"
expectedResult: forced-mate
rightsStatus: needs-review
```

The benchmark runner would load the filtered history, reconstruct the player's
information state, then ask a solver for a policy. The policy would be checked
against all hidden states still compatible with the record.

That last sentence is the hard part. It is also the reason the database is
interesting.

## Publication checklist

- Verify the database contents and terminology directly against the Berkeley
  pages.
- Read the PGN notation page closely enough to summarize filtered records
  accurately.
- Pick one small example and explain why ordinary PGN would leak too much.
- Decide whether to discuss import rights here or defer that to the source
  mirror policy post.
- Connect the post to future benchmark work without promising an implementation
  schedule.
