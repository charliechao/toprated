const fs = require('fs');
const path = require('path');

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function renderFeaturedGuides(key, data) {
    const guides = data[key] || [];
    if (!guides.length) return '';
    return `<section class="hub-feature-wrap" aria-label="Featured guides">
        <div class="hub-feature-intro"><h2>Featured comparison guides</h2><p>Explore the evidence and practical questions behind each shortlist.</p></div>
        <div class="hub-feature-grid">${guides.map(guide => {
        if (!guide.href.startsWith('/cities/')) throw new Error(`Invalid featured-guide URL: ${guide.href}`);
        return `<a class="glass-card hub-feature-card" href="${escapeHtml(guide.href)}">
            <div class="hub-feature-card__header"><span class="hub-feature-card__eyebrow">${escapeHtml(guide.eyebrow)}</span></div>
            <div class="hub-feature-card__body"><h3>${escapeHtml(guide.title)}</h3><p>${escapeHtml(guide.description)}</p></div>
            <span class="hub-feature-card__cta">${escapeHtml(guide.cta)}</span>
        </a>`;
    }).join('')}</div></section>`;
}

function featuredGuidesForContext(context) {
    if (!context?.city?.slug) return '';
    const key = context.type === 'city' ? `cities/${context.city.slug}` : `cities/${context.city.slug}/${context.categorySlug}`;
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/featured_guides.json'), 'utf8'));
    return renderFeaturedGuides(key, data);
}

module.exports = { renderFeaturedGuides, featuredGuidesForContext };
