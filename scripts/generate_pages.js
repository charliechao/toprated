const fs = require('fs');
const path = require('path');

// ---------------------------------------------------
// 1. Configuration & Data
// ---------------------------------------------------
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('data/cities.json', 'utf8'));
const industries = JSON.parse(fs.readFileSync('data/industries.json', 'utf8'));
const seoContent = fs.existsSync('data/seo_content.json') ? JSON.parse(fs.readFileSync('data/seo_content.json', 'utf8')) : {};
const leafContentProfiles = JSON.parse(fs.readFileSync('data/leaf_content_profiles.json', 'utf8'));
const templatePath = path.resolve(__dirname, '..', 'templates', 'template-page.html');
const baseTemplate = fs.readFileSync(templatePath, 'utf8');
const BASE_URL = 'https://toprated.nz';
const CONTENT_UPDATED_LABEL = 'July 2026';
const CONTENT_UPDATED_ISO = '2026-07-28';

// Hero Images Mapping
const cityHeros = {
    'auckland': '/img/city-heroes/auckland.jpg',
    'wellington': '/img/city-heroes/wellington.jpg',
    'christchurch': '/img/city-heroes/christchurch.jpg',
    'hamilton': '/img/city-heroes/hamilton.jpg',
    'tauranga': '/img/city-heroes/tauranga.jpg'
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
        subCategories: ['accountants', 'cleaning-services', 'hypnotherapists', 'financial-advisers', 'kiwisaver-advisers', 'lawyers', 'real-estate-agents', 'insurance-brokers', 'mortgage-brokers', 'business-loans', 'creative-agencies', 'broadband-providers', 'computer-repairs', 'travel-agencies', 'movers', 'air-conditioning', 'fitness-equipment', 'gyms'],
        subCategoryDescriptions: {
            'accountants': 'tax, reporting, cash flow, and practical small-business support',
            'air-conditioning': 'commercial AC, heat pumps, installation, servicing, and repairs',
            'business-loans': 'funding marketplaces, lenders, and finance options for SMEs',
            'broadband-providers': 'fibre, wireless, and business internet options for better connectivity',
            'cleaning-services': 'home, office, move-out, and one-off cleaning jobs',
            'computer-repairs': 'laptop, desktop, gaming PC, parts, and repair support',
            'creative-agencies': 'branding, websites, design systems, and digital creative support',
            'financial-advisers': 'investment planning, retirement advice, risk strategy, and long-term wealth guidance',
            'fitness-equipment': 'weights, cardio machines, strength equipment, and home-gym setups',
            'gyms': '24/7 access, strength and cardio equipment, group classes, and personal training',
            'hypnotherapists': 'clinical hypnotherapy, NLP, anxiety support, and nervous-system reset work',
            'insurance-brokers': 'cover comparisons, business risk advice, claims support, and policy structuring',
            'kiwisaver-advisers': 'fund selection, contribution strategy, first-home support, and retirement planning',
            'lawyers': 'property, commercial, wills, trusts, and legal support',
            'mortgage-brokers': 'home-loan advice, lender comparisons, pre-approvals, and refinance support',
            'movers': 'house moves, office relocations, packing, transport, and furniture delivery',
            'real-estate-agents': 'selling, buying, pricing, and local campaign guidance',
            'travel-agencies': 'flight booking, travel planning, fare comparison, and holiday support'
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
    },
    automotive: {
        heroLabel: 'Automotive',
        descriptionPrefix: 'Compare local automotive businesses',
        browseLabel: 'Automotive Categories',
        subCategories: ['mechanics', 'car-dealers', 'tyre-shops', 'panel-beaters', 'car-wash'],
        subCategoryDescriptions: {
            'mechanics': 'servicing, WoF repairs, diagnostics, brakes, and general mechanical work',
            'car-dealers': 'new and used vehicles, trade-ins, finance, and after-sales support',
            'tyre-shops': 'tyre replacement, puncture repair, wheel alignment, and fitment advice',
            'panel-beaters': 'collision repair, panel work, paint matching, and insurance repairs',
            'car-wash': 'hand washing, detailing, interior cleaning, and paint-care services'
        },
        intro: 'Use this hub to move from a broad automotive search into the exact type of workshop, retailer, or vehicle-care business you need.',
        cityContextType: 'service',
        compareIntro: 'Automotive decisions are easier when you separate urgent repairs, planned maintenance, vehicle purchases, tyres, body repairs, and cosmetic care.',
        comparisonPoints: 'Compare relevant experience, diagnostic or inspection process, written scope, warranties, timing, parts or product choices, and the full expected cost.',
        caution: 'For repair work, ask what has been confirmed, what is still diagnostic, and whether approval is required before extra work begins.'
    },
    cuisine: {
        heroLabel: 'Cuisine',
        descriptionPrefix: 'Compare local restaurants and cafes',
        browseLabel: 'Cuisine Categories',
        subCategories: ['restaurants', 'cafes', 'japanese-restaurants', 'chinese-restaurants', 'indian-restaurants', 'italian-restaurants', 'thai-restaurants', 'french-restaurants'],
        subCategoryDescriptions: {
            'restaurants': 'all-round dining choices for different budgets, groups, and occasions',
            'cafes': 'coffee, brunch, cabinet food, casual meetings, and local daytime dining',
            'japanese-restaurants': 'sushi, sashimi, ramen, izakaya dishes, and Japanese dining',
            'chinese-restaurants': 'regional Chinese dishes, shared meals, dumplings, and banquets',
            'indian-restaurants': 'curries, tandoor dishes, vegetarian choices, and regional Indian food',
            'italian-restaurants': 'pasta, pizza, regional dishes, wine, and occasion dining',
            'thai-restaurants': 'curries, stir-fries, noodles, spice choices, and shared meals',
            'french-restaurants': 'bistro classics, tasting menus, wine, and special-occasion dining'
        },
        intro: 'Use this hub to choose the dining style that matches your occasion, budget, location, dietary needs, and preferred atmosphere.',
        cityContextType: 'venue',
        compareIntro: 'A useful dining shortlist starts with the occasion: quick coffee, casual meal, group booking, business dinner, or a special night out.',
        comparisonPoints: 'Compare menu fit, price range, location, opening hours, booking requirements, dietary options, atmosphere, and recent customer feedback.',
        caution: 'Menus, hours, availability, and surcharges can change, so confirm time-sensitive details directly before travelling or booking.'
    },
    hospitality: {
        heroLabel: 'Hospitality',
        descriptionPrefix: 'Compare local hotels, bars, and nightclubs',
        browseLabel: 'Hospitality Categories',
        subCategories: ['hotels', 'bars', 'nightclubs'],
        subCategoryDescriptions: {
            'hotels': 'accommodation, facilities, location, parking, and booking conditions',
            'bars': 'drinks, food, atmosphere, group bookings, and evening venues',
            'nightclubs': 'music, late-night entertainment, entry policies, and event nights'
        },
        intro: 'Use this hub to compare accommodation and nightlife pages according to the experience, location, budget, and timing you have in mind.',
        cityContextType: 'venue',
        compareIntro: 'Hotels, bars, and nightclubs solve very different needs, so begin with the experience you want rather than a general popularity claim.',
        comparisonPoints: 'Compare location, current opening or check-in times, facilities, atmosphere, accessibility, booking or entry conditions, total cost, and recent feedback.',
        caution: 'Event schedules, entry rules, room availability, pricing, and operating hours can change; check the venue’s current information before making plans.'
    }
};

