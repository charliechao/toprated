const fs = require('fs');

const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const maxId = Math.max(...businesses.map(b => b.id));

// Enhance existing Tauranga renovation businesses
businesses.forEach(b => {
    if (b.name === 'The Thorne Group' && b.city === 'Tauranga') {
        b.description = "Award-winning architectural renovation specialists with over 15 years of experience transforming Tauranga homes. The Thorne Group excels in large-scale extensions, complete home renovations, and high-spec kitchen and bathroom overhauls across the Bay of Plenty, delivering fixed-price contracts with a 10-year Master Build Guarantee.";
        b.neighborhood = "Tauranga CBD";
        b.tags = ["Full Home Renovations", "Extensions", "Architectural", "Master Builder"];
        b.image = "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80";
    }
    if (b.name === 'Straight Up Builders' && b.city === 'Tauranga') {
        b.description = "Reliable Tauranga renovation builders known for quality workmanship, clear communication, and honest fixed-price quotes. Specialists in kitchen renovations, bathroom makeovers, and home extensions across Tauranga, Mount Maunganui, and Papamoa with a focus on on-time delivery.";
        b.neighborhood = "Papamoa";
        b.tags = ["Kitchen Renovations", "Bathroom Renovations", "Extensions", "LBP Certified"];
        b.image = "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80";
    }
});

// Add new Tauranga renovation businesses from research
const newBusinesses = [
    {
        id: maxId + 1,
        name: "Refresh Renovations Tauranga",
        industry: "Renovation Services",
        city: "Tauranga",
        rating: 4.9,
        reviews: 87,
        description: "Fully-managed renovation service with a single point of contact from design to completion. Refresh Renovations Tauranga specialises in complete home renovations, kitchen and bathroom makeovers, house extensions, and coastal bach upgrades across the Bay of Plenty. Their proven 5-step renovation process eliminates stress and delivers fixed-price certainty.",
        website: "https://www.refreshrenovations.co.nz/tauranga",
        address: "Tauranga, Bay of Plenty",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "other",
        pageSlug: "renovation-services",
        neighborhood: "Tauranga CBD",
        tags: ["Full Home Renovations", "Design & Build", "Kitchen", "Bathroom", "Fixed Price"]
    },
    {
        id: maxId + 2,
        name: "MTP Renovations",
        industry: "Renovation Services",
        city: "Tauranga",
        rating: 4.8,
        reviews: 124,
        description: "Tauranga's leading certified renovation builder with extensive local experience. MTP Renovations handles everything from minor home maintenance to complete house transformations, with deep knowledge of local building codes, council consent processes, and coastal construction requirements. Known for transparent communication and consistent 5-star reviews.",
        website: "https://www.renovations.nz",
        address: "Mount Maunganui, Tauranga",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "other",
        pageSlug: "renovation-services",
        neighborhood: "Mount Maunganui",
        tags: ["Certified Builder", "Coastal Renovations", "Consent Management", "Full Service"]
    },
    {
        id: maxId + 3,
        name: "Bespoke Construct",
        industry: "Renovation Services",
        city: "Tauranga",
        rating: 4.9,
        reviews: 65,
        description: "Family-owned architectural renovation specialists with over 20 years of experience in major home renovations across Tauranga and the wider Bay of Plenty. Bespoke Construct focuses on reconfiguring layouts, high-spec detailing, and award-recognised craftsmanship with fully transparent project management and fixed-price contracts.",
        website: "https://www.bespokeconstruct.co.nz",
        address: "Papamoa Beach, Tauranga",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "other",
        pageSlug: "renovation-services",
        neighborhood: "Papamoa",
        tags: ["Architectural Renovations", "Layout Reconfiguration", "Award-Winning", "20+ Years"]
    },
    {
        id: maxId + 4,
        name: "Smith & Sons Tauranga",
        industry: "Renovation Services",
        city: "Tauranga",
        rating: 4.7,
        reviews: 93,
        description: "Full-service renovation builders guiding Tauranga homeowners through the entire renovation journey — from initial design concepts to final completion. Smith & Sons specialise in bathroom and kitchen updates, new decks, room additions, and complete home refurbishments with a national support network and local Bay of Plenty expertise.",
        website: "https://www.smithandsons.co.nz/tauranga",
        address: "Otumoetai, Tauranga",
        image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "other",
        pageSlug: "renovation-services",
        neighborhood: "Otumoetai",
        tags: ["Kitchen Renovations", "Bathroom Renovations", "Decks", "Room Additions"]
    },
    {
        id: maxId + 5,
        name: "Built Construction Tauranga",
        industry: "Renovation Services",
        city: "Tauranga",
        rating: 4.8,
        reviews: 56,
        description: "Recognised by locals for making the renovation process easy and enjoyable. Built Construction creates personalised renovation plans for kitchen upgrades, full house renovations, and modern extensions. Their hands-on approach, attention to detail, and commitment to quality craftsmanship has earned them a loyal following across the Bay of Plenty.",
        website: "https://www.builtconstruction.co.nz",
        address: "Greerton, Tauranga",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        citySlug: "tauranga",
        categorySlug: "other",
        pageSlug: "renovation-services",
        neighborhood: "Greerton",
        tags: ["Home Upgrades", "Kitchen Specialists", "Extensions", "Quality Craftsmanship"]
    }
];

businesses.push(...newBusinesses);

fs.writeFileSync('data/businesses.json', JSON.stringify(businesses, null, 2));
console.log(`✅ Added ${newBusinesses.length} new Tauranga renovation businesses and enhanced existing ones`);
