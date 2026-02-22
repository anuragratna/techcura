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

    // Fetch and render articles
    const articlesContainer = document.getElementById('articles-container');
    if (articlesContainer) {
        fetch('json/articles.json')
            .then(response => response.json())
            .then(articles => {

                articles.forEach(article => {
                    const card = document.createElement('a');
                    card.href = article.link;
                    card.className = 'card article-card';
                    card.style.display = 'block';
                    card.style.textDecoration = 'none';
                    card.innerHTML = `
                        <div class="card-content">
                            <svg class="card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>
                            <h3 style="color: var(--text-main);">${article.title}</h3>
                            <p style="color: var(--text-muted);">${article.description}</p>
                            <span class="text-link" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem;" data-i18n="articles.readMore">Read More</span>
                        </div>
                    `;
                    articlesContainer.appendChild(card);
                });

                // Apply localization to newly added elements
                if (window.applyTranslations && window.currentTranslations) {
                    applyTranslations(window.currentTranslations);
                }


                // Re-apply localization if available (assuming 'locales' object is global or accessible)
                // If localization logic is event-driven or can be triggered, do it here. 
                // For now, simpler static strings from DB are used.
            })
            .catch(error => console.error('Error loading articles:', error));
    }
}); 