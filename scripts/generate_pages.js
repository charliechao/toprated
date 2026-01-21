const fs = require('fs');
const path = require('path');

// ---------------------------------------------------
// 1. Configuration & Data
// ---------------------------------------------------
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('data/cities.json', 'utf8'));
const industries = JSON.parse(fs.readFileSync('data/industries.json', 'utf8'));
const seoContent = fs.existsSync('data/seo_content.json') ? JSON.parse(fs.readFileSync('data/seo_content.json', 'utf8')) : {};
const templatePath = path.resolve(__dirname, '..', 'templates', 'template-page.html');
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

// Hero Images Mapping
const cityHeros = {
    'auckland': '/img/auckland-hero.jpg',
    'wellington': '/img/wellington-hero.jpg',
    'christchurch': '/img/christchurch-hero.jpg',
    'hamilton': 'https://images.unsplash.com/photo-1599446979644-8094602f2360?auto=format&fit=crop&w=1200&q=80',
    'tauranga': 'https://images.unsplash.com/photo-1594493397611-6677f24090b8?auto=format&fit=crop&w=1200&q=80'
};

const indHeros = {
    'hospitality': '/img/industries/hospitality.png',
    'trades': '/img/industries/construction.png',
    'automotive': '/img/industries/automotive.png',
    'services': '/img/industries/hospitality.png' // Fallback
};

// ---------------------------------------------------
// 2. Page Template Functions
// ---------------------------------------------------

function getBaseTemplate(title, description, content, schema = null) {
    const schemaScript = schema ? `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>` : '';
    return baseTemplate
        .replace(/<!-- PAGE_TITLE_PLACEHOLDER -->/g, title)
        .replace(/<!-- PAGE_DESCRIPTION_PLACEHOLDER -->/g, description)
        .replace('<!-- PAGE_CONTENT_PLACEHOLDER -->', content)
        .replace('<!-- SCHEMA_PLACEHOLDER -->', schemaScript);
}

function generateLeafContent(titleLine, specificSeo = null) {
    let extraContent = '';

    if (specificSeo) {
        if (specificSeo.introText) {
            extraContent += `<section class="container" style="margin-top: 2rem;"><p class="lead">${specificSeo.introText}</p></section>`;
        }

        // Note: Curated sections and FAQs would need more complex JS injection or static building.
        // For now, we inject a basic FAQ section if it exists.
        if (specificSeo.faqs) {
            extraContent += `
            <section class="container section">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-container">
                    ${specificSeo.faqs.map(faq => `
                        <div class="faq-item" style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">${faq.question}</h3>
                            <p>${faq.answer}</p>
                        </div>
                    `).join('')}
                </div>
            </section>`;
        }
    }

    return `
    <section class="industry-hero" style="height: 40vh; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/auckland-hero.jpg'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
        <div class="container">
            <nav id="breadcrumb" style="margin-bottom: 1rem; font-size: 0.9rem; opacity: 0.8;"></nav>
            <h1>${titleLine}</h1>
        </div>
    </section>
    ${extraContent}
    <section class="container section">
        <div id="business-list" class="business-list">
            <p class="loading">Loading top-rated businesses...</p>
        </div>
    </section>
    <section class="container section">
        <div id="related"></div>
    </section>
    <script id="schema" type="application/ld+json"></script>
    `;
}

function generateHubContent(name, subtitle, heroImg) {
    return `
    <section class="hero" style="min-height: 40vh; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${heroImg}'); background-size: cover; background-position: center;">
        <div class="hero-content">
            <nav id="breadcrumb" style="margin-bottom: 1rem; font-size: 0.9rem; opacity: 0.8;"></nav>
            <h1>${name} <br><span class="text-primary">Directory</span></h1>
            <p>${subtitle}</p>
        </div>
    </section>
    <section class="container section">
        <div id="content">
            <p class="loading">Loading content...</p>
        </div>
    </section>
    `;
}

// ---------------------------------------------------
// 3. Execution
// ---------------------------------------------------

// 3.1 City Hubs
cities.forEach(city => {
    const html = getBaseTemplate(`${city.name}'s Best Businesses | TopRated NZ`, `Top-rated businesses in ${city.name}.`, generateHubContent(city.name, "The definitive guide to everything top-rated.", cityHeros[city.slug] || cityHeros['auckland']));
    fs.writeFileSync(`cities/${city.slug}.html`, html);
});

