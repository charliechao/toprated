// scripts/create_structure.js
// ---------------------------------------------------
// Purpose: Build the full directory tree for TopRated NZ
// ---------------------------------------------------
// This script is heavily commented to explain *why* each step exists.
// It reads a static `structure` object that mirrors the hierarchy
// described in the implementation plan and creates folders/files
// accordingly. All paths are relative to the project root.

const fs = require('fs');
const path = require('path');

/**
 * Definition of the desired folder hierarchy.
 * Keys represent folder names; values are either:
 *   - an object (sub‑folders)
 *   - an array of leaf HTML filenames
 *   - a string (single leaf file)
 */
const structure = {
    "cities": {
        "auckland.html": null, // city hub page
        "wellington.html": null,
        "auckland": {
            "cuisine": [
                "japanese-restaurants.html",
                "chinese-restaurants.html",
                "italian-restaurants.html"
            ],
            "trades": [
                "builders.html",
                "electricians.html",
                "plumbers.html"
            ]
        }
    },
    "industries": {
        "hospitality.html": null,
        "trades.html": null,
        "automotive.html": null,
        "hospitality": {
            "restaurants.html": null,
            "cafes.html": null,
            "hotels.html": null
        },
        "trades": {
            "builders.html": null,
            "electricians.html": null,
            "plumbers.html": null
        }
    }
};

/**
 * Recursively walk the `structure` object and create directories/files.
 * @param {string} base   Absolute path to the current directory.
 * @param {object} node   Current node in the hierarchy.
 */
function walk(base, node) {
    for (const [key, value] of Object.entries(node)) {
        const targetPath = path.join(base, key);
        if (Array.isArray(value)) {
            // Leaf files inside a folder (e.g., cuisine/*.html)
            if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });
            value.forEach(file => {
                const filePath = path.join(targetPath, file);
                if (!fs.existsSync(filePath)) {
                    // Write a minimal HTML file using the template placeholder.
                    const pageTitle = file.replace('.html', '').replace(/-/g, ' ');
                    const content = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${pageTitle} | TopRated NZ</title>\n  <link rel="stylesheet" href="/css/styles.css">\n</head>\n<body>\n  <!-- TODO: Populate with business listings -->\n  <h1>${pageTitle}</h1>\n  <p>Content will be generated automatically from data files.</p>\n</body>\n</html>`;
                    fs.writeFileSync(filePath, content);
                }
            });
        } else if (value === null) {
            // Single HTML hub page (e.g., auckland.html)
            const filePath = targetPath;
            if (!fs.existsSync(filePath)) {
                const title = key.replace('.html', '').replace(/-/g, ' ');
                const hubContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${title} | TopRated NZ</title>\n  <link rel="stylesheet" href="/css/styles.css">\n</head>\n<body>\n  <!-- Hub page for ${title} -->\n  <h1>${title}</h1>\n  <p>Navigation grid will be injected by navigation.js.</p>\n</body>\n</html>`;
                fs.writeFileSync(filePath, hubContent);
            }
        } else if (typeof value === 'object') {
            // Sub‑folder – ensure it exists then recurse.
            if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });
            walk(targetPath, value);
        }
    }
}

// Execute the walk starting from the project root.
const projectRoot = path.resolve(__dirname, '..');
walk(projectRoot, structure);
console.log('✅ Folder hierarchy and placeholder pages created.');
