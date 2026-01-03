document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle visibility
            mobileMenu.classList.toggle('show');
        });
        // Hide menu when a link is clicked (for better UX)
        mobileMenu.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
            });
        });
    }

    // Image fallback handler for external images
    document.querySelectorAll('img[data-fallback]').forEach(img => {
        img.addEventListener('error', () => {
            const fallback = img.getAttribute('data-fallback');
            if (fallback && img.src !== fallback) {
                img.src = fallback;
            }
        }, { once: true });
    });
}); 