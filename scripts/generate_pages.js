const fs = require('fs');
const path = require('path');

// ---------------------------------------------------
// 1. Configuration & Data
// ---------------------------------------------------
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('data/cities.json', 'utf8'));
const industries = JSON.parse(fs.readFileSync('data/industries.json', 'utf8'));

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

function getBaseTemplate(title, description, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <header id="site-header"></header>
    <main>${content}</main>
    <footer id="site-footer"></footer>
    <script src="/js/include.js"></script>
    <script src="/js/navigation.js"></script>
</body>
</html>`;
}

function generateLeafContent(titleLine) {
    return `
    <section class="industry-hero" style="height: 40vh; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/auckland-hero.jpg'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
        <div class="container">
            <nav id="breadcrumb" style="margin-bottom: 1rem; font-size: 0.9rem; opacity: 0.8;"></nav>
            <h1>${titleLine}</h1>
        </div>
    </section>
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

            const html = getBaseTemplate(`${map.name} in ${city.name} | TopRated NZ`, `Find the best ${map.name.toLowerCase()} in ${city.name}.`, generateLeafContent(`${map.name} <br><span class="text-primary">in ${city.name}</span>`));
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