// 3.2 Industry Hubs
industries.forEach(ind => {
    const html = getBaseTemplate(`Best ${ind.name} in NZ | TopRated NZ`, `Browse top-rated businesses in ${ind.name}.`, generateHubContent(ind.name, `New Zealand's leading ${ind.name.toLowerCase()} specialists.`, indHeros[ind.slug] || indHeros['hospitality']));
    fs.writeFileSync(`industries/${ind.slug}.html`, html);
});

// 3.3 Category Hubs in Cities (index.html in subfolders)
const categories = ['cuisine', 'trades', 'services', 'hospitality'];
cities.forEach(city => {
    categories.forEach(cat => {
        const dir = path.join('cities', city.slug, cat);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const html = getBaseTemplate(`${cat.charAt(0).toUpperCase() + cat.slice(1)} in ${city.name} | TopRated NZ`, `Top ${cat} services in ${city.name}.`, generateHubContent(`${cat.charAt(0).toUpperCase() + cat.slice(1)}`, `Best in ${city.name}`, cityHeros[city.slug] || cityHeros['auckland']));
        fs.writeFileSync(path.join(dir, 'index.html'), html);
    });
});

// 3.4 Leaf Pages (Cities)
const subCatsMapping = {
    'restaurants': { cat: 'cuisine', name: 'Restaurants' },
    'japanese-restaurants': { cat: 'cuisine', name: 'Japanese Restaurants' },
    'chinese-restaurants': { cat: 'cuisine', name: 'Chinese Restaurants' },
    'indian-restaurants': { cat: 'cuisine', name: 'Indian Restaurants' },
    'italian-restaurants': { cat: 'cuisine', name: 'Italian Restaurants' },
    'thai-restaurants': { cat: 'cuisine', name: 'Thai Restaurants' },
    'french-restaurants': { cat: 'cuisine', name: 'French Restaurants' },
    'cafes': { cat: 'cuisine', name: 'Cafes' },
    'hotels': { cat: 'hospitality', name: 'Hotels' },
    'builders': { cat: 'trades', name: 'Builders' },
    'electricians': { cat: 'trades', name: 'Electricians' },
    'plumbers': { cat: 'trades', name: 'Plumbers' },
    'renovation-services': { cat: 'trades', name: 'Renovation Services' },
    'painters': { cat: 'trades', name: 'Painters' },
    'cleaning-services': { cat: 'services', name: 'Cleaning Services' }
};

cities.forEach(city => {
    industries.forEach(ind => {
        ind.subCategories.forEach(sc => {
            const map = subCatsMapping[sc];
            if (!map) return;
            const dir = path.join('cities', city.slug, map.cat);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            const pageKey = `${city.slug}/${map.cat}/${sc}`;
            const specificSeo = seoContent[pageKey] || null;

            // Generate FAQ Schema if applicable
            let faqSchema = null;
            if (specificSeo && specificSeo.faqs) {
                faqSchema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": specificSeo.faqs.map(f => ({
                        "@type": "Question",
                        "name": f.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": f.answer
                        }
                    }))
                };
            }

            const html = getBaseTemplate(
                `${map.name} in ${city.name} | TopRated NZ`,
                `Find the best ${map.name.toLowerCase()} in ${city.name}.`,
                generateLeafContent(`${map.name} <br><span class="text-primary">in ${city.name}</span>`, specificSeo),
                faqSchema
            );
            fs.writeFileSync(path.join(dir, `${sc}.html`), html);
        });
    });
});

// 3.5 Global Subcategory Pages
industries.forEach(ind => {
    ind.subCategories.forEach(sc => {
        const map = subCatsMapping[sc];
        if (!map) return;
        const dir = path.join('industries', ind.slug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const html = getBaseTemplate(`Best ${sc.replace(/-/g, ' ')} in New Zealand | TopRated NZ`, `The ultimate guide to ${sc} across NZ.`, generateLeafContent(`${sc.charAt(0).toUpperCase() + sc.replace(/-/g, ' ').slice(1)} <br><span class="text-primary">in New Zealand</span>`));
        fs.writeFileSync(path.join(dir, `${sc}.html`), html);
    });
});

console.log('✅ All pages generated successfully.');