// ---------------------------------------------------
// 2. Page Template Functions
// ---------------------------------------------------

function toPublicPath(relativePath) {
    let normalizedPath = relativePath.replace(/\\/g, '/');
    if (!normalizedPath.startsWith('/')) {
        normalizedPath = `/${normalizedPath}`;
    }

    if (normalizedPath.endsWith('/index.html')) {
        normalizedPath = normalizedPath.replace('/index.html', '/');
    } else if (normalizedPath.endsWith('.html')) {
        normalizedPath = normalizedPath.replace('.html', '');
    }

    return normalizedPath.replace(/\/{2,}/g, '/');
}

function toAbsoluteUrl(relativePath) {
    return `${BASE_URL}${toPublicPath(relativePath)}`;
}

function normalizeInternalLinks(html = '') {
    return html
        .replace(/href=(['"])(\/[^'"]*?)\/index\.html((?:[#?][^'"]*)?)\1/g, (_match, quote, href, suffix = '') => `href=${quote}${href}/${suffix}${quote}`)
        .replace(/href=(['"])(\/[^'"]*?)\.html((?:[#?][^'"]*)?)\1/g, (_match, quote, href, suffix = '') => `href=${quote}${href}${suffix}${quote}`);
}

function getBaseTemplate(title, description, pagePath, content, schema = null) {
    const schemaScript = schema ? `<script type="application/ld+json">${serializeJsonLd(schema)}</script>` : '';
    const pageUrl = toAbsoluteUrl(pagePath);
    return baseTemplate
        .replace(/<!-- PAGE_TITLE_PLACEHOLDER -->/g, title)
        .replace(/<!-- PAGE_DESCRIPTION_PLACEHOLDER -->/g, description)
        .replace(/<!-- PAGE_URL_PLACEHOLDER -->/g, pageUrl)
        .replace('<!-- PAGE_CONTENT_PLACEHOLDER -->', normalizeInternalLinks(content))
        .replace('<!-- SCHEMA_PLACEHOLDER -->', schemaScript);
}

