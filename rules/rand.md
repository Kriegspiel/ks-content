---
title: "RAND"
slug: "rand"
summary: "J. D. Williams's 1950 RAND reference: pawn-try squares, typed captures, promotion announcements, and rebuff counts."
publishedAt: "2026-04-26"
updatedAt: "2026-05-22"
author: "Kriegspiel Team"
tags: ["rules", "rand", "historical"]
draft: false
lifecycle: published
version: "1.0.3"
revision: "rules-rand-r4"
lastReviewedAt: "2026-05-22"
---

Standard chess rules apply, with the following additions and elucidations.

1. Personnel: two players, referee, kibitzers.

2. Each player has a complete chess set: board, black men, and white men.

3. A player may freely rearrange the men of the opposite color on his board. These men have no official role in the game.

4. The players may not see each other's boards and men.

5. A referee monitors the game, preferably using a third chess set that neither player may see, and announces:

   1. whose turn it is to move;

   2. on which squares the mover's pawns have currently valid options, or "tries", to make captures;

   3. each rebuff, or "no", experienced by the mover in attempting to move;

   4. the fact that a capture has taken place, where it happened, and the category of the man captured, using the dichotomy "pawn" or "piece";

   5. checks, which are announced by whichever of the following is or are correct:

      1. check on a long diagonal;

      2. check on a short diagonal, where the diagonals considered are the pair that intersect at the king;

      3. check on a rank, or "horizontal";

      4. check on a file, or "vertical";

      5. check by a knight;

   6. the fact that a pawn promotes, but not the piece promoted to or the location of the promotion;

   7. checkmate and stalemate.

6. The referee does not review announcements more than one move old, and does not recapitulate losses.

7. The referee does not announce in the usual manner rebuffs obtained by attempts to move that are illegal per se. Examples include moves to or through a square occupied by one's own man, diagonal movement of a rook, and attempts to remove check other than by moving the king, interposing, or capturing in a way compatible with the announced character of the check. A special rebuff, for example "hell, no", is used here.

8. The referee tries to eliminate errors. For example, if the player misidentifies the square named in an announcement, the referee will correct him if it can be done without significant information accruing to the player. Referee blunders range from trivial to catastrophic; remedies include general reprimand, reverse play, and declaring a game void.

9. A player may, before moving, demand a count of the rebuffs, or no's, sustained by his opponent on the last move. He may in fact demand recapitulations before the opponent completes his move.

10. A player may attempt any move that is compatible with his own situation, men, deployment, and the referee's current announcement. He is not required to remember previous plays or make logical inferences.

11. A move is completed when a piece touches the board, or a presumed enemy piece, on a legally admissible square.

12. En passant capture options are announced in the same manner as other options are announced. The fact that they are en passant is not specified.

13. Castling may be done in the presence of the enemy provided the king does not use or transit an affected square.

14. The referee's arrangement is always final in the event of a dispute over the position of players' pieces. Indeed, all referee decisions are final.

15. Check by a pawn is announced as if it were check by a bishop or queen, but without stating that it is a pawn.

16. When a check exists, only those pawn options, or tries, are announced which, if taken, will eliminate the check.

17. The designations used for squares are with reference to the mover. For example, if White captures on his king's-bishop eight, the event takes place on Black's king's-bishop square.

18. Kibitzers: the game is a spectator sport par excellence, and everything is done to keep it so. Kibitzers have the right to criticize the play, the players, and the referee. However, the ethics of the situation require that kibitzers never intentionally give useful information to the players. Probably the game breaks down as the number of kibitzers increases indefinitely; even with half a dozen, a pinned pawn has but small chance of not being found in a false-try situation.

19. It is considered ethical for a player to capitalize on blunders and all unsolicited information received from the referee and kibitzers. A player may solicit "information" from his opponent or otherwise heckle.

20. For ladder games, the stalemate rule is currently modified: the stalemated player loses.

*Original source: J. D. Williams, "Kriegsspiel rules at RAND", 1950. Via Paolo Ciancarini's [La Scacchiera Invisibile](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/scacchierainvisibile.pdf).*

---

## Kriegspiel.org online implementation note

The RAND rules allow a player to demand the count of the opponent's previous rebuffs or "no" answers. On Kriegspiel.org, RAND rebuffs are public in the referee log, so the count is visible from the log rather than exposed as a separate player action.
