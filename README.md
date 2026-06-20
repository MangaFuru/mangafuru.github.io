# GoManga Website

Static GitHub Pages site for GoManga product information, support, privacy policy, and terms of use.

## Scope

This repository owns the public website content:

- `index.html` - product overview and positioning.
- `getting-started.html` - basic app workflow.
- `faq.html` - source, support, privacy, and issue-report boundaries.
- `support.html` - guided GitHub issue form.
- `privacy.html` - privacy policy.
- `terms.html` - terms of use.
- `404.html` - not-found page.
- `assets/styles.css` - manga "GO!" design system (dark, comic energy; no framework).
- `assets/lang.js` - first-party bilingual switch (中 / EN).
- `assets/report.js` - support-page issue-draft generator.
- `assets/*.png` - brand visuals copied from the GoManga app.

No build step is required. GitHub Pages can serve the repository root directly.

## Bilingual (中 / EN)

Every page ships both languages inline. The switch keys off `<html lang>`:

- Static markup sets `lang="zh-Hant"`, and `styles.css` hides the `[data-t="en"]`
  blocks, so the site renders correctly **even with JavaScript disabled**.
- `lang.js` only adds the header toggle, swaps `<title>`/description, and
  persists the choice. It is first-party — no third-party scripts.
- Per-section content lives in `<span data-t="zh">…</span><span data-t="en">…</span>`
  (or `<div data-t="…">` for blocks). Placeholders use `data-ph-zh` / `data-ph-en`.
- **The Traditional Chinese text is the controlling version**; English is a
  convenience translation. Keep both in sync when editing legal pages.

## Content Rules

- Do not publish manga content, source recommendations, credentials, cookies, or tokens.
- Do not promise support for a specific third-party source or host.
- Keep all legal/support pages in this repository, not in `GoMangaApp`.
- Do not add analytics or third-party scripts unless the privacy policy is updated first.
- Legal/privacy contact is `gomanga.support@gmail.com`; keep it consistent across pages.
