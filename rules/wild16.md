---
title: "Wild 16 / ICC kriegspiel rules"
slug: "wild16"
summary: "Detailed ICC-style kriegspiel rules: illegal attempts stay private, captures are typed, and pawn tries are announced as a count."
publishedAt: "2026-03-27"
updatedAt: "2026-05-22"
author: "Kriegspiel Team"
tags: ["rules", "wild16", "wild-16"]
draft: false
lifecycle: published
version: "1.0.3"
revision: "rules-wild16-r6"
lastReviewedAt: "2026-05-22"
changelogSlug: "2026-03-27-slice-940-trust-discoverability"
---
Wild 16 is the Internet Chess Club version of Kriegspiel: chess with hidden information. Each player sees only their own pieces. The referee or server sees the full position and decides whether attempted moves are legal.

## 1. Basic idea

The game starts from the normal chess starting position.
Normal chess rules apply, except that the opponent's pieces are hidden.

Each player sees only their own pieces. A player may keep guesses or markers for the opponent's pieces, but those guesses are not part of the official position.
The referee or server keeps the true full board, including all pieces, castling rights, en passant rights, clocks, repetition state, and move history.

## 2. Making a move

On your turn, you attempt a move.
If the attempted move is legal in the true hidden position, it becomes your move.
If the attempted move is illegal, the referee or server tells only you: `Illegal move`.
You must then try another move.
Illegal attempts do not count as moves.

The opponent is not told that you attempted an illegal move.

The same illegal-move response is used whether the move fails because of check, a hidden enemy piece, an occupied square, an impossible move pattern, or any other reason.

## 3. Public announcements

The referee or server announces only the information allowed by the rules.

The standard public announcements are:

- `White's move`
- `Black's move`
- `Pawn at <square> captured`
- `Piece at <square> captured`
- `Rank check`
- `File check`
- `Long-diagonal check`
- `Short-diagonal check`
- `Knight check`
- `<number> pawn tries`

No other information about the opponent's move is revealed.

## 4. Pawn tries

Before each turn, the referee or server announces the number of legal pawn captures available to the player to move.
This announcement has the form: `<number> pawn tries`.

A pawn try is a legal capturing move made by a pawn.
The count includes only pawn captures that are legal in the true hidden position.

A pawn capture does not count as a pawn try if it would leave the player's own king in check.
If the player is already in check, a pawn capture counts as a pawn try only if it legally gets the player out of check.

The pawn-try announcement does not reveal:

- which pawn can capture
- where the pawn can move
- what piece or pawn would be captured
- whether the capture is en passant

A player is not required to make a pawn capture just because pawn tries are available.
The player may attempt any move: a pawn capture, a non-capturing pawn move, a piece move, a king move, castling, or any other legal move.

## 5. Capture announcements

When a legal move captures something, the captured square is announced.

If the captured man was a pawn, the announcement is: `Pawn at <square> captured`.

If the captured man was any non-pawn piece, the announcement is: `Piece at <square> captured`.

The exact type of captured piece is not announced. A captured queen, rook, bishop, or knight is announced only as a `Piece`.

For en passant, the announced square is the square of the pawn that was captured, not the destination square of the capturing pawn.

## 6. Check announcements

When a legal move gives check, the type of check is announced.

A check may be announced as:

- `Rank check`
- `File check`
- `Long-diagonal check`
- `Short-diagonal check`
- `Knight check`

A `Rank check` means the king is attacked along its rank.

A `File check` means the king is attacked along its file.

A `Long-diagonal check` means the king is attacked along the longer diagonal passing through the checked king.

A `Short-diagonal check` means the king is attacked along the shorter diagonal passing through the checked king. For example, for a king on `e1`, the short diagonal is `e1-h4`.

A `Knight check` means the king is checked by a knight.

If a move gives more than one kind of check, each applicable check type should be announced.

The square of the checking piece is not announced.

## 7. Special moves

Castling is legal if it is legal in the true hidden position. Castling is not announced as castling.

Promotion is legal under normal chess rules. The promotion piece is chosen by the moving player. Promotion is not announced as promotion. If a promotion move also captures or gives check, only the normal capture and check announcements are made.

En passant is legal if it is legal in the true hidden position. If an en passant capture is made, the captured pawn's square is announced.

## 8. Move input

