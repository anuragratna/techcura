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
    if (translations.meta) {
        document.title = translations.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', translations.meta.description);
        const metaKeys = document.querySelector('meta[name="keywords"]');
        if (metaKeys) metaKeys.setAttribute('content', translations.meta.keywords);
    }
}

function updateActiveButton(lang) {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
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
            const lang = event.currentTarget.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    setLanguage(initialLang);

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});