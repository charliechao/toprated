const fs = require('fs');
const path = require('path');

const businessesPath = path.join(__dirname, '../data/businesses.json');
const businesses = JSON.parse(fs.readFileSync(businessesPath, 'utf8'));

// Optimized neighborhood mapping
const neighborhoodMap = {
    // Auckland
    'Sandringham': ['Indian Alley', 'Paradise Indian', 'Satya'],
    'Ponsonby': ['Prego', 'Cocoro', 'Azabu', 'Saan', 'Blue Elephant'],
    'Britomart': ['Amano', 'Ebisu', 'Ghost Street', 'The Hotel Britomart', 'La Petite Fourchette'],
    'CBD': ['Cassia', 'Masu', 'Huami', '1947 Eatery', 'C1 Espresso', 'Remedy Coffee', 'Chuffed', 'Tanuki\'s Cave', 'The Grove'],
    'Viaduct': ['Grand Harbour', 'Sofitel Auckland Viaduct Harbour', 'Park Hyatt Auckland'],
    'Mt Eden': ['Eden Noodles', 'Kiin Thai'],
    'North Shore': ['Build Firm', 'Matthews Plumbing', 'Superior Painters', 'Astral Electrical', 'Bakers Builds'],
    'Herne Bay': ['Empress Garden'],
    'Kingsland': ['@Bangkok'],
    'Wynyard Quarter': ['Baduzzi'],

    // Wellington
    'Te Aro': ['Logan Brown', 'Tatsushi', 'Kazaguruma', 'Miyabi', 'Origami', 'Central Plumbing', 'Customs', 'Flight Coffee', 'Aroy Thai', 'QT Wellington'],
    'Kelburn': ['Graze', 'Wellington Plumbers'],
    'Lambton Quay': ['InterContinental Wellington'],
    'Cuba St': ['Logan Brown', 'Origami', 'Aroy Thai', 'Kazaguruma'],
    'Thorndon': ['Sofitel Wellington', 'Jardin Grill'],
    'Johnsonville': ['Renner Plumbing'],
    'Lower Hutt': ['Go With The Flow', 'Cableworks Electrical'],

    // Christchurch
    'Addington': ['Addington Coffee Co-op'],
    'Riccarton': ['ACF Plumbing Solutions'],
    'Merivale': ['The George', 'Pescatore'],
    'Central City': ['Inati', 'Twenty Seven Steps', 'Bessie', 'Francesca\'s Italian Kitchen', 'Thai Orchid', 'Unknown Chapter', 'C1 Espresso'],

    // Hamilton
    'Te Rapa': ['Flow Lab Plumbing'],
    'Frankton': ['iPlumber'],
    'Beerescourt': ['Soda Plumbing'],

    // Tauranga
    'Mount Maunganui': ['Eco Plumber', 'Mt Zion Coffee', 'Fife Lane', 'Izakai Bar', 'Alpino', 'Oceanside Resort'],
    'Papamoa': ['Kingfisher Plumbing']
};

businesses.forEach(b => {
    // Check if neighborhood already exists and matches correctly, otherwise try to map based on name or existing tags/description
    if (b.neighborhood) return;

    for (const [neighborhood, names] of Object.entries(neighborhoodMap)) {
        if (names.some(name => b.name.includes(name))) {
            b.neighborhood = neighborhood;
            break;
        }
    }

    // Fallback logic for address-based neighborhood extraction if still empty
    if (!b.neighborhood && b.address) {
        const parts = b.address.split(',');
        if (parts.length > 1) {
            const potential = parts[parts.length - 2].trim();
            if (potential && potential.length < 20 && !potential.toLowerCase().includes('auckland') && !potential.toLowerCase().includes('wellington')) {
                b.neighborhood = potential;
            }
        }
    }
});

fs.writeFileSync(businessesPath, JSON.stringify(businesses, null, 2));
console.log('✅ Neighborhood tags added to businesses.json');
