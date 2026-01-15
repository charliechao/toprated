const fs = require('fs');

// Load existing businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Find the highest existing ID
const maxId = Math.max(...businesses.map(b => b.id));

// New restaurant listings to add
const newRestaurants = [
    // AUCKLAND RESTAURANTS (3)
    {
        name: "Ahi",
        industry: "Restaurants",
        city: "Auckland",
        rating: 4.9,
        reviews: 1850,
        description: "Award-winning 3-Hat restaurant celebrating New Zealand cuisine. Chef Ben Bayly's innovative menu features organic, locally-sourced ingredients with iconic dishes like the Scampi Corn Dog.",
        website: "https://www.ahirestaurant.co.nz",
        address: "51 Customs Street East, Auckland CBD",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "The Grove",
        industry: "Restaurants",
        city: "Auckland",
        rating: 4.8,
        reviews: 1420,
        description: "Exquisite modern New Zealand fine dining in a relaxed yet sophisticated atmosphere. Winner of multiple Metro Restaurant of the Year awards.",
        website: "https://www.thegroverestaurant.co.nz",
        address: "St Patrick's Square, Wyndham Street, Auckland CBD",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Cassia",
        industry: "Restaurants",
        city: "Auckland",
        rating: 4.8,
        reviews: 1680,
        description: "Modern Indian fine dining with an exciting twist on traditional dishes. Plush interiors and a mouth-watering menu featuring signature roasted carrot with vindaloo.",
        website: "https://www.cassiarestaurant.co.nz",
        address: "5 Fort Lane, Auckland CBD",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },

    // WELLINGTON RESTAURANTS (3)
    {
        name: "Logan Brown",
        industry: "Restaurants",
        city: "Wellington",
        rating: 4.9,
        reviews: 2100,
        description: "Wellington icon since 1996, renowned for precision fine dining and the legendary pāua ravioli. Set in a stunning heritage building with impeccable service.",
        website: "https://www.loganbrown.co.nz",
        address: "192 Cuba Street, Te Aro, Wellington",
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Hippopotamus",
        industry: "Restaurants",
        city: "Wellington",
        rating: 4.8,
        reviews: 1350,
        description: "Luxurious French fine dining at Sofitel Wellington. Classic techniques with a modern NZ twist, stunning city views, and Two Hat recognition from Cuisine Magazine.",
        website: "https://www.hippopotamus.co.nz",
        address: "Roosevelt Road, Sofitel Wellington",
        image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Graze",
        industry: "Restaurants",
        city: "Wellington",
        rating: 4.7,
        reviews: 980,
        description: "Outstanding Restaurant at Welly Hospo Awards 2024. Lively Kelburn spot serving produce-led small plates with sustainability at its core.",
        website: "https://www.grazewellington.co.nz",
        address: "87 Upland Road, Kelburn, Wellington",
        image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },

    // CHRISTCHURCH RESTAURANTS (3)
    {
        name: "Inati",
        industry: "Restaurants",
        city: "Christchurch",
        rating: 4.9,
        reviews: 890,
        description: "Canterbury's Outstanding Restaurant winner. Intimate chef's table experience with personalized tasting plates featuring premium Canterbury-sourced ingredients.",
        website: "https://www.inati.co.nz",
        address: "29 Cathedral Square, Christchurch Central",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Twenty Seven Steps",
        industry: "Restaurants",
        city: "Christchurch",
        rating: 4.8,
        reviews: 1120,
        description: "Elegant European fare in a heritage terrace setting. Bold, seasonal flavors reflecting Canterbury's micro-seasons with an intimate, romantic atmosphere.",
        website: "https://www.twentysevensteps.co.nz",
        address: "16 New Regent Street, Christchurch",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Bessie",
        industry: "Restaurants",
        city: "Christchurch",
        rating: 4.7,
        reviews: 760,
        description: "Sophisticated steakhouse specializing in high-quality dry-aged meats cooked in a charcoal oven. Open kitchen concept with a focus on exceptional cuts.",
        website: "https://www.bessie.co.nz",
        address: "162 Armagh Street, Christchurch Central",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },

    // HAMILTON RESTAURANTS (3)
    {
        name: "Palate Restaurant",
        industry: "Restaurants",
        city: "Hamilton",
        rating: 4.8,
        reviews: 680,
        description: "Award-winning modern New Zealand cuisine at SkyCity Hamilton. Custom-built open-fire grill, locally sourced seasonal produce, and an extensive wine list.",
        website: "https://www.palaterestaurant.co.nz",
        address: "346 Victoria Street, SkyCity Hamilton",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Chim Choo Ree",
        industry: "Restaurants",
        city: "Hamilton",
        rating: 4.7,
        reviews: 520,
        description: "Award-winning innovative cuisine with impeccable service. Classy indoor and outdoor seating, featuring a celebrated six-course tasting menu.",
        website: "https://www.chimchooree.co.nz",
        address: "14 Bridge Street, Hamilton CBD",
        image: "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Gothenburg",
        industry: "Restaurants",
        city: "Hamilton",
        rating: 4.6,
        reviews: 890,
        description: "Global tapas with panoramic Waikato River views. Light-filled space showcasing the best of the Waikato region with options for al fresco dining.",
        website: "https://www.gothenburg.co.nz",
        address: "15 Grantham Street, Hamilton CBD",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },

    // TAURANGA RESTAURANTS (3)
    {
        name: "Harbourside",
        industry: "Restaurants",
        city: "Tauranga",
        rating: 4.8,
        reviews: 1240,
        description: "Stunning waterfront fine dining on The Strand. Focus on fresh seafood and local produce with panoramic harbour views. Perfect for special occasions.",
        website: "https://www.harboursidetauranga.co.nz",
        address: "150 The Strand, Tauranga",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Fife Lane",
        industry: "Restaurants",
        city: "Tauranga",
        rating: 4.9,
        reviews: 920,
        description: "Sophisticated Mount Maunganui gem named among World's 101 Best Steak Restaurants 2023. Modern NZ cuisine with chic ambiance and legendary Beef Wellington.",
        website: "https://www.fifelane.co.nz",
        address: "89 Maunganui Road, Mount Maunganui",
        image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    },
    {
        name: "Izakai Bar & Eatery",
        industry: "Restaurants",
        city: "Tauranga",
        rating: 4.7,
        reviews: 650,
        description: "Innovative fusion of Māori and Japanese cuisine. Unique share plates including Creamed Paua Dumplings and Hāngī-style Pork Belly Ramen.",
        website: "https://www.izakai.co.nz",
        address: "Bayfair Shopping Centre, Mount Maunganui",
        image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "cuisine",
        pageSlug: "restaurants"
    }
];

// Add IDs to new restaurants
let nextId = maxId + 1;
const restaurantsWithIds = newRestaurants.map(restaurant => ({
    id: nextId++,
    ...restaurant
}));

// Append to existing businesses
const updatedBusinesses = [...businesses, ...restaurantsWithIds];

// Write back to file
fs.writeFileSync('data/businesses.json', JSON.stringify(updatedBusinesses, null, 2));

console.log(`✅ Added ${restaurantsWithIds.length} new restaurant listings`);
console.log(`   Total businesses now: ${updatedBusinesses.length}`);
console.log(`   Restaurants per city:`);
['auckland', 'wellington', 'christchurch', 'hamilton', 'tauranga'].forEach(city => {
    const count = restaurantsWithIds.filter(r => r.citySlug === city).length;
    console.log(`     ${city}: ${count}`);
});
