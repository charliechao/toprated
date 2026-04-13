const fs = require('fs');
const path = require('path');

// ---------------------------------------------------
// Sitemap Generator for TopRated NZ
// Scans all HTML files and generates an XML sitemap
// ---------------------------------------------------

const BASE_URL = 'https://toprated.nz';
const OUTPUT_FILE = 'sitemap.xml';
const TOP_LEVEL_PUBLIC_PAGES = new Set([
    'index.html',
    'about.html',
    'cities.html',
    'contact.html',
    'new-zealand.html',
    'privacy.html',
    'terms.html'
]);

// Recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            // Skip hidden and special directories
            if (!file.startsWith('.') && file !== 'node_modules') {
                findHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

// Convert file path to URL
function pathToUrl(filePath) {
    const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
    let url = relativePath;
    if (url.endsWith('index.html')) {
        url = url.replace('index.html', '');
    } else if (url.endsWith('.html')) {
        url = url.replace('.html', '');
    }
    return `${BASE_URL}/${url}`;
}

function isPublicHtmlFile(filePath) {
    const relativePath = path.relative('.', filePath).replace(/\\/g, '/');

    if (relativePath.startsWith('cities/')) {
        return true;
    }

    if (relativePath.startsWith('components/') || relativePath.startsWith('templates/')) {
        return false;
    }

    return TOP_LEVEL_PUBLIC_PAGES.has(relativePath);
}

// Get priority based on page type
function getPriority(url) {
    if (url === `${BASE_URL}/`) return '1.0';
    if (url === `${BASE_URL}/cities`) return '0.9';
    if (url.match(/\/cities\/[^/]+$/)) return '0.8';
    if (url.endsWith('/')) return '0.7';
    return '0.6';
}

// Generate sitemap XML
function generateSitemap() {
    const htmlFiles = findHtmlFiles('.').filter(isPublicHtmlFile);
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    for (const file of htmlFiles) {
        const url = pathToUrl(file);
        const priority = getPriority(url);
        xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`✅ Generated sitemap.xml with ${htmlFiles.length} URLs`);
}

generateSitemap();
