const fs = require('fs');

// Load existing businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Remove duplicates by name + city combination
const seen = new Set();
const uniqueBusinesses = businesses.filter(b => {
    const key = `${b.name}|${b.city}`;
    if (seen.has(key)) {
        return false;
    }
    seen.add(key);
    return true;
});

// Re-assign sequential IDs
const reindexed = uniqueBusinesses.map((b, idx) => ({
    ...b,
    id: idx + 1
}));

// Write back to file
fs.writeFileSync('data/businesses.json', JSON.stringify(reindexed, null, 2));

console.log(`✅ Removed duplicates`);
console.log(`   Before: ${businesses.length} businesses`);
console.log(`   After: ${reindexed.length} businesses`);
console.log(`   Removed: ${businesses.length - reindexed.length} duplicates`);
