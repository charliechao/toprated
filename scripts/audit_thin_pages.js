const fs = require('fs');
const path = require('path');

const seoContent = JSON.parse(fs.readFileSync('data/seo_content.json', 'utf8'));
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));

// Find all leaf HTML files under cities/
function findHtmlFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(findHtmlFiles(fullPath));
        } else if (entry.name.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

const cityPages = findHtmlFiles('cities');

// Only leaf pages (4-level deep: cities/city/category/page.html)
const leafPages = cityPages.filter(p => {
    const parts = p.split(path.sep);
    return parts.length === 4; // cities / city / category / page.html
});

const report = [];

leafPages.forEach(pagePath => {
    const parts = pagePath.split(path.sep);
    const city = parts[1];
    const category = parts[2];
    const pageSlug = parts[3].replace('.html', '');
    const seoKey = `${city}/${category}/${pageSlug}`;

    // Check SEO content
    const hasSeo = !!seoContent[seoKey];
    const hasIntro = hasSeo && !!seoContent[seoKey].introText;
    const hasFaqs = hasSeo && seoContent[seoKey].faqs && seoContent[seoKey].faqs.length > 0;
    const faqCount = hasFaqs ? seoContent[seoKey].faqs.length : 0;

    // Count businesses for this page
    const matchingBusinesses = businesses.filter(b =>
        b.citySlug === city && b.pageSlug === pageSlug
    );
    const bizCount = matchingBusinesses.length;

    // Determine "thin" status
    const issues = [];
    if (!hasIntro) issues.push('No intro text');
    if (!hasFaqs) issues.push('No FAQs');
    if (bizCount < 3) issues.push(`Only ${bizCount} business(es)`);

    if (issues.length > 0) {
        report.push({
            page: seoKey,
            businesses: bizCount,
            hasIntro,
            faqCount,
            issues: issues.join(', ')
        });
    }
});

// Sort by number of issues (worst first), then by business count
report.sort((a, b) => {
    const aScore = (a.hasIntro ? 0 : 2) + (a.faqCount > 0 ? 0 : 2) + (a.businesses < 3 ? 1 : 0);
    const bScore = (b.hasIntro ? 0 : 2) + (b.faqCount > 0 ? 0 : 2) + (b.businesses < 3 ? 1 : 0);
    return bScore - aScore || a.businesses - b.businesses;
});

console.log(`\n📊 THIN CONTENT AUDIT — Cities Pages`);
console.log(`${'='.repeat(100)}`);
console.log(`Total leaf pages found: ${leafPages.length}`);
console.log(`Pages with full SEO content: ${leafPages.length - report.length}`);
console.log(`Pages needing enhancement: ${report.length}`);
console.log(`${'='.repeat(100)}\n`);

console.log(`${'Page'.padEnd(50)} ${'Biz'.padEnd(5)} ${'Intro'.padEnd(7)} ${'FAQs'.padEnd(6)} Issues`);
console.log(`${'-'.repeat(100)}`);
report.forEach(r => {
    console.log(`${r.page.padEnd(50)} ${String(r.businesses).padEnd(5)} ${(r.hasIntro ? '✅' : '❌').padEnd(7)} ${String(r.faqCount).padEnd(6)} ${r.issues}`);
});
