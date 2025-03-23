// Initialize language switcher
document.addEventListener('DOMContentLoaded', function() {
    // Create language selector
    const languageSelect = document.createElement('select');
    languageSelect.id = 'languageSelect';
    languageSelect.className = 'ml-8 bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-800';

    // Add options
    const languages = [
        { code: 'en', name: 'EN' },
        { code: 'kg', name: 'KG' },
        { code: 'ru', name: 'RU' },
        { code: 'tr', name: 'TR' }
    ];

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
    });

    // Add to navigation
    const nav = document.querySelector('nav .md\\:flex.items-center.space-x-8');
    if (nav) {
        nav.appendChild(languageSelect);
    }

    // Set initial language
    const savedLang = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLang;
    translatePage(savedLang);

    // Handle language change
    languageSelect.onchange = function() {
        const selectedLang = this.value;
        localStorage.setItem('language', selectedLang);
        translatePage(selectedLang);
    };
});

// Function to translate the page
function translatePage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Get all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        
        // Check if translation exists
        if (translations[lang] && translations[lang][key]) {
            const translation = translations[lang][key];
            
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.placeholder) {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });
}