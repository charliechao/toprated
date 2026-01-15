const fs = require('fs');

// Load existing businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Find the highest existing ID
const maxId = Math.max(...businesses.map(b => b.id));

// New hotel listings to add
const newHotels = [
    // AUCKLAND HOTELS (3)
    {
        name: "Park Hyatt Auckland",
        industry: "Hotels",
        city: "Auckland",
        rating: 4.9,
        reviews: 1250,
        description: "Auckland's premier luxury waterfront hotel featuring stunning harbor views, world-class dining, and a rooftop pool. Located at the iconic Viaduct Harbour.",
        website: "https://www.hyatt.com/en-US/hotel/new-zealand/park-hyatt-auckland/aklph",
        address: "99 Halsey Street, Wynyard Quarter, Auckland 1010",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "The Hotel Britomart",
        industry: "Hotels",
        city: "Auckland",
        rating: 4.8,
        reviews: 890,
        description: "Boutique luxury in a heritage-listed building. Sustainability-focused design with locally curated interiors and Kingi restaurant serving the best of NZ produce.",
        website: "https://www.thehotelbritomart.com",
        address: "29 Galway Street, Britomart, Auckland 1010",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "Sofitel Auckland Viaduct Harbour",
        industry: "Hotels",
        city: "Auckland",
        rating: 4.7,
        reviews: 1580,
        description: "French elegance meets New Zealand hospitality. Waterfront luxury with marina views, signature spa treatments, and refined dining at Lava Dining.",
        website: "https://www.sofitel-auckland.com",
        address: "21 Viaduct Harbour Avenue, Auckland 1010",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },

    // WELLINGTON HOTELS (3)
    {
        name: "Sofitel Wellington",
        industry: "Hotels",
        city: "Wellington",
        rating: 4.9,
        reviews: 920,
        description: "French-inspired 5-star luxury in the heart of the capital. Designer rooms, garden oasis, and the acclaimed Hippopotamus Restaurant for fine dining.",
        website: "https://www.sofitel.com/wellington",
        address: "Roosevelt Road, Wellington 6011",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "InterContinental Wellington",
        industry: "Hotels",
        city: "Wellington",
        rating: 4.8,
        reviews: 1340,
        description: "Elegant sophistication steps from Lambton Quay. Premium bedding, club lounge access, indoor pool, spa, and award-winning dining experiences.",
        website: "https://www.ihg.com/intercontinental/hotels/wellington",
        address: "2 Grey Street, Wellington 6011",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "QT Wellington",
        industry: "Hotels",
        city: "Wellington",
        rating: 4.7,
        reviews: 780,
        description: "Bold, artistic boutique hotel with distinctive design and quirky interiors. Two eateries, a bustling bar, and unmistakable Wellington character.",
        website: "https://www.qthotels.com/wellington",
        address: "90 Cable Street, Te Aro, Wellington 6011",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },

    // CHRISTCHURCH HOTELS (3)
    {
        name: "The George",
        industry: "Hotels",
        city: "Christchurch",
        rating: 4.9,
        reviews: 1120,
        description: "Prestigious 5-star boutique hotel with a legendary 1:1 staff-to-guest ratio. Overlooking Hagley Park with award-winning 50 Bistro and Pescatore restaurants.",
        website: "https://www.thegeorge.com",
        address: "50 Park Terrace, Christchurch 8013",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "The Observatory Hotel",
        industry: "Hotels",
        city: "Christchurch",
        rating: 4.8,
        reviews: 650,
        description: "Historic grandeur meets modern luxury in this palatial heritage building. Antique-furnished rooms, buffet breakfast, and central city convenience.",
        website: "https://www.theobservatory.nz",
        address: "21 Rolleston Avenue, Christchurch 8013",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "Sudima Christchurch City",
        industry: "Hotels",
        city: "Christchurch",
        rating: 4.7,
        reviews: 890,
        description: "Five-star inner-city luxury with modern rooms and exceptional service. Conveniently located near Victoria Street's vibrant dining and shopping scene.",
        website: "https://www.sudimahotels.com/christchurch-city",
        address: "369 Montreal Street, Christchurch 8013",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },

    // HAMILTON HOTELS (3)
    {
        name: "Novotel Tainui Hamilton",
        industry: "Hotels",
        city: "Hamilton",
        rating: 4.7,
        reviews: 760,
        description: "Premium riverside hotel with sleek, spacious rooms and stunning Waikato River views. Acclaimed buffet breakfast and modern fitness facilities.",
        website: "https://www.novotel.com/hamilton",
        address: "7 Alma Street, Hamilton 3204",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "Distinction Hamilton Hotel",
        industry: "Hotels",
        city: "Hamilton",
        rating: 4.6,
        reviews: 520,
        description: "Four-star accommodation with well-equipped gym and conference facilities. Popular choice for business travelers and events in the Waikato region.",
        website: "https://www.distinctionhotels.co.nz/hamilton",
        address: "100 Garnett Avenue, Hamilton 3204",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "The Narrows Landing",
        industry: "Hotels",
        city: "Hamilton",
        rating: 4.8,
        reviews: 340,
        description: "Charming boutique B&B with quirky stained glass features, in-room spa baths, and gourmet continental breakfasts. Perfect for romantic getaways and weddings.",
        website: "https://www.narrowslanding.co.nz",
        address: "431 Airport Road, Hamilton 3281",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },

    // TAURANGA HOTELS (3)
    {
        name: "Trinity Wharf Tauranga",
        industry: "Hotels",
        city: "Tauranga",
        rating: 4.8,
        reviews: 980,
        description: "Upscale waterfront hotel with panoramic harbor views. Range of rooms and apartments, excellent conference facilities, and prime location for exploring the Bay.",
        website: "https://www.trinitywharf.co.nz",
        address: "51 Dive Crescent, Tauranga 3110",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "Hotel on Devonport",
        industry: "Hotels",
        city: "Tauranga",
        rating: 4.7,
        reviews: 650,
        description: "Stylish central Tauranga hotel with modern rooms and excellent views. Popular choice for both business and leisure travelers in the Bay of Plenty.",
        website: "https://www.hoteldevonport.co.nz",
        address: "72 Devonport Road, Tauranga 3110",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    },
    {
        name: "Oceanside Resort & Twin Towers",
        industry: "Hotels",
        city: "Tauranga",
        rating: 4.8,
        reviews: 1240,
        description: "Mount Maunganui beachfront resort with two swimming pools. Steps from Mauao and the famous beach, offering apartments with stunning ocean views.",
        website: "https://www.oceansideresort.co.nz",
        address: "1 Maunganui Road, Mount Maunganui 3116",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "hospitality",
        pageSlug: "hotels"
    }
];

// Add IDs to new hotels
let nextId = maxId + 1;
const hotelsWithIds = newHotels.map(hotel => ({
    id: nextId++,
    ...hotel
}));

// Append to existing businesses
const updatedBusinesses = [...businesses, ...hotelsWithIds];

// Write back to file
fs.writeFileSync('data/businesses.json', JSON.stringify(updatedBusinesses, null, 2));

console.log(`✅ Added ${hotelsWithIds.length} new hotel listings`);
console.log(`   Total businesses now: ${updatedBusinesses.length}`);
console.log(`   Hotels per city:`);
['auckland', 'wellington', 'christchurch', 'hamilton', 'tauranga'].forEach(city => {
    const count = hotelsWithIds.filter(h => h.citySlug === city).length;
    console.log(`     ${city}: ${count}`);
});
