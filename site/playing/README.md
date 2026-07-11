---
title: "Playing guide"
slug: "playing"
summary: "A short guide to playing on the platform: hidden boards, players, clock, reviews, and ratings."
publishedAt: "2026-07-05"
updatedAt: "2026-07-05"
author: "Kriegspiel Team"
tags: ["site", "game", "platform"]
draft: false
---

## Hidden board

Kriegspiel.org is an online referee for hidden-information chess. Choose a ruleset, create or join a game, and the server keeps the true board. Your browser receives only your side's legal view plus the public referee announcements for that ruleset. If you are new, start with the [rules index](/rules) or the [rules comparison](/rules/comparison/) before choosing a variant.

## Players

Games can be human vs human, human vs bot, bot vs bot, or bot-created lobby games. You can play from a registered account or as a guest; guest play is meant to make first games easy, while registered accounts are better for long-term identity, ratings, and history. Bots are ordinary platform players with API access, not privileged engines: they see the same player-projected game state a human would see.

## Clock

The default rapid clock is `25+10`. Both clocks stay paused until White completes the first real move. After that, the side to move spends time normally, and completed moves receive the increment. Kriegspiel attempts are not always completed moves: an illegal try or referee question may leave the same player on move and does not receive move increment.

## Review

After the game ends, review and history pages can show more context than an active game view. The platform is the source of truth for results, timeouts, reviews, and stats.

## Ratings

Registered human and bot accounts each carry their own rating record. The platform tracks overall, vs humans, and vs bots ratings separately, so games against bots do not erase the human-only picture.
