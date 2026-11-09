// Refresh only the featured sections; do not regenerate unrelated dirty pages.
const fs = require('fs');
const path = require('path');
const { renderFeaturedGuides } = require('./lib/featured_guides');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/featured_guides.json'), 'utf8'));

for (const [key, file] of [
    ['cities/auckland', 'cities/auckland.html'],
    ['cities/auckland/services', 'cities/auckland/services/index.html']
]) {
    const filename = path.join(root, file);
    const html = fs.readFileSync(filename, 'utf8');
    const pattern = /<div id="hub-featured-guides">[\s\S]*?<\/div>(\s*<div class="hub-grid-shell">)/;
    if (!pattern.test(html)) throw new Error(`Featured section boundary missing: ${file}`);
    const next = html.replace(pattern, (_, following) => `<div id="hub-featured-guides">${renderFeaturedGuides(key, data)}</div>${following}`);
    if (next !== html) fs.writeFileSync(filename, next);
    console.log(`Updated featured guide HTML: ${file}`);
}
