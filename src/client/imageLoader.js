// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;

                img.onerror = () => {
                    console.error(`Failed to load image: ${img.dataset.src}`);
                    img.src = '/path/to/fallback-image.jpg'; // Fallback image
                };

                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});
