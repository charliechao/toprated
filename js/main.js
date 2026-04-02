/**
 * Main Site Logic
 * Handles mobile navigation, dropdowns, and general UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

document.addEventListener('componentLoaded', (event) => {
    if (event.detail?.selector === '#site-header') {
        initMobileMenu();
    }
});

function syncMobileMenuState(menuBtn, navLinks, isOpen) {
    navLinks.classList.toggle('active', isOpen);

    const icon = menuBtn.querySelector('i');
    if (!icon) return;

    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks || menuBtn.dataset.mobileMenuBound === 'true') return;

    menuBtn.dataset.mobileMenuBound = 'true';
    syncMobileMenuState(menuBtn, navLinks, navLinks.classList.contains('active'));

    menuBtn.addEventListener('click', () => {
        const isOpen = !navLinks.classList.contains('active');
        syncMobileMenuState(menuBtn, navLinks, isOpen);
    });
}
