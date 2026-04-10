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
    'hamilton': '/img/hamilton-hero.jpg',
    'tauranga': '/img/tauranga-hero.jpg'
};

const indHeros = {
    'hospitality': '/img/industries/hospitality.png',
    'trades': '/img/industries/construction.png',
    'automotive': '/img/industries/automotive.png',
    'services': '/img/industries/hospitality.png' // Fallback
};

const cityProfiles = {
    'auckland': {
        marketLine: 'Auckland is New Zealand\'s most competitive local services market, so buyers usually compare several providers before they enquire.',
        cityHubAngle: 'People in Auckland usually need fast shortlists, clear reviews, and category-level comparison because the city has more options and wider suburb spread than anywhere else in New Zealand.',
        servicesAngle: 'Auckland service buyers usually care about response speed, credibility, suburb coverage, and whether the provider can handle ongoing work without becoming hard to reach.',
        tradesAngle: 'Auckland trade buyers usually compare quote clarity, scheduling reliability, and whether the team can coordinate around renovations, rentals, or tight family schedules.'
    },
    'wellington': {
        marketLine: 'Wellington buyers tend to value clarity, professionalism, and providers who can work well across compliance-heavy, property-sensitive, and time-conscious situations.',
        cityHubAngle: 'Wellington is smaller than Auckland but still competitive in the categories that matter most, especially professional services and reliable home trades.',
        servicesAngle: 'Wellington service buyers often want providers who communicate clearly, understand professional and property-related work, and can manage complexity without overcomplicating the process.',
        tradesAngle: 'Wellington trade buyers typically care about workmanship, weather and property constraints, and whether the contractor communicates well when jobs involve older housing stock or access issues.'
    },
    'christchurch': {
        marketLine: 'Christchurch has a broad mix of family households, investors, and owner-operated businesses, so trust, process quality, and practical communication matter more than polished branding.',
        cityHubAngle: 'Christchurch buyers often compare providers based on reliability and delivery quality, especially where property upgrades, repairs, or long-term service relationships are involved.',
        servicesAngle: 'Christchurch service buyers usually look for providers who are easy to deal with, clear on scope, and strong on the day-to-day delivery details that actually affect outcomes.',
        tradesAngle: 'Christchurch trade buyers usually care about quote transparency, workmanship, and how well the contractor coordinates across wider renovation or repair work.'
    },
    'hamilton': {
        marketLine: 'Hamilton and the wider Waikato reward practical providers who are responsive, affordable, and easy to work with for busy owner-operators and households.',
        cityHubAngle: 'Hamilton buyers usually want straightforward options that solve the problem without adding unnecessary complexity, especially in services and home trades.',
        servicesAngle: 'Hamilton service buyers often prioritise value, clarity, and whether the provider understands small-business or family-property realities in the Waikato.',
        tradesAngle: 'Hamilton trade buyers tend to compare reliability, scope clarity, and whether the team can work cleanly across renovations, repairs, and growing suburban demand.'
    },
    'tauranga': {
        marketLine: 'Tauranga and the Bay of Plenty combine strong property activity, lifestyle moves, and owner-operated business demand, so credibility and responsiveness matter quickly.',
        cityHubAngle: 'Tauranga buyers often compare providers around property presentation, local reputation, and whether the business can deliver reliably without dragging out the process.',
        servicesAngle: 'Tauranga service buyers often look for firms who are commercially useful, easy to deal with, and strong around property, small-business, and homeowner needs.',
        tradesAngle: 'Tauranga trade buyers often care about scheduling, presentation, and how well the contractor handles coastal or property-prep realities without overselling the job.'
    }
};

