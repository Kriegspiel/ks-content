---
title: "Problems from La Scacchiera Invisibile"
slug: "la-scacchiera-invisibile-problems"
summary: "An English working translation of the Kriegspiel problem collection in Paolo Ciancarini's La Scacchiera Invisibile."
publishedAt: "2026-05-13"
updatedAt: "2026-06-01"
author: "Kriegspiel Team"
tags: ["problems", "translation", "research"]
draft: false
lifecycle: published
---

This post is a working English translation of the problem collection in Chapter 7, "Problemi di Kriegspiel," from Paolo Ciancarini's *La Scacchiera Invisibile*. The material comes from the PDF linked from Ciancarini's Kriegspiel research page, where the entry is listed as [La Scacchiera Invisibile](https://www.cs.unibo.it/~paolo.ciancarini/wwwpages/chesssite/kriegspiel/scacchierainvisibile.pdf), "Book manuscript in progress," with no date shown in that page listing. The PDF itself is marked Version 0.9 and dated 11 May 2004.

The original chapter presents a problemist's view of Kriegspiel: a solution is not only a key move, but a plan that survives invisible replies, referee announcements, and sometimes the answer to "Are there any?" Ciancarini collects all of Gerald Frank Anderson's problems from *Are There Any?*, a set of Henk Swart problems, and a final group by several composers.

The diagrams below are rendered as FEN-like strings. In ordinary chess these strings are not always complete legal positions, because several problems intentionally hide or reconstruct black material; they are a compact way to preserve the visible diagram in the source. Unless a problem says otherwise, White is to move.

For Henk Swart's problems I preserve the manuscript's convention `sor`, short for sequential OR: `A sor B` means "try A; if the referee refuses it, try B." If order does not matter, the source uses `or`.

## Introductory examples

Chapter 7 opens with several teaching positions before the numbered Anderson, Swart, and "other problems" sections. Two of those teaching positions reappear below as Swart 686 and Swart 1325; the remaining examples are translated here.

### Diagram 7.1 - Orthodox mate in three

Diagram FEN: `1n2k1K1/7R/8/4N3/6N1/8/8/8 w - - 0 1`

Stipulation: in ordinary chess, White mates in three.

Solution: `1.Rd7 Nxd7 2.Nc6`, then after any knight move, `3.Nf6#`. Ciancarini notes that, considered as a Kriegspiel position, this is not very interesting because White needs no information from the referee.

### Diagram 7.2 - Orthodox mate in three, Kriegspiel mate in four

Diagram FEN: `8/1P3P2/Pk6/8/1K6/8/8/8 w - - 0 1`

Stipulation: in ordinary chess, White mates in three; in Kriegspiel, White mates in four.

Solution: The orthodox key is `1.b8=N`. The main lines are `1...Kc7 2.f8=Q Kb6 3.Qc5#` and `1...Ka7 2.f8=Q Ka8 3.Nc6#`. In Kriegspiel this cannot be solved in three, because White cannot distinguish the two black replies, which require different third moves. The Kriegspiel solution is `1.b8=N Kc7/a7 2.f8=Q Kb6/a8 3.Qc8 Ka7 4.Nc6#`.

### Diagram 7.6 - Henk Swart, [Dutch rules](/rules/dutch) example

Diagram FEN: `3b1q1Q/3NP1R1/1n1N1r2/R2p4/3kPp2/1P1p3p/3PPK2/2r2BBb w - - 0 1`

Stipulation: mate in two. After White's move, Black asks "Are there any?"

Solution: The key is `1.Rg3`, threatening `2.Rxd3#`. The defenses are `...fxg3`, `...dxe2`, `...Rxf1`, `...Bf3`, `...Rc3`, `...f3`, `...dxe4`, and `...Bxe4`. The first three captures are unambiguous and reveal the mate. Against the silent defenses `...Bf3`, `...Rc3`, and `...f3`, White tries `2.Kf3#`, then `2.Ke1#`, then `2.e3#`; the first accepted move mates. The real difficulty is distinguishing `...dxe4` from `...Bxe4`, which require different mates in orthodox play. Swart explained that [Dutch rules](/rules/dutch) announce whether a capture is made by a pawn or by a piece, so the referee distinguishes "Black captures on e4 with a pawn" from "Black captures on e4 with a piece." Ciancarini concludes that the problem is therefore solvable only with [Dutch rules](/rules/dutch), while the extension is acceptable for problem composition.

## Anderson problems

All Anderson problems in this section use [English rules](/rules/english).

### 7.1.1 - Anderson 1

Diagram FEN: `8/7B/8/2K5/k1N5/8/8/1R2p3 w - - 0 1`

Stipulation: mate in two. The black pawn on e1 has just promoted, but White does not know to which piece.

Solution: `1.Ra1+`. If the referee says "Black captures on a1," the promotion was to queen or rook, and `2.Bc2#` follows. If the referee says "Black has moved," Black must have played `1...Kb3`, so `2.Ra3#`.

### 7.1.2 - Anderson 2

Diagram FEN: `8/3Q4/1K6/8/8/8/8/1N1R1R1B w - - 0 1`

Stipulation: mate in one. White knows that Black has only the king and one other unit, either a piece or a pawn. White's last move did not give check. Black asked "Are there any?", the referee answered "Yes"; Black then tried a capture and the referee said "No"; then the referee said "Black has moved," so it is now White's turn.

Solution: White cannot reconstruct the black king's position exactly. Black's exchange with the referee reveals a black pawn on g2. The black king could only have been on a8 or e4, and may have moved to b8, e3, or e5. In every possible reconstruction, `1.Qe8#` mates.

### 7.1.3 - Anderson 3

Diagram FEN: `8/B7/1r3r2/2Q2p2/7n/3R3B/1p2p3/4k1NK w - - 0 1`

Stipulation: mate in two. Two tries look promising: `Qe3` and `Qe7`. Which is right?

Solution: After `1.Qe3`, Black could answer `1...Rfe6`; the referee would only say "Black has moved," and White could not be sure of mating. The right move is `1.Qe7`. After Black moves, White tries `2.Qxe2#`; if that is illegal, one rook has interposed, so White tries `2.Qxh4#`; if that is also illegal, Black has played `1...Rbe6`, and `2.Qb4#` is certain.

### 7.1.4 - Anderson 4

Diagram FEN: `8/5p2/2B5/2p5/K1k5/2Bn3P/3PQn2/3R4 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Bh1`. If the referee says "Black captures" (`1...Nxe1`, `1...Nxh1`, or `1...Nxh3`), play `2.Qe4#`. If the referee says "Black has moved," ask "Are there any?" If the answer is "Yes," try the impossible capture `2.dxe3`, then play `2.Qe4#`. If the answer is "No," try `2.Qe6#`; if that is illegal because of `1...Ne4`, play `2.Qxe4#`.

### 7.1.5 - Anderson 5

Diagram FEN: `7B/5pb1/3N1rk1/5pP1/8/3B3Q/2K5/6R1 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Kc1`. After Black's move: if the referee says "capture on d6" (`1...Rxd6`), play `2.Bxf5#`; if the referee says "capture on h8" (`1...Bxh8`), play `2.Qh6#`; if the referee reports no black capture, White asks "Are there any?" If "No," the black rook has moved, so `2.Bxf5#`. If "Yes," try `2.gxf6#`; if that is refused, Black has played `1...Bh6`, pinning the pawn, so `2.Qxh6#`.

### 7.1.6 - Anderson 6

Diagram FEN: `6K1/8/BP6/PRb5/1pk5/5Q2/4N3/8 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Kh8`. If the referee announces "Black moves and gives diagonal check" (`1...Bd4+`), play `2.Re5#`. If the referee is silent, try `2.Rxb3#`. If that is refused because the black pawn did not move, play `2.Qd5#`.

### 7.1.7 - Anderson 7

Diagram FEN: `8/B1p1K2B/2P4p/1PRb3P/2pk4/6Q1/8/8 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Qa3`. Then try `2.Rg5#`. If the bishop on d5 has not moved, `2.Rg5` is refused; try `2.Qe3#`, which mates if the black king moved to e5. If the black pawn moved to c3, play `2.Qxc3#`.

### 7.1.8 - Anderson 8

Diagram FEN: `8/B1p5/2Np4/3P1P1K/1pPRb2P/1P1pk3/P6Q/6N1 w - - 0 1`

Stipulation: mate in two.

Solution: The set play, if Black were to move, is `1...Bf3+ 2.Rg4#`, `1...d2 2.Rxd2#`, and otherwise `2.Qf4#`. The key is `1.Qb2`. Now `1...B` moves is met by `2.Rg4#`; `1...Kf4` by `2.Qf2#`; and `1...d2` by `2.Qxd2#`.

### 7.1.9 - Anderson 9

Diagram FEN: `8/5p1K/5B2/7k/2p3r1/2PpPBp1/1p2n1Np/bQ5R w - - 0 1`

Stipulation: mate in two.

Solution: `1.Rc1`. If Black captures the rook, first try `2.Qb5#`, which mates if the capture was made by the pawn on b2. If `2.Qb5` is refused, the knight made the capture, so `2.Nf4#`. If the referee does not announce the rook's capture, ask "Are there any?" If "Yes," try `cxb4`, then play `Nf4#`. If "No," try `2.Qf5#`; if that is illegal, try `2.Rh1#`, which mates if Black promoted the h2-pawn. If `2.Rh1` is also illegal, Black played `1...Ng1`, so `2.Nf4#`.

Ciancarini notes that an orthodox chess problem solver quickly finds `1.Rf1`, using the set play `1...d2 2.Qf5#` and `1...N` any `2.Nf4#`. That works in ordinary chess but not in Kriegspiel, because White could not distinguish an h-pawn promotion from an arbitrary knight move.

### 7.1.10 - Anderson 10

Diagram FEN: `8/8/2p5/3nB3/Rb1P4/Npk5/4Q3/1K6 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Bf6`. If the referee announces the bishop's capture, play `2.Qe3#`. If there is no announcement, ask "Are there any?" If "Yes," make the empty try `2.dxe5`, then play `2.Rc4#`; if `2.Rc4` is refused, play `2.Nb5#`. If "No," try `2.d5#`; if refused, try `2.Rc4#` or `2.Qc2#`.

### 7.1.11 - Anderson 11

Diagram FEN: `8/4N2p/7P/4p2P/4kpRn/3R3B/1N2P1p1/6K1 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Rg8`. If the referee announces "knight check" (`1...Nf3+`), play `2.exf3#`. If no check is announced, ask "Are there any?" If "No," play `2.Bxf5#`. If "Yes," make the empty try `2.hxg7`, then play `2.Rg4#`; if `2.Rg4` is refused, play `2.Bf5#`.

### 7.1.12 - Anderson 12

Diagram FEN: `B1R5/3pN3/1n1P1K2/p1P2PNp/P1p4P/BPk1p1n1/4Pp2/3Q1R2 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Bh1`. If there is no announcement, `2.Nd5#`; otherwise `2.Ne4#`. Why are `1.Bb7`, `1.Bc6`, `1.Bf3`, and `1.Bg2` not just as good? Anderson leaves that as an exercise.

### 7.1.13 - Anderson 13

Diagram FEN: `8/5N2/8/4KQpk/4PP1b/7p/4R2p/6nB w - - 0 1`

Stipulation: mate in two.

Solution: `1.Rf2`. If `1...Bxf2`, play `2.Qxg5#`. If `1...Nf3+`, play `2.Bxf3#`. If the referee is silent, ask "Are there any?" If "Yes," use `2.exd5` and then `2.Bf3#`. If "No," Black has played `1...Bg3`, so `2.Qxg5#`.

### 7.1.14 - Anderson 14

Diagram FEN: `3Q4/8/8/4p3/4n3/5K1p/2B4R/1NkN4 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Na3`. After Black's move, first try `2.Qg5#`; only if that move is not playable, because of `1...Nf6`, finish with `2.Qd2#`.

### 7.1.15 - Anderson 15

Diagram FEN: `1Q6/2p5/n1P3p1/2b1R1P1/1pk4p/1N5R/B2B1p2/5K2 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Bb1`. With a silent referee, try `2.Qg8#` first, then `2.Qb5#`.

### 7.1.16 - Anderson 16

Diagram FEN: `1K6/1B1P4/4N3/3r2P1/4Q1p1/4P1P1/3N1PR1/7k w - - 0 1`

Stipulation: mate in two.

Solution: `1.Nc5`. If there is no announcement, first try `2.Qb1#`, then `2.Qh7#`.

### 7.1.17 - Anderson 17

Diagram FEN: `6B1/3p4/3pp1kP/3P2PR/2p2P1R/2B5/K7/2b2Q2 w - - 0 1`

Stipulation: mate in two. Anderson called this a special problem: according to him it was the first Kriegspiel block problem. The threat after `1...exd5` is `2.f5#`; the threat after a bishop move is `2.Qb1#`.

Solution: `1.Qg2`, threatening `Qe4#`. The only defenses are `...exd5` and `...Kf5`. The first is revealed by the referee's "capture on d5" announcement and is met by `2.Qc2#`. The second is discovered by trying `2.g6`, legal only if the black king has moved; it mates by discovered check. Notice that `2.Qc2` is not a threat, because it is parried by the silent move `1...e5`.

### 7.1.18 - Anderson 18

Diagram FEN: `8/2NN4/2p5/8/2k1B1P1/1p2PP2/pP1B2R1/n5K1 w - - 0 1`

Stipulation: mate in three. For this and the following mate-in-three problems, the manuscript abbreviates the solution to the first two moves.

Solution: `1.Kh2`. Black makes a silent move, either `1...c5` or `1...Nc2`; White tries, in order, `2.Bb1` and then `2.Bd3+`.

### 7.1.19 - Anderson 19

Diagram FEN: `8/p6B/P2K4/B7/2NP4/N7/pp6/k7 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Kc7`. If `1...b1=B` or `1...b1=N`, play `2.Kb8`. If `1...b1=Q` or `1...b1=R`, play `2.Bc3+`.

### 7.1.20 - Anderson 20

Diagram FEN: `8/2P5/4Q2K/1N6/1P3p2/1BB2p2/1pnp1P2/RRbk4 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Bh8`. If `1...bxa1=R` or `1...bxa1=N`, `2.Kg7` is playable. If `1...bxa1=Q` or `1...bxa1=B`, play `2.Bxc2+` and `3.Qb3#`.

### 7.1.21 - Anderson 21

Diagram FEN: `7K/3p4/Pp1N4/1P3p2/QnP5/R1pkP3/2n1R3/2B3NB w - - 0 1`

Stipulation: mate in two.

Solution: `1.Ba8`. A capture, `1...Nxe3`, is met by `2.Rd2#`. If "Are there any?" is answered "Yes," `1...f4` is met by `2.Be4#`. If the answer is "No," the relevant lines are `1...Nd4 2.Qd1#`, `1...Nc6 2.Qxc2#`, and `1...Nd5 2.Qxc2#`.

### 7.1.22 - Anderson 22

Diagram FEN: `b7/BnN2p2/RP6/1pk1P3/pNp5/Q3K3/8/8 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Kf3`. The lines are `1...Nd8+ 2.b7#`, `1...f6 2.Ne6#`, `1...f5 2.Ne6#`, `1...Kd4 2.Qe3#`, and `1...c3 2.Qxc3#`.

### 7.1.23 - Anderson 23

Diagram FEN: `1n6/5N1p/1Qp3pN/P1rp2Pp/3kpR1P/2p3BK/2R2P1P/5B2 w - - 0 1`

Stipulation: mate in three.

Solution: `1.a6`. If `1...Nd7`, play `2.Rf6`. If `1...Nxa6`, play `2.Rf5`.

### 7.1.24 - Anderson 24

Diagram FEN: `2K5/2Np3Q/5p2/2N5/8/p2rp3/k1PR4/4Rn2 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Nd5`, threatening `2.Nxd3`. The lines are `1...Rxd5 2.c4+`, `1...Rd4 2.c3+`, `1...Rc3 2.Nxc3+`, `1...Rb3 2.cxb3+`, and `1...R(N)xd2 2.Nb4+`. This is a complicated problem in which the main actor is the pawn on c2. Wherever the rook on d3 moves, the c-pawn follows it, so that if Black captures the rook on d2 on move two, White can ask "Are there any?" and mate with `3.Qc2#` if the answer is "Yes," otherwise `3.Qb1#`.

### 7.1.25 - Anderson 25

Diagram FEN: `8/3p3p/8/3Qn3/4n3/4pk1P/P3N3/5K2 w - - 0 1`

Stipulation: mate in six.

Solution: `1.a3 d6 2.a4 h6 3.a5 h5 4.a6 h4 5.a7 N` any. Before each pawn move, White systematically tries `Qf5` to make sure the knight has not moved. After Black's fifth move, White asks "Are there any?" If "Yes," White makes the empty try `6.axb8`, then plays `6.Qf5#`. If "No," White plays `6.Qh5#`.

### 7.1.26 - Anderson 26

Diagram FEN: `2q1r3/Pp1bpP2/1pk1n1Rb/pN2Rp2/3Pn1r1/K3p1p1/4B3/7Q w - - 0 1`

Stipulation: mate in three.

Solution: `1.f8=N`. White then asks "Are there any?" If "Yes" (`...Qb8`), try `dxc5` and play `2.d5 Kc5 3.Nd7#`.

### 7.1.27 - Anderson 27

Diagram FEN: `2N3Rr/2p3Bp/2Q5/rp1pP3/p3k1P1/b1pnPpRp/1PB3bK/5N2 w - - 0 1`

Stipulation: mate in three.

Solution: `1.b4`, threatening `2.Qb6`. If `1...Bxb4`, play `2.Qh6`; if `1...axb3`, play `2.Qxc3`; if `1...Bxf1` or the rook on a5 moves, play `2.Qc5`.

### 7.1.28 - Anderson 28

Diagram FEN: `1K6/2pNp1N1/2Q5/1p1pPP1p/p3k1b1/bP2Pn1p/2PB2B1/8 w - - 0 1`

Stipulation: mate in three.

Solution: `1.b4`, threatening `2.Nc5+`. If `1...Bxb4`, play `2.Qh6`; if `1...Bxf5`, play `2.Qc3`.

### 7.1.29 - Anderson 29

Diagram FEN: `2B2b2/p1Q1p1p1/3r4/2KP2R1/3Rpk1P/p3n3/6p1/2B3N1 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Rd1`, threatening `2.Re1` and `3.Bxe3#`. The only two defenses, `1...e6` and `1...e5`, are both silent; they are not immediately distinguishable by asking "Are there any?" because of en passant. The strange rook sacrifice on f1 exists precisely to lose the right to capture en passant and let White use the question meaningfully. After `1...e5`, play `2.Rf1+ gxf1=Q 3.Any? no Rg4#`. After `1...e6`, play `2.Rf1+ gxf1=Q 3.Any? yes Qf7#`.

### 7.1.30 - Anderson 30

Diagram FEN: `Q6b/2p1B3/1Pr1pR2/Rprk1p2/2N4p/4P1N1/B7/1K6 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Ka1`, threatening `2.Nd6+`. If `2...Ke5`, then `3.Rxe6#`; if `2...Rc4`, then `3.Rxb5#`. Other lines: `1...e5 2.Rd6+ cxd6 3.Qg8#`; `1...Bxf6+ 2.Nb2+`, and then if `2...Ke5`, `3.Nd3#`, while if `2...Rc4`, `3.Rxb5#`.

### 7.1.31 - Anderson 31

Diagram FEN: `3K4/N1p1Q3/1pp2pp1/3k1Nr1/1p3P2/6P1/2Pb1P2/5B2 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Nb5`, threatening `...c5 2.Nxc7+`. If `1...cxb5`, play `2.Bg2+`; if `1...gxf5`, play `2.Qe6+` (White discovers which piece captured on f5 by asking "Are there any?"); if `1...Rxf5`, play `2.Qe4+`; if `1...Bxf4`, play `2.c4+`.

### 7.1.32 - Anderson 32

Diagram FEN: `2n1N3/p1P1pP2/BpPpRp2/1p1k1K2/1R1P4/8/8/8 w - - 0 1`

Stipulation: mate in three.

Solution: `1.f8=N Kxc6 2.Nd7`. If `2...Kxd7`, then `3.Bxb5#`; if `2...Kd5`, then `3.Bb7#`. The promotion to a knight, which is then brought to d7, serves only to distinguish the two possible second moves of the black king from c6.

### 7.1.33 - Anderson 33

Diagram FEN: `3K4/4p3/B2k1p1Q/5p2/2PN1P2/1RP2N2/p2R4/1q4B1 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Rd3`, threatening `2.Ne6+`. If `1...Qxb3`, play `2.Nc6+`. If `1...Qxd3` or `1...Qxg1`, play `2.Rb6+`.

### 7.1.34 - Anderson 34

Diagram FEN: `5b1k/K1p1p1p1/R5R1/3B2N1/2Q1Np2/6pp/1n5r/B1n5 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Qc5`, threatening `2.Raf6` and `3.Rxf8#`. If a knight moves, `2.Bf6` and `3.Rh6#`. If `1...c6`, `2.Nf6` threatens `3.Nf7#`.

### 7.1.35 - Anderson 35

Diagram FEN: `5RBq/1P1b1Np1/6Pp/2p2Q1P/1r2pNPk/1p1P4/1B2p3/1Kn3R1 w - - 0 1`

Stipulation: mate in three.

Solution: `1.Bd4`, threatening `2.Rh1+`. If `1...cxd4`, play `2.Qa5`; if `1...Rxd4`, play `2.Qxc5`; if `1...e3`, play `2.Qd5`.

### 7.1.36 - Anderson 36

Diagram FEN: `4B1n1/6n1/3ppp1p/2prkp1b/3r1p1N/3P1P2/1BP1N3/R3K2R w - - 0 1`

Stipulation: mate in four.

Solution: `1.c4`, threatening `1...Bg4 2.O-O Bh3 3.Rae1 Bxf1 4.Ng6#`. If `1...Bxe8`, play `2.O-O-O Ba4 3.Rhe1 Bxd1 4.Ng6#`.

### 7.1.37 - Anderson 37

Diagram FEN: `nBk1b3/R1pr1p2/2N2P1K/3p1B2/p2P3P/P3P1p1/5pP1/5Nbn w - - 0 1`

Stipulation: mate in nine.

Solution: `1.Kg5 2.Kf4 3.Ke5 4.h5 5.h6 6.h7 7.h8=Q or R Nc4+ 8.Kf4`, then `9.Rxc7#`. Meanwhile Black either moves the bishop between g1 and h2 or moves the knight, which at most gives a check on c4.

### 7.1.38 - Anderson 38

Diagram FEN: `2NB4/2b5/1p1p1p2/1P1P1P2/pP6/k1K5/2P5/2N5 w - - 0 1`

Stipulation: mate in nine.

Solution: `1.Be7 2.Bf8 3.Bh6 4.Bg7 5.Bf8 6.Be7 7.Bd8`. Seven moves recreate the initial position with Black to move. More precisely, after the maneuver either Black has captured the bishop, making a knight mate easy, or the black bishop is on c7 or a7. Black's seventh move is therefore either `7...Bxd8`, a capture that is announced, or `7...Bb8`, not announced. White plays respectively `8.Nxd6` or `8.Nxb6`, both followed by `9.Nc4#`.

### 7.1.39 - Anderson 39

Diagram FEN: `1n6/kP1PR1r1/Nn4b1/1Q2N3/R3P3/6B1/8/6K1 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Nc4`, threatening `Qxb6#`. The lines are `1...N8xd7 2.b8=Q#`; `1...N6xd7 2.Nxb8#`; `1...Nc8 2.dxc8=N#`; `1...Na8`, `1...Nd5`, `1...Nxa4`, or `1...Nxc4`, all met by `2.Bxb8#`; and `1...Kxb7 2.Nc5#`.

### 7.1.40 - Anderson 40

Diagram FEN: `7r/1PPPP1pp/5prq/1R2pKpk/6Nb/5R2/2p5/2B4Q w - - 0 1`

Stipulation: mate in four.

Solution: `1.Re3`. If `1...Rb8`, play `2.cxb8=B e4 3.Bh2 B` any `4.Bg3#`. If `1...Ra8`, `1...Rc8`, `1...Rd8`, `1...Re8`, or `1...Rf8`, play `2.Qf3 B` any `3.Nxf6+ Kh4 4.Qg4#`. If `1...Rg8` or `1...e4`, play `2.Rxe4` any `3.Qf3` any `4.Nxf6#`.

### 7.1.41 - Anderson 41

Diagram FEN: `n1nQ1Kb1/2ppr1Np/3pp3/5p2/3Pp2k/6RP/7B/7R w - - 0 1`

Stipulation: mate in four.

Solution: `1.Rg2`, threatening `2.Bf4 3.B(x)h6 4.Bg5#`. If `1...e5`, play `2.Bg1 f4 3.Be3 fxe3 4.Rg4#`. If `1...Kxh3`, play `2.Rg3+ Kh4 3.R3g1` any `4.Bf4#`.

### 7.1.42 - Anderson 42

Diagram FEN: `8/N3P2R/4K3/7N/8/8/P7/8 w - - 0 1`

Stipulation: mate in one. The black king has two unidentified companions. On Black's last move he made 19 attempts, all refused, and only the twentieth attempt was accepted.

Solution: The reconstruction is the hard part. A black king on g6 has six attempts. Add two black queens on a1, a8, or h8 and each can have at most six refused attempts along files occupied by white pieces: 18 total, not 19. Black therefore needs pieces capable of at least seven refused attempts. Two rooks, unlike two queens, get seven refusals each if they try to castle with a king on e8; the king itself supplies five. The reconstructed position is `r3k2r/N3P2R/4K3/7N/8/8/P7/8 w - - 0 1`. White asks "Are there any?" If "Yes," he tries `axb3` and plays `2.Ng7#`; if "No," he mates with `Nf6#`.

### 7.1.43 - Anderson 43

Diagram FEN: `8/8/3K2B1/5P2/1PQ5/5N2/8/8 w - - 0 1`

Stipulation: mate in one. White knows that, in addition to the king, Black has two unidentified companions. White has just made 18 move attempts, all refused.

Solution: This is very difficult, partly deduction and partly trial and error. The 18 refused attempts must concern the king, which accounts for eight and therefore cannot move; pawn captures, which account for three and therefore capture nothing; and seven queen attempts, because otherwise it is hard to see how seven knight or bishop moves could all be refused. The refused queen tries should be `Qg8`, `Qf7`, `Qe6` and `Qh4`, `Qg4`, `Qf4`, `Qe4`, revealing respectively a black queen on d4 and bishop on d5. For mate in one, the black king must be on d8. The reconstructed position is `3k4/8/3K2B1/3b1P2/1PQq4/5N2/8/8 w - - 0 1`, and the mate is `1.Qc7#`. Anderson notes that in the twin problem obtained by shifting the position one file to the right, the number of refused tries is only 17.

### 7.1.44 - Anderson 44

Diagram FEN: `8/8/4K2B/6P1/2PQ4/6N1/8/8 w - - 0 1`

Stipulation: mate in one. White knows that, in addition to the king, Black has two unidentified companions. White has just made 18 move attempts, all refused.

Solution: The refused attempts must concern the king, eight attempts; the queen on a7, b6, h8, g7, and f6; three pawn-capture attempts; and two pawn-push attempts. The reconstructed position is `8/8/4K1kB/3q1nP1/2PQ4/6N1/8/8 w - - 0 1`, and `1.Qe4#` mates.

## Henk Swart problems

Ciancarini describes Henk Swart as perhaps the greatest living composer of Kriegspiel problems at the time of the manuscript, with about 1,600 composed problems. These problems are all mate-in-two. Most are intended to work under both [English rules](/rules/english) and ICC rules unless the note says otherwise.

### 7.2.1 - Swart 686

Diagram FEN: `3B4/8/2p5/2k5/p3KP2/P7/3RQ3/8 w - - 0 1`

Solution: `1.Kd3`. Then `2.Kc4#` against `...Kd6`, `sor 2.Kd4#` against `...Kb5`, `sor 2.Qe5#` against `...Kd5`. All defenses are silent. The same solution works under both [English rules](/rules/english) and American rules.

### 7.2.2 - Swart 1034

Diagram FEN: `2N1B3/1RP1N1B1/n1p1k1p1/8/p1Kp3n/3p3r/Q6p/6b1 w - - 0 1`

Solution: `1.Rb5`. Non-silent: `2.Kxb5#` after `cxb5`, or `2.Re5#` after `Nxc7`. Silent: `2.Kxd4#` after `Re3`, or `2.Kxd3#` after `Nf3` or `Be3`, `sor 2.Re5#` after `a3`, `d2`, `g5`, `Nf5`, `Ng2`, `h1`, `Rf3`, `Rg3`, or `Bf2`, `sor 2.Kxc5#` after `Nc5`, `sor 2.Rb6#` after `c5`.

### 7.2.3 - Swart 1086

Diagram FEN: `4R2B/Q2R1r2/1b6/1K1Nr3/nP1k2n1/1P1p1B2/3P4/8 w - - 0 1`

Solution: `1.Rc8`. The Eastern and Western rule continuations are both part of the solution. Under Eastern rules, the non-silent continuations are `2.dxc3#` after `Nc3`, or `2.Rc4#` after `Rxf3`, `Rxd7`, or `Bxa7`. If `Any?` is "Yes," `2.dxe3#` after `Ne3`, `sor 2.Qa1#` after `Nc5`, `sor 2.Rc4#` after `Rf6`, `Rg7`, `Nf6`, `Nf2`, `Nh2`, or `Nh6`, `sor 2.Ne7#` after `Bc5`. If `Any?` is "No," `2.Qxb6#` after `Nb2`. Under Western rules, with zero possible captures, `2.Qxb6#` follows `Nb2`; with one possible capture, `2.dxc3#` after `Nc3`, or `2.Rxd5#` after `Rxd5`, or `2.Qa1#` after `Nc5`, `sor 2.Rc4#` after `Rxf3`, `Rxd7`, `Rf6`, `Rg7`, `Nf6`, `Nf2`, `Nh2`, or `Nh6`; with two possible captures, `2.dxe3#` after `Ne3`, `sor 2.Ne7#` after `Bc5`.

### 7.2.4 - Swart 1204

Diagram FEN: `8/8/R2N4/2k3B1/1p1pP3/1p3r2/1K1Q2P1/6bR w - - 0 1`

Solution: `1.Be3`. Non-silent: `2.Qd5#` after `dxe3`, `sor 2.Rc1#` after `Bxe3`, `sor 2.Rh5#` after `Rxe3`. Silent: `2.Qxd4#` after `Bf2`, `sor 2.Bxd4#` after `Rf2`.

### 7.2.5 - Swart 1227

Diagram FEN: `3r4/8/8/8/1pB2P2/pPBP3n/k1K1R3/2Q3q1 w - - 0 1`

Solution: `1.Kd2`. Non-silent: `2.KxQ#` after a queen move, or `2.Kxd3#` after `Rxd3`, or `2.Kxc3#` after `bxc3`, or `2.Qc2#` after `Nxf4`. Silent: `2.Qc2#` after any move.

### 7.2.6 - Swart 1243

Diagram FEN: `b7/4BP2/1p1NBn2/pPkq2Q1/4P3/1R6/2K1N2p/6b1 w - - 0 1`

Solution: `1.Qc1`. Non-silent: `2.Nxc4#` after `Qc4`, or `2.Kxb3#` after `Qxb3`, or `2.KxQ#` after a queen move on the d-file, or `2.Nxe4#` after `Qxe4`, or `2.Qa3#` after `Qxd6`, `Qxe6`, or `Nxe4`. If `Any?` is "Yes," try `2.bxa6`, then `2.Qa3#`. If `Any?` is "No," `2.Nb7#` after `Qd4`, `Bd4`, or `Bb7`.

### 7.2.7 - Swart 1325

Diagram FEN: `6R1/1B6/1K6/p1pp1N1k/R2p4/4p3/1QPbn3/5N2 w - - 0 1`

Solution: `1.c4`. Non-silent: `2.Bf3#` after `dxc4`, or `2.Rh4#` after `dxc3`. Silent: `2.Qh8#` after `d3`, `sor 2.Qxe2#` after any bishop move, `sor 2.N1g3#` after any knight move. The orthodox keys `Bxd5`, `Bc6`, and `Qb5` fail because silent black knight moves require different mates.

### 7.2.8 - Swart 1326

Diagram FEN: `n7/1ppQ4/1pNn1p2/1p1P4/1Pk1P3/2P2R2/2P2K2/b2N4 w - - 0 1`

Solution: `1.Qe6`. Non-silent: `2.Rxc3#` after `Bxc3`, or `2.Qxe4#` after `Nxe4`, or `2.dxc6#` after `bxc6`. Silent: `2.d6#` after `Nc8`, `Ne8`, `Nf7`, or `Nf5`, `sor Any? yes`, make the empty try `2.bxa5`, then `2.Ne5#` after `f5`; if `Any?` is "No," `2.Nb2#` after `Bb2`.

### 7.2.9 - Swart 1353

Diagram FEN: `8/3R1b1B/1p3r2/3pN2P/1K1k4/3P1pB1/5PN1/3R4 w - - 0 1`

Solution: `1.Nf4`. Non-silent: `2.Nc6#` after `Rxf4`, or `2.Rxd5#` after `Bxh5`, or `2.d4#` after `Kxe5`. Silent: `2.Nxf3#` after `b5`, any bishop move, or any rook move. `1.Ne1` and `1.Ne3` are not acceptable because silent rook moves require different mates.

### 7.2.10 - Swart 1364

Diagram FEN: `8/1Rp5/Pb1kBK2/B3p3/1P1r1p2/P1Qn4/1N3N2/3R4 w - - 0 1`

Stipulation: mate in two, to be solved with Western rules.

Solution: `1.b5`. Silent: `2.Qc6#` after `Ba7`, `Nc1`, `Ne1`, `f3`, `e4`, `Rd5`, `Re4`, or `Ra4`, `sor 2.Bxc7#` after `Bc5`, `sor 2.Qxe5#` after `Rc4`, `sor 2.Nc4#` after `Nc5`. Non-silent: `2.Qc6#` after `Bxa5`, `Nxb2`, or `Nxb2`. With one possible capture: `2.Rd7#` after `c6` or `c5`, or `2.Qxe5#` after `Rb4`, `sor 2.Ne4#` after `Nb4`.

This problem does not work under Eastern rules because after a positive "Are there any?" White must try at least one pawn capture. After the silent defense `1...Nb4`, there is no mate no matter whether White tries a pawn capture on b4 or c6.

### 7.2.11 - Swart 1372

Diagram FEN: `1K6/p6p/2B3NP/P3Rn2/2Nk4/1P1p4/5P1q/3bQ1b1 w - - 0 1`

Solution: `1.Nd6`. Non-silent: `2.Qa1#` after `Bxb3`, or `2.Rd5#` after `hxg6` or `Nxd6`, or `2.Qxe5#` after `Qxe5`, or `2.Qb4#` after `Bxf2`, `Qxf2`, `Nxh6`, or `Qxh6`. Silent: `2.Qa1#` after `Bc2`, `Bf3`, `Bg4`, or `Bh5`, `sor Any? yes`, try `axb6`, then `2.Nb5#` after `Ng7`, `Ne3`, `Ng3`, or `Qg3`; if `Any?` is "No," `2.Qb4#` after `a6`, `sor 2.Qxd2#` after `d2`. `1.Na3` fails because of `1...Nd6`.

### 7.2.12 - Swart 1428

Diagram FEN: `1B4Q1/4b3/3N4/r3kNP1/1rp5/2P3K1/5Pn1/8 w - - 0 1`

Solution: `1.Ne3`. Non-silent: `2.f4#` after `Nxe3`, or `2.N3c4#` after `Rxb8`, or `2.Qe8#` after `Bxd6`, or `2.Ng4#` after `Bxg5`. Silent: `2.Ng4#`. `1.Nd4` fails because it threatens three different mates with different silent defenses.

### 7.2.13 - Swart 1435

Diagram FEN: `4b3/2p1R1p1/1B1pK3/3P2p1/2Prk1B1/1Np2RP1/2P5/3n4 w - - 0 1`

Solution: `1.Bxd4`. Then `2.Kxd6#` after `c6` or `c5`, or `2.Kf6#` after `g6`, or `2.Kd7#` after `Bd7`, `Bg6`, or `Bh5`, or `2.Kf7#` after `Bf7`, `Bc6`, `Bb5`, or `Ba4`, or `2.Kf6#` after `g6`, `sor 2.Re3#` after `Nb2`, `Nf2`, or `Ne3`. `1.Rf1` fails because the silent defenses `1...Ne3` and `1...Nf2` require different mates.

### 7.2.14 - Swart 1466

Diagram FEN: `4bBQ1/np2P2p/1Rpk3P/2nNpB2/PP1NP2K/1P5P/8/8 w - - 0 1`

Solution: `1.Bg7`. Non-silent: `2.Qe6#` after `Nxa4`, `Nxb3`, or `Nxe4`, or `2.e5#` after `exd4`. Silent: `2.Qb8#` after any bishop move, `sor Any? yes`, try `2.bxc4`, then `2.Nb5#` after `Nb5` or `Nc8`; if `Any?` is "No," `2.Qe6#` after `Na6`, `Nd3`, `Ne6`, or `Nd7`. `1.a5` fails because the silent defenses `1...Nd3` and `1...Nc8` require different mates.

### 7.2.15 - Swart 1471

Diagram FEN: `5NB1/1PQ3p1/1p1rp1P1/bP1kp3/1P1P1B2/n1nPpK2/2N1PR2/1R1n4 w - - 0 1`

Solution: `1.Nxe6`. Non-silent: `2.e4#` after `exf2`, `sor 2.Nxe3#` after `Nxf2`, or `2.Nxb4#` after `Bxb4`, or `2.Qc4#` after `Nxc2`, `Nxb5`, or `Nxb1`, or `2.Qxe5#`, `2.Qd7#`, or `2.Qd8#` after `Rxe6`, or `2.Qxd6#` after `exd4`, or `2.dxe4#` after `e4`, or `2.Nxf4#` after `exf4`. Silent: `2.dxc4#` after `Nc4`, or `2.Qxe5#` after any rook move, `sor 2.Nxe3#` after `Nb2`.

Notes: `1.Bxe5` fails because the silent defenses `1...Nb2`, `1...Rd7`, and `1...Rd8` require different mates. The source also notes that the position is impossible: Black's pawns have made two captures, but White still has 15 units.

### 7.2.16 - Swart 1479

Diagram FEN: `4N2K/4p1P1/5b1Q/2NPk1p1/2p1P3/4P2b/3P4/8 w - - 0 1`

Solution: `1.d6`. Non-silent: `2.Qxg7#` after `Bxg7`, or `2.Qxf6#` after `exd6`. If `Any?` is "Yes," try `2.exf4`, then `2.Qh2#` after any bishop move, `sor 2.Qf4#` after `g4`, `sor 2.d4#` after `c3`. If `Any?` is "No," `2.Qxf6#` after `e6`. `1.Qh7` fails: `1...c3` and `1...d6` are silent defenses with different mates.

### 7.2.17 - Swart 1568

Diagram FEN: `1K2k3/8/3BB3/n5P1/4Q3/1p3r2/6P1/b7 w - - 0 1`

Stipulation: mate in two, solvable only with Western rules.

Solution: `1.Kc7`. Non-silent: `2.Bd7#` after `Rf7`, or `2.Bc4#` after `Rc3`. With zero possible captures, `2.Qa8#`; with one possible capture, `2.Qa8# sor 2.Qc6#`; with two possible captures, `2.Qg6#`. The problem is insoluble under Eastern rules because of `1...Bf6`. Under Western rules that defense is revealed by the referee's "two possible captures" message.

### 7.2.18 - Swart 1569

Diagram FEN: `8/2b2Q2/2R1brpq/p3P1Pr/pRBk3N/1pN4P/1P3PPB/2K5 w - - 0 1`

Stipulation: mate in two, solvable only with Western rules.

Solution: `1.Bg1`. Non-silent: `2.Qa7#` after `Bxe5`, `sor 2.Qxf6#` after `Kxe5`, or `2.Qxc4#` after `Bxc4`, or `2.f4#` after `Qxg5`, `Rxg5`, `Rxh4`, `Bxh3`, `Bxf7`, or `Rxf7`. With one possible capture: `2.Qf4#` after `Rf4`, `sor 2.f4#` after `Rf5`. With two possible captures: `2.f4#` after any queen move, `sor 2.Nxf3#` after `Rf3`. The problem is insoluble under Eastern rules because of `1...Rf4` and `1...Rf3`; Western rules distinguish them by different referee messages.

### 7.2.19 - Swart final problem

Diagram FEN: `6B1/4Q2K/1pb5/1p1p2rp/1P1k3B/NR3P2/1pP2PP1/1qbrN3 w - - 0 1`

Stipulation: mate in two. Black promises not to use the defense `1...Bd2`.

Solution: `1.Qc7`. Non-silent: `2.Qxg7#` after `Rg7`, or `2.N1xc2#` after `Qxc2`, or `2.Bf6#` after `Rxg8` or `Rxg2`, or `2.Rd3#` after `Rxe1`. If `Any?` is "No," `2.Qc3#` after `Bd7`, `Be8`, `Bb7`, or `Ba8`, or `2.c3#` after `Rg6`, `Rf5`, `Qa1`, or `Qa2`, `sor 2.Qxf4#` after `Bf4` or `Rd2`, `sor 2.Qxb6#` after `Re5`. If `Any?` is "Yes," `2.fxe3#` after `Be3`, `sor 2.Bf6#` after `Rg4` or `Rg3`, `sor 2.Rxd3#` after `Rd3`.

## Other problems

### 7.3.1 - T. R. Dawson, Fairy Chess Review 3190

Diagram FEN: `1B1N4/3N3Q/8/p2P4/P5P1/1KP2p2/3P1P2/6R1 w - - 0 1`

Stipulation: mate in two. The only invisible piece is the black king, which may be on a8, a6, c8, e8, e2, or g5.

Solution: `1.Nf6`. There are three cases. If the referee announces "knight check," Black replies silently by moving `...Ke8-f8`, and `2.Qf7#` follows. If the black king reveals itself by capturing, play respectively `2.Qb7#` after `Kxb8`, `2.Qd7#` after `Kxd8`, `2.Qf7#` after `Kxf6`, `2.Qh2#` after `Kxf2`, or `2.Qc2#` after `Kxd2`. If the referee is silent, the black king has moved from a6 to b6, and `2.Qb7#` mates. `1.Nb6` fails because the king might be on e8 or g5 and move silently, leaving White unable to mate in one.

### 7.3.2 - T. R. Dawson, Fairy Chess Review 3191

Diagram FEN: `8/p4Pp1/P2K3p/pPR5/P1P5/pP6/p5P1/4Q3 w - - 0 1`

Stipulation: White has made eight captures. White has just discovered that his king cannot move. What should he do?

Solution: If all squares around the white king are guarded by two black pieces, Black can only have `Kf6/Qb7` or `Kd8/Qe4`. Therefore try `1.Qe6#`; if it is accepted, it mates. Otherwise play `1.Qxa5#`.

### 7.3.3 - T. R. Dawson, Fairy Chess Review 3192

Diagram FEN: `k7/1p6/1K1B2b1/8/1p6/8/3Q4/1q1n4 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Qg2`, then try in order `2.Qxb7#`, `2.Qg8#`, and `2.Qa2#`. In ordinary chess, `1.Qd5` would mate in two, but the silent defenses `1...Be4` and `1...Qa2`, which require different mates, refute it in Kriegspiel.

### 7.3.4 - T. R. Dawson, Fairy Chess Review 3193

Diagram FEN: `2n5/1bQ1p3/8/8/2P1k2N/2P1N3/2KPP3/2n5 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Neg2`. If `1...Nxe2`, play `2.d3#`; otherwise try, in succession, `2.exd3#`, `2.Qf4#`, `2.Qh7#`, and `2.Qxe7#`. One of these must mate.

### 7.3.5 - T. R. Dawson, Fairy Chess Review 3278

Diagram FEN: `n1N1R1N1/7P/PPB1P1R1/8/4Q2p/P6P/P7/2K5 w - - 0 1`

Stipulation: White has made 13 captures. Mate in two.

Solution: no solution text is supplied in the manuscript.

### 7.3.6 - T. R. Dawson, Fairy Chess Review 3279

Diagram FEN: `8/2P5/2P5/7p/7P/8/8/5KB1 w - - 0 1`

Stipulation: White has made 14 captures. What is the best move?

Solution: no solution text is supplied in the manuscript.

### 7.3.7 - Pien Ten Cate, The Problemist 1973

Diagram FEN: `8/8/8/2KBkpQn/8/4pr2/4P3/8 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Qh4`, threatening `2.Qd4#`. After Black moves, ask "Are there any?" If "Yes," try `exd3` as an empty try, then `2.Qd4#`; if that is refused, `2.Qh8#`; if that is refused, finally `2.Qg5#`. If "No," try `2.Qd4#`; if refused, `2.Qe7#`.

### 7.3.8 - G. Foster 1996

Diagram FEN: `R7/5PP1/1B4KP/1N6/1Q2B1P1/6P1/P1N2P1P/3R4 w - - 0 1`

Stipulation: mate in two.

Solution: White must reconstruct at least part of Black's position using the referee's replies. The first question is whether the black king is alone. All white pawns are still on the board, and a2, f2, and h2 remain on their starting squares. The pawn on g3 came from g2. The pawn on g4 came from e2 and has made two captures. The pawn on h6 came from d2 and has made four captures. It is not possible to determine whether the f7-pawn came from b2 and the g7-pawn from c2 or the reverse, but together they account for eight captures. White's pawns therefore total 14 captures, so the black king has at most one companion. That companion can only be a pawn on a7.

The black king can only be on e2, e5, e6, h3, or a6; in the last case a pawn on a7 must exist. White tries `1.Ra4`. If there is a pawn on a3 or a4, or no pawn, the move is accepted. If refused, White tries `1.Ra5`, then `1.Ra6`, then `1.Ra7`. One of those moves must work, and it also captures the black pawn if one exists, unless it is on a3. If the pawn is on a3 it cannot move, so Black must move the king.

Capture cases: if the black king is on a6, it must capture `1...Kxb6`, so `2.Rd6#`; if on e2, it must capture `1...Kxd1`, so `2.Qe1#`; if `1...Kxh2`, then `2.Rh1#`; if `1...Kxg4`, then `2.Bg2#`. Non-capture cases: the king moves between e5 and e6. Depending on White's first accepted rook move, the mates are `1.Ra4 2.Qd6#`, `1.Ra5 2.Nc7#`, `1.Ra6 2.Bc7#`, or `1.Ra7 2.Re7#`; each mates a king on either e5 or e6.

### 7.3.9 - J. Roche 1986

Diagram FEN: `8/6P1/1PPB4/1P6/1P4Q1/PP6/R1P1NK2/R2N3B w - - 0 1`

Stipulation: mate in two. Nothing is known about the black pieces.

Solution: White's pawns have captured 14 times. No pawn can have captured on the a-file, so the missing black unit, if it is a pawn, is on the a-file. Ask "Are there any?" If "Yes," Black has a pawn and the king is on d2, f6, h6, f7, h7, d8, e8, or g8. White makes an impossible pawn capture, such as `cxd3`, to satisfy the rule, then plays `1.g8=Q`; there is no stalemate because Black has the pawn. Mate is immediate if the king is on d8 or e8; otherwise `2.Q4g5#`. If `1.g8=Q` is impossible, the black king is on g8, so `1.Qg6!` and `2.Bd5#`.

If the answer is "No," Black has no pawns. The king may be on the same squares except d2, where Black's last move would be inexplicable. Then `1.g8=R 2.Qg6#`. If `1.g8=R` is impossible because the king is on g8, then `1.Qg5! 2.g8=Q#`.

### 7.3.10 - J. M. Loustau 1988

Diagram FEN: `4k1N1/2Bpr1pN/3p1pK1/1P3Q2/1p6/2q1p3/B7/8 w - - 0 1`

Stipulation: mate in two. Two twins are obtained from the diagram: twin b adds a black knight on a5; twin c adds a black knight on a5 and moves the black pawn from b4 to d4.

Solution: The same key solves all three positions: `1.Qe4!`. It gives three threats: `2.Qxe7#`, `2.Qa8#`, and `2.Bf7#`. After Black's unknown reply, White must be careful.

Twin a: White cannot try `2.Bf7?` because Black may have played `1...Qe5!`, nor `2.Qa8?` because of `1...Qa3!`. So first `2.Qxe7#`; if illegal, not `2.Bf7?`, but `2.Qa8#`; if impossible, Black has played `1...Qd3` or `1...Qc2`, so `2.Bf7#`.

Twin b: White cannot try `2.Qxe7?` because of `1...Nc6!`, nor `2.Bf7?` because of `1...Qe5!`. So first `2.Qa8#`; if impossible, then not `2.Qxe7?`, but `2.Bf7#`; if impossible, Black has played `1...d5`, so `2.Qxe7#`.

Twin c: White cannot try `2.Qa8?` because the b-file is open, nor `2.Qxe7?` because of `1...Nc6!`. So first `2.Bf7#`; if impossible, not `2.Qa8?` because of `1...Qb3!`, but `2.Qxe7#`; if impossible, Black has played `1...Re6`, so `2.Qa8#`. The three twins cycle the mating order: ABC, BCA, CAB.

### 7.3.11 - J. M. Loustau 1989

Diagram FEN: `b7/5Rpq/4n1p1/3r3P/3pB3/1NpnP3/p6R/1k2B1bK w - - 0 1`

Stipulation: mate in two.

Solution: `1.Bxc3!` with three possible mates: `2.Rf1#`, `2.Rb2#`, and `2.Bxd3#`. The continuation depends on the referee. If silent, try `2.Rf1#`; if impossible, `2.Rb2#`; if impossible because of `1...Bf2`, `2.Bxd3#`. If "capture on h5," try `2.Rb2#`; if impossible, `2.Bxd3#`; if impossible because of `1...Rxh5`, `2.Rf1#`. If "capture on c3," play `2.Rf1#`; if "capture on e3," play `2.Rb2#`; if "capture on h2," play `2.Bxd3#`. The order of White's tries cycles according to the referee's announcement.

### 7.3.12 - J. M. Loustau 1989

Diagram FEN: `N2kn2R/pB1p1p2/8/qn2PN2/pp6/4r2p/1B2P2Q/3R3K w - - 0 1`

Stipulation: mate in two. Two twins are obtained from the diagram: twin b moves the black pawn on a4 to b6; twin c moves the black pawn on a4 to c5.

Solution: The key is always `1.e6!`, with three defensible threats: `2.Bf6#`, `2.Rxd7#`, and `2.Qb8#`. Black moves silently, then White must choose carefully.

Twin a: White cannot try `2.Qb8?` because Black may have played `1...Rc3`, nor `2.Rxd7?` because of `1...Qc7!`. So `2.Bf6#`; if impossible, not `2.Qb8?`, but `2.Rxd7#`; if impossible, Black played `1...Nd4`, so `2.Qb8#`.

Twin b: White cannot try `2.Bf6?` because of `1...Qa1`, nor `2.Qb8?` because of `1...Rc3`. So `2.Rxd7#`; if impossible, not `2.Bf6?`, but `2.Qb8#`; if impossible, Black has moved something to d6, so `2.Bf6#`.

Twin c: White cannot try `2.Rxd7?` because of `1...Qc7`, nor `2.Bf6?` because of `1...Qa1`. So `2.Qb8#`; if impossible, not `2.Rxd7?`, but `2.Bf6#`; if impossible, Black played `1...Re5`, so `2.Rxd7#`. Again the three twins cycle the order ABC, BCA, CAB.

### 7.3.13 - J. Rotenberg 1976

Diagram FEN: `8/8/5B2/8/8/3N4/R6p/5K1k w - - 0 1`

Stipulation: Black has a dark-square bishop somewhere. Mate in eight. White must avoid accidentally capturing the bishop, by making tries only on light squares, to avoid stalemate.

Solution: `1.Rg2`; if impossible, `1.Nf2#`. Then `2.Rg8`; if impossible, `2.Be5! 3.Rxh2+ Bxh2 4.Nf2#`. Then `3.Rh8`; the black bishop cannot be on h8, because it would previously have been on g7, which is impossible. Continue `4.Rh5 5.Rb5`; if impossible, `5.Rh3 6.Be5`. Then `6.Rb1 7.Nf2+ Bxf2 8.Kxf2#`. Notice the white rook's journey: from a2 to b1 by way of h8.

### 7.3.14 - J. Roche, Phenix 1990

Diagram FEN: `8/1R6/2PP2PP/8/6PP/3N1P1P/Q4K2/2R5 w - - 0 1`

Stipulation: mate in two.

Solution: White's pawns have made 15 captures, so the black king is alone. It may be on d4, f6, h2, h8, c8, d8, e8, or f8. If Black were to move first, the announcements `1...Kxh3`, `1...Kxd3`, `1...Kxg6`, and silence would be met respectively by `2.Rh1#`, `2.Qd5#`, `2.Qe6#`, and `2.Qa8#`. But White must move first. False tries: `1.Rf7?`, no announcement; `1.Qg8?`, stalemate after `...Kf6`. The key is `1.Rh7`. Capture on h3: `1...Kxh3 2.Rh1#`. Capture on d3: `1...Kxd3 2.Qd5#`. Capture on g6: `1...Kxg6 2.Qf7#` (`Qe6+? Kxh7!`). Silent: `2.Rh8#` (`Qa8+? Kxa8!`).

### 7.3.15 - J. Roche 1990

Diagram FEN: `8/PPPP4/P6P/P1B1K3/P7/6QN/5R2/8 w - - 0 1`

Stipulation: mate in two.

Solution: White's pawns have made 15 captures, so the black king is alone. It may be on a1, b1, c1, d1, e1, c4, c6, h5, h7, or h8, but not h1, because then Black's last move would have been impossible. The tries `1.d8=Q?`, `1.c8=Q?`, and `1.b8=Q?` stalemate if the king is on e1, c4, and a1 respectively. The key is `1.a8=Q`. A rank check is met by `2.Qg7#`. If there is a capture, the possible captures are `...Kxc5`, `...Kxc7`, `...Kxd7`, and `...Kxh6`, met respectively by `Qc3#`, `Qc8#`, `c8=Q#`, and `Qh8#`. If silent, `2.Qg1#`.

### 7.3.16 - J. M. Loustau 1991

Diagram FEN: `3Q4/6q1/2p1krP1/8/3R4/1N4BP/BK2N3/4R3 w - - 0 1`

Stipulation: mate in two.

Solution: `1.Rg4`. The key is surprising because it throws the white king into a discovered check. In return, it prepares two double-check mates: `2.Nbd4#` and `2.Ned4#`. If the referee is silent, White must not ask "Are there any?", because he would not know which capture is absent and would miss the mate in two. White also must not try `2.Ned4#` because of `1...Qd7!`; therefore `2.Nbd4#`, and if impossible because of `1...Qb7`, then `2.Ned4#`. If the referee announces "check," the question is again useless, since the answer is certainly "No" because of the long-diagonal check. White must not try `2.Nbd4#` because of `1...Rf4`; therefore `2.Ned4#`, and if impossible because of `1...Rf2`, then `2.Nbd4#`. If the referee says "capture on g6," play `2.Nbd4#`.

### 7.3.17 - Ferguson and MacQueen 1976

This is a special problem with a completely invisible board: we can only hear the referee's announcements. It uses RAND rules, under which the referee announces the squares on which pawn captures may be tried.

Referee announcements:

1. White has moved. Black has moved.
2. White has moved. Black has moved.
3. White has moved. Black has moved.
4. White has moved. Black has moved.
5. White has moved. Black may try on d4. Black has moved.
6. Pawn captured on d4. White has moved. Black may try on c3. Black has moved.
7. Piece captured on c3. White may try on c3. White has moved. Black has moved.
8. Check on the long diagonal. Black has moved.
9. White may try on d7 and f7. Black may try on b5. Black has moved.
10. White may try on d7 and f7. No. No. ... No. A series of 16 or 17 "No" answers.

Question: at what moment does a person who can only listen to the referee, without seeing the boards, say "White mates in three moves"?
