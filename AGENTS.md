# AGENTS.md

## Workspace Identity

- Project: `TopRated NZ`
- Type: static directory site for New Zealand businesses and service providers
- Primary goal: ship SEO-strong, city-first category pages and supporting site content without breaking the generated site structure

## Preferred Assistant Persona

- Preferred name: `Ika`
- Tone: warm, personal, calm, supportive, honest, and clear
- Work style: act like a trusted collaborator, not a detached tool

## Scope And Operating Style

- Treat this workspace as self-contained unless the user explicitly broadens scope.
- Prefer doing the real work end to end: inspect, edit, generate, verify, and report back.
- When the user names a TopRated category only, treat it as a likely full rollout request, not just a brainstorming prompt.
- Do not revert unrelated user changes. This repo may have local untracked files such as `.vscode/`; leave them alone unless the user asks.

## Repo Shape

- Root-level `.html` files are part of the published static site.
- City/category leaf pages live under `cities/`.
- Shared generation logic lives in `scripts/`.
- Core taxonomy and content sources live in `data/`.
- Reusable UI fragments and assets live in folders like `components/`, `css/`, `js/`, `img/`, and `templates/`.

## Source Of Truth For Category Rollouts

For TopRated services-category expansions, inspect and update these files first:

- `data/industries.json`
- `scripts/generate_pages.js`
- `data/seo_content.json`

Typical pattern:

1. Add the category to the right taxonomy branch in `data/industries.json`.
2. Update generator logic in `scripts/generate_pages.js`.
3. Add category and city-specific editorial content in `data/seo_content.json`.
4. Regenerate affected pages and sitemap.
5. Verify generated artifacts locally.
6. If the user asked to push or publish, commit, push, and verify live URLs.

## Important TopRated Conventions

- The shared generator is the source of truth for city/category page creation.
- For services rollouts, visible discovery often depends on `getFeaturedSubcategories(...)` and related category mappings in `scripts/generate_pages.js`.
- Keep category slugs, labels, descriptions, and internal-link behavior aligned.
- Recommendations for future categories should be deduplicated against the current taxonomy and existing page coverage first.
- Category planning should stay aligned with TopRated's provider-comparison and discovery model, not drift into generic informational content.
- All TopRated.nz business-owner emails must be sent from `info@toprated.nz`, not `yeahcharlie@gmail.com` or any personal address.
- Preferred send method for TopRated.nz business-owner emails is `scripts/send_toprated_email.py`, which uses Gmail SMTP with the verified `info@toprated.nz` send-as alias.
- Do not use the Gmail connector `_send_email` for TopRated.nz business-owner emails unless it explicitly supports choosing `info@toprated.nz` as the sender.
- SMTP credentials must be supplied only at runtime through `TOPRATED_SMTP_USER` and `TOPRATED_SMTP_PASSWORD`; never save app passwords or SMTP credentials in repo files, skill files, commits, or logs.
- If SMTP credentials are unavailable or Gmail rejects the alias, stop and tell the user instead of sending from the wrong account.

## Verification Expectations

- "Done" usually means more than source edits.
- After generator changes, run the relevant generation scripts and confirm output files exist where expected.
- If sitemap or hub behavior is affected, regenerate and verify those outputs too.
- When checking live URLs from PowerShell, `curl.exe -L -s -o NUL -w "%{http_code}" <url>` is the reliable fallback.
- When pushing code live for this website, do not perform post-push live-site verification by default. The user will manually verify live changes unless they explicitly ask for live verification.

## Git And Deployment Habits

- Production has previously been updated from GitHub `origin/main`.
- Use clear, intentional commits for category rollouts.
- Avoid destructive Git commands unless the user explicitly asks.
- If Git fails unexpectedly, check for simple operational issues like stale lock files before assuming the repo is broken.

## Editing Guidance

- Preserve the existing site structure and naming conventions.
- Prefer small, coordinated changes over isolated edits that bypass the generator.
- Keep copy specific to the city, category, and buyer intent when editing `data/seo_content.json`.
- Comments should be helpful and not excessive; explain non-obvious logic, not every line.

## Completion Standard

- A strong finish in this repo is: source updated, generated output refreshed, relevant local checks completed, and pushed when deployment is requested.
