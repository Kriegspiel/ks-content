import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { entryStem, listMarkdown, parseFrontmatter } from "./lib.mjs";

const ALLOWED_LIFECYCLES = new Set(["draft", "review", "published", "archived"]);
const REQUIRED_PATHS = ["/blog/", "/changelog/", "/rules/", "/docs/", "/scripts/", "/.github/"];
const SINGLE_CAPITAL_SITE_TITLE_STEMS = new Set(["playing"]);
const codeownersPath = path.join(process.cwd(), ".github", "CODEOWNERS");
const issues = [];

for (const dir of ["blog", "changelog", "rules", "site", "docs", "scripts", ".github/workflows"]) {
  if (!fs.existsSync(path.join(process.cwd(), dir))) {
    issues.push(`missing required path: ${dir}`);
  }
}

const docs = [...listMarkdown(process.cwd(), ["blog", "changelog", "rules"]), ...listMarkdown(process.cwd(), ["site"])];
for (const doc of docs) {
  const { metadata } = parseFrontmatter(doc.raw);
  const stem = entryStem(doc);
  const slug = String(metadata.slug || "");
  const lifecycle = String(metadata.lifecycle || "");

  if (doc.dir === "blog" && path.basename(doc.file).toLowerCase() === "readme.md") {
    if (!/^\d{4}-\d{2}-\d{2}_[a-z0-9]+(?:-[a-z0-9]+)*$/.test(stem)) {
      issues.push(`${doc.dir}/${doc.file}: blog folder entry must be YYYY-MM-DD_slug`);
    }
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(stem)) {
    issues.push(`${doc.dir}/${doc.file}: filename must be lowercase kebab-case`);
  }

  if (doc.dir === "changelog" && !/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(stem)) {
    issues.push(`${doc.dir}/${doc.file}: changelog filename must start with YYYY-MM-DD-`);
  }

  if (doc.dir === "site") {
    if (path.basename(doc.file).toLowerCase() !== "readme.md") {
      issues.push(`${doc.dir}/${doc.file}: site entries must live in slug/README.md`);
    }
    if (slug && slug !== stem) {
      issues.push(`${doc.dir}/${doc.file}: site folder must match slug (${slug})`);
    }
    if (SINGLE_CAPITAL_SITE_TITLE_STEMS.has(stem)) {
      for (const title of siteTitleTexts(metadata, doc.raw)) {
        if (!hasExactlyOneCapital(title)) {
          issues.push(`${doc.dir}/${doc.file}: title must contain exactly one capital letter: ${title}`);
        }
      }
    }
  }

  if (doc.dir === "blog" && path.basename(doc.file).toLowerCase() === "readme.md" && slug) {
    const [, folderSlug = ""] = stem.split(/_(.+)/);
    if (folderSlug && slug !== folderSlug) {
      issues.push(`${doc.dir}/${doc.file}: blog folder suffix must match slug (${slug})`);
    }
  } else if (slug && slug !== stem) {
    issues.push(`${doc.dir}/${doc.file}: filename must match slug (${slug}.md)`);
  }

  if (doc.dir !== "site") {
    if (!ALLOWED_LIFECYCLES.has(lifecycle)) {
      issues.push(`${doc.dir}/${doc.file}: lifecycle must be one of ${Array.from(ALLOWED_LIFECYCLES).join(", ")}`);
    }

    if ((lifecycle === "draft" || lifecycle === "review") && metadata.draft !== true) {
      issues.push(`${doc.dir}/${doc.file}: lifecycle ${lifecycle} requires draft: true`);
    }

    if ((lifecycle === "published" || lifecycle === "archived") && metadata.draft !== false) {
      issues.push(`${doc.dir}/${doc.file}: lifecycle ${lifecycle} requires draft: false`);
    }
  }
}

if (!fs.existsSync(codeownersPath)) {
  issues.push("missing .github/CODEOWNERS");
} else {
  const codeowners = fs.readFileSync(codeownersPath, "utf8");
  for (const requiredPath of REQUIRED_PATHS) {
    if (!codeowners.includes(requiredPath)) {
      issues.push(`CODEOWNERS missing rule for ${requiredPath}`);
    }
  }
  const ownerMentions = codeowners.match(/@[A-Za-z0-9_.-]+\/?[A-Za-z0-9_.-]*/g) || [];
  if (ownerMentions.length === 0) {
    issues.push("CODEOWNERS must assign at least one owner");
  }
}

assert.equal(issues.length, 0, issues.join("\n"));
console.log(`content-policy-check: PASS (${docs.length} content docs)`);

function siteTitleTexts(metadata, raw) {
  const titles = [];
  if (metadata.title) titles.push(String(metadata.title));
  for (const line of raw.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (match) titles.push(match[2]);
  }
  return titles;
}

function hasExactlyOneCapital(value) {
  const capitals = value.match(/[A-Z]/g) || [];
  return capitals.length === 1;
}
