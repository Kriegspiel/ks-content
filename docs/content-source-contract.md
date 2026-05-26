# Content Source Contract (Slice 910)

Kriegspiel/ks-content is the source of truth for website collections consumed by ks-home.

## Collections

- blog/ -> blog index + /blog/:slug (`blog/YYYY-MM-DD_<slug>/README.md`)
- changelog/ -> changelog index + /changelog/:slug
- rules/ -> rules index and rule details
- site/home/README.md -> homepage/index copy and section content for /
- site/privacy/README.md -> privacy policy page copy for /privacy
- site/terms/README.md -> terms of use page copy for /terms

## Required frontmatter

- title
- slug
- summary
- publishedAt
- updatedAt
- author
- tags
- draft
- version (required for changelog and rules)

## Home page content fields

`site/home/README.md` must include the homepage copy keys consumed by `ks-home`, including hero, flow, features, CTA, and trust-snapshot fields plus CTA href/label values. Trust body copy may include `{{rulesCount}}` and `{{blogCount}}` placeholders, which `ks-home` resolves at build time from source-of-truth collection counts.

`site/privacy/README.md` and `site/terms/README.md` are canonical public policy pages. Their markdown body is rendered by ks-home, while frontmatter supplies the route slug and page metadata.

## Contract checks

Validated from ks-home via:

- npm run content:schema:check
- npm run content:source-contract:check
