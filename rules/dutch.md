---
title: "Dutch kriegspiel rules"
slug: "dutch"
summary: "A documented historical/composition ruleset note: Dutch rules identify whether the capturing man was a pawn or a piece."
publishedAt: "2026-05-25"
updatedAt: "2026-05-25"
author: "Kriegspiel Team"
tags: ["rules", "dutch", "historical", "problems"]
draft: false
lifecycle: published
version: "1.0.0"
revision: "rules-dutch-r1"
lastReviewedAt: "2026-05-25"
---

Dutch rules are included here as a documented historical and composition ruleset, not as a currently playable Kriegspiel.org ruleset.

The source trail is thin. What we can document is one important referee-announcement difference used in a Henk Swart mate-in-two problem preserved by Paolo Ciancarini:

- after a capture, Dutch rules identify whether the capture was made by a pawn or by a piece;
- the exact kind of non-pawn piece is not given in the known example;
- this is information about the capturing man, not the captured man.

For example, if Black captures on `e4`, Dutch rules can distinguish:

- `...dxe4`, announced as a capture on `e4` made by a pawn;
- `...Bxe4`, announced as a capture on `e4` made by a piece.

That distinction is different from Cincinnati, Wild 16, and RAND style capture announcements, which identify whether the captured man was a pawn or a piece.

## Composition context

The known Dutch-rules use case on this site is Swart's problem in [Problems from La Scacchiera Invisibile](/blog/la-scacchiera-invisibile-problems), Diagram 7.6.

In that position, the two black defenses `...dxe4` and `...Bxe4` reach the same capture square but require different mates. Ordinary capture-square information is not enough to distinguish them. Ciancarini records Swart's explanation that Dutch rules announce whether the capture was made by a pawn or by a piece, making the problem solvable under that convention.

## What is not yet known

We have not yet found a complete independent Dutch rules document. In particular, the current sources do not fully settle:

- whether the pawn-or-piece capturing-man announcement applies to every capture, or only in some "Any?" problem contexts;
- the full wording of illegal-move, check, promotion, stalemate, and draw announcements;
- whether Dutch table play had a stable club rulebook, or whether this was mainly a problem-composition convention.

Until those questions are answered, Dutch should be treated as a documented historical/composition rule note rather than a complete online-play specification.

## Source note

The strongest source currently available is Paolo Ciancarini's [La Scacchiera Invisibile](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/scacchierainvisibile.pdf), Version 0.9, dated 11 May 2004. The same rule is repeated in Andrea Bolognesi's [Analisi e progettazione di un programma di gioco ad informazione imperfetta](https://www.cs.unibo.it/cianca/wwwpages/chesssite/bolognesi.pdf), but that thesis explicitly draws its Kriegspiel rules discussion from Ciancarini's manuscript, so it should be treated as derivative confirmation rather than an independent primary source.

We are looking for better references: a Dutch club rule sheet, a problem-publication source, Swart's original *Any in Action!*, or any other primary description of this variant. If you know one, please email [any@kriegspiel.org](mailto:any@kriegspiel.org).

---

## Kriegspiel.org online implementation note

Dutch rules are not currently playable on Kriegspiel.org. The page exists so the rules index and comparison material can describe a documented historical/composition convention without implying engine support.
