const fs = require('fs');

// Load data
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const industries = JSON.parse(fs.readFileSync('data/industries.json', 'utf8'));

// Get all defined subcategories
const definedSubcats = [];
industries.forEach(industry => {
    industry.subCategories.forEach(subcat => {
        definedSubcats.push(subcat);
    });
});

// Get all subcategories with data
const populatedSubcats = [...new Set(businesses.map(b => b.pageSlug))];

// Find empty subcategories
const emptySubcats = definedSubcats.filter(subcat => !populatedSubcats.includes(subcat));

console.log('\n📊 CATEGORY ANALYSIS:');
console.log('\n✅ Categories WITH data:');
populatedSubcats.forEach(cat => {
    const count = businesses.filter(b => b.pageSlug === cat).length;
    console.log(`  ${cat}: ${count} businesses`);
});

console.log('\n❌ Categories WITHOUT data (showing "No businesses found"):');
emptySubcats.forEach(cat => {
    console.log(`  ${cat}`);
});

console.log(`\n📈 Summary: ${populatedSubcats.length} populated, ${emptySubcats.length} empty`);
