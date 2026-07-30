(() => {
    if (window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches) return;

    const video = document.querySelector('.hero-video');
    const source = video?.querySelector('source[data-src]');
    if (!video || !source) return;

    window.addEventListener('load', () => {
        window.setTimeout(() => {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
            video.load();
            video.play().catch(() => {});
        }, 1500);
    }, { once: true });
})();
