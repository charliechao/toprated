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
    
    // Dispatch event to signal content is loaded (useful for initializing menus)
    document.dispatchEvent(new Event('componentLoaded'));
    
  } catch (error) {
    console.error('Include error:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  include('#site-header', '/components/header.html');
  include('#site-footer', '/components/footer.html');
});
