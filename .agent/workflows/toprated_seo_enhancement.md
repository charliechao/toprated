---
description: Workflow for enhancing a specific city/industry landing page with rich SEO content, FAQs, and schema.
---

# TopRated Page SEO Enhancement Workflow

Use this workflow when you want to strengthen a specific "money page" (e.g., Auckland Japanese Restaurants) to compete with top SERP results.

## 1. Research phase
1. Identify the target URL (e.g., `https://toprated.nz/cities/auckland/cuisine/japanese-restaurants`).
2. Search for the keyword on Google and analyze the top 3-5 results.
3. Note down:
   - Common content types (e.g., "Top 10 lists", neighborhood breakdowns).
   - Frequently asked questions (FAQs).
   - Strategic keywords and unique value propositions.

## 2. Data Enhancement
1. **Update `data/seo_content.json`**:
   - Add an entry for the page slug (e.g., `"auckland/cuisine/japanese-restaurants"`).
   - Provide `introText` (1-2 paragraphs, keyword-rich).
   - Add 3-5 `faqs` (question and answer objects).
2. **Update `data/businesses.json`**:
   - Enhance descriptions for the top-rated businesses in this category.
   - Add `neighborhood` tags (e.g., "CBD", "Ponsonby").
   - Add specific `tags` (e.g., "Sushi", "Fine Dining").
3. **Update `data/industries.json`** (if needed):
   - Ensure the specific subcategory is listed in the `subCategories` array for its industry.

## 3. Build & Verify
// turbo
1. **Run Page Generation**:
   ```powershell
   node scripts/generate_pages.js
   ```
2. **Verify Injection**:
   - Open the generated HTML file and ensure:
     - `introText` is present.
     - FAQ section is rendered.
     - `FAQPage` schema (JSON-LD) is in the `<head>`.
3. **Check Frontend**:
   - Use `npx serve .` to view the page.
   - Verify business cards show the new neighborhood and specialty tags.

## 4. Deployment
1. **Git Commit & Push**:
   ```powershell
   git add .
   git commit -m "seo: enhance [City] [Industry] page with rich content and schema"
   git push
   ```
