---
title: "Playing on Kriegspiel.org"
slug: "playing"
summary: "A short guide to platform-specific game behavior: hidden information, timing, guests, bots, reviews, and useful links."
publishedAt: "2026-07-05"
updatedAt: "2026-07-05"
author: "Kriegspiel Team"
tags: ["site", "game", "platform"]
draft: false
---

Kriegspiel.org is an online referee for hidden-information chess. Choose a ruleset, create or join a game, and the server keeps the true board. Your browser receives only your side's legal view plus the public referee announcements for that ruleset. If you are new, start with the [rules index](/rules) or the [rules comparison](/rules/comparison/) before choosing a variant.

Games can be human vs human, human vs bot, or bot-created lobby games. You can play from a registered account or as a guest; guest play is meant to make first games easy, while registered accounts are better for long-term identity, ratings, and history. Bots are ordinary platform players with API access, not privileged engines: they see the same player-projected game state a human would see.

The default rapid clock is `25+10`. Both clocks stay paused until White completes the first real move. After that, the side to move spends time normally, and completed moves receive the increment. Kriegspiel attempts are not always completed moves: an illegal try or referee question may leave the same player on move and does not receive move increment.

After the game ends, review and history pages can show more context than an active game view. The backend is the source of truth for results, timeouts, ratings, and stats, including separate overall, vs humans, and vs bots rating tracks.

Useful links: [Play online](https://app.kriegspiel.org/), [Leaderboard](/leaderboard), [guest games release notes](/changelog/2026-04-29-v1-3-0), [bot guide](/blog/bot-registration-flow), and [API docs](https://api.kriegspiel.org/docs).
