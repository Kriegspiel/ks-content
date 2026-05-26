# Editorial Pipeline (Slice 930)

## Authoring Conventions
- Write blog posts in `blog/YYYY-MM-DD_<slug>/README.md` and release entries in `changelog/*.md`.
- Store site singleton pages in `site/<slug>/README.md`.
- Required frontmatter: `title`, `slug`, `summary`, `publishedAt`, `updatedAt`, `author`, `tags`, `draft`.
- Changelog additionally requires `version`.
- Keep `draft: true` for preview-only content.

## Local Validation
```bash
npm ci
npm run lint:markdown
npm run lint:links
npm run validate:frontmatter
npm run build:content-index
```

## Preview Flow
- `ks-home` supports draft preview with `KS_PREVIEW_DRAFTS=true npm run build`.
- Production build excludes drafts by default.

## Publishing Checklist
1. Run all content checks above.
2. Verify slug uniqueness.
3. Link to related changelog/blog entry when relevant.
4. Merge the `ks-content` PR; website regeneration check must pass.