const categoryHubConfigs = {
    services: {
        heroLabel: 'Services',
        descriptionPrefix: 'Compare top-rated local service providers',
        browseLabel: 'Service Categories',
        subCategories: ['accountants', 'cleaning-services', 'lawyers', 'real-estate-agents', 'business-loans', 'creative-agencies', 'broadband-providers'],
        subCategoryDescriptions: {
            'accountants': 'tax, reporting, cash flow, and practical small-business support',
            'business-loans': 'funding marketplaces, lenders, and finance options for SMEs',
            'broadband-providers': 'fibre, wireless, and business internet options for better connectivity',
            'cleaning-services': 'home, office, move-out, and one-off cleaning jobs',
            'creative-agencies': 'branding, websites, design systems, and digital creative support',
            'lawyers': 'property, commercial, wills, trusts, and legal support',
            'real-estate-agents': 'selling, buying, pricing, and local campaign guidance'
        }
    },
    trades: {
        heroLabel: 'Trades',
        descriptionPrefix: 'Compare top-rated local trades',
        browseLabel: 'Trade Categories',
        subCategories: ['builders', 'electricians', 'plumbers', 'renovation-services', 'painters'],
        subCategoryDescriptions: {
            'builders': 'renovations, extensions, repairs, and structural project work',
            'electricians': 'maintenance, upgrades, safety, and installation work',
            'plumbers': 'repairs, drainage, hot water, and renovation plumbing',
            'renovation-services': 'project coordination for kitchens, bathrooms, and wider upgrades',
            'painters': 'interior, exterior, presentation, and repaint work'
        }
    }
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

function formatSlugLabel(value) {
    return value
        .replace('.html', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function buildHubLinkList(citySlug, categorySlug, slugs, descriptions = {}) {
    return `
    <ul class="hub-link-list">
        ${slugs.map(slug => `
            <li>
                <a href="/cities/${citySlug}/${categorySlug}/${slug}.html">${formatSlugLabel(slug)}</a>
                <span>${descriptions[slug] || ''}</span>
            </li>
        `).join('')}
    </ul>`;
}

function buildTrustBox(author) {
    if (!author) return '';
    return `
    <aside class="seo-trust-box">
        <div class="container">
            <div class="seo-trust-inner">
                <div class="seo-trust-icon"><i class="fas fa-shield-halved"></i></div>
                <div class="seo-trust-text">
                    <strong>Why Trust TopRated?</strong>
                    <p>Our listings and guides are built to help New Zealand businesses and consumers compare local providers faster. We focus on buyer intent, local relevance, and clear category structure rather than thin directory filler.</p>
                    <p class="seo-trust-author"><i class="fas fa-user-pen"></i> Researched by: ${author}</p>
                </div>
            </div>
        </div>
    </aside>`;
}

function buildHubSchema(title, description, faqs = []) {
    const graph = [
        {
            "@type": "CollectionPage",
            "name": title,
            "description": description
        }
    ];

    if (faqs.length > 0) {
        graph.push({
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        });
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph
    };
}

function buildFaqSchema(faqs = []) {
    if (!faqs || faqs.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

function getCityHubSeo(city) {
    const profile = cityProfiles[city.slug] || cityProfiles['auckland'];
    return {
        pageTitle: `${city.name}'s Best Services, Trades & Local Businesses | TopRated NZ`,
        metaDescription: `Compare top-rated services, trades, hospitality, food, and automotive businesses in ${city.name}. Explore local categories and find better providers faster.`,
        heroTitle: `${city.name} <br><span class="text-primary">Directory</span>`,
        heroSubtitle: `Top-rated local businesses, services, and trades in ${city.name}.`,
        introText: `TopRated helps people in ${city.name} compare local businesses by category instead of getting stuck in generic search results. ${profile.marketLine} Start with the highest-intent categories like <a href="/cities/${city.slug}/services/">services</a> and <a href="/cities/${city.slug}/trades/">trades</a>, then explore hospitality, food, and automotive providers when you need a shorter, cleaner local shortlist.`,
        lastUpdated: 'April 2026',
        author: 'TopRated Editorial Team',
        sections: [
            {
                id: 'how-to-use',
                title: `How to Use TopRated in ${city.name}`,
                icon: 'fa-compass',
                content: `<p>${profile.cityHubAngle}</p><p>If you are researching business-critical providers, start with <a href="/cities/${city.slug}/services/">Services in ${city.name}</a> for accountants, lawyers, cleaners, and real estate agents, or go straight to <a href="/cities/${city.slug}/trades/">Trades in ${city.name}</a> for builders, electricians, plumbers, painters, and renovation companies.</p>`
            },
            {
                id: 'priority-categories',
                title: `Best Categories to Explore in ${city.name}`,
                icon: 'fa-layer-group',
                content: `<p>Most commercial and homeowner intent in ${city.name} sits inside a small number of categories. These are the fastest places to start if you want better providers, cleaner internal links, and higher buyer intent pages:</p><ul class="hub-link-list hub-link-list--compact"><li><a href="/cities/${city.slug}/services/">Services</a><span>accountants, lawyers, cleaners, and real estate agents</span></li><li><a href="/cities/${city.slug}/trades/">Trades</a><span>builders, electricians, plumbers, painters, and renovation firms</span></li><li><a href="/cities/${city.slug}/cuisine/">Cuisine</a><span>restaurants, cafes, and specialist food categories</span></li><li><a href="/cities/${city.slug}/hospitality/">Hospitality</a><span>hotels, bars, and nightlife options</span></li><li><a href="/cities/${city.slug}/automotive/">Automotive</a><span>mechanics, dealers, tyre shops, and repair businesses</span></li></ul>`
            },
            {
                id: 'what-matters',
                title: `What Matters When Comparing Businesses in ${city.name}`,
                icon: 'fa-circle-check',
                content: `<p>Strong local businesses usually make the shortlist for the same reasons: clear communication, realistic pricing, solid reviews, and the ability to do the job without creating unnecessary friction. ${profile.marketLine}</p><p>That is why these city hub pages matter. They create a cleaner path into the categories buyers actually search, and they help the stronger leaf pages under each category support each other properly.</p>`
            }
        ],
        faqs: [
            {
                question: `What can I find in the ${city.name} directory?`,
                answer: `You can browse top-rated local businesses in ${city.name} across services, trades, food, hospitality, and automotive categories. The goal is to help you get to the right shortlist faster.`
            },
            {
                question: `Where should I start if I need a business-critical provider in ${city.name}?`,
                answer: `Start with the services and trades hubs. Those categories usually carry the strongest buyer intent and are the most useful for people comparing accountants, lawyers, builders, electricians, plumbers, painters, and similar providers.`
            },
            {
                question: `Are TopRated listings paid placements?`,
                answer: `TopRated is designed as a local comparison directory, not a generic pay-to-play list. The pages are structured to help people compare strong local options by category and location.`
            },
            {
                question: `Why are city hub pages useful for local search?`,
                answer: `They create a cleaner path into the main categories people actually research in that city, which makes the site easier to navigate and supports the more specific leaf pages underneath.`
            }
        ]
    };
}

function getCategoryHubSeo(city, categorySlug) {
    const profile = cityProfiles[city.slug] || cityProfiles['auckland'];
    const config = categoryHubConfigs[categorySlug];
    if (!config) return null;

    const linkList = buildHubLinkList(city.slug, categorySlug, config.subCategories, config.subCategoryDescriptions);

    if (categorySlug === 'services') {
        return {
            pageTitle: `Best Services in ${city.name} | TopRated NZ`,
            metaDescription: `Compare top-rated accountants, cleaning services, lawyers, and real estate agents in ${city.name}.`,
            heroTitle: `Services <br><span class="text-primary">in ${city.name}</span>`,
            heroSubtitle: `Top-rated local service providers in ${city.name}.`,
            introText: `This page brings together the highest-intent service categories in ${city.name}. ${profile.servicesAngle} If you are trying to find a provider you can trust, start here and move into the specific category page that matches the job.`,
            lastUpdated: 'April 2026',
            author: 'TopRated Editorial Team',
            sections: [
                {
                    id: 'service-categories',
                    title: `Most Important Service Categories in ${city.name}`,
                    icon: 'fa-briefcase',
                    content: `<p>These are the main service categories people compare most often in ${city.name}, especially when the outcome affects money, property, or business decisions.</p>${linkList}`
                },
                {
                    id: 'how-to-choose',
                    title: `How to Choose the Right Service Provider in ${city.name}`,
                    icon: 'fa-clipboard-check',
                    content: `<p>${profile.servicesAngle}</p><p>Before you contact anyone, compare responsiveness, proof of local experience, pricing clarity, and whether the provider actually explains the process in plain English. For most small-business and property decisions, clarity beats jargon.</p>`
                },
                {
                    id: 'what-to-compare',
                    title: `What to Compare Before You Enquire`,
                    icon: 'fa-comments-dollar',
                    content: `<p>Do not compare local service providers on headline price alone. Compare scope, turnaround time, communication quality, and whether the provider understands the exact situation you are dealing with. The right accountant, lawyer, cleaner, or agent should remove friction, not add more of it.</p>`
                }
            ],
            faqs: [
                {
                    question: `What services are covered on this ${city.name} hub page?`,
                    answer: `This hub focuses on accountants, cleaning services, lawyers, and real estate agents in ${city.name}, because those are some of the highest-intent local service categories on the site.`
                },
                {
                    question: `Which service category should I start with?`,
                    answer: `Start with the category closest to the actual decision you need to make. If the issue affects money, tax, legal risk, or property, go to the most specific leaf page rather than staying on the hub.`
                },
                {
                    question: `Why are service hub pages useful for SEO and GEO?`,
                    answer: `They create a clear category summary page with internal links into the most important local service pages, which makes the site easier for both users and search systems to understand.`
                },
                {
                    question: `Should I compare providers on price alone?`,
                    answer: `Usually not. Response time, scope clarity, communication quality, and local relevance often matter more than the cheapest headline quote.`
                }
            ]
        };
    }

    return {
        pageTitle: `Best Trades in ${city.name} | TopRated NZ`,
        metaDescription: `Compare top-rated builders, electricians, plumbers, painters, and renovation companies in ${city.name}.`,
        heroTitle: `Trades <br><span class="text-primary">in ${city.name}</span>`,
        heroSubtitle: `Top-rated local trades in ${city.name}.`,
        introText: `This page brings together the main trade categories people compare in ${city.name}. ${profile.tradesAngle} If you need reliable quotes, better local options, and a cleaner shortlist before you call anyone, this is the best place to start.`,
        lastUpdated: 'April 2026',
        author: 'TopRated Editorial Team',
        sections: [
            {
                id: 'trade-categories',
                title: `Most Important Trade Categories in ${city.name}`,
                icon: 'fa-hammer',
                content: `<p>These are the main trade categories people research most often in ${city.name}, especially for repairs, upgrades, renovations, and ongoing property work.</p>${linkList}`
            },
            {
                id: 'how-to-choose',
                title: `How to Choose the Right Trade Business in ${city.name}`,
                icon: 'fa-clipboard-check',
                content: `<p>${profile.tradesAngle}</p><p>Before you request quotes, compare how clearly the contractor explains scope, timing, exclusions, and how the work will be managed if other trades are involved. Good trade businesses reduce uncertainty instead of pushing it back onto you.</p>`
            },
            {
                id: 'what-to-compare',
                title: `What to Compare Before You Ask for Quotes`,
                icon: 'fa-comments-dollar',
                content: `<p>Do not compare trade businesses on price alone. Compare scope quality, communication, proof of similar local work, and whether the contractor has a realistic plan for access, sequencing, and any follow-on trades. That is where most bad jobs start to unravel.</p>`
            }
        ],
        faqs: [
            {
                question: `What trades are covered on this ${city.name} hub page?`,
                answer: `This hub focuses on builders, electricians, plumbers, renovation services, and painters in ${city.name}, because those are the core trade categories most people research first.`
            },
            {
                question: `Which trade page should I start with?`,
                answer: `Start with the page that matches the actual job. If the work overlaps several trades, begin with the lead trade or the renovation-services page and work outward from there.`
            },
            {
                question: `Why are trade hub pages useful for SEO and GEO?`,
                answer: `They create a clearer internal-link structure into the main high-intent trade categories, which helps both users and search systems understand the city-level trade coverage.`
            },
            {
                question: `Should I choose the cheapest trade quote?`,
                answer: `Usually not without comparing scope and process quality. The cheapest quote often leaves out prep, coordination, or repair detail that later becomes the real cost.`
            }
        ]
    };
}

function generateLeafContent(titleLine, specificSeo = null, heroImg = '/img/auckland-hero.jpg') {
    // --- Build Table of Contents ---
    let tocItems = [];
    if (specificSeo) {
        if (specificSeo.introText) tocItems.push({ id: 'overview', label: 'Overview' });
        if (specificSeo.buyersGuide) tocItems.push({ id: 'buyers-guide', label: specificSeo.buyersGuide.title || 'How to Choose' });
        if (specificSeo.pricingGuide) tocItems.push({ id: 'pricing-guide', label: specificSeo.pricingGuide.title || 'Pricing Guide' });
        if (specificSeo.questionsToAsk) tocItems.push({ id: 'questions-to-ask', label: 'Questions to Ask' });
        tocItems.push({ id: 'top-rated-listings', label: 'Top-Rated Listings' });
        if (specificSeo.faqs) tocItems.push({ id: 'faqs', label: 'Frequently Asked Questions' });
    }

    let tocHtml = '';
    if (tocItems.length > 2) {
        tocHtml = `
        <nav class="seo-toc" aria-label="Table of Contents">
            <h2 class="seo-toc__title"><i class="fas fa-list"></i> In This Guide</h2>
            <ol class="seo-toc__list">
                ${tocItems.map((item, i) => `<li><a href="#${item.id}">${item.label}</a></li>`).join('')}
            </ol>
        </nav>`;
    }

    // --- Build Editorial Sections ---
    let editorialContent = '';

    if (specificSeo) {
        // Intro / Overview
        if (specificSeo.introText) {
            editorialContent += `
            <section class="seo-section" id="overview">
                <div class="container">
                    <p class="seo-lead">${specificSeo.introText}</p>
                    ${specificSeo.lastUpdated ? `<p class="seo-updated"><i class="fas fa-calendar-check"></i> Last updated: ${specificSeo.lastUpdated}</p>` : ''}
                </div>
            </section>`;
        }

        // Buyer's Guide
        if (specificSeo.buyersGuide) {
            editorialContent += `
            <section class="seo-section seo-section--guide" id="buyers-guide">
                <div class="container">
                    <h2><i class="fas fa-clipboard-check"></i> ${specificSeo.buyersGuide.title}</h2>
                    <div class="seo-guide-content">${specificSeo.buyersGuide.content}</div>
                </div>
            </section>`;
        }

        // Pricing Guide
        if (specificSeo.pricingGuide) {
            let priceTableHtml = '';
            if (specificSeo.pricingGuide.priceTable && specificSeo.pricingGuide.priceTable.length > 0) {
                priceTableHtml = `
                <div class="seo-price-table-wrap">
                    <table class="seo-price-table">
                        <thead><tr><th>Service / Project</th><th>Typical Cost Range</th></tr></thead>
                        <tbody>
                            ${specificSeo.pricingGuide.priceTable.map(row => `<tr><td>${row.service}</td><td><strong>${row.range}</strong></td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>`;
            }
            editorialContent += `
            <section class="seo-section seo-section--pricing" id="pricing-guide">
                <div class="container">
                    <h2><i class="fas fa-dollar-sign"></i> ${specificSeo.pricingGuide.title}</h2>
                    <div class="seo-guide-content">${specificSeo.pricingGuide.content}</div>
                    ${priceTableHtml}
                </div>
            </section>`;
        }

        // Questions to Ask
        if (specificSeo.questionsToAsk && specificSeo.questionsToAsk.length > 0) {
            editorialContent += `
            <section class="seo-section seo-section--questions" id="questions-to-ask">
                <div class="container">
                    <h2><i class="fas fa-comments"></i> Questions to Ask Before Hiring</h2>
                    <ul class="seo-questions-list">
                        ${specificSeo.questionsToAsk.map(q => `<li><i class="fas fa-circle-question"></i> <span>${q}</span></li>`).join('')}
                    </ul>
                </div>
            </section>`;
        }
    }

    // --- Build FAQ Section ---
    let faqHtml = '';
    if (specificSeo && specificSeo.faqs) {
        faqHtml = `
        <section class="seo-section seo-section--faq" id="faqs">
            <div class="container">
                <h2><i class="fas fa-circle-question"></i> Frequently Asked Questions</h2>
                <div class="seo-faq-grid">
                    ${specificSeo.faqs.map(faq => `
                        <details class="seo-faq-item">
                            <summary>${faq.question}</summary>
                            <p>${faq.answer}</p>
                        </details>
                    `).join('')}
                </div>
            </div>
        </section>`;
    }

    // --- Author / Trust Section ---
    let trustHtml = '';
    if (specificSeo && (specificSeo.author || specificSeo.lastUpdated)) {
        trustHtml = `
        <aside class="seo-trust-box">
            <div class="container">
                <div class="seo-trust-inner">
                    <div class="seo-trust-icon"><i class="fas fa-shield-halved"></i></div>
                    <div class="seo-trust-text">
                        <strong>Why Trust TopRated?</strong>
                        <p>Our listings are independently curated based on verified Google reviews, industry certifications, and local expertise. We are not pay-to-play — every recommendation is earned. <a href="/about.html">Learn about our methodology →</a></p>
                        ${specificSeo.author ? `<p class="seo-trust-author"><i class="fas fa-user-pen"></i> Researched by: ${specificSeo.author}</p>` : ''}
                    </div>
                </div>
            </div>
        </aside>`;
    }

    return `
    <section class="industry-hero" style="height: 40vh; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${heroImg}'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
        <div class="container">
            <nav id="breadcrumb" style="margin-bottom: 1rem; font-size: 0.9rem; opacity: 0.8;"></nav>
            <h1>${titleLine}</h1>
        </div>
    </section>
    <div class="container seo-content-wrapper">
        ${tocHtml}
        ${editorialContent}
    </div>
    <section class="container section" id="top-rated-listings">
        <div id="business-list" class="business-list">
            <p class="loading">Loading top-rated businesses...</p>
        </div>
    </section>
    ${faqHtml}
    <section class="container section">
        <div id="related"></div>
    </section>
    ${trustHtml}
    <script id="schema" type="application/ld+json"></script>
    `;
}

function generateHubContent(heroTitle, heroSubtitle, heroImg, hubSeo = null) {
    let tocHtml = '';
    let editorialHtml = '';
    let faqHtml = '';
    let trustHtml = '';

    if (hubSeo) {
        const tocItems = [];
        if (hubSeo.introText) tocItems.push({ id: 'overview', label: 'Overview' });
        if (hubSeo.sections) {
            hubSeo.sections.forEach(section => tocItems.push({ id: section.id, label: section.title }));
        }
        tocItems.push({ id: 'hub-discovery', label: 'Explore' });
        if (hubSeo.faqs) tocItems.push({ id: 'faqs', label: 'Frequently Asked Questions' });

        if (tocItems.length > 2) {
            tocHtml = `
            <nav class="seo-toc" aria-label="Table of Contents">
                <h2 class="seo-toc__title"><i class="fas fa-list"></i> In This Guide</h2>
                <ol class="seo-toc__list">
                    ${tocItems.map(item => `<li><a href="#${item.id}">${item.label}</a></li>`).join('')}
                </ol>
            </nav>`;
        }

        if (hubSeo.introText) {
            editorialHtml += `
            <section class="seo-section" id="overview">
                <div class="container">
                    <p class="seo-lead">${hubSeo.introText}</p>
                    ${hubSeo.lastUpdated ? `<p class="seo-updated"><i class="fas fa-calendar-check"></i> Last updated: ${hubSeo.lastUpdated}</p>` : ''}
                </div>
            </section>`;
        }

        if (hubSeo.sections) {
            editorialHtml += hubSeo.sections.map((section, index) => `
            <section class="seo-section ${index === 1 ? 'seo-section--guide' : ''}" id="${section.id}">
                <div class="container">
                    <h2><i class="fas ${section.icon || 'fa-circle-info'}"></i> ${section.title}</h2>
                    <div class="seo-guide-content">${section.content}</div>
                </div>
            </section>`).join('');
        }

        if (hubSeo.faqs && hubSeo.faqs.length > 0) {
            faqHtml = `
            <section class="seo-section seo-section--faq" id="faqs">
                <div class="container">
                    <h2><i class="fas fa-circle-question"></i> Frequently Asked Questions</h2>
                    <div class="seo-faq-grid">
                        ${hubSeo.faqs.map(faq => `
                            <details class="seo-faq-item">
                                <summary>${faq.question}</summary>
                                <p>${faq.answer}</p>
                            </details>
                        `).join('')}
                    </div>
                </div>
            </section>`;
        }

        trustHtml = buildTrustBox(hubSeo.author);
    }

    return `
    <section class="hero" style="min-height: 40vh; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${heroImg}'); background-size: cover; background-position: center;">
        <div class="hero-content">
            <nav id="breadcrumb" style="margin-bottom: 1rem; font-size: 0.9rem; opacity: 0.8;"></nav>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
        </div>
    </section>
    <div class="container seo-content-wrapper">
        ${tocHtml}
        ${editorialHtml}
    </div>
    <section class="container section hub-discovery-section" id="hub-discovery">
        <div id="hub-featured-guides"></div>
        <div class="hub-grid-shell">
            <div class="hub-grid-header">
                <span class="hub-grid-header__eyebrow">Browse</span>
                <h2 id="hub-grid-title">Explore this directory</h2>
                <p id="hub-grid-description">Browse the main categories for this location.</p>
            </div>
            <div id="hub-grid" class="grid-cols-3">
                <p class="loading">Loading content...</p>
            </div>
        </div>
    </section>
    ${faqHtml}
    ${trustHtml}
    `;
}

// ---------------------------------------------------
// 3. Execution
// ---------------------------------------------------

// 3.0 Nationwide Hub
const nationwideSeo = seoContent['new-zealand'] || null;
const nationwideTitle = nationwideSeo?.pageTitle || 'Nationwide Businesses in New Zealand | TopRated NZ';
const nationwideDescription = nationwideSeo?.metaDescription || 'Compare businesses serving customers across New Zealand.';
const nationwideHtml = getBaseTemplate(
    nationwideTitle,
    nationwideDescription,
    generateLeafContent(`Nationwide <br><span class="text-primary">Businesses in New Zealand</span>`, nationwideSeo, cityHeros['auckland']),
    buildFaqSchema(nationwideSeo?.faqs || [])
);
fs.writeFileSync('new-zealand.html', nationwideHtml);

// 3.1 City Hubs
cities.forEach(city => {
    const hubSeo = getCityHubSeo(city);
    const html = getBaseTemplate(
        hubSeo.pageTitle,
        hubSeo.metaDescription,
        generateHubContent(hubSeo.heroTitle, hubSeo.heroSubtitle, cityHeros[city.slug] || cityHeros['auckland'], hubSeo),
        buildHubSchema(hubSeo.pageTitle, hubSeo.metaDescription, hubSeo.faqs)
    );
    fs.writeFileSync(`cities/${city.slug}.html`, html);
});

// 3.2 Industry Hubs — DISABLED (city-first architecture)
// Industry data is still used for categorisation but no global industry pages are generated.
// industries.forEach(ind => {
//     const html = getBaseTemplate(`Best ${ind.name} in NZ | TopRated NZ`, `Browse top-rated businesses in ${ind.name}.`, generateHubContent(ind.name, `New Zealand's leading ${ind.name.toLowerCase()} specialists.`, indHeros[ind.slug] || indHeros['hospitality']));
//     fs.writeFileSync(`industries/${ind.slug}.html`, html);
// });

// 3.3 Category Hubs in Cities (index.html in subfolders)
const categories = ['cuisine', 'trades', 'services', 'hospitality', 'automotive'];
cities.forEach(city => {
    categories.forEach(cat => {
        const dir = path.join('cities', city.slug, cat);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const hubSeo = getCategoryHubSeo(city, cat);
        const pageTitle = hubSeo?.pageTitle || `${cat.charAt(0).toUpperCase() + cat.slice(1)} in ${city.name} | TopRated NZ`;
        const metaDescription = hubSeo?.metaDescription || `Browse ${cat} in ${city.name}.`;
        const heroTitle = hubSeo?.heroTitle || `${cat.charAt(0).toUpperCase() + cat.slice(1)} <br><span class="text-primary">in ${city.name}</span>`;
        const heroSubtitle = hubSeo?.heroSubtitle || `Best ${cat} in ${city.name}`;
        const html = getBaseTemplate(
            pageTitle,
            metaDescription,
            generateHubContent(heroTitle, heroSubtitle, cityHeros[city.slug] || cityHeros['auckland'], hubSeo),
            buildHubSchema(pageTitle, metaDescription, hubSeo?.faqs || [])
        );
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
    'bars': { cat: 'hospitality', name: 'Bars' },
    'nightclubs': { cat: 'hospitality', name: 'Nightclubs' },
    'builders': { cat: 'trades', name: 'Builders' },
    'electricians': { cat: 'trades', name: 'Electricians' },
    'plumbers': { cat: 'trades', name: 'Plumbers' },
    'renovation-services': { cat: 'trades', name: 'Renovation Services' },
    'painters': { cat: 'trades', name: 'Painters' },
    'cleaning-services': { cat: 'services', name: 'Cleaning Services' },
    'accountants': { cat: 'services', name: 'Accountants' },
    'business-loans': { cat: 'services', name: 'Business Loans' },
    'broadband-providers': { cat: 'services', name: 'Broadband Providers' },
    'creative-agencies': { cat: 'services', name: 'Creative Agencies' },
    'lawyers': { cat: 'services', name: 'Lawyers' },
    'real-estate-agents': { cat: 'services', name: 'Real Estate Agents' },
    'mechanics': { cat: 'automotive', name: 'Mechanics' },
    'car-dealers': { cat: 'automotive', name: 'Car Dealers' },
    'panel-beaters': { cat: 'automotive', name: 'Panel Beaters' },
    'car-wash': { cat: 'automotive', name: 'Car Wash' },
    'tyre-shops': { cat: 'automotive', name: 'Tyre Shops' }
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

            const html = getBaseTemplate(
                `Top Rated ${map.name} in ${city.name} | Verified for 2026`,
                `Compare the best ${map.name.toLowerCase()} in ${city.name}. Read reviews, view ratings, and find the top-rated ${map.name.toLowerCase()} near you in ${city.name}.`,
                generateLeafContent(`${map.name} <br><span class="text-primary">in ${city.name}</span>`, specificSeo, cityHeros[city.slug] || cityHeros['auckland']),
                buildFaqSchema(specificSeo?.faqs || [])
            );
            fs.writeFileSync(path.join(dir, `${sc}.html`), html);
        });
    });
});

// 3.5 Global Subcategory Pages — DISABLED (city-first architecture)
// industries.forEach(ind => {
//     ind.subCategories.forEach(sc => {
//         const map = subCatsMapping[sc];
//         if (!map) return;
//         const dir = path.join('industries', ind.slug);
//         if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//         const html = getBaseTemplate(`Best ${sc.replace(/-/g, ' ')} in New Zealand | TopRated NZ`, `The ultimate guide to ${sc} across NZ.`, generateLeafContent(`${sc.charAt(0).toUpperCase() + sc.replace(/-/g, ' ').slice(1)} <br><span class="text-primary">in New Zealand</span>`));
//         fs.writeFileSync(path.join(dir, `${sc}.html`), html);
//     });
// });

console.log('✅ All pages generated successfully.');

