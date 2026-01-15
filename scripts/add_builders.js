const fs = require('fs');

// Load existing businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Find the highest existing ID
const maxId = Math.max(...businesses.map(b => b.id));

// New builder listings to add
const newBuilders = [
    // AUCKLAND BUILDERS (3)
    {
        name: "Glover Homes",
        industry: "Builders",
        city: "Auckland",
        rating: 4.9,
        reviews: 320,
        description: "Supreme House of the Year winner 2024. Exemplary attention to detail with seamless landscape integration. Specialists in luxury homes over $4 million.",
        website: "https://www.gloverhomes.co.nz",
        address: "Coatesville, Auckland",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Bakers Builds",
        industry: "Builders",
        city: "Auckland",
        rating: 4.9,
        reviews: 78,
        description: "Luxury home builder with 70+ 5-star Google ratings. Specialising in high-end residential construction with exceptional craftsmanship and client communication.",
        website: "https://www.bakersbuilds.nz",
        address: "North Shore, Auckland",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Best Nest Building Company",
        industry: "Builders",
        city: "Auckland",
        rating: 4.8,
        reviews: 145,
        description: "Professional new builds and modern renovations with expert advice. Known for quality craftsmanship and positive client testimonials.",
        website: "https://www.bestnestbuilding.co.nz",
        address: "Central Auckland",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        citySlug: "auckland",
        categorySlug: "trades",
        pageSlug: "builders"
    },

    // WELLINGTON BUILDERS (3)
    {
        name: "Tom Wilson Builders",
        industry: "Builders",
        city: "Wellington",
        rating: 4.9,
        reviews: 210,
        description: "Gold & Bronze Award winner 2024 House of the Year. Bespoke residential projects, new builds, renovations and restorations with end-to-end project management.",
        website: "https://www.tomwbuilders.co.nz",
        address: "Wellington CBD",
        image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Kiwi Built",
        industry: "Builders",
        city: "Wellington",
        rating: 4.8,
        reviews: 180,
        description: "2025 Regional Craftsmanship Award winners. Master Builders specialising in award-winning new builds and complex character renovations.",
        website: "https://www.kiwi-built.nz",
        address: "Wellington Region",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Bright Build",
        industry: "Builders",
        city: "Wellington",
        rating: 4.7,
        reviews: 165,
        description: "Award-winning energy-efficient and passive house specialists since 2010. Registered Master Builders with seismic retrofitting expertise.",
        website: "https://www.brightbuild.co.nz",
        address: "Wellington CBD",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        citySlug: "wellington",
        categorySlug: "trades",
        pageSlug: "builders"
    },

    // CHRISTCHURCH BUILDERS (3)
    {
        name: "Fortified Homes",
        industry: "Builders",
        city: "Christchurch",
        rating: 4.9,
        reviews: 195,
        description: "Multiple MasterBuilder Gold Award winners. Family-oriented local business specialising in design and build homes with Kiwisaver-friendly options.",
        website: "https://www.fortifiedhomes.co.nz",
        address: "Christchurch Central",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "DJ Hewitt Builders",
        industry: "Builders",
        city: "Christchurch",
        rating: 4.8,
        reviews: 240,
        description: "Premium homes and renovations with 50+ Masterbuild Awards. National House of the Year finalists offering planning, design, consents and construction.",
        website: "https://www.djhewittbuilders.co.nz",
        address: "Christchurch Metro",
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Trent Builders",
        industry: "Builders",
        city: "Christchurch",
        rating: 4.7,
        reviews: 175,
        description: "High-quality new home builds, townhouses, and design-and-build services. Known for honest advice, careful planning, and energy-efficient designs.",
        website: "https://www.trentbuilders.co.nz",
        address: "Canterbury Region",
        image: "https://images.unsplash.com/photo-1600573472591-ee6981cf81f4?auto=format&fit=crop&w=800&q=80",
        citySlug: "christchurch",
        categorySlug: "trades",
        pageSlug: "builders"
    },

    // HAMILTON BUILDERS (3)
    {
        name: "Sentinel Homes Waikato",
        industry: "Builders",
        city: "Hamilton",
        rating: 4.9,
        reviews: 285,
        description: "Waikato's most-awarded builder for 3 consecutive years. Master Builders with 10-year guarantee specialising in custom design homes.",
        website: "https://www.sentinelhomes.co.nz/waikato",
        address: "Hamilton CBD",
        image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "JCC Build",
        industry: "Builders",
        city: "Hamilton",
        rating: 4.8,
        reviews: 145,
        description: "Family-owned, award-winning company since 2016. Innovative solutions for new builds, renovations, and extensions with meticulous attention to detail.",
        website: "https://www.jccbuild.nz",
        address: "Hamilton Region",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "8 Great Homes",
        industry: "Builders",
        city: "Hamilton",
        rating: 4.8,
        reviews: 120,
        description: "Award-winning Master Builders with House of the Year accolades since 2019. House and land packages, designer homes, and quality renovations.",
        website: "https://www.8greathomes.co.nz",
        address: "Waikato Region",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        citySlug: "hamilton",
        categorySlug: "trades",
        pageSlug: "builders"
    },

    // TAURANGA BUILDERS (3)
    {
        name: "Calley Homes",
        industry: "Builders",
        city: "Tauranga",
        rating: 4.9,
        reviews: 230,
        description: "Regional Supreme Award winners with prestigious 2023 Sapphire award for building excellence. Custom-designed homes with full design and build service.",
        website: "https://www.calleyhomes.co.nz",
        address: "Tauranga City",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Shaw Builders",
        industry: "Builders",
        city: "Tauranga",
        rating: 4.8,
        reviews: 310,
        description: "60+ awards since 2007 with 30+ years experience. New builds, renovations, and extensions across Mount Maunganui, Papamoa, and Tauranga.",
        website: "https://www.shawbuilders.co.nz",
        address: "Mount Maunganui",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "trades",
        pageSlug: "builders"
    },
    {
        name: "Jones Builders",
        industry: "Builders",
        city: "Tauranga",
        rating: 4.8,
        reviews: 195,
        description: "Multi-award winning, family-owned Master Builders with 20+ years experience. New builds, home & land packages, and renovations.",
        website: "https://www.jonesbuilders.co.nz",
        address: "Tauranga & Mount Maunganui",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "trades",
        pageSlug: "builders"
    }
];

// Add IDs to new builders
let nextId = maxId + 1;
const buildersWithIds = newBuilders.map(builder => ({
    id: nextId++,
    ...builder
}));

// Append to existing businesses
const updatedBusinesses = [...businesses, ...buildersWithIds];

// Write back to file
fs.writeFileSync('data/businesses.json', JSON.stringify(updatedBusinesses, null, 2));

console.log(`✅ Added ${buildersWithIds.length} new builder listings`);
console.log(`   Total businesses now: ${updatedBusinesses.length}`);
console.log(`   Builders per city:`);
['auckland', 'wellington', 'christchurch', 'hamilton', 'tauranga'].forEach(city => {
    const count = buildersWithIds.filter(b => b.citySlug === city).length;
    console.log(`     ${city}: ${count}`);
});
