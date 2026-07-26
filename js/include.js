/**
 * Simple HTML Fragment Loader
 * Fetches header and footer components and injects them into the page.
 */

const TOPRATED_GA4_MEASUREMENT_ID = 'G-6VVTQKJP3V';

function initialiseAnalytics() {
  if (!TOPRATED_GA4_MEASUREMENT_ID || window.topratedAnalytics) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', TOPRATED_GA4_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${TOPRATED_GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.topratedAnalytics = {
    track(eventName, parameters) {
      window.gtag('event', eventName, parameters);
    }
  };
}

initialiseAnalytics();

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
