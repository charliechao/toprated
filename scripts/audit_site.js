const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, 'data');
const CITIES_DIR = path.join(ROOT_DIR, 'cities');

// Load data
const businesses = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'businesses.json'), 'utf8'));

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const allHtmlFiles = getAllFiles(ROOT_DIR).filter(f => f.endsWith('.html') && !f.includes('node_modules') && !f.includes('.git'));

const report = {
    brokenLinks: [],
    deadEndLinks: [],
    emptyPages: [],
    stats: {
        totalFiles: allHtmlFiles.length,
        brokenLinksCount: 0,
        deadEndLinksCount: 0,
        emptyPagesCount: 0
    }
};

// Map of file paths to check existence quickly
const existingFiles = new Set(allHtmlFiles.map(f => '/' + path.relative(ROOT_DIR, f).replace(/\\/g, '/')));

allHtmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = '/' + path.relative(ROOT_DIR, file).replace(/\\/g, '/');

    // 1. Check for broken links
    const linkRegex = /href="([^"]+)"/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        let href = match[1];

        // Skip external, anchors, and mailto/tel
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
            if (href === '#' || href === '') {
                report.deadEndLinks.push({ file: relativePath, href });
                report.stats.deadEndLinksCount++;
            }
            continue;
        }

        // Clean href
        let target = href.split('#')[0]; // remove fragment
        if (!target) continue;

        // Resolve absolute and relative paths
        let targetPath;
        if (target.startsWith('/')) {
            targetPath = target;
        } else {
            // Simple relative resolution
            const currentDir = path.dirname(relativePath);
            targetPath = path.normalize(path.join(currentDir, target)).replace(/\\/g, '/');
        }

        // Canonicalize (handle / at end of directory)
        if (targetPath.endsWith('/')) {
            targetPath += 'index.html';
        }

        if (!existingFiles.has(targetPath) && !existingFiles.has(targetPath + '.html') && !existingFiles.has(targetPath.replace(/\/$/, '') + '.html')) {
            // Check if it's a directory that exists but no trailing slash
            const diskPath = path.join(ROOT_DIR, targetPath.replace(/\//g, path.sep));
            if (!fs.existsSync(diskPath)) {
                report.brokenLinks.push({ file: relativePath, href, targetPath });
                report.stats.brokenLinksCount++;
            }
        }
    }

    // 2. Check for empty pages (No businesses found message)
    // Extract metadata from path or content to identify category/city
    // E.g., /cities/auckland/cuisine/japanese-restaurants.html
    const parts = relativePath.split('/').filter(Boolean);
    if (parts[0] === 'cities' && parts.length >= 3) {
        const citySlug = parts[1];
        const pageFile = parts[parts.length - 1];
        const pageSlug = pageFile.replace('.html', '');

        // Filter by citySlug and pageSlug
        const filtered = businesses.filter(b =>
            b.citySlug === citySlug &&
            b.pageSlug === pageSlug
        );

        if (filtered.length === 0) {
            // Check if it's a hub page (not a leaf)
            const isLeaf = content.includes('id="business-list"');
            if (isLeaf) {
                report.emptyPages.push({ file: relativePath, citySlug, pageSlug });
                report.stats.emptyPagesCount++;
            }
        }
    }
});

// Output report
const reportPath = path.join(ROOT_DIR, 'audit_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('✅ Audit complete!');
console.log(`- Files scanned: ${report.stats.totalFiles}`);
console.log(`- Broken links: ${report.stats.brokenLinksCount}`);
console.log(`- Dead-end links: ${report.stats.deadEndLinksCount}`);
console.log(`- Empty pages: ${report.stats.emptyPagesCount}`);
console.log(`Report saved to ${reportPath}`);
