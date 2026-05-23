---
title: "Source mirrors, archives, and rights review"
slug: "source-mirror-archive-storage"
summary: "A draft plan for preserving Kriegspiel papers, books, manuscripts, and supporting links without publishing material before its rights status is clear."
publishedAt: "2026-06-23"
updatedAt: "2026-06-23"
author: "Kriegspiel Team"
tags: ["research", "archives", "rights"]
draft: true
lifecycle: draft
---

Kriegspiel research lives in a fragile public record. Some sources sit in
ordinary journal archives. Others live on old university pages, personal pages,
scan repositories, tournament sites, library catalogues, or PDFs linked from
pages that have not changed in years. A reader can still reconstruct the field,
but only by trusting a trail of links that may not stay alive.

This post is a draft preservation policy for that trail. The goal is simple:
make Kriegspiel sources easier to find without quietly republishing material we
do not have the right to serve.

## Why mirrors are tempting

Several sources are foundational enough that losing access would harm future
work on the site:

| Source family | Examples | Why preservation matters |
| --- | --- | --- |
| Bologna papers and manuscripts | Paolo Ciancarini's Kriegspiel page, *La Scacchiera Invisibile*, Gian Piero Favini's thesis | This is the broadest public research program around Darkboard, metapositions, MCTS, and endgame analysis. |
| Berkeley materials | Jason Wolfe's rules, problem database, PGN notation, and Wolfe/Russell papers | These sources define a clean rules and benchmark tradition that is useful for modern platform tests. |
| UCLA and Shapley materials | Thomas Ferguson's papers and Lloyd Shapley's *The Invisible Chessboard* | These preserve the mathematical and problem-composition tradition behind several endgame claims. |
| Tournament records | ICGA pages for the 2006 and 2009 Kriegspiel Olympiad events | These are the best public anchors for Darkboard's competitive record. |
| Books and catalogued pamphlets | Cayley, Anderson, David H. Li, and related problem collections | These are harder to find and often exist only as catalogue records or used copies. |

The preservation case is strongest for source metadata: title, author, year,
venue, current URL, catalogue records, access notes, and rights status. The case
for serving a local copy depends on the rights review.

## The rights-first rule

Local storage is not the same as public serving. We should separate four states:

| Status | Meaning | Site behavior |
| --- | --- | --- |
| `citation-only` | We know the source exists, but do not have rights to mirror it. | Link to the official or catalogue page only. |
| `public-domain` | The work is old enough or otherwise confirmed to be public domain in the relevant jurisdictions. | A local copy may be served with a rights note. |
| `open-license` | The work has an explicit license allowing redistribution. | A local copy may be served with license attribution. |
| `permission-granted` | The rights holder explicitly allows Kriegspiel.org to host a copy. | A local copy may be served with permission details recorded. |
| `needs-review` | We have not finished the rights review. | Do not serve a local copy. |

The site should never use "it was easy to download" as a proxy for permission.
Academic PDFs, personal scans, and institutional repository files can be
publicly accessible while still carrying restrictions on redistribution.

## What to store before publication

The first useful artifact is a source registry, not a pile of PDFs. A registry
entry should capture:

- title
- author or editor
- year or best-known date range
- publication venue or source type
- canonical URL
- backup discovery URLs
- catalogue identifiers such as DOI, WorldCat, institutional handle, or ISBN
- current access status
- rights status
- local-copy status
- review notes
- last verified date

That registry could live in `content` as structured metadata and feed future
public source pages. It could also remain private until the site has a clear
display design.

## Source types need different treatment

Journal papers should usually point to DOI, publisher, conference, or author
pages. If an author-hosted PDF is available, link to it, but do not mirror it
unless the license or author permission allows that.

University-hosted theses and institutional repository records are often good
candidates for stable links. They still need rights notes before mirroring.
Favini's thesis, for example, has a public University of Bologna repository
record and a downloadable PDF. That makes it a strong citation source, but the
rights metadata still matters.

Manuscripts and archival scans need the most care. Shapley's *The Invisible
Chessboard* is publicly available through the Harlow Shapley Project, but a
local mirror should still record who owns the scan and what permission applies.

Books, pamphlets, and problem collections should start as annotated catalogue
entries. Cayley, Anderson, and David H. Li are valuable even when the public web
only provides library or sales records. For those, the first site feature should
be discovery, not reproduction.

## Candidate registry fields

```yaml
id: favini-dark-side-board
title: "The dark side of the board: advances in chess Kriegspiel"
authors:
  - "Gian Piero Favini"
year: 2010
type: thesis
canonicalUrl: "https://amsdottorato.unibo.it/id/eprint/2403/"
accessUrls:
  - "https://amsdottorato.unibo.it/id/eprint/2403/1/favini_gianpiero_tesi.pdf"
rightsStatus: needs-review
localCopy: none
lastVerified: "2026-05-23"
notes: "Public institutional repository record; review repository rights before mirroring."
```

The registry should prefer stable identifiers over convenience links. DOI,
publisher record, institutional handle, WorldCat record, and author page are all
more useful than an arbitrary copied PDF path when they exist.

## Proposed workflow

1. Build a private or draft source registry from the existing research-map
   citations.
2. Mark every item `needs-review` by default.
3. Promote obvious catalogue-only items to `citation-only`.
4. Review candidate public-domain items separately, especially older pamphlets.
5. Ask permission for sources that are central, fragile, and not otherwise
   mirrorable.
6. Serve local copies only after the rights status is recorded.
7. Add a public "source notes" section to each mirrored item explaining why it
   can be hosted.

## Open questions

- Should the registry live in `content` as a public draft, or should rights
  review begin in a private operator note?
- Do we want local copies for preservation only, or visible download pages?
- Which jurisdiction should the public-domain review use as the minimum bar?
- How should we record author-granted permission so future maintainers can
  audit it?
- Should mirrored files live in `content`, `ks-home`, object storage, or a
  separate archive repository?

## A cautious first milestone

The safest first milestone is an annotated source index with no local serving.
That already improves the public record: readers get stable citations, source
types, date notes, and access notes in one place. Mirroring can come later,
source by source, after the rights work is done.
