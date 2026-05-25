---
title: "A research map of Kriegspiel"
slug: "kriegspiel-research-map"
summary: "A compact guide to public Kriegspiel research, key papers, and the academic history around the game."
publishedAt: "2026-04-18"
updatedAt: "2026-05-25"
author: "Kriegspiel Team"
tags: ["research", "history", "academia"]
draft: false
lifecycle: published
---

Kriegspiel is a small game with an outsized research footprint. On the surface, the game looks like chess. Under hidden information, ordinary move search becomes a problem of belief states, partial observability, referee announcements, and uncertainty.

The public academic record mirrors that complexity. One strand runs through an older English problem tradition, from Gerald Frank Anderson toward Thomas Ferguson. Another runs through later AI work, especially the Bologna line around Paolo Ciancarini and collaborators and the Berkeley line around Jason Wolfe and Stuart Russell. Between those strands stands Lloyd Shapley, less a neat publication cluster than a bridge figure linking RAND, UCLA, and a manuscript-heavy body of Kriegspiel thought. A Japanese and Shogi-adjacent line around Makoto Sakuta, Hiroyuki Iida, and Jin Yoshimura, along with a Maryland line around Austin Parker, Dana Nau, and V. S. Subrahmanian, rounds out the picture.

This post is not a complete bibliography of every Kriegspiel paper ever written. Instead, it offers a practical map of the public materials that trace the modern research history of the game. The aim is less exhaustiveness than orientation: enough structure to show how the main lines connect, where the anchor papers sit, and which sources deserve attention first.

One especially useful secondary index in that search was the Chessprogramming wiki's [KriegSpiel page](https://www.chessprogramming.org/KriegSpiel). The page is no substitute for the primary papers, but it works very well as a cross-check, collecting publication links, Computer Olympiad notes, and wider context such as Henry Michael Temple's 1899 origin story and the ICC / Wild 16 rules line.

## Book-length sources and problem collections

The Kriegspiel bibliography is not only a paper trail. A few books, booklets, and manuscript collections carry parts of the game culture that the AI papers usually treat as background: rules traditions, practical play, composed problems, and endgame technique.

The direct book-length sources are sparse enough to list separately:

