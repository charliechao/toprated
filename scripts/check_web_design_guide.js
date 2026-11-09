const assert = require('node:assert/strict');
const fs = require('node:fs');
const { renderFeaturedGuides } = require('./lib/featured_guides');
const file = 'cities/auckland/services/web-design-agencies.html';
const html = fs.readFileSync(file, 'utf8');
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const article = schemas.find(item => item['@type'] === 'Article');
const list = schemas.find(item => item['@type'] === 'ItemList');
const faq = schemas.find(item => item['@type'] === 'FAQPage');
assert.equal(schemas.length, 4);
assert.equal(article.dateModified, '2026-11-09');
assert.equal(article.author.name, 'TopRated NZ editorial team');
assert.equal(list.itemListOrder, 'https://schema.org/ItemListOrderAscending');
assert.deepEqual(list.itemListElement.map(item => item.item.name), ['Kiwi Web Design', 'Impact Websites', 'numero', 'Small Business Web Designs', 'The Web Guys', 'Ultimate Web Designs', 'Zesty Design']);
assert.equal(list.numberOfItems, 7);
assert(html.includes('Top 7 for 2027'));
assert(html.includes('#1 <a href="https://www.kiwiwebdesign.co.nz/">Kiwi Web Design</a>'));
assert(!html.includes('What this comparison can—and cannot—tell you'));
assert.equal((html.match(/class="agency-card"/g) || []).length, 7);
assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
assert(!/Skyline Commerce|Urban Hive|BrightPixel|Northside Performance|Why it ranks first/.test(html));
assert(html.includes('https://www.youtube-nocookie.com/embed/uo-3c2PmRX0'));
assert(html.includes('predates the revised shortlist'));
assert(html.includes('content="2026-11-09"'));
assert(html.includes('rel="canonical" href="https://toprated.nz/cities/auckland/services/web-design-agencies"'));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ids');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Missing fragment ${match[1]}`);
for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const route = match[1];
    const stem = route.replace(/^\//, '');
    assert([stem || 'index.html', `${stem}.html`, `${stem.replace(/\/$/, '')}/index.html`].some(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile()), `Missing local link ${route}`);
}
const visibleFaq = [...html.matchAll(/<details class="seo-faq-item"><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/g)].map(match => [decode(match[1]), decode(match[2])]);
assert.deepEqual(visibleFaq, faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text]));
for (const item of list.itemListElement) {
    assert(html.includes(`href="${item.item.url}"`), `Missing official URL ${item.item.name}`);
    assert(ids.includes(item.url.split('#')[1]));
}
assert(article.citation.length >= 15);
for (const url of article.citation) assert(html.includes(`href="${url}"`));
const data = JSON.parse(fs.readFileSync('data/featured_guides.json', 'utf8'));
for (const [key, hubFile] of [['cities/auckland', 'cities/auckland.html'], ['cities/auckland/services', 'cities/auckland/services/index.html']]) {
    const hub = fs.readFileSync(hubFile, 'utf8').replace(/\r\n/g, '\n');
    assert(hub.includes(renderFeaturedGuides(key, data)), `Generated featured links stale: ${hubFile}`);
    assert(hub.includes('href="/cities/auckland/services/web-design-agencies"'));
}
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
assert(/<loc>https:\/\/toprated.nz\/cities\/auckland\/services\/web-design-agencies<\/loc>\s*<lastmod>2026-11-09<\/lastmod>/.test(sitemap));
console.log('PASS: seven profiles, sourced URLs, metadata, JSON-LD, FAQ parity, anchors, local routes, sitemap and initial-HTML hub links.');
