---
title: "Berkeley kriegspiel rules"
slug: "berkeley"
summary: "Classic referee calls: No/Nonsense, capture square, directional checks."
publishedAt: "2026-03-27"
updatedAt: "2026-05-22"
author: "Kriegspiel Team"
tags: ["rules", "berkeley"]
draft: false
lifecycle: published
version: "1.0.2"
revision: "rules-berkeley-r4"
lastReviewedAt: "2026-05-22"
changelogSlug: "2026-03-27-slice-940-trust-discoverability"
---
## I. Introduction:

Kriegspiel is a partially observable variant of chess, in which the players cannot see the pieces or moves of their opponents. Because of this restriction, Kriegspiel cannot be played on a single chessboard; instead, playing in person requires three chessboards and a referee. Players sit back-to-back with the referee between them. The referee has the official board, upon which an ordinary-looking chess game is being played (at the direction of the players). Each player has a board with her own pieces in the correct locations, and is free to place her opponents' pieces wherever she likes (this placement, however, has no effect on the outcome of the game). When playing Kriegspiel online, the computer can serve as the referee. 

Several regional variants of Kriegspiel exist, which are similar in concept but differ in (primarily) the observation model. While the rules described here are very similar to some other rule sets, they are not identical to any that we know of. Thus, to prevent possible confusion, we will call this the "Berkeley" variant of Kriegspiel for the time being; if you know of a pre-existing name for this variant, please e-mail me at jawolfe AT berkeley.edu.

## II. Piece movement:

The rules for piece movement in Kriegspiel are identical to the piece movement rules of chess. This includes piece blocking, checks, captures, check/stalemates, and the special chess moves: castles, en-passant captures, and pawn promotions. 

Because a potential chess move can be blocked or leave a player in check, its legality depends on the locations of the opponent's pieces. However, in Kriegspiel, players generally don't know where these pieces are. This is where the referee comes into play: on each turn players are free to try moves that are potentially legal on their own board (including pawn captures). The referee (but not the opponent) can see these attempted moves, and after each one he announces "Yes" or "No". When he announces "No", the move is illegal on his (the true) board; the player then must try another move. This process continues until the player selects a legal move (and thus the referee announces "Yes"), ending her turn and beginning her opponent's. 

## III. The referee:

If the referee's announcements were limited to just "Yes" and "No", Kriegspiel wouldn't be a very interesting game (or at least not very enjoyable to play). In fact, the referee also announces several other conditions, which give players more information about the true board state. The variants of Kriegspiel differ primarily in the type of announcements the referee gives. In the variant described here, *all announcements are heard by both players*; only the true board position and attempted moves are hidden. 

### A. Legality:

After each attempted move, the referee announces "No" if the move is illegal, or "Yes" if it is legal. To prevent players from being misleading (and wasting time), the referee will announce "Nonsense" if a player attempts a move that is illegal on her own board or attempts the same move multiple times on the same turn. However, unlike in some other variants of Kriegspiel, the referee should not take a player's knowledge of her opponent's pieces into account. For example, even though White knows (and the referee knows that White knows) that she has no legal pawn captures on the first move of the game, the referee will still announce "No" rather than "Nonsense" if White attempts one. "Nonsense" moves and responses are not recorded as part of the move history, since they have no informational value and thus no effect on the outcome of the game. 

### B. Capture:

Once the referee has accepted a move as legal (by saying "Yes"), he makes this move on his board. If the move is a capture, he announces the square of the piece captured to both players (i.e. "Capture at d4"); if no capture has occurred, nothing is announced. The referee does not announce the identity of the captured or capturing piece. En passant pawn captures are announced as ordinary captures.
 
### C. Check:

Along with the capture response, the referee announces when check has occurred, and the direction(s) along which the king has been checked. These directional announcements are "Rank", "File", "Short (diagonal)", "Long (diagonal)", and "Knight", and they refer to the direction *from the king* to the checking piece. As in ordinary chess, players are not allowed to move into check; if they attempt to do so, the move will be rejected with a "No". 

### D. Checkmate and stalemate:

As in chess, mate in Kriegspiel occurs when the player-to-move has no legal moves. However, since Kriegspiel players don't know in advance what moves are legal, it is also up to the referee to announce check/stalemates. If, after accepting a player's move, the opponent has no legal moves, the referee will announce "Checkmate" if she is in check, or "Stalemate" otherwise. This ends the game, at which point the players are allowed to see the true board position. 