function serializeJsonLd(value) {
    return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getTrackedOutboundUrl(destination, business, linkType) {
    try {
        const url = new URL(destination);
        url.searchParams.set('utm_source', 'toprated.nz');
        url.searchParams.set('utm_medium', 'referral');
        url.searchParams.set('utm_campaign', 'business_listing');
        url.searchParams.set('utm_content', `business-${business.id}-${linkType}`);
        return url.href;
    } catch (error) {
        return destination;
    }
}

function sortBusinessesForDisplay(items) {
    return [...items].sort((a, b) => {
        const aFeatured = a.featured === true;
        const bFeatured = b.featured === true;
        if (aFeatured !== bFeatured) return aFeatured ? -1 : 1;

        const aBasic = a.listingTier === 'basic';
        const bBasic = b.listingTier === 'basic';
        if (aBasic !== bBasic) return aBasic ? 1 : -1;

        const aHasRating = typeof a.rating === 'number' && typeof a.reviews === 'number' && a.reviews > 0;
        const bHasRating = typeof b.rating === 'number' && typeof b.reviews === 'number' && b.reviews > 0;
        if (aHasRating !== bHasRating) return aHasRating ? -1 : 1;
        return (b.rating || 0) - (a.rating || 0) || (b.reviews || 0) - (a.reviews || 0);
    });
}

function getLeafBusinesses(citySlug, categorySlug, pageSlug) {
    return sortBusinessesForDisplay(businesses.filter(business =>
        business.citySlug === citySlug &&
        business.categorySlug === categorySlug &&
        business.pageSlug === pageSlug
    ));
}

function renderBusinessCard(business) {
    const hasRating = typeof business.rating === 'number' && typeof business.reviews === 'number' && business.reviews > 0;
    const isFeatured = business.featured === true;
    const isBasic = business.listingTier === 'basic';
    const isPremium = hasRating && business.rating >= 4.8;
    const listingTier = isFeatured ? 'featured' : (isBasic ? 'basic' : 'standard');
    const imageFitClass = business.imageFit === 'contain' ? ' business-image--contain' : '';
    const ratingValue = business.reviewSource && Number.isInteger(business.rating) ? business.rating.toFixed(1) : business.rating;
    const ratingSource = business.reviewSource ? ` ${escapeHtml(business.reviewSource)} rating` : '';
    const ratingBadge = hasRating
        ? `<div class="rating-badge"><i class="fas fa-star"></i> ${escapeHtml(ratingValue)}${ratingSource} (${escapeHtml(business.reviews)} reviews)</div>`
        : '<div class="rating-badge"><i class="fas fa-sparkles"></i> New listing</div>';
    const serviceHighlights = isFeatured && Array.isArray(business.highlightedServices) && business.highlightedServices.length
        ? `<div class="business-services"><span>Main services</span><div class="business-service-tags">${business.highlightedServices.map(service => `<span>${escapeHtml(service)}</span>`).join('')}</div></div>`
        : '';
    const phoneHref = business.phone ? business.phone.replace(/[^+\d]/g, '') : '';
    const contactLinks = [
        !isBasic && business.website ? `<a href="${escapeHtml(getTrackedOutboundUrl(business.website, business, 'website'))}" target="_blank" rel="noopener" class="text-primary" data-tracked-referral="website"><i class="fas fa-external-link-alt"></i> Website</a>` : '',
        !isBasic && business.bookingUrl ? `<a href="${escapeHtml(getTrackedOutboundUrl(business.bookingUrl, business, 'booking'))}" target="_blank" rel="noopener" class="text-primary" data-tracked-referral="booking"><i class="fas fa-calendar-check"></i> Book a consultation</a>` : '',
        !isBasic && business.phone ? `<a href="tel:${escapeHtml(phoneHref)}" class="text-primary" data-tracked-referral="phone"><i class="fas fa-phone"></i> ${escapeHtml(business.phone)}</a>` : ''
    ].filter(Boolean).join('');

    return `
        <div class="glass-card business-card-horizontal ${isBasic ? 'basic-listing-card' : ''} ${isFeatured ? 'featured-provider-card' : ''} ${isPremium ? 'premium-border' : ''}" data-listing-impression="true" data-business-id="${escapeHtml(business.id)}" data-business-name="${escapeHtml(business.name)}" data-city-slug="${escapeHtml(business.citySlug || '')}" data-category-slug="${escapeHtml(business.categorySlug || '')}" data-page-slug="${escapeHtml(business.pageSlug || '')}" data-listing-tier="${listingTier}">
            <div class="business-image-container">
                <img src="${escapeHtml(business.image || '/img/default-business.jpg')}" alt="${escapeHtml(business.name)}" class="business-image${imageFitClass}" loading="lazy" decoding="async">
                ${isFeatured ? '<div class="featured-provider-badge"><i class="fas fa-star"></i> FEATURED PROVIDER</div>' : (isPremium ? '<div class="premium-badge"><i class="fas fa-crown"></i> TOP RATED</div>' : '')}
            </div>
            <div class="business-info">
                ${ratingBadge}
                <h3>${escapeHtml(business.name)}</h3>
                ${business.neighborhood ? `<div class="neighborhood-tag"><i class="fas fa-map-pin"></i> ${escapeHtml(business.neighborhood)}</div>` : ''}
                <p class="text-muted">${escapeHtml(business.description)}</p>
                ${serviceHighlights}
                <div class="business-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(business.address || business.city || 'New Zealand')}</span>
                    <div class="business-contact-links">${contactLinks}</div>
                </div>
            </div>
        </div>
    `.replace(/^[ \t]+$/gm, '').trim();
}

function formatSlugLabel(value) {
    const tokenOverrides = {
        kiwisaver: 'KiwiSaver'
    };
    return value
        .replace('.html', '')
        .split('-')
        .map(part => tokenOverrides[part.toLowerCase()] || (part.charAt(0).toUpperCase() + part.slice(1)))
        .join(' ');
}

function buildHubLinkList(citySlug, categorySlug, slugs, descriptions = {}) {
    return `
    <ul class="hub-link-list">
        ${slugs.map(slug => `
            <li>
                <a href="/cities/${citySlug}/${categorySlug}/${slug}">${formatSlugLabel(slug)}</a>
                <span>${descriptions[slug] || ''}</span>
            </li>
        `).join('')}
    </ul>`;
}

function getCategoryName(categorySlug) {
    const industry = industries.find(ind => ind.slug === categorySlug);
    return industry ? industry.name : formatSlugLabel(categorySlug);
}

function getCategorySubcategories(categorySlug) {
    return industries.find(ind => ind.slug === categorySlug)?.subCategories || [];
}

function hasLocalBusinesses(citySlug, pageSlug, categorySlug = null) {
    return businesses.some(b =>
        b.citySlug === citySlug &&
        b.pageSlug === pageSlug &&
        (!categorySlug || b.categorySlug === categorySlug)
    );
}

function getAvailableSubcategories(citySlug, categorySlug, slugs = getCategorySubcategories(categorySlug)) {
    return slugs.filter(slug => hasLocalBusinesses(citySlug, slug, categorySlug));
}

function getLeafPageTitle(city, pageName, specificSeo = null) {
    if (specificSeo?.pageTitle) return specificSeo.pageTitle;
    return `Best ${pageName} in ${city.name} | TopRated NZ`;
}

function getLeafMetaDescription(city, pageName, specificSeo = null) {
    if (specificSeo?.metaDescription) return specificSeo.metaDescription;
    return `Compare ${pageName.toLowerCase()} in ${city.name}. Read reviews, check local fit, and shortlist the best ${pageName.toLowerCase()} for your next decision.`;
}

function stripHtml(value = '') {
    return String(value)
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z0-9#]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function countWords(value = '') {
    return (stripHtml(value).match(/[\p{L}\p{N}][\p{L}\p{N}'’&-]*/gu) || []).length;
}

function getSeoSourceDepth(specificSeo = null) {
    if (!specificSeo) return 0;

    return countWords([
        specificSeo.introText,
        specificSeo.buyersGuide?.content,
        specificSeo.pricingGuide?.content,
        ...(specificSeo.questionsToAsk || []),
        ...(specificSeo.faqs || []).flatMap(faq => [faq.question, faq.answer])
    ].filter(Boolean).join(' '));
}

function getLeafProfile(categorySlug, pageSlug) {
    const profile = leafContentProfiles.categories[pageSlug];
    if (profile) return profile;

    const categoryName = getCategoryName(categorySlug).toLowerCase();
    return {
        summary: `These ${categoryName} providers differ in service scope, local experience, availability, communication, pricing, and the evidence they provide before a customer commits.`,
        bestFor: 'comparing service fit, local coverage, process, and total value',
        criteria: [
            { name: 'Relevant experience', advice: 'Ask for evidence of recent work or customers with needs similar to yours.' },
            { name: 'Scope and process', advice: 'Compare what is included, who handles the work, timing, communication, and what could change.' },
            { name: 'Price and terms', advice: 'Review the full cost, exclusions, payment timing, cancellation, warranties, and support after the work.' }
        ]
    };
}

function getLeafAreaSummary(city, pageBusinesses) {
    const areas = [...new Set(pageBusinesses
        .map(business => business.neighborhood)
        .filter(Boolean))]
        .slice(0, 5);

    if (areas.length === 0) {
        return 'The listing cards show the current addresses held in the TopRated directory; confirm exact coverage or travel requirements directly with each business.';
    }

    const areaText = areas.length === 1
        ? areas[0]
        : `${areas.slice(0, -1).join(', ')} and ${areas[areas.length - 1]}`;
    return `Current listing locations include ${areaText}. Location does not always equal service coverage, so confirm whether the business serves your exact address.`;
}

function buildGeneratedLeafSeo(city, categorySlug, pageSlug, pageName, pageBusinesses) {
    const profile = getLeafProfile(categorySlug, pageSlug);
    const providerLabel = pageName.toLowerCase();
    const businessCount = pageBusinesses.length;
    const venueCategory = categorySlug === 'cuisine' || categorySlug === 'hospitality';
    const localContext = leafContentProfiles.cities[city.slug]?.[venueCategory ? 'venue' : 'service']
        || cityProfiles[city.slug]?.marketLine
        || '';
    const areaSummary = getLeafAreaSummary(city, pageBusinesses);
    const criterionNames = profile.criteria.map(criterion => criterion.name.toLowerCase());
    const criteriaSummary = criterionNames.length > 1
        ? `${criterionNames.slice(0, -1).join(', ')}, and ${criterionNames[criterionNames.length - 1]}`
        : criterionNames[0];
    const practicalQuestion = venueCategory
        ? 'What should I know about bookings, current availability, changes, and any extra charges?'
        : 'What is included in your quote or fee, what is excluded, and what could change the final cost?';
    const verificationDetails = venueCategory
        ? 'availability, pricing, menus or facilities, and booking terms'
        : 'availability, pricing, qualifications, and terms';
    const choiceLabel = venueCategory ? 'option' : 'provider';
    const criterionQuestion = criterion => venueCategory
        ? `How should I compare ${criterion.name.toLowerCase()}, and what should I know before booking or visiting?`
        : `How do you handle ${criterion.name.toLowerCase()}, and what should I expect before I commit?`;

    return {
        metaDescription: `Compare ${businessCount} ${providerLabel} in ${city.name}. Check services, local fit, decision criteria, questions to ask, and current business details.`,
        introText: `This guide compares ${businessCount} ${providerLabel} in ${city.name}. ${profile.summary} ${localContext} Use the current listings and decision guide below to build a shortlist, then verify ${verificationDetails} directly with the business before committing.`,
        lastUpdated: CONTENT_UPDATED_LABEL,
        author: 'TopRated Editorial Team',
        snapshot: {
            title: `${pageName} in ${city.name}: Quick Answer`,
            answer: `The best choice depends on the outcome you need, the current information each business provides, and whether its location, availability, process, and terms fit your situation. This page is designed for ${profile.bestFor}.`,
            rows: [
                { label: 'Businesses compared', value: `${businessCount} current TopRated listings` },
                { label: 'Main decision', value: profile.bestFor },
                { label: 'Location context', value: areaSummary }
            ]
        },
        buyersGuide: {
            title: `How to Choose ${pageName} in ${city.name}`,
            content: `<p><strong>Start with fit, not the first name in the list.</strong> ${profile.summary} Write down the result you need, your timing, location, constraints, and the questions that would change your decision. That makes it easier to compare businesses on the same basis.</p><p>${localContext} Shortlist two or three plausible options, check their current information, and ask for comparable answers before choosing. A strong ${choiceLabel} should explain what is included, what is uncertain, and what you need to do next without relying on vague claims.</p>`
        },
        comparisonGuide: {
            title: 'What to Compare Before Choosing',
            intro: `Compare ${criteriaSummary} before you decide. These checks are more useful than choosing from a headline rating, a single price, or a broad promise alone.`,
            rows: profile.criteria
        },
        questionsToAsk: [
            ...profile.criteria.map(criterionQuestion),
            practicalQuestion
        ],
        faqs: [
            {
                question: `What should I compare when choosing ${providerLabel} in ${city.name}?`,
                answer: `Start with ${criteriaSummary}. Then compare location or service coverage, availability, communication, full costs, exclusions, and the evidence each business provides for its claims.`
            },
            {
                question: `How many ${providerLabel} are compared on this page?`,
                answer: `This page currently compares ${businessCount} TopRated listings in ${city.name}. ${areaSummary}`
            },
            {
                question: `How current is this ${city.name} comparison?`,
                answer: `The page was updated in ${CONTENT_UPDATED_LABEL} from the current TopRated directory records. Business services, staff, prices, hours, and availability can change, so use each business's own contact details as the final check.`
            }
        ]
    };
}

function resolveLeafSeo(city, categorySlug, pageSlug, pageName, pageBusinesses, specificSeo = null) {
    const generated = buildGeneratedLeafSeo(city, categorySlug, pageSlug, pageName, pageBusinesses);
    const sourceDepth = getSeoSourceDepth(specificSeo);

    return {
        ...generated,
        ...(specificSeo || {}),
        lastUpdated: CONTENT_UPDATED_LABEL,
        author: specificSeo?.author || generated.author,
        snapshot: generated.snapshot,
        buyersGuide: specificSeo?.buyersGuide || generated.buyersGuide,
        comparisonGuide: specificSeo?.comparisonGuide || (sourceDepth < 420 ? generated.comparisonGuide : null),
        questionsToAsk: specificSeo?.questionsToAsk?.length ? specificSeo.questionsToAsk : generated.questionsToAsk,
        faqs: specificSeo?.faqs?.length ? specificSeo.faqs : generated.faqs
    };
}

function getFeaturedSubcategories(categorySlug) {
    const priority = {
        services: ['accountants', 'financial-advisers', 'kiwisaver-advisers', 'lawyers', 'hypnotherapists', 'insurance-brokers', 'mortgage-brokers', 'business-loans', 'broadband-providers', 'computer-repairs', 'fitness-equipment', 'gyms', 'travel-agencies', 'movers', 'air-conditioning', 'creative-agencies', 'real-estate-agents'],
        trades: ['builders', 'electricians', 'plumbers', 'renovation-services', 'painters'],
        automotive: ['mechanics', 'car-dealers', 'tyre-shops', 'panel-beaters', 'car-wash'],
        cuisine: ['restaurants', 'cafes', 'japanese-restaurants', 'chinese-restaurants', 'indian-restaurants'],
        hospitality: ['hotels', 'bars', 'nightclubs']
    };
    return priority[categorySlug] || getCategorySubcategories(categorySlug).slice(0, 5);
}

function buildInternalLinkCard(href, icon, title, description) {
    return `
        <a href="${href}" class="related-card internal-link-card">
            <i class="fas ${icon}"></i>
            <div>
                <strong>${title}</strong>
                <span>${description}</span>
            </div>
        </a>`;
}

function buildInternalLinkSection(context) {
    if (!context) return '';

    let cards = [];
    let title = 'Explore Related TopRated Guides';
    let description = 'Continue through the closest city, category, and comparison pages.';

    if (context.type === 'city') {
        const city = context.city;
        title = `Popular ${city.name} Starting Points`;
        description = `Move from the ${city.name} hub into the highest-intent local service and trade pages.`;
        cards = [
            buildInternalLinkCard(`/cities/${city.slug}/services/accountants`, 'fa-calculator', `Accountants in ${city.name}`, 'Tax, reporting, and small-business support.'),
            buildInternalLinkCard(`/cities/${city.slug}/services/lawyers`, 'fa-scale-balanced', `Lawyers in ${city.name}`, 'Property, commercial, family, and local legal support.'),
            buildInternalLinkCard(`/cities/${city.slug}/trades/builders`, 'fa-hammer', `Builders in ${city.name}`, 'Renovations, repairs, extensions, and project work.'),
            buildInternalLinkCard(`/cities/${city.slug}/trades/plumbers`, 'fa-wrench', `Plumbers in ${city.name}`, 'Repairs, drainage, hot water, and renovation plumbing.'),
            buildInternalLinkCard('/new-zealand', 'fa-earth-asia', 'Nationwide Businesses', 'NZ-wide providers that serve more than one city.')
        ];
    }

    if (context.type === 'category') {
        const city = context.city;
        const categoryName = getCategoryName(context.categorySlug);
        const subcategories = getAvailableSubcategories(
            city.slug,
            context.categorySlug,
            getFeaturedSubcategories(context.categorySlug)
        );
        title = `Related ${categoryName} Guides`;
        description = `Compare the most useful ${categoryName.toLowerCase()} pages in ${city.name}, then check the same category in other cities.`;
        cards = [
            ...subcategories.slice(0, 4).map(slug => buildInternalLinkCard(
                `/cities/${city.slug}/${context.categorySlug}/${slug}`,
                'fa-arrow-right',
                `${formatSlugLabel(slug)} in ${city.name}`,
                `Open the dedicated ${formatSlugLabel(slug)} comparison page.`
            )),
            ...cities.filter(otherCity => otherCity.slug !== city.slug).slice(0, 2).map(otherCity => buildInternalLinkCard(
                `/cities/${otherCity.slug}/${context.categorySlug}/`,
                'fa-city',
                `${categoryName} in ${otherCity.name}`,
                `Compare the same category in ${otherCity.name}.`
            ))
        ];
    }

    if (context.type === 'leaf') {
        const city = context.city;
        const categoryName = getCategoryName(context.categorySlug);
        const siblingLinks = getCategorySubcategories(context.categorySlug)
            .filter(slug => slug !== context.pageSlug)
            .filter(slug => hasLocalBusinesses(city.slug, slug, context.categorySlug))
            .slice(0, 3)
            .map(slug => buildInternalLinkCard(
                `/cities/${city.slug}/${context.categorySlug}/${slug}`,
                'fa-layer-group',
                `${formatSlugLabel(slug)} in ${city.name}`,
                `Compare another ${categoryName.toLowerCase()} shortlist in ${city.name}.`
            ));
        const crossCityLinks = cities
            .filter(otherCity => otherCity.slug !== city.slug)
            .filter(otherCity => hasLocalBusinesses(otherCity.slug, context.pageSlug, context.categorySlug))
            .slice(0, 3)
            .map(otherCity => buildInternalLinkCard(
                `/cities/${otherCity.slug}/${context.categorySlug}/${context.pageSlug}`,
                'fa-city',
                `${context.pageName} in ${otherCity.name}`,
                `See the ${otherCity.name} version of this guide.`
            ));

        title = `More Ways to Compare ${context.pageName}`;
        description = `Use these internal links to move between close alternatives, the parent hub, and the same guide in other cities.`;
        cards = [
            buildInternalLinkCard(`/cities/${city.slug}/${context.categorySlug}/`, 'fa-table-cells-large', `${categoryName} Hub in ${city.name}`, `Browse every ${categoryName.toLowerCase()} guide for ${city.name}.`),
            buildInternalLinkCard(`/cities/${city.slug}`, 'fa-location-dot', `${city.name} Directory`, `Return to all TopRated categories in ${city.name}.`),
            ...siblingLinks,
            ...crossCityLinks
        ];
    }

    if (cards.length === 0) return '';

    return `
    <section class="container section internal-link-section" aria-labelledby="internal-link-title">
        <div class="related-section internal-link-panel">
            <div class="internal-link-header">
                <h2 id="internal-link-title" class="section-title">${title}</h2>
                <p class="text-muted">${description}</p>
            </div>
            <div class="related-grid internal-link-grid">
                ${cards.join('')}
            </div>
        </div>
    </section>`;
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

function buildHubSchema(title, description, faqs = [], pagePath = '/') {
    const pageUrl = toAbsoluteUrl(pagePath);
    const graph = [
        {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#webpage`,
            "url": pageUrl,
            "name": title,
            "description": description,
            "dateModified": CONTENT_UPDATED_ISO,
            "author": {
                "@type": "Organization",
                "name": "TopRated NZ",
                "url": BASE_URL
            }
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

function buildLeafSchema(city, categorySlug, pageSlug, pageName, pageBusinesses, leafSeo = null) {
    const pageUrl = toAbsoluteUrl(`/cities/${city.slug}/${categorySlug}/${pageSlug}`);
    const itemList = {
        "@type": "ItemList",
        "@id": `${pageUrl}#business-list`,
        "name": `${pageName} in ${city.name}`,
        "numberOfItems": pageBusinesses.length,
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "itemListElement": pageBusinesses.map((business, index) => {
            const item = {
                "@type": "LocalBusiness",
                "name": business.name,
                "description": business.description,
                "image": business.image,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": business.address,
                    "addressLocality": business.city || city.name,
                    "addressCountry": "NZ"
                }
            };

            if (business.listingTier !== 'basic' && business.website) {
                item.url = business.website;
            }

            return {
                "@type": "ListItem",
                "position": index + 1,
                "item": item
            };
        })
    };
    const breadcrumbList = {
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": city.name, "item": toAbsoluteUrl(`/cities/${city.slug}`) },
            { "@type": "ListItem", "position": 3, "name": getCategoryName(categorySlug), "item": toAbsoluteUrl(`/cities/${city.slug}/${categorySlug}/`) },
            { "@type": "ListItem", "position": 4, "name": pageName, "item": pageUrl }
        ]
    };
    const collectionPage = {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `${pageName} in ${city.name}`,
        "description": leafSeo?.metaDescription,
        "dateModified": CONTENT_UPDATED_ISO,
        "mainEntity": { "@id": `${pageUrl}#business-list` },
        "author": {
            "@type": "Organization",
            "name": "TopRated NZ",
            "url": BASE_URL
        }
    };
    const graph = [collectionPage, itemList, breadcrumbList];
    const faqs = leafSeo?.faqs || [];

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

    const availableSubcategories = getAvailableSubcategories(city.slug, categorySlug, config.subCategories);
    const linkList = buildHubLinkList(city.slug, categorySlug, availableSubcategories, config.subCategoryDescriptions);

    if (!['services', 'trades'].includes(categorySlug)) {
        const titleByCategory = {
            automotive: `Best Automotive Businesses in ${city.name} | TopRated NZ`,
            cuisine: `Best Restaurants & Cafes in ${city.name} | TopRated NZ`,
            hospitality: `Best Hotels, Bars & Nightlife in ${city.name} | TopRated NZ`
        };
        const metaByCategory = {
            automotive: `Compare mechanics, car dealers, tyre shops, panel beaters, and car washes in ${city.name}. Browse focused local automotive guides.`,
            cuisine: `Compare restaurants and cafes in ${city.name} by dining style, occasion, location, and practical fit. Browse focused local food guides.`,
            hospitality: `Compare hotels, bars, and nightclubs in ${city.name}. Browse local accommodation and nightlife guides for your plans and budget.`
        };
        const localContext = leafContentProfiles.cities[city.slug]?.[config.cityContextType]
            || profile.marketLine;
        const categoryLabel = config.heroLabel.toLowerCase();

        return {
            pageTitle: titleByCategory[categorySlug],
            metaDescription: metaByCategory[categorySlug],
            heroTitle: `${config.heroLabel} <br><span class="text-primary">in ${city.name}</span>`,
            heroSubtitle: `${config.descriptionPrefix} in ${city.name}.`,
            introText: `This ${city.name} ${categoryLabel} hub connects ${availableSubcategories.length} focused comparison guides. ${config.intro} ${localContext}`,
            lastUpdated: CONTENT_UPDATED_LABEL,
            author: 'TopRated Editorial Team',
            sections: [
                {
                    id: `${categorySlug}-categories`,
                    title: `${config.browseLabel} in ${city.name}`,
                    icon: categorySlug === 'automotive' ? 'fa-car' : 'fa-map-location-dot',
                    content: `<p>Choose the closest category first. Each link opens a dedicated ${city.name} page with current directory listings, a direct comparison summary, decision criteria, and practical questions.</p>${linkList}`
                },
                {
                    id: 'how-to-compare',
                    title: `How to Compare ${config.heroLabel} Options`,
                    icon: 'fa-scale-balanced',
                    content: `<p>${config.compareIntro}</p><p>${config.comparisonPoints}</p><p>${config.caution}</p>`
                },
                {
                    id: 'local-context',
                    title: `What Matters in ${city.name}`,
                    icon: 'fa-location-dot',
                    content: `<p>${localContext}</p><p>Use the category pages to create a shortlist, then check the details that can change: current availability, location or coverage, pricing, opening hours, inclusions, and booking or service terms. The directory is a starting point for comparison, while the business remains the final source for time-sensitive details.</p>`
                }
            ],
            faqs: [
                {
                    question: `What does the ${city.name} ${categoryLabel} hub cover?`,
                    answer: `It links to ${availableSubcategories.length} focused local guides: ${availableSubcategories.map(formatSlugLabel).join(', ')}. Each guide is designed around a more specific customer decision than the broad hub page.`
                },
                {
                    question: `Where should I start comparing ${categoryLabel} options?`,
                    answer: `Start with the category that most closely matches what you need, then compare two or three plausible listings on the same criteria. Check current details directly before making a booking, purchase, or service decision.`
                },
                {
                    question: `Are the listings on this page current?`,
                    answer: `The hub and its category links were reviewed in ${CONTENT_UPDATED_LABEL}. Business availability, services, menus, stock, hours, pricing, and terms can change, so confirm time-sensitive details with the business.`
                },
                {
                    question: `How does TopRated organise these ${city.name} guides?`,
                    answer: `TopRated groups businesses by city and customer need, then links the broad hub to dedicated category pages. This makes it easier to move from exploration to a practical local shortlist.`
                }
            ]
        };
    }

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
                    answer: `This hub covers core service categories in ${city.name}, including accountants, advisers, lawyers, brokers, hypnotherapists, business loans, broadband providers, computer repairs, travel agencies, cleaning services, creative agencies, and real estate agents.`
                },
                {
                    question: `Which service category should I start with?`,
                    answer: `Start with the category closest to the actual decision you need to make. If the issue affects money, tax, legal risk, or property, go to the most specific leaf page rather than staying on the hub.`
                },
                {
                    question: `How does this hub make service research easier?`,
                    answer: `It groups the main ${city.name} service decisions in one place and links to focused local comparisons, so you can move from a broad need to a practical shortlist without searching unrelated categories.`
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
                question: `How does this hub make trade research easier?`,
                answer: `It groups the main ${city.name} trade categories and links to focused local comparisons, so you can start with the actual job and compare relevant businesses without searching unrelated categories.`
            },
            {
                question: `Should I choose the cheapest trade quote?`,
                answer: `Usually not without comparing scope and process quality. The cheapest quote often leaves out prep, coordination, or repair detail that later becomes the real cost.`
            }
        ]
    };
}

function generateLeafContent(titleLine, specificSeo = null, heroImg = '/img/city-heroes/auckland.jpg', linkContext = null, pageBusinesses = null) {
    // --- Build Table of Contents ---
    let tocItems = [];
    if (specificSeo) {
        if (specificSeo.introText) tocItems.push({ id: 'overview', label: 'Overview' });
        if (specificSeo.snapshot) tocItems.push({ id: 'quick-answer', label: 'Quick Answer' });
        if (specificSeo.buyersGuide) tocItems.push({ id: 'buyers-guide', label: specificSeo.buyersGuide.title || 'How to Choose' });
        if (specificSeo.comparisonGuide) tocItems.push({ id: 'comparison-guide', label: 'What to Compare' });
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

        // Direct answer and page-specific facts
        if (specificSeo.snapshot) {
            editorialContent += `
            <section class="seo-section seo-section--snapshot" id="quick-answer">
                <div class="container">
                    <h2><i class="fas fa-bolt"></i> ${specificSeo.snapshot.title}</h2>
                    <p class="seo-quick-answer"><strong>Quick answer:</strong> ${specificSeo.snapshot.answer}</p>
                    <div class="seo-price-table-wrap">
                        <table class="seo-price-table seo-fact-table">
                            <tbody>
                                ${specificSeo.snapshot.rows.map(row => `<tr><th scope="row">${row.label}</th><td>${row.value}</td></tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
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

        // Comparison criteria
        if (specificSeo.comparisonGuide) {
            editorialContent += `
            <section class="seo-section seo-section--comparison" id="comparison-guide">
                <div class="container">
                    <h2><i class="fas fa-scale-balanced"></i> ${specificSeo.comparisonGuide.title}</h2>
                    <p>${specificSeo.comparisonGuide.intro}</p>
                    <div class="seo-price-table-wrap">
                        <table class="seo-price-table">
                            <thead><tr><th>Comparison point</th><th>What to check</th></tr></thead>
                            <tbody>
                                ${specificSeo.comparisonGuide.rows.map(row => `<tr><td><strong>${row.name}</strong></td><td>${row.advice}</td></tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
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
                        <p>TopRated combines editorial research, public business information, and clearly labelled owner-supplied profiles. Featured placements are labelled. Business details can change, so verify current pricing, availability, qualifications, and terms directly before deciding. <a href="/about.html">Learn how TopRated works →</a></p>
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
        <div id="business-list" class="business-list"${Array.isArray(pageBusinesses) ? ` data-rendered="static" data-business-count="${pageBusinesses.length}"` : ''}>
            ${Array.isArray(pageBusinesses)
                ? pageBusinesses.map(renderBusinessCard).join('\n')
                : '<p class="loading">Loading top-rated businesses...</p>'}
        </div>
    </section>
    ${faqHtml}
    ${buildInternalLinkSection(linkContext)}
    <section class="container section">
        <div id="related"></div>
    </section>
    ${trustHtml}
    ${Array.isArray(pageBusinesses) ? '' : '<script id="schema" type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Nationwide businesses in New Zealand","itemListElement":[]}</script>'}
    `.replace(/^[ \t]+$/gm, '');
}

function generateHubContent(heroTitle, heroSubtitle, heroImg, hubSeo = null, linkContext = null) {
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
    ${buildInternalLinkSection(linkContext)}
    ${faqHtml}
    ${trustHtml}
    `.replace(/^[ \t]+$/gm, '');
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
    '/new-zealand',
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
        `/cities/${city.slug}`,
        generateHubContent(hubSeo.heroTitle, hubSeo.heroSubtitle, cityHeros[city.slug] || cityHeros['auckland'], hubSeo, { type: 'city', city }),
        buildHubSchema(hubSeo.pageTitle, hubSeo.metaDescription, hubSeo.faqs, `/cities/${city.slug}`)
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
            `/cities/${city.slug}/${cat}/`,
            generateHubContent(heroTitle, heroSubtitle, cityHeros[city.slug] || cityHeros['auckland'], hubSeo, { type: 'category', city, categorySlug: cat }),
            buildHubSchema(pageTitle, metaDescription, hubSeo?.faqs || [], `/cities/${city.slug}/${cat}/`)
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
    'air-conditioning': { cat: 'services', name: 'Air Conditioning' },
    'business-loans': { cat: 'services', name: 'Business Loans' },
    'broadband-providers': { cat: 'services', name: 'Broadband Providers' },
    'computer-repairs': { cat: 'services', name: 'Computer Repairs' },
    'creative-agencies': { cat: 'services', name: 'Creative Agencies' },
    'financial-advisers': { cat: 'services', name: 'Financial Advisers' },
    'fitness-equipment': { cat: 'services', name: 'Fitness Equipment' },
    'gyms': { cat: 'services', name: 'Gyms' },
    'hypnotherapists': { cat: 'services', name: 'Hypnotherapists' },
    'insurance-brokers': { cat: 'services', name: 'Insurance Brokers' },
    'kiwisaver-advisers': { cat: 'services', name: 'KiwiSaver Advisers' },
    'lawyers': { cat: 'services', name: 'Lawyers' },
    'mortgage-brokers': { cat: 'services', name: 'Mortgage Brokers' },
    'movers': { cat: 'services', name: 'Movers' },
    'real-estate-agents': { cat: 'services', name: 'Real Estate Agents' },
    'travel-agencies': { cat: 'services', name: 'Travel Agencies' },
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
            const pagePath = path.join(dir, `${sc}.html`);

            if (!hasLocalBusinesses(city.slug, sc, map.cat)) {
                if (fs.existsSync(pagePath)) fs.unlinkSync(pagePath);
                return;
            }

            const pageKey = `${city.slug}/${map.cat}/${sc}`;
            const pageBusinesses = getLeafBusinesses(city.slug, map.cat, sc);
            const specificSeo = resolveLeafSeo(city, map.cat, sc, map.name, pageBusinesses, seoContent[pageKey] || null);
            const pageTitle = getLeafPageTitle(city, map.name, specificSeo);
            const metaDescription = getLeafMetaDescription(city, map.name, specificSeo);

            const html = getBaseTemplate(
                pageTitle,
                metaDescription,
                `/cities/${city.slug}/${map.cat}/${sc}`,
                generateLeafContent(`${map.name} <br><span class="text-primary">in ${city.name}</span>`, specificSeo, cityHeros[city.slug] || cityHeros['auckland'], { type: 'leaf', city, categorySlug: map.cat, pageSlug: sc, pageName: map.name }, pageBusinesses),
                buildLeafSchema(city, map.cat, sc, map.name, pageBusinesses, specificSeo)
            );
            fs.writeFileSync(pagePath, html);
        });
    });
});

function updateHomepageStats() {
    const homepagePath = 'index.html';
    if (!fs.existsSync(homepagePath)) return;

    const guideCount = cities.reduce((total, city) => total + industries.reduce(
        (cityTotal, industry) => cityTotal + industry.subCategories.filter(subcategory => {
            const map = subCatsMapping[subcategory];
            return map && hasLocalBusinesses(city.slug, subcategory, map.cat);
        }).length,
        0
    ), 0);

    const stats = {
        guides: guideCount,
        businesses: businesses.length,
        cities: cities.length,
        categories: industries.length
    };

    let homepage = fs.readFileSync(homepagePath, 'utf8');
    for (const [name, value] of Object.entries(stats)) {
        const pattern = new RegExp(`(<div class="home-stat-card__value" data-home-stat="${name}">)\\d+(</div>)`);
        homepage = homepage.replace(pattern, `$1${value}$2`);
    }
    fs.writeFileSync(homepagePath, homepage);
}

updateHomepageStats();

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

