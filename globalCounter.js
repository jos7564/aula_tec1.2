class GlobalViewCounter {
    constructor() {
        this.storageKey = 'globalPageViews';
        this.sessionKey = 'sessionViewed';
        this.indexKey = 'indexViewed';
        this.initializeCounter();
    }

    initializeCounter() {
        const currentPath = window.location.pathname;
        const isIndex = currentPath.includes('index.html') || currentPath.endsWith('/');
        const hasViewedIndex = sessionStorage.getItem(this.indexKey);
        const hasViewedOther = sessionStorage.getItem(this.sessionKey);

        let shouldCount = false;

        if (isIndex && !hasViewedIndex) {
            // Primera visita al index
            sessionStorage.setItem(this.indexKey, 'true');
            shouldCount = true;
        } else if (!isIndex && !hasViewedOther) {
            // Primera visita a otra página después del index
            sessionStorage.setItem(this.sessionKey, 'true');
            shouldCount = true;
        }

        if (shouldCount) {
            // Incrementar contador
            let views = localStorage.getItem(this.storageKey);
            views = views ? parseInt(views) : 0;
            views++;
            localStorage.setItem(this.storageKey, views);
            this.updateDisplay(views);
        } else {
            // Solo mostrar el contador actual
            const currentViews = localStorage.getItem(this.storageKey);
            this.updateDisplay(parseInt(currentViews) || 0);
        }
    }

    updateDisplay(count) {
        const viewCountElement = document.getElementById('viewCount');
        if (viewCountElement) {
            viewCountElement.textContent = new Intl.NumberFormat('es-MX').format(count);
        }
    }

    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }
}

// Inicializar el contador
document.addEventListener('DOMContentLoaded', () => {
    const viewCounter = new GlobalViewCounter();
    
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    let isMenuVisible = true;

    document.addEventListener('click', (e) => {
        // Lista de selectores a ignorar
        const ignoreElements = [
            '.component-card',
            '.info-btn',
            '.modal-overlay',
            '.modal-content',
            '.comments-section',
            '.comment-form',
            'button',
            'input',
            'textarea'
        ];

        // Verificar si el clic fue en un elemento que debemos ignorar
        const shouldIgnore = ignoreElements.some(selector => 
            e.target.closest(selector) !== null
        );

        // Si no debemos ignorar el clic y no fue dentro del sidebar
        if (!shouldIgnore && !sidebar.contains(e.target)) {
            toggleMenu();
        }
    });

    // Evitar que los clics dentro del sidebar cierren el menú
    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    function toggleMenu() {
        isMenuVisible = !isMenuVisible;
        sidebar.classList.toggle('hidden', !isMenuVisible);
        content.classList.toggle('expanded', !isMenuVisible);
    }
});