// js/navigation.js
// ---------------------------------------------------
// Purpose: Dynamically inject breadcrumbs, hub navigation grids, and related content
// ---------------------------------------------------
// This script runs on every page (included via the base template).
// It reads static JSON files (data/cities.json, data/industries.json, data/businesses.json)
// and builds the UI components on the client side. Keeping the markup in JS
// makes the HTML files tiny and ensures a **modular** architecture.

/**
 * Utility: fetch a JSON file and return the parsed object.
 * We use the Fetch API because the site is served statically.
 */
async function loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        console.error(`Failed to load ${path}: ${response.status}`);
        return null;
    }
    return await response.json();
}

function formatSlugLabel(value) {
    return value
        .replace('.html', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function renderFeaturedHubGuides(guides, intro = {}) {
    if (!guides || guides.length === 0) {
        return '';
    }

    const cards = guides.map(guide => `
        <a class="glass-card hub-feature-card" href="${guide.href}">
            <div class="hub-feature-card__header">
                <span class="hub-feature-card__eyebrow">${guide.eyebrow}</span>
                <span class="hub-feature-card__icon"><i class="fas ${guide.icon}"></i></span>
            </div>
            <div class="hub-feature-card__body">
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
            </div>
            <span class="hub-feature-card__cta">${guide.cta} <i class="fas fa-arrow-right"></i></span>
        </a>
    `).join('');

    return `
        <section class="hub-feature-wrap" aria-label="Featured guides">
            <div class="hub-feature-intro">
                <span class="hub-feature-intro__eyebrow">${intro.eyebrow || "Editor's pick"}</span>
                <h2>${intro.title || 'Featured Guide'}</h2>
                <p>${intro.description || 'A high-intent editorial guide linked from this hub.'}</p>
            </div>
            <div class="hub-feature-grid">${cards}</div>
        </section>
    `;
}

/**
 * Build breadcrumb markup based on the current URL.
 * Example URL: /cities/auckland/cuisine/japanese-restaurants.html
 * The function splits the path, maps each segment to a readable name,
 * and injects the result into the <nav id="breadcrumb"> element.
 */
function buildBreadcrumb() {
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (!breadcrumbEl) return;
    const parts = location.pathname.split('/').filter(Boolean);
    const crumbs = [];
    let accumulated = '';
    parts.forEach((part, idx) => {
        // Convert folder/file names to human‑readable titles
        const name = part.replace('.html', '').replace(/-/g, ' ');
        accumulated += `/${part}`;
        const url = accumulated;
        if (idx === parts.length - 1) {
            crumbs.push(`<span aria-current="page">${name}</span>`);
        } else {
            crumbs.push(`<a href="${url}">${name}</a>`);
        }
    });
    breadcrumbEl.innerHTML = `<ol class="breadcrumb">${crumbs.join(' > ')}</ol>`;
}

/**
 * Render a grid of links for the current hub (city or industry).
 * The script looks at the URL to decide which hub we are on.
 */
async function renderHubGrid() {
    const gridEl = document.getElementById('hub-grid');
    const contentEl = document.getElementById('content');
    const featuredEl = document.getElementById('hub-featured-guides');
    const titleEl = document.getElementById('hub-grid-title');
    const descriptionEl = document.getElementById('hub-grid-description');
    const targetEl = gridEl || contentEl;
    if (!targetEl) return;
    const path = location.pathname;
    // City hub: /cities/auckland or /cities/auckland.html
    const cityMatch = path.match(/^\/cities\/([^\/.]+)(\.html)?$/);
    // Industry hub: DISABLED (city-first architecture — no global industry pages)
    // const industryMatch = path.match(/^\/industries\/([^\/\.]+)(\.html)?$/);
    // Category hub: /cities/auckland/trades/ or /cities/auckland/trades/index.html
    const categoryHubMatch = path.match(/^\/cities\/([^\/\.]+)\/([^\/\.]+)\/?(index\.html)?$/);

    if (cityMatch) {
        const city = cityMatch[1];
        const [citiesData, featuredGuidesData] = await Promise.all([
            loadJSON('/data/cities.json'),
            loadJSON('/data/featured_guides.json')
        ]);
        const cityInfo = citiesData?.find(c => c.slug === city);
        if (!cityInfo) return;
        const categories = [
            { slug: 'cuisine', name: 'Food & Cuisine', icon: 'fa-bowl-food' },
            { slug: 'trades', name: 'Home Trades', icon: 'fa-hammer' },
            { slug: 'services', name: 'Services', icon: 'fa-briefcase' },
            { slug: 'hospitality', name: 'Hospitality', icon: 'fa-hotel' },
            { slug: 'automotive', name: 'Automotive', icon: 'fa-car' }
        ];
        const featuredHtml = renderFeaturedHubGuides(featuredGuidesData?.[`cities/${city}`] || [], {
            title: `Featured Guide for ${cityInfo.name}`,
            description: `Editorial guides connected to ${cityInfo.name} and its highest-intent local categories.`
        });

        const cards = categories.map(cat => {
            const href = `/cities/${city}/${cat.slug}/`;
            return `
                <a class="glass-card" href="${href}">
                    <i class="fas ${cat.icon} text-secondary" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h3>${cat.name}</h3>
                    <p class="text-muted">Top-rated services in ${cityInfo.name}.</p>
                </a>`;
        }).join('');
        if (featuredEl) featuredEl.innerHTML = featuredHtml;
        if (titleEl) titleEl.textContent = `Browse ${cityInfo.name} by Category`;
        if (descriptionEl) descriptionEl.textContent = `Start with services and trades, then explore food, hospitality, and automotive businesses in ${cityInfo.name}.`;
        targetEl.innerHTML = cards;
    } else if (categoryHubMatch) {
        const city = categoryHubMatch[1];
        const categorySlug = categoryHubMatch[2];
        const [industriesData, featuredGuidesData] = await Promise.all([
            loadJSON('/data/industries.json'),
            loadJSON('/data/featured_guides.json')
        ]);
        const industry = industriesData?.find(i => i.slug === categorySlug);
        if (!industry) return;
        const featuredHtml = renderFeaturedHubGuides(featuredGuidesData?.[`cities/${city}/${categorySlug}`] || [], {
            title: `${industry.name} Featured Guide`,
            description: `Editorial guides connected to ${industry.name.toLowerCase()} in ${formatSlugLabel(city)}.`
        });

        const cards = industry.subCategories.map(sc => {
            const href = `/cities/${city}/${categorySlug}/${sc}.html`;
            const title = sc.replace(/-/g, ' ').charAt(0).toUpperCase() + sc.replace(/-/g, ' ').slice(1);
            return `
                <a class="glass-card" href="${href}">
                    <i class="fas fa-arrow-right text-secondary" style="font-size: 1.5rem; margin-bottom: 1rem;"></i>
                    <h3>${title}</h3>
                    <p class="text-muted">Best ${title.toLowerCase()} in ${city.charAt(0).toUpperCase() + city.slice(1)}.</p>
                </a>`;
        }).join('');
        if (featuredEl) featuredEl.innerHTML = featuredHtml;
        if (titleEl) titleEl.textContent = `${industry.name} in ${formatSlugLabel(city)}`;
        if (descriptionEl) descriptionEl.textContent = `Browse the main ${industry.name.toLowerCase()} categories in ${formatSlugLabel(city)} and go deeper into the exact service page you need.`;
        targetEl.innerHTML = cards;
    }
}

/**
 * Render a "Related" section based on the current leaf page.
 * For example, on /cities/auckland/cuisine/japanese-restaurants.html we
 * show other cuisines in Auckland and the same cuisine in other cities.
 */
async function renderRelated() {
    const relatedEl = document.getElementById('related');
    if (!relatedEl) return;
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length < 4) return;
    const [_, city, category, pageFile] = parts;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    const pageSlug = pageFile.replace('.html', '');
    const pageName = formatSlugLabel(pageFile);

    const industriesData = await loadJSON('/data/industries.json');
    const activeCategory = industriesData?.find(industry => industry.slug === category);
    if (!activeCategory || !activeCategory.subCategories.includes(pageSlug)) {
        return;
    }

    // Cross-city links
    const citiesData = await loadJSON('/data/cities.json');
    const otherCities = citiesData.filter(c => c.slug !== city).slice(0, 4);
    const cityCards = otherCities.map(c => `
        <a href="/cities/${c.slug}/${category}/${pageFile}" class="related-card">
            <i class="fas fa-city"></i>
            <div>
                <strong>${pageName}</strong>
                <span>in ${c.name}</span>
            </div>
        </a>
    `).join('');

    // Other subcategories in the same city and current category
    const siblingCards = activeCategory.subCategories
        .filter(subCategory => subCategory !== pageSlug)
        .slice(0, 4)
        .map(subCategory => `
        <a href="/cities/${city}/${category}/${subCategory}.html" class="related-card">
            <i class="fas fa-layer-group"></i>
            <div>
                <strong>${formatSlugLabel(subCategory)}</strong>
                <span>in ${cityName}</span>
            </div>
        </a>
    `).join('');

    if (!cityCards && !siblingCards) {
        relatedEl.innerHTML = '';
        return;
    }

    const crossCitySection = cityCards ? `
            <h3 class="section-title">Explore ${pageName} in Other Cities</h3>
            <div class="related-grid">${cityCards}</div>
    ` : '';

    const siblingSection = siblingCards ? `
            <h3 class="section-title" style="margin-top: 3rem;">More ${activeCategory.name} in ${cityName}</h3>
            <div class="related-grid">${siblingCards}</div>
    ` : '';

    relatedEl.innerHTML = `
        <div class="related-section">
            ${crossCitySection}
            ${siblingSection}
        </div>
    `;
}

/**
 * Insert JSON‑LD schema for a leaf page.
 * The schema is a simple ItemList of businesses; the actual data will be
 * fetched from `/data/businesses.json` and filtered by city/industry.
 */
async function injectSchema() {
    const schemaEl = document.getElementById('schema');
    if (!schemaEl) return;
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length < 4) return; // not a leaf page
    const [_, city, category, pageFile] = parts;
    const pageSlug = pageFile.replace('.html', '');
    const businesses = await loadJSON('/data/businesses.json');
    const filtered = businesses.filter(b =>
        b.citySlug === city && b.categorySlug === category && b.pageSlug === pageSlug
    );
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${city} ${category} ${pageFile.replace('.html', '')}`,
        "itemListElement": filtered.map((biz, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": biz.url,
            "name": biz.name,
            "description": biz.description,
            "rating": biz.rating,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": biz.city,
                "addressRegion": "NZ"
            }
        }))
    };
    schemaEl.textContent = JSON.stringify(schema, null, 2);
}

/**
 * Render a list of businesses for the current leaf page.
 * Uses city and industry from the URL path to filter businesses.json.
 */
async function renderBusinessList() {
    const listEl = document.getElementById('business-list');
    if (!listEl) return;

    const path = location.pathname;
    // Handle both /cities/auckland/plumbers.html and /cities/auckland/trades/plumbers.html
    const parts = path.split('/').filter(Boolean);
    let citySlug, industrySlug;

    if (parts.length === 3) {
        // cities / {city} / {industry}.html
        citySlug = parts[1];
        industrySlug = parts[2].replace('.html', '').replace(/-/g, ' ');
    } else if (parts.length === 4) {
        // cities / {city} / {category} / {industry}.html
        citySlug = parts[1];
        industrySlug = parts[3].replace('.html', '').replace(/-/g, ' ');
    } else {
        return;
    }

    const businesses = await loadJSON('/data/businesses.json');
    if (!businesses) return;

    // Filter by citySlug and pageSlug (exact matches from data)
    const filtered = businesses.filter(b =>
        b.citySlug === citySlug &&
        b.pageSlug === industrySlug.replace(/\s+/g, '-')
    );

    if (filtered.length === 0) {
        listEl.innerHTML = '<p class="text-muted">No businesses found in this category yet. We are constantly updating our records!</p>';
        return;
    }

    // Sort by rating desc, then reviews desc
    filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

    // Inject Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": parts.map((part, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": part.replace('.html', '').replace(/-/g, ' ').charAt(0).toUpperCase() + part.replace('.html', '').replace(/-/g, ' ').slice(1),
            "item": `https://toprated.nz/${parts.slice(0, index + 1).join('/')}${part.endsWith('.html') ? '' : '/'}`
        }))
    };
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(schemaScript);

    listEl.innerHTML = filtered.map(b => {
        const isPremium = b.rating >= 4.8;
        return `
        <div class="glass-card business-card-horizontal ${isPremium ? 'premium-border' : ''}">
            <div class="business-image-container">
                <img src="${b.image}" alt="${b.name}" class="business-image">
                ${isPremium ? '<div class="premium-badge"><i class="fas fa-crown"></i> TOP RATED</div>' : ''}
            </div>
            <div class="business-info">
                <div class="rating-badge"><i class="fas fa-star"></i> ${b.rating} (${b.reviews} reviews)</div>
                <h3>${b.name}</h3>
                ${b.neighborhood ? `<div class="neighborhood-tag"><i class="fas fa-map-pin"></i> ${b.neighborhood}</div>` : ''}
                <p class="text-muted">${b.description}</p>
                <div class="business-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${b.address}</span>
                    <a href="${b.website}" target="_blank" class="text-primary"><i class="fas fa-external-link-alt"></i> Website</a>
                </div>
            </div>
        </div>
    `}).join('');
}

// Run all helpers after the DOM is ready.
window.addEventListener('DOMContentLoaded', async () => {
    buildBreadcrumb();
    await renderHubGrid();
    await renderBusinessList();
    await renderRelated();
    await injectSchema();
});
