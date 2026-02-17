---
description: Workflow for enhancing a specific city/industry landing page with rich SEO content, FAQs, and schema — modelled on MoneyHub.co.nz's proven ranking strategy.
---

# TopRated Page SEO Enhancement Workflow

Use this workflow when you want to strengthen a specific "money page" (e.g., Auckland Japanese Restaurants) to compete with top SERP results. This workflow is based on a competitive analysis of [MoneyHub.co.nz](https://www.moneyhub.co.nz/), the top-ranking NZ directory site.

---

## Key Principles (Why MoneyHub Ranks)

Before starting, keep these principles in mind:

1. **Content Depth Wins** — MoneyHub pages average 3,000–5,000 words per page. Our target is **1,500–2,500 words of editorial content** per leaf page, plus the business listings themselves.
2. **Buyer's Guide First, Directory Second** — Each page should read like a helpful guide that happens to include business recommendations, NOT just a list of cards.
3. **E-E-A-T Signals** — Google rewards Experience, Expertise, Authoritativeness, and Trustworthiness. Add named authorship, methodology explanations, and trust indicators.
4. **Keyword-Rich URLs & Titles** — Target the exact "Best [Service] in [City]" phrase that users search for.
5. **Massive Internal Linking** — MoneyHub's homepage links to 600+ resources. Every page should cross-link to related pages.

---

## 1. Research Phase

1. Identify the target URL (e.g., `https://toprated.nz/cities/auckland/cuisine/japanese-restaurants`).
2. Determine the **primary keyword** people search for (e.g., "best Japanese restaurants Auckland").
3. Search for the keyword on Google and analyze the **top 3–5 results**.
4. Note down:
   - Common content types (e.g., "Top 10 lists", neighborhood breakdowns, pricing guides).
   - Frequently asked questions (FAQs) that appear in "People Also Ask".
   - Strategic keywords and unique value propositions competitors use.
   - **Content length** of top-ranking pages (aim to match or exceed).
   - **Buyer's guide sections** (e.g., "How to choose a builder", "What to expect to pay").
5. Check if MoneyHub has an equivalent page (e.g., `moneyhub.co.nz/best-builders-auckland.html`) and document their content structure.

---

## 2. Content Creation — The Buyer's Guide

This is the **most important step** and the biggest gap between TopRated and competitors like MoneyHub.

### 2.1 Write the Buyer's Guide Content

For each leaf page, create the following editorial sections in `data/seo_content.json`:

| Section | Target Length | Example |
|---------|--------------|---------|
| **introText** | 150–250 words | Overview of the service/cuisine in that city, why it matters, what to look for |
| **buyersGuide** | 500–800 words | "How to Choose the Best [Service] in [City]" — practical advice, what to look for, red flags |
| **pricingGuide** | 300–500 words | "How Much Does [Service] Cost in [City]?" — price ranges, factors affecting cost, payment tips |
| **questionsToAsk** | 200–400 words | "Questions to Ask Before Hiring a [Service]" — 5–8 specific questions with brief explanations |
| **faqs** | 5–8 Q&A pairs | Target "People Also Ask" queries from Google, each answer 50–150 words |

**Total editorial content target: 1,500–2,500 words per page.**

### 2.2 JSON Structure for `seo_content.json`

```json
{
  "auckland/trades/electricians": {
    "introText": "Auckland is home to over 500 registered electricians...",
    "buyersGuide": {
      "title": "How to Choose the Best Electrician in Auckland",
      "content": "Finding a reliable electrician in Auckland requires..."
    },
    "pricingGuide": {
      "title": "How Much Do Electricians Charge in Auckland?",
      "content": "Electrician rates in Auckland typically range from...",
      "priceTable": [
        { "service": "Standard call-out", "range": "$80–$120/hour" },
        { "service": "Full house rewire", "range": "$8,000–$20,000" }
      ]
    },
    "questionsToAsk": [
      "Are you a registered electrician with the EWRB?",
      "Do you provide a written quote before starting?",
      "What warranty do you offer on your work?"
    ],
    "faqs": [
      {
        "question": "How much does an electrician cost in Auckland?",
        "answer": "Auckland electricians typically charge $80–$120 per hour..."
      }
    ],
    "lastUpdated": "February 2026",
    "author": "TopRated Editorial Team"
  }
}
```

### 2.3 Content Quality Rules

- **No filler content** — every sentence must add value.
- **Use NZ-specific language** — "WoF" not "MOT", "tradesperson" not "contractor", "$NZD" prices.
- **Include local knowledge** — mention specific suburbs, local regulations, seasonal factors.
- **Cite sources** where possible — link to government bodies (e.g., MBIE, NZTA), industry associations.
- **Update dates** — always include a "Last Updated: [Month Year]" to signal freshness to Google.

---

## 3. Business Profile Enhancement

MoneyHub lists **8–15 bullet points per business** with full contact details. Our current listings have only 1–2 sentences.

### 3.1 Update `data/businesses.json`

For each business on the target page, enhance with:

| Field | Required | Example |
|-------|----------|---------|
| `description` | ✅ | Detailed 2–3 sentence description (50–100 words) |
| `highlights` | ✅ NEW | Array of 5–8 bullet points — what makes them stand out |
| `neighborhood` | ✅ | Specific suburb (e.g., "Ponsonby", "Grey Lynn") |
| `specialties` | ✅ NEW | Array of specialty tags (e.g., ["Sushi", "Omakase", "BYO"]) |
| `phone` | 🟡 Optional | Phone number for direct contact |
| `email` | 🟡 Optional | Contact email |
| `certifications` | 🟡 Optional | Industry certifications (e.g., "Master Builder", "Licensed Building Practitioner") |
| `yearEstablished` | 🟡 Optional | Adds trust signal |

### 3.2 Example Enhanced Business Entry

```json
{
  "name": "Mod Builders",
  "industry": "Builders",
  "city": "Auckland",
  "rating": 4.9,
  "reviews": 85,
  "description": "Auckland-based residential building company specialising in renovations, alterations and home additions. Small team of Licensed Building Practitioners and Master Builders handling projects of all sizes.",
  "highlights": [
    "Straightforward, no-nonsense approach to projects",
    "Strong eye for detail with high-standard finishes",
    "Licensed Building Practitioners and Master Builders",
    "Offers free pre-consent renovation consultation",
    "Fixed-price building contracts available",
    "Specialises in renovations, alterations and home additions"
  ],
  "certifications": ["Licensed Building Practitioner", "Master Builder"],
  "specialties": ["Renovations", "Extensions", "Alterations"],
  "neighborhood": "Central Auckland",
  "yearEstablished": 2015,
  "website": "https://modbuilders.nz/",
  "phone": "021 0224 3713"
}
```

---

## 4. E-E-A-T Signals (Expertise, Experience, Authority, Trust)

These are **critical** for Google ranking, especially in YMYL (Your Money, Your Life) categories.

### 4.1 Author Attribution
- Every page should display "Researched by TopRated Editorial Team" or a named author.
- Add an **author bio section** at the bottom of each guide page.
- Link to a dedicated `/about.html` page that explains the editorial methodology.

### 4.2 Methodology Page
- Create or update `/about.html` with a "How We Rate Businesses" section explaining:
  - How businesses are selected (curated, not pay-to-play).
  - What review sources are used (Google Reviews, verified customer feedback).
  - How often listings are updated.
  - Editorial independence declaration.

### 4.3 Trust Signals on Each Page
- Display "Last Updated: [Month Year]" prominently.
- Show the total number of businesses reviewed (e.g., "We reviewed 47 electricians in Auckland").
- Add a "Why Trust TopRated?" box linking to the methodology page.

---

## 5. Table of Contents & Page Structure

MoneyHub uses anchor-linked tables of contents on every guide page. This improves UX and can trigger **Featured Snippets** in Google.

### 5.1 Recommended Page Structure

```
1. Hero Section (H1: "Best [Service] in [City]")
2. Table of Contents (anchor links)
3. Intro Text (2 paragraphs)
4. Buyer's Guide Section (H2: "How to Choose...")
5. Pricing Guide Section (H2: "How Much Does... Cost?")
6. Questions to Ask (H2: "Questions to Ask Before Hiring...")
7. Business Listings (H2: "The Best [Service] in [City]")
   - Enhanced business cards with highlights
8. FAQ Section (H2: "Frequently Asked Questions")
9. Related Pages (H2: "Related Guides")
10. Author / Trust Section
```

### 5.2 Schema Markup

Each page should include **all** of these JSON-LD schemas:

- `FAQPage` — for the FAQ section
- `LocalBusiness` — for each business listing
- `BreadcrumbList` — for navigation
- `Article` — for the guide content (with author, datePublished, dateModified)
- `ItemList` — for the ranked list of businesses

---

## 6. Internal Linking Strategy

MoneyHub's homepage links to 600+ resource pages. Strong internal linking distributes page authority.

### 6.1 Cross-Category Linking
On each leaf page, include a "Related Guides" section linking to:
- **Same city, different services** (e.g., "Also in Auckland: Best Plumbers, Best Electricians")
- **Same service, different cities** (e.g., "Electricians in other cities: Wellington, Christchurch")

### 6.2 Homepage Resource Grid
- The homepage should link to the **top 20–30 most important pages** directly.
- Consider adding an "All Guides" page that links to every leaf page (like a comprehensive sitemap for users).

### 6.3 Contextual Linking
- Within the buyer's guide text, link naturally to related pages.
- Example: "If you're renovating, you'll also need a trusted [electrician](/cities/auckland/trades/electricians.html) and [plumber](/cities/auckland/trades/plumbers.html)."

---

## 7. Build & Verify

// turbo
1. **Run Page Generation**:
   ```powershell
   node scripts/generate_pages.js
   ```

2. **Verify Content Injection**:
   - Open the generated HTML file and ensure:
     - `introText` is present and renders correctly.
     - Buyer's guide section appears with proper H2 headings.
     - Pricing guide renders (including price table if provided).
     - FAQ section is rendered with proper semantic markup.
     - Table of contents links work correctly.
     - "Last Updated" date is visible.
     - All JSON-LD schemas are present in the `<head>`.

3. **Content Quality Check**:
   - Word count of editorial content should be **1,500+ words** (excluding business listings).
   - Check that the page answers the top 5 "People Also Ask" questions for the keyword.
   - Verify all internal links work.

4. **Check Frontend**:
   - Use `npx serve .` to view the page.
   - Verify business cards show highlights, specialties, and neighborhood tags.
   - Test on mobile viewport (most NZ traffic is mobile).

---

## 8. SEO Audit Checklist

Before deploying, verify each item:

- [ ] **Title tag** contains primary keyword (e.g., "Best Electricians in Auckland")
- [ ] **Meta description** is compelling and contains the keyword (150–160 chars)
- [ ] **H1** matches the primary keyword
- [ ] **H2s** target secondary keywords (buyer's guide, pricing, FAQs)
- [ ] **Word count** ≥ 1,500 words of editorial content
- [ ] **FAQs** ≥ 5 questions targeting "People Also Ask"
- [ ] **Business listings** have 5+ bullet-point highlights each
- [ ] **Internal links** ≥ 5 links to related pages within the content
- [ ] **Schema markup** includes FAQPage, LocalBusiness, BreadcrumbList, Article
- [ ] **Last Updated** date is visible on the page
- [ ] **Author attribution** is present
- [ ] **Mobile friendly** — all content readable on 375px viewport
- [ ] **Page load** < 3 seconds on mobile

---

## 9. Deployment

1. **Git Commit & Push**:
   ```powershell
   git add .
   git commit -m "seo: enhance [City] [Service] with buyer's guide, pricing, and detailed profiles"
   git push
   ```

2. **Post-Deployment**:
   - Submit the updated URL to Google Search Console for re-indexing.
   - Monitor Search Console for impressions/clicks on target keyword over 2–4 weeks.
   - Track ranking position for the primary keyword.

---

## Appendix: MoneyHub Content Structure Reference

This is the content structure MoneyHub uses on their highest-ranking pages (e.g., `/best-builders-auckland.html`):

```
1. H1: "The Best Builders in Auckland"
2. Intro paragraph (why you need a builder, what this guide covers)
3. Table of Contents (anchor links)
4. H2: "How Much Should I Pay a Builder?" (pricing breakdown)
5. H2: "How to Get Realistic Quotes" (negotiation tips, red flags)
6. H2: "What Stages Are Payments Made?" (payment schedule advice)
7. H2: "The Best Auckland Builders" (curated list)
   - Each business: name, website, social links, phone, email
   - 8–15 bullet points per business
   - "MoneyHub's Top 3 Trusted" highlight boxes
8. Footer with internal links to related guides
```

**Key takeaway:** MoneyHub pages are 70% buyer's guide, 30% business listings. Our pages are currently 5% guide, 95% listings. Closing this gap is the #1 priority for SEO improvement.
