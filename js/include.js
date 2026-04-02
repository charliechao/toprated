/**
 * Simple HTML Fragment Loader
 * Fetches header and footer components and injects them into the page.
 */

const include = async (selector, url) => {
  try {
    const element = document.querySelector(selector);
    if (!element) return;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);

    const html = await response.text();
    element.innerHTML = html;

    // Only the shared header requires follow-up UI initialization.
    if (selector === '#site-header') {
      document.dispatchEvent(new CustomEvent('componentLoaded', {
        detail: { selector, url }
      }));
    }
    
  } catch (error) {
    console.error('Include error:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  include('#site-header', '/components/header.html');
  include('#site-footer', '/components/footer.html');
});