### E. Not announced:

The special moves in chess (castling, en-passant capture, and pawn promotion) are not specifically announced by the referee; instead, the referee simply proceeds as usual. In the case of pawn promotion, the player must indicate the desired promotion piece type to the referee secretly.

Because it is often advantageous for players to attempt all pawn captures before attempting other moves on a turn, many Kriegspiel variants have an "Any?" rule; this rule allows players to ask the referee if they have any legal pawn captures, to speed up game play. Our Kriegspiel rules do not include an "Any?" rule, since computer play renders it largely unnecessary. They are, however, compatible with the following "Any?" rule, which has no effect on the structure of the game: a player may ask the referee "Any?" secretly during her turn; the referee responds secretly; when the response is "Try" (Yes), the player must attempt pawn captures until one is legal; when the response is "No", the number of possible pawn captures is added to the number of illegal moves tries reported to the opponent.

## IV. Checkmate and stalemate:

There are several special situations that arise in chess concerning checkmates and stalemates: 

### A. Stalemate rules:

Chess has two special stalemate rules, under which a position can be declared a draw regardless of material on the board and whether the player-to-move has any legal moves. First, a position can be declared a draw when the same board position is repeated three times. This rule does not apply in Kriegspiel, because although a board position may be repeated, the game state (which includes the belief states of both players) is generally not repeated. Second, chess has a rule where a game can be declared a draw after 50 consecutive reversible moves. By similar reasoning (players can make "progress" in belief-state space without making progress in the true board position), this rule does not apply in Kriegspiel. 

### B. Material stalemates:

In chess, there are certain combinations of material under which a checkmating scenario simply cannot arise. If a game is reduced to one of these combinations, it is declared a stalemate (draw). Because every Kriegspiel checkmate is also a chess checkmate, these combinations of material are also stalemates in Kriegspiel. 

Specifically, a player must have at least a queen, rook, two bishop/knights, or a pawn to checkmate. Thus, when both players have no pieces or only a single knight or bishop, the referee announces stalemate. Note that while it is not possible to force checkmate with only two knights, it is possible for a checkmate scenario to arise with the opponent's cooperation. 

### C. Material checkmates:

In chess, if a player has adequate material against a lone king, she can always follow a fairly simple algorithm to force checkmate. Adequate material is defined as a queen, rook, non-edge pawn, two bishops, or a bishop and knight (assuming that the opponent's king cannot immediately capture said material). Interestingly, similar material forced checkmates exist in Kriegspiel, despite the fact that a player cannot see the location of her opponent's king. 

In fact, all of the above combinations of material can be used to force mate in Kriegspiel with arbitrary certainty. With a rook, queen, or non-edge pawn against a singleton king, a player can mate with probability 1, although this may require an unbounded number of moves (the expected number of moves, however, is bounded). In the other two scenarios (two bishops or bishop and knight), a forced mate can be achieved with probability 1-epsilon; epsilon can be made arbitrarily small, if the player with the advantage is willing to wait arbitrarily long to checkmate.

For the purpose of the checkmate problems we provide, positions with material forced checkmates (including epsilon checkmates) are considered to be immediate checkmate positions. To ensure that the opposing king cannot immediately capture the checkmating material, we only declare these positions to be checkmates when the player's king is protecting said material. For example, if a player can certainly reduce a position to KQvK with her king protecting her queen in one move, this is considered a forced checkmate in one move.

*Taken from [w01lfe's Berkeley rules](http://w01fe.com/berkeley/kriegspiel/rules.html).*

---

## Kriegspiel.org online implementation note

The Berkeley text above intentionally excludes ordinary chess repetition and fifty-move draws. Kriegspiel.org follows that interpretation for Berkeley play, with one online-engine addition: if the half-move clock reaches 2,000 consecutive half-moves without a pawn move or capture, the game is declared drawn to keep games finite.

---

## Berkeley kriegspiel rules with "Any" modification

This is the same Berkeley ruleset above, with one extra public referee announcement for online play.

- During her turn, a player may ask: `Are there any pawn captures?`
- The referee answers publicly: `Has pawn captures` or `No pawn captures`.
- If the answer is `Has pawn captures`, the player must complete a legal pawn capture on that turn.

This modification is useful online because the question cannot stay secret, and otherwise every pawn-capture try would become visible in the referee log anyway. It also adds a bit more public information to the game.
