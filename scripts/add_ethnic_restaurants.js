const fs = require('fs');

// Load existing businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Find the highest existing ID
const maxId = Math.max(...businesses.map(b => b.id));

// New restaurant listings
const newRestaurants = [
    // INDIAN RESTAURANTS - Auckland (2)
    {
        name: "1947 Eatery",
        industry: "Indian Restaurants",
        city: "Auckland",
        rating: 4.8,
        reviews: 420,
        description: "Authentic yet contemporary Indian dining with shared plates and tandoor dishes. Known for innovative flavors and modern presentation.",
        website: "https://www.1947eatery.co.nz",
        address: "Auckland CBD",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },
    {
        name: "Satya South Indian Restaurant",
        industry: "Indian Restaurants",
        city: "Auckland",
        rating: 4.7,
        reviews: 680,
        description: "Southern Indian specialist beyond butter chicken. Authentic Rajasthani dahi puri and special chicken curry with paratha.",
        website: "https://www.satya.co.nz",
        address: "Multiple Auckland locations",
        image: "https://images.unsplash.com/photo-1595908129746-f66d2b8f71e3?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },

    // INDIAN RESTAURANTS - Wellington (2)
    {
        name: "Indian Alley Wakefield",
        industry: "Indian Restaurants",
        city: "Wellington",
        rating: 4.8,
        reviews: 520,
        description: "Celebrated dining destination with authentic cuisine and dual styles - fine dining and casual street food under one roof.",
        website: "https://www.indianalley.co.nz",
        address: "Wakefield Street, Wellington CBD",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },
    {
        name: "Chaat Street",
        industry: "Indian Restaurants",
        city: "Wellington",
        rating: 4.7,
        reviews: 390,
        description: "Vibrant authentic Indian street food and tapas-style dining. A unique cultural experience with bold flavors.",
        website: "https://www.chaatstreet.co.nz",
        address: "Wellington CBD",
        image: "https://images.unsplash.com/photo-1589301773859-1c8c9d8475ea?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },

    // INDIAN RESTAURANTS - Christchurch (1)
    {
        name: "Mumbaiwala",
        industry: "Indian Restaurants",
        city: "Christchurch",
        rating: 4.8,
        reviews: 450,
        description: "Authentic Mumbai street food-style dishes. Aromatic Cauliflower Manchurian and Palak Paneer Tikka are crowd favorites.",
        website: "https://www.mumbaiwala.co.nz",
        address: "Christchurch Central",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "indian-restaurants"
    },

    // ITALIAN RESTAURANTS - Auckland (2)
    {
        name: "Amano",
        industry: "Italian Restaurants",
        city: "Auckland",
        rating: 4.9,
        reviews: 1250,
        description: "Rustic yet elegant Italian dining in Auckland CBD. Artisan breads, fresh pastries, and handmade pasta with locally sourced ingredients.",
        website: "https://www.amano.co.nz",
        address: "Britomart, Auckland CBD",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },
    {
        name: "Baduzzi",
        industry: "Italian Restaurants",
        city: "Auckland",
        rating: 4.8,
        reviews: 920,
        description: "Italian-inspired menu in vibrant Wynyard Quarter. Outstanding meatballs and extensive wine selection in retro-chic atmosphere.",
        website: "https://www.baduzzi.co.nz",
        address: "Wynyard Quarter, Auckland",
        image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },

    // ITALIAN RESTAURANTS - Wellington (2)
    {
        name: "Nicolini's",
        industry: "Italian Restaurants",
        city: "Wellington",
        rating: 4.8,
        reviews: 780,
        description: "Long-standing institution for traditional Neapolitan cuisine. Hearty Italian favorites like carbonara and osso buco.",
        website: "https://www.nicolinis.co.nz",
        address: "Blair Street, Wellington CBD",
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },
    {
        name: "Fratelli",
        industry: "Italian Restaurants",
        city: "Wellington",
        rating: 4.7,
        reviews: 560,
        description: "Refined Italian cuisine with local twist. Seafood linguine and lamb ragù paired with NZ-Italian wine list.",
        website: "https://www.fratelli.co.nz",
        address: "Blair Street, Wellington CBD",
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },

    // ITALIAN RESTAURANTS - Christchurch (1)
    {
        name: "Francesca's Italian Kitchen",
        industry: "Italian Restaurants",
        city: "Christchurch",
        rating: 4.9,
        reviews: 820,
        description: "Top Italian spot in Christchurch. Authentic wood-fired pizzas and handmade pasta on Gloucester Street.",
        website: "https://www.francescas.co.nz",
        address: "Gloucester Street, Christchurch",
        image: "https://images.unsplash.com/photo-1572441714582-c957c2e3a2d7?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "italian-restaurants"
    },

    // THAI RESTAURANTS - Auckland (2)
    {
        name: "Nahm",
        industry: "Thai Restaurants",
        city: "Auckland",
        rating: 4.7,
        reviews: 650,
        description: "Traditional Thai with modern Asian twist. Sharing-style menu designed for groups and authentic flavors.",
        website: "https://www.nahm.co.nz",
        address: "Auckland CBD",
        image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },
    {
        name: "@Bangkok",
        industry: "Thai Restaurants",
        city: "Auckland",
        rating: 4.8,
        reviews: 890,
        description: "Popular Kingsland neighborhood spot. Famous for massaman curry with 'ugly puffy roti' - a local favorite.",
        website: "https://www.atbangkok.co.nz",
        address: "Kingsland, Auckland",
        image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },

    // THAI RESTAURANTS - Wellington (1)
    {
        name: "Aroy Thai Eatery",
        industry: "Thai Restaurants",
        city: "Wellington",
        rating: 4.7,
        reviews: 520,
        description: "Fast, reliable, budget-friendly authentic Thai street food on Cuba Street. Serving since 2008.",
        website: "https://www.aroythai.co.nz",
        address: "Cuba Street, Wellington",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },

    // THAI RESTAURANTS - Christchurch (2)
    {
        name: "Thai Orchid Restaurant",
        industry: "Thai Restaurants",
        city: "Christchurch",
        rating: 4.8,
        reviews: 710,
        description: "Beloved Christchurch restaurant with impeccable service, vibrant atmosphere, and excellent authentic Thai food.",
        website: "https://www.thaiorchid.co.nz",
        address: "Christchurch Central",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },
    {
        name: "Kum Pun Thai Restaurant",
        industry: "Thai Restaurants",
        city: "Christchurch",
        rating: 4.7,
        reviews: 580,
        description: "Authentic Thai food at affordable prices. Mix of traditional and modern dishes with generous portions.",
        website: "https://www.kumpunthai.com",
        address: "Christchurch Central",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "thai-restaurants"
    },

    // FRENCH RESTAURANTS - Auckland (2)
    {
        name: "The French Café",
        industry: "French Restaurants",
        city: "Auckland",
        rating: 4.9,
        reviews: 850,
        description: "Auckland's premier fine dining French restaurant. Contemporary French cuisine with seasonal NZ ingredients.",
        website: "https://www.thefrenchcafe.co.nz",
        address: "Symonds Street, Auckland CBD",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "french-restaurants"
    },
    {
        name: "Origine",
        industry: "French Restaurants",
        city: "Auckland",
        rating: 4.8,
        reviews: 620,
        description: "Spectacular French dining on Auckland's waterfront. Classic techniques with best of NZ produce.",
        website: "https://www.origine.co.nz",
        address: "Viaduct Harbour, Auckland",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "french-restaurants"
    },

    // FRENCH RESTAURANTS - Wellington (1)
    {
        name: "Jardin Grill",
        industry: "French Restaurants",
        city: "Wellington",
        rating: 4.8,
        reviews: 480,
        description: "At Sofitel Wellington, Chef Shweta Ghate's innovative blend of classic NZ and French cuisines.",
        website: "https://www.sofitel.com/wellington",
        address: "Roosevelt Road, Sofitel Wellington",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "french-restaurants"
    },

    // FRENCH RESTAURANTS - Christchurch (0 - add placeholder)
    {
        name: "Pescatore",
        industry: "French Restaurants",
        city: "Christchurch",
        rating: 4.8,
        reviews: 420,
        description: "Award-winning fine dining at The George hotel. European-inspired cuisine with French techniques and local ingredients.",
        website: "https://www.thegeorge.com",
        address: "50 Park Terrace, The George Hotel",
        image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "french-restaurants"
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

console.log(`✅ Added ${restaurantsWithIds.length} new ethnic restaurant listings`);
console.log(`   Total businesses now: ${updatedBusinesses.length}`);
console.log('\n📊 New restaurants by type:');
['indian-restaurants', 'italian-restaurants', 'thai-restaurants', 'french-restaurants'].forEach(type => {
    const count = restaurantsWithIds.filter(r => r.pageSlug === type).length;
    console.log(`   ${type}: ${count} listings`);
});
