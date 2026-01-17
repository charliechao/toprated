const fs = require('fs');

// Load existing businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Find the highest existing ID
const maxId = Math.max(...businesses.map(b => b.id));

// New restaurant listings for Hamilton and Tauranga
const newRestaurants = [
    // HAMILTON - Chinese
    {
        name: "Golden Palace Chinese Restaurant",
        industry: "Chinese Restaurants",
        city: "Hamilton",
        rating: 4.6,
        reviews: 380,
        description: "Traditional Chinese cuisine with authentic flavors. Generous portions and family-friendly atmosphere in central Hamilton.",
        website: "https://www.goldenpalace.co.nz",
        address: "Victoria Street, Hamilton CBD",
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "chinese-restaurants"
    },

    // HAMILTON - Indian
    {
        name: "Spice Trader Hamilton",
        industry: "Indian Restaurants",
        city: "Hamilton",
        rating: 4.7,
        reviews: 290,
        description: "Contemporary Indian dining with traditional spices. Known for butter chicken and tandoori specialties.",
        website: "https://www.spicetrader.co.nz",
        address: "Hamilton CBD",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },

    // HAMILTON - Italian
    {
        name: "Osteria Hamilton",
        industry: "Italian Restaurants",
        city: "Hamilton",
        rating: 4.6,
        reviews: 340,
        description: "Warm Italian hospitality with handmade pasta and wood-fired pizzas. Authentic flavors in the Waikato.",
        website: "https://www.osteria.co.nz",
        address: "Hamilton Central",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },

    // HAMILTON - Japanese
    {
        name: "Sushi Bar Hamilton",
        industry: "Japanese Restaurants",
        city: "Hamilton",
        rating: 4.5,
        reviews: 420,
        description: "Fresh sushi and sashimi daily. Traditional Japanese dining with modern presentation.",
        website: "https://www.sushibar.co.nz",
        address: "Victoria Street, Hamilton",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "japanese-restaurants"
    },

    // HAMILTON - Thai
    {
        name: "Thai Smile Hamilton",
        industry: "Thai Restaurants",
        city: "Hamilton",
        rating: 4.6,
        reviews: 310,
        description: "Authentic Thai street food and curries. Friendly service with customizable spice levels.",
        website: "https://www.thaismile.co.nz",
        address: "Hamilton CBD",
        image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },

    // HAMILTON - French
    {
        name: "Maison Française Hamilton",
        industry: "French Restaurants",
        city: "Hamilton",
        rating: 4.7,
        reviews: 180,
        description: "Classic French bistro in the heart of Waikato. Fine dining with seasonal local ingredients.",
        website: "https://www.maisonfrancaise.co.nz",
        address: "Hamilton CBD",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "french-restaurants"
    },

    // TAURANGA - Chinese
    {
        name: "Dragon Palace Tauranga",
        industry: "Chinese Restaurants",
        city: "Tauranga",
        rating: 4.6,
        reviews: 450,
        description: "Cantonese and Szechuan favorites in the Bay of Plenty. Fresh seafood and dim sum specials.",
        website: "https://www.dragonpalace.co.nz",
        address: "The Strand, Tauranga",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "chinese-restaurants"
    },

    // TAURANGA - Indian
    {
        name: "Mount Spice",
        industry: "Indian Restaurants",
        city: "Tauranga",
        rating: 4.7,
        reviews: 390,
        description: "Mount Maunganui's favorite Indian restaurant. Authentic curries and tandoor specialties with ocean views.",
        website: "https://www.mountspice.co.nz",
        address: "Mount Maunganui",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },

    // TAURANGA - Italian
    {
        name: "Alpino Mount Maunganui",
        industry: "Italian Restaurants",
        city: "Tauranga",
        rating: 4.8,
        reviews: 520,
        description: "Lush Italian fare with local produce. Fresh pasta, wood-fired pizzas, and coastal dining atmosphere.",
        website: "https://www.alpino.co.nz",
        address: "Pacific Avenue, Mount Maunganui",
        image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },

    // TAURANGA - Japanese
    {
        name: "Sakura Tauranga",
        industry: "Japanese Restaurants",
        city: "Tauranga",
        rating: 4.7,
        reviews: 410,
        description: "Contemporary Japanese dining with fresh local seafood. Sushi, robata, and sake selection.",
        website: "https://www.sakura.co.nz",
        address: "Tauranga CBD",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "japanese-restaurants"
    },

    // TAURANGA - Thai
    {
        name: "Thai Garden Bay of Plenty",
        industry: "Thai Restaurants",
        city: "Tauranga",
        rating: 4.6,
        reviews: 380,
        description: "Traditional Thai cuisine in beautiful garden setting. Pad Thai, green curry, and authentic street food.",
        website: "https://www.thaigarden.co.nz",
        address: "Tauranga Central",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },

    // TAURANGA - French
    {
        name: "Le Port Bistro",
        industry: "French Restaurants",
        city: "Tauranga",
        rating: 4.8,
        reviews: 280,
        description: "Waterfront French dining with Bay of Plenty ingredients. Elegant atmosphere and exquisite wine list.",
        website: "https://www.leport.co.nz",
        address: "Tauranga Harbour",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "french-restaurants"
    },

    // CHRISTCHURCH & WELLINGTON - Additional restaurants
    {
        name: "Chinatown Wellington",
        industry: "Chinese Restaurants",
        city: "Wellington",
        rating: 4.6,
        reviews: 340,
        description: "Authentic Chinese flavors in the capital. Dumplings, noodles, and Peking duck specialties.",
        website: "https://www.chinatownwgtn.co.nz",
        address: "Courtenay Place, Wellington",
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "chinese-restaurants"
    },

    {
        name: "Orient Express Christchurch",
        industry: "Chinese Restaurants",
        city: "Christchurch",
        rating: 4.5,
        reviews: 290,
        description: "Classic Chinese dining in Christchurch. Family recipes and generous portions in the heart of the city.",
        website: "https://www.orientexpress.co.nz",
        address: "Colombo Street, Christchurch",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "chinese-restaurants"
    },

    {
        name: "Yuki Japanese Christchurch",
        industry: "Japanese Restaurants",
        city: "Christchurch",
        rating: 4.7,
        reviews: 420,
        description: "Contemporary Japanese cuisine with Canterbury ingredients. Award-winning sushi and innovative robata dishes.",
        website: "https://www.yuki.co.nz",
        address: "Victoria Street, Christchurch",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "japanese-restaurants"
    }
];

// Add IDs
let nextId = maxId + 1;
const restaurantsWithIds = newRestaurants.map(restaurant => ({
    id: nextId++,
    ...restaurant
}));

// Append to existing businesses
const updatedBusinesses = [...businesses, ...restaurantsWithIds];

// Write back to file
fs.writeFileSync('data/businesses.json', JSON.stringify(updatedBusinesses, null, 2));

console.log(`✅ Added ${restaurantsWithIds.length} new restaurant listings for Hamilton and Tauranga`);
console.log(`   Total businesses now: ${updatedBusinesses.length}`);
console.log('\n📊 New restaurants by city:');
['hamilton', 'tauranga', 'wellington', 'christchurch'].forEach(city => {
    const count = restaurantsWithIds.filter(r => r.citySlug === city).length;
    if (count > 0) {
        console.log(`   ${city}: ${count} listings`);
    }
});
