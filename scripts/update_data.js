const fs = require('fs');
const path = require('path');

// ---------------------------------------------------
// 1. Update cities.json
// ---------------------------------------------------
const citiesPath = path.resolve('data/cities.json');
let cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

const newCities = [
    { name: "Hamilton", slug: "hamilton", region: "Waikato" },
    { name: "Tauranga", slug: "tauranga", region: "Bay of Plenty" }
];

newCities.forEach(nc => {
    if (!cities.find(c => c.slug === nc.slug)) {
        cities.push(nc);
    }
});

fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2));
console.log('✅ Updated cities.json');

// ---------------------------------------------------
// 2. Update businesses.json with Cafes and Slugs
// ---------------------------------------------------
const businessesPath = path.resolve('data/businesses.json');
let businesses = JSON.parse(fs.readFileSync(businessesPath, 'utf8'));

// Helper to get slugs
function getSlugs(industry) {
    const ind = industry.toLowerCase();
    if (ind.includes('restaurant') || ind.includes('cafe')) {
        return {
            categorySlug: 'cuisine',
            pageSlug: ind.includes('chinese') ? 'chinese-restaurants' :
                ind.includes('japanese') ? 'japanese-restaurants' : 'cafes'
        };
    }
    if (ind.includes('plumber') || ind.includes('electrician') || ind.includes('builder')) {
        return {
            categorySlug: 'trades',
            pageSlug: ind.includes('plumber') ? 'plumbers' :
                ind.includes('electrician') ? 'electricians' : 'builders'
        };
    }
    return { categorySlug: 'other', pageSlug: ind.replace(/\s+/g, '-') };
}

// Add slugs to existing businesses
businesses = businesses.map(b => {
    const { categorySlug, pageSlug } = getSlugs(b.industry);
    return {
        ...b,
        citySlug: b.city.toLowerCase(),
        categorySlug,
        pageSlug
    };
});

// New Cafe Data
const cafeData = [
    // Auckland
    { name: "Remedy Coffee", city: "Auckland", rating: 4.8, reviews: 450, desc: "Meticulous brewing and innovative pour-over methods in the CBD.", web: "https://remedycoffee.co.nz", addr: "1 Wellesley St W, Auckland CBD" },
    { name: "Allpress Espresso", city: "Auckland", rating: 4.7, reviews: 890, desc: "A New Zealand institution known for full-bodied and balanced espresso.", web: "https://allpressespresso.com", addr: "8 Drake St, Freemans Bay, Auckland" },
    { name: "Chuffed", city: "Auckland", rating: 4.8, reviews: 520, desc: "A hidden oasis courtyard in the CBD with a relaxed atmosphere and great coffee.", web: "https://chuffedcoffee.com", addr: "43 High St, Auckland CBD" },
    // Wellington
    { name: "Customs by Coffee Supreme", city: "Wellington", rating: 4.9, reviews: 610, desc: "Flagship joint known for its signature chili cheese melt and expertly roasted coffee.", web: "https://coffeesupreme.com", addr: "39 Ghuznee St, Te Aro, Wellington" },
    { name: "Flight Coffee Hangar", city: "Wellington", rating: 4.8, reviews: 750, desc: "Dedicated specialty coffee menu with tasting flights and incredible brunch.", web: "https://flightcoffee.co.nz", addr: "119 Dixon St, Te Aro, Wellington" },
    { name: "Prefab", city: "Wellington", rating: 4.7, reviews: 1200, desc: "Modern minimalist design and consistent quality, a Wellington favorite for brunch.", web: "https://pre-fab.co.nz", addr: "14 Jessie St, Te Aro, Wellington" },
    // Christchurch
    { name: "Addington Coffee Co-op", city: "Christchurch", rating: 4.8, reviews: 920, desc: "Ethical roasts and community focus in a vibrant, converted workshop setting.", web: "https://addingtoncoffee.org.nz", addr: "297 Lincoln Rd, Addington, Christchurch" },
    { name: "Unknown Chapter", city: "Christchurch", rating: 4.8, reviews: 850, desc: "Craft roasting and seasonal beans in a light-filled industrial space.", web: "https://unknownchapter.nz", addr: "254 St Asaph St, Christchurch Central" },
    { name: "C1 Espresso", city: "Christchurch", rating: 4.7, reviews: 1540, desc: "Iconic Christchurch cafe known for its vacuum tube food delivery and quirky vibe.", web: "https://c1espresso.co.nz", addr: "150 High St, Christchurch Central" },
    // Hamilton
    { name: "The River Kitchen", city: "Hamilton", rating: 4.7, reviews: 430, desc: "Centrally located CBD favorite known for delicious food and consistent coffee.", web: "https://theriverkitchen.co.nz", addr: "217 Victoria St, Hamilton Central" },
    { name: "Grey Roasting Co.", city: "Hamilton", rating: 4.9, reviews: 210, desc: "Expertly roasted coffee and a focus on the craft of the perfect cup.", web: "https://greyroastingco.com", addr: "Hamilton Central" },
    { name: "Synonym", city: "Hamilton", rating: 4.8, reviews: 180, desc: "Cozy atmosphere with great espresso and a unique selection of books.", web: "https://synonym.nz", addr: "Hamilton East" },
    // Tauranga
    { name: "Mt Zion Coffee", city: "Tauranga", rating: 4.9, reviews: 320, desc: "Exceptional hospitality and coffee in the heart of the Mount.", web: "https://mtzion.co.nz", addr: "Mount Maunganui" },
    { name: "Excelso Coffee", city: "Tauranga", rating: 4.8, reviews: 280, desc: "An original Tauranga roastery with a fantastic reputation for quality.", web: "https://excelso.co.nz", addr: "112 Third Ave, Tauranga" },
    { name: "Love Rosie", city: "Tauranga", rating: 4.7, reviews: 410, desc: "Famous for its home-style baking and friendly neighborhood atmosphere.", web: "https://loverosie.co.nz", addr: "252 Ninth Ave, Tauranga Central" }
];

let nextId = Math.max(...businesses.map(b => b.id)) + 1;

cafeData.forEach(c => {
    const { categorySlug, pageSlug } = getSlugs("Cafes");
    businesses.push({
        id: nextId++,
        name: c.name,
        industry: "Cafes",
        city: c.city,
        citySlug: c.city.toLowerCase(),
        categorySlug,
        pageSlug,
        rating: c.rating,
        reviews: c.reviews,
        description: c.desc,
        website: c.web,
        address: c.addr,
        image: `https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80` // Placeholder cafe image
    });
});

fs.writeFileSync(businessesPath, JSON.stringify(businesses, null, 2));
console.log('✅ Updated businesses.json with Cafes and Slugs');
