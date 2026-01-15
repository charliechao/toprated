const b = require('../data/businesses.json');
const cats = [...new Set(b.map(x => x.pageSlug))];
console.log('Total businesses:', b.length);
console.log('\nExisting categories:');
cats.forEach(c => {
    const count = b.filter(x => x.pageSlug === c).length;
    console.log(`  ${c}: ${count} listings`);
});
