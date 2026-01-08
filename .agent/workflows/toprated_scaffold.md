---
description: How to develop and deploy the TopRated.co.nz website
---

# TopRated.co.nz Development Workflow

This workflow guides you through running the website locally, adding new content, and deploying to production.

## 1. Running Locally
Because this project uses JavaScript `fetch()` to load the header and footer, you **cannot** simply double-click `index.html`. You must run a local server.

### Option A: Using Python (Pre-installed on most systems)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option B: Using Node.js
```bash
npx serve .
```

## 2. Project Structure
- `index.html`: Homepage.
- `css/styles.css`: All colors, fonts, and global styles detailed here. Change `--color-primary` to tweak the theme.
- `components/`: Contains `header.html` and `footer.html`. Edit these to change the navigation or footer across ALL pages simultaneously.
- `data/businesses.json`: The "database" of businesses. Add new entries here.

## 3. Adding New Pages
To create a new page (e.g., `contact.html`):
1. Copy `index.html`.
2. Keep the `<header id="site-header"></header>`, `<footer id="site-footer"></footer>` and script tags.
3. Replace the content inside `<main>...</main>`.
4. Update navigation in `components/header.html` if needed.

## 4. Deploying to Cloudflare Pages
1. Push this code to a GitHub repository.
2. Log in to Cloudflare Dashboard > Pages.
3. specific "Create Project" > "Connect to Git".
4. Select your repository.
5. **Build Settings**:
   - Framework Preset: None / HTML
   - Build Command: (Leave empty)
   - Output Directory: (Leave empty or use `.`)
6. Click "Save and Deploy".

## 5. SEO Checklist
Before publishing meaningful updates:
- Update the `<title>` and `<meta name="description">` in every HTML file.
- Ensure all `<img>` tags have `alt` text.
- Add `sitemap.xml` to the root (can be generated).
