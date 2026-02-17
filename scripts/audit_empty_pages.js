const fs = require('fs');
const path = require('path');

// Load data
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('data/cities.json', 'utf8'));
const industries = JSON.parse(fs.readFileSync('data/industries.json', 'utf8'));

const emptyPages = [];

// 1. Audit Leaf Pages (City + Category)
cities.forEach(city => {
    industries.forEach(ind => {
        ind.subCategories.forEach(sc => {
            const pageSlug = sc.replace(/\s+/g, '-');
            const hasBusinesses = businesses.some(b =>
                b.citySlug === city.slug &&
                b.pageSlug === pageSlug
            );

            const url = `/cities/${city.slug}/${ind.slug}/${sc}.html`;
            const filePath = `cities/${city.slug}/${ind.slug}/${sc}.html`;

            if (fs.existsSync(filePath)) {
                if (!hasBusinesses) {
                    emptyPages.push({
                        url,
                        reason: 'No businesses found in this category for this city.'
                    });
                }
            }
        });
    });
});

// 2. Audit Global Subcategory Pages
industries.forEach(ind => {
    ind.subCategories.forEach(sc => {
        const pageSlug = sc.replace(/\s+/g, '-');
        const hasBusinesses = businesses.some(b => b.pageSlug === pageSlug);

        const url = `/industries/${ind.slug}/${sc}.html`;
        const filePath = `industries/${ind.slug}/${sc}.html`;

        if (fs.existsSync(filePath)) {
            if (!hasBusinesses) {
                emptyPages.push({
                    url,
                    reason: 'No businesses found in this category nationwide.'
                });
            }
        }
    });
});

// 3. Audit Hub Pages (Category index pages in cities)
const mainCategories = industries.map(i => i.slug);
cities.forEach(city => {
    mainCategories.forEach(cat => {
        const url = `/cities/${city.slug}/${cat}/index.html`;
        const filePath = `cities/${city.slug}/${cat}/index.html`;

        if (fs.existsSync(filePath)) {
            const industry = industries.find(i => i.slug === cat);
            if (!industry || !industry.subCategories || industry.subCategories.length === 0) {
                emptyPages.push({
                    url,
                    reason: `Category hub "${cat}" has no subcategories defined.`
                });
            }
        }
    });
});

// Generate Markdown
let md = '# Audit of Empty Pages\n\n';
md += 'This document lists pages that are generated but contain no business listings or subcategories.\n\n';

if (emptyPages.length === 0) {
    md += 'No empty pages found! All pages have content.\n';
} else {
    md += '| Page URL | Reason for being empty |\n';
    md += '| --- | --- |\n';
    emptyPages.forEach(p => {
        md += `| [${p.url}](${p.url}) | ${p.reason} |\n`;
    });
}

fs.writeFileSync('empty_pages_report.md', md);
console.log(`Report generated with ${emptyPages.length} empty pages.`);