ICC Wild 16 uses coordinate move input.

Examples of accepted move formats include `e2e4`, `e2-e4`, `o-o`, and `f7g8=N`.

Context-dependent notation is not allowed, because hidden enemy pieces may affect what the notation means.

For example, moves such as `Rd3` and `nxq` are not accepted.

The special input `px` may be used when exactly one pawn capture is legal.

For a web interface, players can instead click a source square and destination square. The server should still validate the attempted move against the true hidden position.

## 9. Opponent move display

An opponent's non-capturing move may be shown only as `?`.

An opponent's capturing move may be shown in hidden form, such as `?xf3`.

The actual origin and destination squares of the opponent's move are not revealed.

The opponent's legal move should be reflected only through the allowed public announcements: capture information, check information, pawn-try count, and side to move.

## 10. Illegal attempts and game history

Illegal move attempts are private to the player who made them. The opponent is not told that an illegal attempt happened. Illegal attempts are not recorded in the public move history.

After the game, the legal move history may be revealed if the site supports post-game review.

Illegal attempts should remain omitted for ICC-style play.

## 11. End of game

The game ends by normal chess conditions, including checkmate, stalemate, resignation, timeout, draw by repetition, draw by the fifty-move rule, and insufficient mating material.

The referee or server determines checkmate and stalemate from the true hidden position.

A player does not need to know the full position for checkmate or stalemate to be declared.

## 12. Observing and review

Rated Kriegspiel games should not be observable while in progress, because an observer who sees both sides could provide outside information.

Unrated games may allow observers if the site permits it.

In post-game review, the full board and legal move history may be revealed.

Illegal move attempts should not be included in the reviewed move history.

## 13. Differences from Cincinnati style

Wild 16 is based on Cincinnati style, but it is not identical.

### 13.1 Pawn-capture announcement

Cincinnati style announces only that at least one pawn capture exists. The Cincinnati announcement is: `Pawn capture`. This is a binary announcement. It means one or more legal pawn captures exist, but the number is not given.

Wild 16 announces the exact number of legal pawn captures.
The Wild 16 announcement is: `<number> pawn tries`.

The difference is not the timing of the announcement. Both Cincinnati style and Wild 16 announce pawn-capture availability before the player's turn. The difference is that Wild 16 gives the count.

### 13.2 Illegal move attempts

In Cincinnati style, the referee's announcements are made out loud and can be heard by both players.

In Wild 16, an illegal move attempt is private.

Only the player who attempted the illegal move is told: `Illegal move`.
The opponent is told nothing.

### 13.3 “Nonsense” moves

Cincinnati style distinguishes between an illegal move and a “nonsense” move.

A nonsense move is a move the player should already know is impossible, such as trying to capture one of their own pieces or attempting a pawn capture when no pawn capture was announced.

Wild 16 does not use a separate public nonsense announcement.

Illegal attempts are simply rejected for the moving player.

### 13.4 Move entry

Cincinnati style is an over-the-board ruleset with a human referee.

Wild 16 is a server ruleset and uses computer-readable move input, such as `e2e4`.

Wild 16 also supports the special pawn-capture shortcut `px` when exactly one pawn capture is legal.

### 13.5 Public information

Both Cincinnati style and Wild 16 announce:

- whose turn it is
- captures
- whether the captured man was a pawn or piece
- the square of the captured man
- check direction
- pawn-capture availability before the turn

Wild 16 adds a more precise pawn-capture count.

Cincinnati style gives only the existence of a pawn capture.

## Source note

The original Chessclub help page is no longer live, so retrieving it now requires the Wayback Machine or other archived copies. It was originally stored at `www.chessclub.com/help/Kriegspiel`.

This version is adapted from archived copies of that help page and from [La Scacchiera Invisibile (PDF)](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/scacchierainvisibile.pdf).

---

## Kriegspiel.org online implementation note

The historical ICC-style rule above includes normal chess repetition and fifty-move draws. Kriegspiel.org currently uses a shared online endgame policy for Wild 16: checkmate, stalemate, insufficient material, and a finite-game cap. If the half-move clock reaches 2,000 consecutive half-moves without a pawn move or capture, the game is declared drawn. The rules engine does not currently offer player claims for threefold repetition or the fifty-move rule, and it does not apply automatic fivefold-repetition or seventy-five-move FIDE draws.
