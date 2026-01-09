---
description: comprehensive workflow for managing data, building pages, and verifying SEO for TopRated.co.nz
---

# TopRated Directory SEO Cycle

This workflow describes the lifecycle of adding content and publishing changes to the directory.

## 1. Content Expansion (Data Entry)
The directory is data-driven. To add content, you modify the JSON files rather than HTML directly.

1. **Add Businesses**:
   - Open `data/businesses.json`.
   - Add a new business object ensuring all SEO fields are present (description, rating, schema data).
   - *Rule*: ID must be unique. Slug must be kebab-case-city-industry.

2. **Add Taxonomy (if needed)**:
   - If a new city is needed, add to `data/cities.json`.
   - If a new industry is needed, add to `data/industries.json`.

## 2. Static Site Generation (Build)
*Note: Requires the build script (planned).*

1. **Run Generation**:
   Execute the Node.js build script to generate the 450+ landing pages.
   ```bash
   node scripts/generate_pages.js
   ```
   *This command will reads the JSON data and hydrates `*-template.html` files.*

2. **Verify Output**:
   - Check that new folders in `/cities/` and `/industries/` were created.
   - Verify `sitemap.xml` was updated with new URLs.

## 3. SEO Quality Assurance aka "The Vibe Check"
Before deploying, validate the "Money Pages" (City + Industry combinations).

// turbo
1. **Local Server**:
   ```bash
   npx serve .
   ```

2. **Manual Check**:
   - Open a newly generated page (e.g., `http://localhost:3000/auckland/plumbers`).
   - Verify Breadcrumbs: `Home > Cities > Auckland > Plumbers`.
   - Check Title Tag matches: "Top-Rated Plumbers in Auckland | TopRated NZ".

3. **Automated Check**:
   - Run Lighthouse in Chrome DevTools.
   - **Target**: SEO Score > 90.

## 4. Deployment
1. Commit all changes (JSON data + Generated HTML).
2. Push to main branch.
