document.addEventListener('DOMContentLoaded', () => {
    let currentInfoModal = null;

    // Objeto con las rutas de las imágenes de cada laptop
    const laptopImages = {
        'MacBook Pro 16': 'MacBook Pro 16.jpg',
        'Dell XPS 17': 'Dell XPS 17.jpg',
        'Lenovo IdeaPad 5 Pro': 'ideapad-5-pro.jpg',
        'HP Pavilion Gaming': 'hp-pavilion.jpg',
        'Acer Aspire 3': 'acer-aspire.jpg',
        'ASUS VivoBook Go': 'vivobook.jpg',
        'Razer Blade 18': 'razer.jpg',
        'MSI Titan GT77 HX': 'MSI Titan GT77 HX.png'
    };

    function createInfoModal(card) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const infoContent = card.querySelector('.info-details');
        const contentClone = infoContent.cloneNode(true);
        contentClone.style.display = 'block';

        // Hacer clicables los nombres de laptops
        const laptopItems = contentClone.querySelectorAll('li');
        laptopItems.forEach(item => {
            const text = item.textContent.split('\n')[0].trim();
            if (laptopImages[text]) {
                // Crear botón de imagen
                const viewButton = document.createElement('button');
                viewButton.className = 'view-image-btn';
                viewButton.innerHTML = `
                    <i class="fas fa-image"></i>
                    Ver imagen
                `;

                // Insertar botón después del texto
                const wrapper = document.createElement('div');
                wrapper.className = 'laptop-item-wrapper';
                wrapper.innerHTML = item.innerHTML;
                wrapper.insertBefore(viewButton, wrapper.firstChild.nextSibling);
                item.innerHTML = '';
                item.appendChild(wrapper);

                // Evento para mostrar imagen
                viewButton.addEventListener('click', () => {
                    createImageModal(text, modalOverlay, modalContent);
                });
            }
        });

        modalContent.appendChild(contentClone);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalOverlay.classList.add('active');
            modalContent.classList.add('active');
        });

        currentInfoModal = { overlay: modalOverlay, content: modalContent };
        setupModalClose(modalOverlay, modalContent);
    }

    function createImageModal(laptopName, infoOverlay, infoContent) {
        // Ocultar modal de información
        infoOverlay.classList.remove('active');
        
        const imageOverlay = document.createElement('div');
        imageOverlay.className = 'image-modal-overlay';

        const imageContent = document.createElement('div');
        imageContent.className = 'image-modal-content';

        // Agregar título y botón de cerrar
        const modalHeader = document.createElement('div');
        modalHeader.className = 'image-modal-header';
        modalHeader.innerHTML = `
            <h3>${laptopName}</h3>
            <button class="close-image-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const image = document.createElement('img');
        image.src = laptopImages[laptopName];
        image.alt = laptopName;

        imageContent.appendChild(modalHeader);
        imageContent.appendChild(image);
        imageOverlay.appendChild(imageContent);
        document.body.appendChild(imageOverlay);

        requestAnimationFrame(() => {
            imageOverlay.classList.add('active');
            imageContent.classList.add('active');
        });

        // Función para cerrar modal de imagen y mostrar información
        const closeImageModal = () => {
            imageOverlay.classList.remove('active');
            imageContent.classList.remove('active');
            
            setTimeout(() => {
                document.body.removeChild(imageOverlay);
                // Mostrar nuevamente el modal de información
                infoOverlay.classList.add('active');
                infoContent.classList.add('active');
            }, 300);
        };

        // Cerrar al hacer clic en el botón o fuera de la imagen
        modalHeader.querySelector('.close-image-btn').addEventListener('click', closeImageModal);
        imageOverlay.addEventListener('click', (e) => {
            if (e.target === imageOverlay) {
                closeImageModal();
            }
        });

        // Cerrar con ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeImageModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Configurar los botones de información
    const cards = document.querySelectorAll('.component-card');
    cards.forEach(card => {
        const infoBtn = card.querySelector('.info-btn');
        if (infoBtn) {
            infoBtn.addEventListener('click', () => createInfoModal(card));
        }
    });

    // Actualizar lista de selectores a ignorar para el sidebar
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

    document.addEventListener('click', (e) => {
        const shouldIgnore = commonIgnoreSelectors.some(selector => 
            e.target.closest(selector) !== null
        );

        if (!shouldIgnore && !sidebar?.contains(e.target)) {
            toggleMenu();
        }
    });
});

// Actualizar la función setupModalClose
function setupModalClose(overlay, content) {
    const closeInfoModal = () => {
        overlay.classList.remove('active');
        content.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    };

    // Cerrar al hacer clic fuera
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeInfoModal();
        }
    });

    // Agregar botón de cerrar al modal de información
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    content.insertBefore(closeBtn, content.firstChild);
    
    closeBtn.addEventListener('click', closeInfoModal);

    // Cerrar con ESC
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeInfoModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}