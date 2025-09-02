async function loadTranslations(lang) {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
        throw new Error(`Could not load translation file for ${lang}.`);
    }
    return await response.json();
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key
            .split('.')
            .reduce((obj, k) => (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, k)) ? obj[k] : undefined, translations);

        if (typeof translation === 'string') {
            element.textContent = translation;
        }
    });

    // Handle meta tags
    document.title = translations.meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', translations.meta.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', translations.meta.keywords);
}

function updateActiveButton(lang) {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('font-semibold', 'text-primary');
            btn.classList.remove('text-secondary');
        } else {
            btn.classList.remove('font-semibold', 'text-primary');
            btn.classList.add('text-secondary');
        }
    });
}

async function setLanguage(lang) {
    try {
        const translations = await loadTranslations(lang);
        applyTranslations(translations);
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
        updateActiveButton(lang);
    } catch (error) {
        console.error(error);
        // Fallback to English if the chosen language fails
        if (lang !== 'en') {
            await setLanguage('en');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.split('-')[0];
    const initialLang = preferredLanguage || (['en', 'nl'].includes(browserLanguage) ? browserLanguage : 'en');
    
    document.querySelectorAll('.lang-switcher button').forEach(button => {
        button.addEventListener('click', (event) => {
            const lang = event.target.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    setLanguage(initialLang);
}); 