// js/navigation.js
// ---------------------------------------------------
// Purpose: Dynamically inject breadcrumbs, hub navigation grids, and related content
// ---------------------------------------------------
// This script runs on every page (included via the base template).
// It reads static JSON files (data/cities.json, data/industries.json, data/businesses.json)
// and builds the UI components on the client side. Keeping the markup in JS
// makes the HTML files tiny and ensures a modular architecture.

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

function buildSitePath(parts, endIndex) {
    const segments = parts.slice(0, endIndex + 1);
    let pathname = `/${segments.join('/')}`;

    const isCategoryHub = parts[0] === 'cities' && endIndex === 2 && parts.length > 3;
    if (isCategoryHub) {
        pathname += '/';
    }

    return pathname;
}

function sortBusinessesForDisplay(items) {
    return [...items].sort((a, b) => {
        const aHasRating = typeof a.rating === 'number' && typeof a.reviews === 'number' && a.reviews > 0;
        const bHasRating = typeof b.rating === 'number' && typeof b.reviews === 'number' && b.reviews > 0;
        if (aHasRating !== bHasRating) return aHasRating ? -1 : 1;
        return (b.rating || 0) - (a.rating || 0) || (b.reviews || 0) - (a.reviews || 0);
    });
}

function renderBusinessCard(business, options = {}) {
    const hasRating = typeof business.rating === 'number' && typeof business.reviews === 'number' && business.reviews > 0;
    const isPremium = hasRating && business.rating >= 4.8;
    const imageFitClass = business.imageFit === 'contain' ? ' business-image--contain' : '';
    const ratingBadge = hasRating
        ? `<div class="rating-badge"><i class="fas fa-star"></i> ${business.rating} (${business.reviews} reviews)</div>`
        : '<div class="rating-badge"><i class="fas fa-sparkles"></i> New listing</div>';
    const subcategoryTag = options.subcategoryLabel
        ? `<div class="nationwide-subcategory-tag"><i class="fas fa-layer-group"></i> ${options.subcategoryLabel}</div>`
        : '';

    return `
        <div class="glass-card business-card-horizontal ${isPremium ? 'premium-border' : ''}">
            <div class="business-image-container">
                <img src="${business.image}" alt="${business.name}" class="business-image${imageFitClass}">
                ${isPremium ? '<div class="premium-badge"><i class="fas fa-crown"></i> TOP RATED</div>' : ''}
            </div>
            <div class="business-info">
                ${ratingBadge}
                ${subcategoryTag}
                <h3>${business.name}</h3>
                ${business.neighborhood ? `<div class="neighborhood-tag"><i class="fas fa-map-pin"></i> ${business.neighborhood}</div>` : ''}
                <p class="text-muted">${business.description}</p>
                <div class="business-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${business.address}</span>
                    <a href="${business.website}" target="_blank" class="text-primary"><i class="fas fa-external-link-alt"></i> Website</a>
                </div>
            </div>
        </div>
    `;
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
 */
function buildBreadcrumb() {
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (!breadcrumbEl) return;

    const parts = location.pathname.split('/').filter(Boolean);
    const crumbs = [];

    parts.forEach((part, idx) => {
        const name = formatSlugLabel(part);
        if (idx === parts.length - 1) {
            crumbs.push(`<span aria-current="page">${name}</span>`);
        } else {
            crumbs.push(`<a href="${buildSitePath(parts, idx)}">${name}</a>`);
        }
    });

    breadcrumbEl.innerHTML = `<ol class="breadcrumb">${crumbs.join(' > ')}</ol>`;
}

/**
 * Render a grid of links for the current hub (city category pages).
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
    const cityMatch = path.match(/^\/cities\/([^/.]+)(\.html)?$/);
    const categoryHubMatch = path.match(/^\/cities\/([^/.]+)\/([^/.]+)\/?(index\.html)?$/);

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

        const cards = categories.map(cat => `
            <a class="glass-card" href="/cities/${city}/${cat.slug}/">
                <i class="fas ${cat.icon} text-secondary" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <h3>${cat.name}</h3>
                <p class="text-muted">Top-rated services in ${cityInfo.name}.</p>
            </a>
        `).join('');

        if (featuredEl) featuredEl.innerHTML = featuredHtml;
        if (titleEl) titleEl.textContent = `Browse ${cityInfo.name} by Category`;
        if (descriptionEl) descriptionEl.textContent = `Start with services and trades, then explore food, hospitality, and automotive businesses in ${cityInfo.name}.`;
        targetEl.innerHTML = cards;
        return;
    }

    if (categoryHubMatch) {
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

        const cards = industry.subCategories.map(subCategory => {
            const title = formatSlugLabel(subCategory);
            return `
                <a class="glass-card" href="/cities/${city}/${categorySlug}/${subCategory}">
                    <i class="fas fa-arrow-right text-secondary" style="font-size: 1.5rem; margin-bottom: 1rem;"></i>
                    <h3>${title}</h3>
                    <p class="text-muted">Best ${title.toLowerCase()} in ${formatSlugLabel(city)}.</p>
                </a>
            `;
        }).join('');

        if (featuredEl) featuredEl.innerHTML = featuredHtml;
        if (titleEl) titleEl.textContent = `${industry.name} in ${formatSlugLabel(city)}`;
        if (descriptionEl) descriptionEl.textContent = `Browse the main ${industry.name.toLowerCase()} categories in ${formatSlugLabel(city)} and go deeper into the exact service page you need.`;
        targetEl.innerHTML = cards;
    }
}

/**
 * Render a "Related" section for city leaf pages.
 */
async function renderRelated() {
    const relatedEl = document.getElementById('related');
    if (!relatedEl || location.pathname === '/new-zealand') return;

    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length < 4) return;

    const [_, city, category, pageFile] = parts;
    const cityName = formatSlugLabel(city);
    const pageSlug = pageFile.replace('.html', '');
    const pageName = formatSlugLabel(pageFile);

    const industriesData = await loadJSON('/data/industries.json');
    const activeCategory = industriesData?.find(industry => industry.slug === category);
    if (!activeCategory || !activeCategory.subCategories.includes(pageSlug)) {
        return;
    }

    const citiesData = await loadJSON('/data/cities.json');
    const otherCities = citiesData.filter(c => c.slug !== city).slice(0, 4);
    const cityCards = otherCities.map(c => `
        <a href="/cities/${c.slug}/${category}/${pageSlug}" class="related-card">
            <i class="fas fa-city"></i>
            <div>
                <strong>${pageName}</strong>
                <span>in ${c.name}</span>
            </div>
        </a>
    `).join('');

    const siblingCards = activeCategory.subCategories
        .filter(subCategory => subCategory !== pageSlug)
        .slice(0, 4)
        .map(subCategory => `
            <a href="/cities/${city}/${category}/${subCategory}" class="related-card">
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
 * Insert JSON-LD schema for leaf pages and the nationwide page.
 */
async function injectSchema() {
    const schemaEl = document.getElementById('schema');
    if (!schemaEl) return;

    const businesses = await loadJSON('/data/businesses.json');
    if (!businesses) return;

    if (location.pathname === '/new-zealand') {
        const nationwideBusinesses = businesses.filter(b => b.coverageScope === 'nationwide');
        const schema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Nationwide businesses in New Zealand",
            "itemListElement": nationwideBusinesses.map((biz, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "url": biz.website || biz.url || 'https://toprated.nz/new-zealand',
                "name": biz.name,
                "description": biz.description,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": biz.city || 'New Zealand',
                    "addressRegion": "NZ"
                }
            }))
        };
        schemaEl.textContent = JSON.stringify(schema, null, 2);
        return;
    }

    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length < 4) return;

    const [_, city, category, pageFile] = parts;
    const pageSlug = pageFile.replace('.html', '');
    const filtered = businesses.filter(b =>
        b.citySlug === city && b.categorySlug === category && b.pageSlug === pageSlug
    );

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${city} ${category} ${pageSlug}`,
        "itemListElement": filtered.map((biz, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": biz.website || biz.url,
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
 * Render business lists for city leaf pages and the nationwide page.
 */
async function renderBusinessList() {
    const listEl = document.getElementById('business-list');
    if (!listEl) return;

    const businesses = await loadJSON('/data/businesses.json');
    if (!businesses) return;

    if (location.pathname === '/new-zealand') {
        const industries = await loadJSON('/data/industries.json');
        const nationwideBusinesses = businesses.filter(b => b.coverageScope === 'nationwide');

        if (nationwideBusinesses.length === 0) {
            listEl.innerHTML = '<p class="text-muted">No nationwide businesses have been added yet. This page is ready for NZ-wide providers as they are published.</p>';
            return;
        }

        const categoryOrder = (industries || []).map(industry => industry.slug);
        const categoryLabels = Object.fromEntries((industries || []).map(industry => [industry.slug, industry.name]));
        const subCategoryLabels = {};

        (industries || []).forEach(industry => {
            industry.subCategories.forEach(subCategory => {
                subCategoryLabels[subCategory] = formatSlugLabel(subCategory);
            });
        });

        const groupedByCategory = nationwideBusinesses.reduce((acc, business) => {
            const categoryKey = business.categorySlug || 'other';
            const pageKey = business.pageSlug || 'other';
            acc[categoryKey] = acc[categoryKey] || {};
            acc[categoryKey][pageKey] = acc[categoryKey][pageKey] || [];
            acc[categoryKey][pageKey].push(business);
            return acc;
        }, {});

        const visibleCategories = [
            ...categoryOrder.filter(category => groupedByCategory[category]),
            ...Object.keys(groupedByCategory).filter(category => !categoryOrder.includes(category)).sort()
        ];

        listEl.innerHTML = visibleCategories.map(category => {
            const subGroups = groupedByCategory[category];
            const orderedSubGroups = Object.keys(subGroups).sort((a, b) => {
                const aLabel = subCategoryLabels[a] || formatSlugLabel(a);
                const bLabel = subCategoryLabels[b] || formatSlugLabel(b);
                return aLabel.localeCompare(bLabel);
            });

            return `
                <section class="nationwide-group">
                    <div class="nationwide-group__header">
                        <span class="hub-grid-header__eyebrow">Nationwide Category</span>
                        <h2 class="section-title">${categoryLabels[category] || formatSlugLabel(category)}</h2>
                        <p class="text-muted">NZ-wide businesses grouped under ${categoryLabels[category] || formatSlugLabel(category).toLowerCase()}.</p>
                    </div>
                    <div class="nationwide-group__list">
                        ${orderedSubGroups.map(subCategory => {
                            const subcategoryLabel = subCategoryLabels[subCategory] || formatSlugLabel(subCategory);
                            return sortBusinessesForDisplay(subGroups[subCategory]).map(business => renderBusinessCard(business, {
                                subcategoryLabel
                            })).join('');
                        }).join('')}
                    </div>
                </section>
            `;
        }).join('');
        return;
    }

    const parts = location.pathname.split('/').filter(Boolean);
    let citySlug;
    let industrySlug;
    let activeCategorySlug = null;

    if (parts.length === 3) {
        citySlug = parts[1];
        industrySlug = parts[2].replace('.html', '').replace(/-/g, ' ');
    } else if (parts.length === 4) {
        citySlug = parts[1];
        activeCategorySlug = parts[2];
        industrySlug = parts[3].replace('.html', '').replace(/-/g, ' ');
    } else {
        return;
    }

    const filtered = businesses.filter(b =>
        b.citySlug === citySlug &&
        (!activeCategorySlug || b.categorySlug === activeCategorySlug) &&
        b.pageSlug === industrySlug.replace(/\s+/g, '-')
    );

    if (filtered.length === 0) {
        listEl.innerHTML = '<p class="text-muted">No businesses found in this category yet. We are constantly updating our records!</p>';
        return;
    }

    const sorted = sortBusinessesForDisplay(filtered);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": parts.map((part, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": formatSlugLabel(part),
            "item": `https://toprated.nz${buildSitePath(parts, index)}`
        }))
    };
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(schemaScript);

    listEl.innerHTML = sorted.map(business => renderBusinessCard(business)).join('');
}

window.addEventListener('DOMContentLoaded', async () => {
    buildBreadcrumb();
    await renderHubGrid();
    await renderBusinessList();
    await renderRelated();
    await injectSchema();
});
