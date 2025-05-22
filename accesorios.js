document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.component-card');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    let isMenuVisible = true;

    // Configuración de las ventanas modales
    function createModal(card) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // Obtener información de la tarjeta
        const title = card.querySelector('.card-header h4').textContent;
        const icon = card.querySelector('.card-header i').cloneNode(true);
        const infoContent = card.querySelector('.info-details, .info-content');

        // Crear encabezado del modal sin botón de cerrar
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            ${icon.outerHTML}
            <h3>${title}</h3>
        `;

        // Clonar y mostrar el contenido
        if (infoContent) {
            const contentClone = infoContent.cloneNode(true);
            contentClone.style.display = 'block';
            
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(contentClone);
            modalOverlay.appendChild(modalContent);
            document.body.appendChild(modalOverlay);

            document.body.style.overflow = 'hidden';

            requestAnimationFrame(() => {
                modalOverlay.classList.add('active');
                modalContent.classList.add('active');
            });

            // Solo mantener el cierre al hacer clic fuera y con ESC
            setupModalClose(modalOverlay, modalContent);
        }
    }

    function setupModalClose(overlay, content) {
        // Cerrar al hacer clic fuera
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay, content);
            }
        });

        // Cerrar con ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal(overlay, content);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    function closeModal(overlay, content) {
        overlay.classList.remove('active');
        content.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }

    // Configurar los botones de información
    cards.forEach(card => {
        const infoBtn = card.querySelector('.info-btn');
        if (infoBtn) {
            infoBtn.addEventListener('click', () => createModal(card));
        }
    });

    // Configuración del menú lateral
    const commonIgnoreSelectors = [
        '.component-card',
        '.info-btn',
        '.modal-overlay',
        '.modal-content',
        '.image-modal-overlay',
        '.image-modal-content', 
        '.image-modal-header',
        '.close-image-btn',
        '.view-image-btn',
        '.comments-section',
        '.comment-form',
        '.view-counter',
        'button',
        'input',
        'textarea',
        'a',
        'img',
        '.laptop-item-wrapper',
        '.phone-item-wrapper',
        '.console-item-wrapper',
        '.accessory-item-wrapper'
    ];

    class SidebarHandler {
        constructor() {
            this.sidebar = document.querySelector('.sidebar');
            this.content = document.querySelector('.content');
            this.isMenuVisible = true;
            this.init();
        }

        init() {
            document.addEventListener('click', (e) => this.handleClick(e));
            this.sidebar?.addEventListener('click', (e) => e.stopPropagation());
        }

        handleClick(e) {
            const shouldIgnore = commonIgnoreSelectors.some(selector => 
                e.target.closest(selector) !== null
            );

            if (!shouldIgnore && !this.sidebar?.contains(e.target)) {
                this.toggleMenu();
            }
        }

        toggleMenu() {
            if (!this.sidebar || !this.content) return;
            
            this.isMenuVisible = !this.isMenuVisible;
            this.sidebar.classList.toggle('hidden', !this.isMenuVisible);
            this.content.classList.toggle('expanded', !this.isMenuVisible);
        }
    }

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        new SidebarHandler();
    });
});