| Date | Source | Why it matters |
| --- | --- | --- |
| ca. 1900/1905 | H. Cayley, [Kriegspiel, or, The Chess War Game](https://www.worldcat.org/oclc/40577938) | An early dedicated booklet from the game's first public era. The exact catalogue date varies, but it belongs in the origin trail around Temple's English chess variant. |
| 1958/1959 | Gerald Frank Anderson, [Are There Any? A Chess Problem Book](https://www.worldcat.org/oclc/4426185) | The key book-length source for the English problem tradition and the "Are there any?" rules culture. |
| 1987 | Lloyd S. Shapley, [The Invisible Chessboard](https://harlowshapley.org/s/Kriegspiel-rules-and-Lloyd-Shapley-demo.pdf) | An unpublished manuscript and problem collection rather than a commercial book, but central to the RAND/UCLA line. |
| 1994 | David H. Li, [Kriegspiel: Chess Under Uncertainty](https://www.worldcat.org/oclc/30382902) | The main modern English-language book devoted to Kriegspiel as a playable chess variant. |
| 1995 | David H. Li, [Chess Detective: Kriegspiel Strategies, Endgames and Problems](https://www.worldcat.org/oclc/32819468) | A companion volume focused on deduction, strategy, endgames, and problems. |
| 2004 | Paolo Ciancarini, [La Scacchiera Invisibile](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/scacchierainvisibile.pdf) | A book manuscript that connects the Bologna research line with rules history and a large problem collection. |

That list is deliberately narrower than the reference lists in some AI papers. Bridge, poker, Scrabble, and other imperfect-information game papers can be useful methodological context, but they are not Kriegspiel books and do not belong in the core book map.

## Before Bologna and Berkeley: Anderson and the English problem tradition

Anderson deserves a separate stop because [*Are There Any? A Chess Problem Book*](https://www.worldcat.org/oclc/4426185) is not just a bibliographic curiosity.

The book does not belong to the later Bologna or Berkeley AI lines. Instead, it belongs to an older English Kriegspiel problem tradition, centered more on composed problems and referee logic than on modern search algorithms. That difference is exactly what makes the source valuable.

The date carries a small ambiguity in later references. Thomas Ferguson cites it as a `1958` book in his UCLA paper on Kriegspiel endgames, while Edward Winter refers to it as Anderson's `1959` book, and Ciancarini's *La Scacchiera Invisibile* treats it as the classic Anderson source on Kriegspiel problems. A cautious citation form is Gerald Frank Anderson, [Are There Any? A Chess Problem Book](https://www.worldcat.org/oclc/4426185) (`1958/1959`).

The title itself is a piece of Kriegspiel history. "Are there any?" is the famous English-rule question about whether there are any legal pawn tries available. That makes the book more than a bibliography footnote: it captures a whole rules culture around the game.

## UCLA: the mathematical endgame line

UCLA deserves direct attention because Thomas S. Ferguson's Kriegspiel work represents a different kind of contribution: a mathematical line focused on endgames rather than full playing systems.

The central publication is Ferguson's [Mate with bishop and knight in kriegspiel](https://www.math.ucla.edu/~tom/papers/ks.pdf), published in *Theoretical Computer Science* in 1992. The UCLA-hosted PDF is still available, and the paper is substantial rather than incidental. The main result is striking: king, bishop, and knight can defeat king alone in Kriegspiel with probability one, together with a constructive winning procedure.

That paper also ties the UCLA line backward to Anderson's English-rule tradition and forward to Shapley's work. UCLA still hosts related unpublished notes, including [Mate with the Two Bishops in Kriegspiel](https://www.math.ucla.edu/~tom/papers/unpublished/kriegbishop.pdf) and [On a Kreigspiel Problem of Lloyd Shapley](https://www.math.ucla.edu/~tom/papers/unpublished/kriegshap.pdf). Taken together, the material feels less like a software program than a small but elegant tradition of mathematical endgame analysis.

## Lloyd Shapley: the bridge figure worth listing directly

Lloyd S. Shapley was one of the founding giants of game theory, later a Nobel laureate, first at RAND and later at UCLA. He was also a serious Kriegspiel player, problem composer, and theorist of the game. The public record around his Kriegspiel work is simply less tidy than the Bologna or Berkeley clusters: fewer journal papers, more manuscripts, problem collections, rules packets, and later papers built around his ideas.

That uneven record helps explain why earlier drafts gave the line too little weight. The issue was not importance, but format: archival and manuscript-based material is harder to spot than a clean journal trail.

For background on Shapley, the clearest short public references are UCLA's [Nobel profile and reminiscence](https://newsroom.ucla.edu/stories/colleagues-at-ucla-applaud-lloyd-239730), the [Game Theory Society memorial](https://gametheorysociety.org/in-memoriam-lloyd-s-shapley-1924-2016/), and the [Harlow Shapley Project's Lloyd pages](https://harlowshapley.org/lloyd).

The clearest public anchor for that trail is Shapley's [The Invisible Chessboard](https://harlowshapley.org/s/Kriegspiel-rules-and-Lloyd-Shapley-demo.pdf), a 1987 unpublished manuscript and problem collection preserved in a public archival scan. Around that manuscript sit Ferguson's 1992 paper, the UCLA-hosted [On a Kreigspiel Problem of Lloyd Shapley](https://www.math.ucla.edu/~tom/papers/unpublished/kriegshap.pdf), Alexander Matros's 2018 retrospective [Lloyd Shapley and chess with imperfect information](https://eprints.lancs.ac.uk/id/eprint/89158/), and the Harlow Shapley Project's [Kriegspiel rules and Lloyd Shapley demo](https://harlowshapley.org/s/Kriegspiel-rules-and-Lloyd-Shapley-demo.pdf). Read together, those materials make the Shapley line feel archival rather than absent: scattered in form, but central in influence.

## Beyond the main hubs: Japan and Maryland

Another virtue of the Chessprogramming wiki is visibility beyond Bologna and Berkeley. The page makes it easier to see two smaller but important lines: a Japanese cluster around Kriegspiel-like solving methods, and a Maryland cluster built around large belief states and opponent models.

### Japan: Sakuta, Iida, and Kriegspiel-like solving

This line sits slightly adjacent to orthodox chess Kriegspiel rather than matching it exactly. Much of the work is framed through Tsuitate-Tsume-Shogi, or screen-shogi mating problems, but the underlying question is recognizably the same: how to search and solve game trees under uncertainty. If UCLA offers the cleanest mathematical endgame line, the Sakuta-Iida cluster offers the clearest line on solving methods, leaning toward proof-number search, AND/OR search, and deterministic treatment of uncertainty-heavy puzzles rather than full practical play on ICC.

### Japanese and Kriegspiel-like publications surfaced by the Chessprogramming wiki

| Year | Authors | Title | Venue or type |
| --- | --- | --- | --- |
| 2000 | Makoto Sakuta, Hiroyuki Iida, Jin Yoshimura | [A Deterministic Approach for Solving Kriegspiel-like Problems](https://www.chessprogramming.org/5th_Computer_Olympiad) | 5th Computer Olympiad Workshop |
| 2000 | Makoto Sakuta, Hiroyuki Iida | [Solving Kriegspiel-Like Problems: Examining Efficient Search Methods](https://link.springer.com/chapter/10.1007/3-540-45579-5_4) | Computers and Games 2000 |
| 2000 | Makoto Sakuta, Hiroyuki Iida | [Solving Kriegspiel-like Problems: Exploiting a Transposition Table](https://dblp.org/rec/journals/icga/SakutaI00) | ICGA Journal 23(4) |
| 2000 | Makoto Sakuta, Hiroyuki Iida, Jin Yoshimura | [Solving Problems under Uncertainty Paradigm](https://www.fit.ac.jp/~sakuta/research/tts-papers.html) | SSGRR 2000; listed on Sakuta's public research page |

### Maryland: Parker, Nau, and Subrahmanian

The Maryland line enters from a different angle. These papers are not about composed problems or endgame theory. The focus is huge belief states, statistical sampling, and opponent modeling in imperfect-information games, with Kriegspiel as a core testbed.

### Maryland papers

| Year | Authors | Title | Venue or type |
| --- | --- | --- | --- |
| 2005 | Austin Parker, Dana S. Nau, V. S. Subrahmanian | [Game-Tree Search with Combinatorially Large Belief States](https://www.cs.umd.edu/~nau/papers/parker2005game-tree.pdf) | IJCAI 2005 |
| 2006 | Austin Parker, Dana S. Nau, V. S. Subrahmanian | [Overconfidence or Paranoia? Search in Imperfect-Information Games](https://cdn.aaai.org/AAAI/2006/AAAI06-164.pdf) | AAAI 2006 |

Taken together, those papers sit very naturally beside the Berkeley belief-state work. They are not identical in framing, but they belong in the same conversation about search under hidden information.

## Bologna: the deepest public line

The deepest public cluster in the record is the Bologna one. The core source is Paolo Ciancarini's [Kriegspiel page](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/kriegspiel.html), backed by his [chess library page](https://www.cs.unibo.it/~cianca/wwwpages/chesssite/mychesspage.html) and Giampiero Favini's doctoral thesis, [The dark side of the board: advances in chess Kriegspiel](https://amsdottorato.unibo.it/id/eprint/2403/1/favini_gianpiero_tesi.pdf).

This is where the literature starts to feel less like a scattering of isolated papers and more like a sustained research program. What makes the Bologna line stand out is range. The work spans metapositions, practical playing programs, Monte Carlo Tree Search, retrograde endgame analysis, and the bridge from theory to strong ICC play.

The Chessprogramming wiki also helps preserve the competitive side of that story. It links the Olympiad notes around Darkboard, including [Darkboard wins KriegSpiel tournament](https://journals.sagepub.com/toc/icg/29/2) at the 11th Computer Olympiad and [Darkboard wins KriegSpiel tournament](https://www.chessprogramming.org/14th_Computer_Olympiad) at the 14th Computer Olympiad.

### A publication spine for the Bologna line

| Year | Title | Venue or type |
| --- | --- | --- |
| 1997 | [A Rational Approach to Kriegspiel](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/rational.pdf) | Advances in Computer Chess 8 |
| 2003 | [Computer Programming of Kriegspiel Endings](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/endings.pdf) | Advances in Computer Games 10 |
| 2004 | [Searching over Metapositions in Kriegspiel](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/metapositions.pdf) | Computer and Games 2004 |
| 2007 | [Representing Kriegspiel States with Metapositions](https://www.ijcai.org/Proceedings/07/Papers/394.pdf) | IJCAI 2007 |
| 2007 | [Moving in the Dark: Progress through Uncertainty in Kriegspiel](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/2007Amsterdam.pdf) | Computer Games Workshop 2007 |
| 2007 | [A Program to Play Kriegspiel](https://doi.org/10.3233/ICG-2007-30102) | ICGA Journal |
| 2009 | [Solving Kriegspiel endings with brute force: the case of KR vs. K](https://cris.unibo.it/handle/11585/83676) | Advances in Computer Games 12 |
| 2009 | [Monte Carlo Tree Search Techniques in the Game of Kriegspiel](https://www.ijcai.org/Proceedings/09/Papers/086.pdf) | IJCAI 2009 |
| 2010 | [Progress through uncertainty in some Kriegspiel endings](https://doi.org/10.1109/TCIAIG.2010.2048711) | IEEE Transactions on Computational Intelligence and AI in Games |
| 2010 | [Monte Carlo Tree Search in Kriegspiel](https://doi.org/10.1016/j.artint.2010.04.017) | Artificial Intelligence |
| 2010 | [Retrograde analysis of Kriegspiel endgames](https://cris.unibo.it/handle/11585/93683) | IEEE Conference on Computational Intelligence and Games |
| 2010 | [Algorithmic explorations of a well known wargame](https://cris.unibo.it/handle/11585/108400) | SING 2010 |
| 2010 | [Playing the perfect Kriegspiel endgame](https://doi.org/10.1016/j.tcs.2010.05.019) | Theoretical Computer Science |
| undated on page | [La Scacchiera Invisibile](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/scacchierainvisibile.pdf) | Book manuscript in progress |

### Theses and surrounding academic work

| Year | Author | Title |
| --- | --- | --- |
| 1993 | Francesco Maran | [Razionalità Sostanziale e Procedurale nel Kriegspiel](https://www.cs.unibo.it/~cianca/wwwpages/chesssite/Maran.pdf) |
| 2002 | Marco Collareda | [Progetto e Realizzazione di un programma cliente per Internet Chess Club](https://www.cs.unibo.it/~cianca/wwwpages/chesssite/collareda.pdf) |
| 2003 | Andrea Bolognesi | [Analisi e progettazione di un programma di gioco ad informazione imperfetta](https://www.cs.unibo.it/~cianca/wwwpages/chesssite/bolognesi.pdf) |
| 2003 | Gian Piero Favini | [A Java Interface for Kriegspiel on ICC](https://www.cs.unibo.it/~cianca/wwwpages/chesssite/favini.pdf) |
| 2006 | Gian Piero Favini | [A program to play Kriegspiel](https://www.cs.unibo.it/~cianca/wwwpages/chesssite/favini2.pdf) |
| 2010 | Gian Piero Favini | [The dark side of the board: advances in chess Kriegspiel](https://amsdottorato.unibo.it/id/eprint/2403/1/favini_gianpiero_tesi.pdf) |

If a single starting point is needed, begin with Favini's thesis. No other document comes closer to a one-stop synthesis of the Bologna line.

## Berkeley: a tighter line around belief-state search

The Berkeley trail is smaller, but exceptionally crisp. The main public hub is Jason Wolfe's [Berkeley page](https://w01fe.com/berkeley/), which links a dedicated [Berkeley Kriegspiel rules page](https://w01fe.com/berkeley/kriegspiel/rules.html), a [Kriegspiel problem database](https://w01fe.com/berkeley/kriegspiel/problems.html), and a [Kriegspiel PGN notation spec](https://w01fe.com/berkeley/kriegspiel/notation.html).

Compared with Bologna, Berkeley's contribution looks less like a long endgame-solving program and more like a focused line on belief-state search for partially observable games.

### Core Berkeley papers

| Year | Authors | Title | Venue or type |
| --- | --- | --- | --- |
| 1972 | C. S. Wetherell, T. J. Buckholtz, K. S. Booth | [A Director for Kriegspiel, a Variant of Chess](https://doi.org/10.1093/comjnl/15.1.66) | The Computer Journal |
| 2005 | Stuart Russell, Jason Wolfe | [Efficient Belief-State AND-OR Search, with Application to Kriegspiel](https://people.eecs.berkeley.edu/~russell/papers/ijcai05-krieg.pdf) | IJCAI 2005 |
| 2007 | Jason Wolfe, Stuart Russell | [Exploiting Belief State Structure in Graph Search](https://w01fe.com/berkeley/pubs/07-icaps_games-graph.pdf) | ICAPS Workshop on Planning in Games |

The 1972 paper deserves special notice because it is an early Berkeley-connected systems paper about using programs as Kriegspiel directors. The Wolfe and Russell papers align more closely with the modern AI framing: belief states, AND-OR search, and structured search in partially observable spaces.

What gives the Berkeley material lasting value is not only the papers themselves. The [Berkeley rules page](https://w01fe.com/berkeley/kriegspiel/rules.html) fixes a concrete local ruleset rather than assuming a universal standard. The [Kriegspiel problem database](https://w01fe.com/berkeley/kriegspiel/problems.html) turns abstract search claims into benchmarkable test sets. The [Kriegspiel PGN notation spec](https://w01fe.com/berkeley/kriegspiel/notation.html) treats hidden-information game records as something worth standardizing rather than improvising.

## What this research map says

The Bologna and Berkeley lines overlap, but they do not quite point in the same direction. UCLA turns Kriegspiel into a setting for precise endgame mathematics. Shapley turns the game into a meeting point between problem culture, informal theory, and later formal analysis. Sakuta and Iida treat Kriegspiel, or very close relatives, as a home for uncertainty-aware solving methods. Parker, Nau, and Subrahmanian use the game as a testbed for large belief states, sampling, and opponent models.

Bologna represents the broadest sustained program in the public record: representation, search, endgames, Monte Carlo Tree Search, and strong practical play. Berkeley is narrower and cleaner: define a local ruleset, build benchmarks, and attack belief-state search directly. Together, those lines explain why Kriegspiel keeps attracting researchers. More than a chess variant, the game remains a compact laboratory for reasoning under hidden information.

A workable reading order is:

1. Begin with Anderson's *Are There Any?* for the older English problem-book tradition.
2. Add David H. Li's *Kriegspiel: Chess Under Uncertainty* and *Chess Detective* for modern practical play, strategy, endgames, and problems.
3. Read Ferguson's [Mate with bishop and knight in kriegspiel](https://www.math.ucla.edu/~tom/papers/ks.pdf) for the UCLA mathematical line.
4. Read Shapley's [The Invisible Chessboard](https://harlowshapley.org/s/Kriegspiel-rules-and-Lloyd-Shapley-demo.pdf) and Ferguson's [Shapley note](https://www.math.ucla.edu/~tom/papers/unpublished/kriegshap.pdf) for the RAND/UCLA bridge.
5. Read the Sakuta-Iida line, starting with [Solving Kriegspiel-Like Problems: Examining Efficient Search Methods](https://link.springer.com/chapter/10.1007/3-540-45579-5_4).
6. Read Ciancarini's [Kriegspiel page](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/kriegspiel.html) to see the Bologna arc in one place.
7. Read Favini's [doctoral thesis](https://amsdottorato.unibo.it/id/eprint/2403/1/favini_gianpiero_tesi.pdf) for the strongest single Bologna document.
8. Read Parker, Nau, and Subrahmanian's [Game-Tree Search with Combinatorially Large Belief States](https://www.cs.umd.edu/~nau/papers/parker2005game-tree.pdf).
9. Read Russell and Wolfe's [IJCAI 2005 paper](https://people.eecs.berkeley.edu/~russell/papers/ijcai05-krieg.pdf).
10. Then read Wolfe and Russell's [2007 workshop paper](https://w01fe.com/berkeley/pubs/07-icaps_games-graph.pdf).
11. Keep the Chessprogramming wiki's [KriegSpiel page](https://www.chessprogramming.org/KriegSpiel) open as a secondary index while reading. The page fills in the Sakuta-Iida line, the Parker-Nau line, and the Olympiad record around Darkboard.

That sequence brings one broad research tradition and one especially clean belief-state tradition into view, a strong starting map for modern Kriegspiel software work.
