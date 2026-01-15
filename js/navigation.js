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
    const contentEl = document.getElementById('content');
    if (!contentEl) return;
    const path = location.pathname;
    // City hub: /cities/auckland or /cities/auckland.html
    const cityMatch = path.match(/^\/cities\/([^\/.]+)(\.html)?$/);
    // Industry hub: /industries/hospitality or /industries/hospitality.html
    const industryMatch = path.match(/^\/industries\/([^\/.]+)(\.html)?$/);
    // Category hub: /cities/auckland/trades/ or /cities/auckland/trades/index.html
    const categoryHubMatch = path.match(/^\/cities\/([^\/.]+)\/([^\/.]+)\/?(index\.html)?$/);

    if (cityMatch) {
        const city = cityMatch[1];
        const citiesData = await loadJSON('/data/cities.json');
        const cityInfo = citiesData?.find(c => c.slug === city);
        if (!cityInfo) return;

        const industriesData = await loadJSON('/data/industries.json');
        const categories = [
            { slug: 'cuisine', name: 'Food & Cuisine', icon: 'fa-bowl-food' },
            { slug: 'trades', name: 'Home Trades', icon: 'fa-hammer' },
            { slug: 'services', name: 'Services', icon: 'fa-briefcase' },
            { slug: 'hospitality', name: 'Hospitality', icon: 'fa-hotel' }
        ];

        const cards = categories.map(cat => {
            const href = `/cities/${city}/${cat.slug}/`;
            return `
                <a class="glass-card" href="${href}">
                    <i class="fas ${cat.icon} text-secondary" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h3>${cat.name}</h3>
                    <p class="text-muted">Top-rated services in ${cityInfo.name}.</p>
                </a>`;
        }).join('');
        contentEl.innerHTML = `<h2>Browse ${cityInfo.name} by Category</h2><div class="grid-cols-3">${cards}</div>`;
    } else if (categoryHubMatch) {
        const city = categoryHubMatch[1];
        const categorySlug = categoryHubMatch[2];
        const industriesData = await loadJSON('/data/industries.json');
        const industry = industriesData?.find(i => i.slug === categorySlug);
        if (!industry) return;

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
        contentEl.innerHTML = `<h2>${industry.name} in ${city.charAt(0).toUpperCase() + city.slice(1)}</h2><div class="grid-cols-3">${cards}</div>`;
    } else if (industryMatch) {
        const industry = industryMatch[1];
        const data = await loadJSON('/data/industries.json');
        const indInfo = data?.find(i => i.slug === industry);
        if (!indInfo) return;
        // Sub‑categories are the folder names inside the industry folder.
        const subCats = indInfo.subCategories || [];
        const cards = subCats.map(sc => {
            const href = `/industries/${industry}/${sc}/`;
            const title = sc.charAt(0).toUpperCase() + sc.slice(1);
            return `<a class="grid-card" href="${href}"><h3>${title}</h3></a>`;
        }).join('');
        contentEl.innerHTML = `<h2>${indInfo.name} – Sub‑categories</h2><div class="grid">${cards}</div>`;
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
    // Expect: cities / <city> / <category> / <page>.html
    if (parts.length < 4) return;
    const [_, city, category, pageFile] = parts;
    const pageName = pageFile.replace('.html', '').replace(/-/g, ' ');

    // Load data for cross‑city links
    const citiesData = await loadJSON('/data/cities.json');
    const otherCities = citiesData.filter(c => c.slug !== city);
    const cityLinks = otherCities.map(c => {
        const href = `/cities/${c.slug}/${category}/${pageFile}`;
        return `<a href="${href}">${c.name} – ${pageName}</a>`;
    }).join('<br>');

    // Load data for other categories in the same city
    const categories = ['cuisine', 'trades', 'services', 'hospitality'];
    const otherCats = categories.filter(cat => cat !== category);
    const catLinks = otherCats.map(cat => {
        // Ensure we preserve the extension if it was present, or keep it clean
        const hasExtension = pageFile.includes('.html');
        const href = `/cities/${city}/${cat}/${pageFile}`;
        return `<a href="${href}">${cat.charAt(0).toUpperCase() + cat.slice(1)} – ${pageName}</a>`;
    }).join('<br>');

    relatedEl.innerHTML = `<h3>Explore More</h3><div>${cityLinks}<hr>${catLinks}</div>`;
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

    listEl.innerHTML = filtered.map(b => `
        <div class="glass-card business-card-horizontal">
            <div class="business-image-container">
                <img src="${b.image}" alt="${b.name}" class="business-image">
            </div>
            <div class="business-info">
                <div class="rating-badge"><i class="fas fa-star"></i> ${b.rating} (${b.reviews} reviews)</div>
                <h3>${b.name}</h3>
                <p class="text-muted">${b.description}</p>
                <div class="business-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${b.address}</span>
                    <a href="${b.website}" target="_blank" class="text-primary"><i class="fas fa-external-link-alt"></i> Website</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Run all helpers after the DOM is ready.
window.addEventListener('DOMContentLoaded', async () => {
    buildBreadcrumb();
    await renderHubGrid();
    await renderBusinessList();
    await renderRelated();
    await injectSchema();
});
