document.addEventListener('DOMContentLoaded', () => {
    let currentInfoModal = null;

    // Objeto con las rutas de las imágenes
    const phoneImages = {
        'iPhone 15 Pro Max': 'iPhone 15 Pro Max.jpg',
        'Samsung Galaxy S24 Ultra': 'Samsung Galaxy S24 Ultra.jpg',
        'Google Pixel 8 Pro': 'Google Pixel 8 Pro.png',
        'Xiaomi 14 Pro': 'Xiaomi 14 Pro.jpg',
        'OPPO Find X7 Ultra': 'OPPO Find X7 Ultra.jpg',
        'OnePlus 12': 'OnePlus 12.png',
        'vivo X100 Pro': 'vivo x100 pro.jpeg',
        'ASUS ROG Phone 8 Pro': 'ASUS ROG Phone 8 Pro.jpg',
        'Sony Xperia 1 V': 'Sony Xperia 1 V.png',
        'Huawei P70 Pro': 'Huawei P70 Pro.jpeg',
        // ...resto de modelos de gama alta
        
        // Gama Media
        'Samsung Galaxy A54': 'Samsung Galaxy A54.jpg',
        'Redmi Note 13 Pro+': 'Redmi Note 13 Pro+.jpg',
        'Nothing Phone (2)': 'Nothing Phone (2.jpg',
        'OnePlus Nord 3': 'OnePlus Nord 3.jpg',
        'POCO F5': 'POCO F5.jpg',
        'Realme 11 Pro+': 'Realme 11 Pro+.jpg',
        'Motorola Edge 40':'Motorola Edge 40.jpg',
        'vivo V29': 'vivo V29.png',
        'HONOR 90':'HONOR 90.jpeg',
        'Xiaomi POCO X6 Pro':'Xiaomi POCO X6 Pro.jpg',
        // ...resto de modelos de gama media
        
        // Gama Baja
        'Redmi 13C': 'Redmi 13C.jpg',
        'Samsung Galaxy A14': 'Samsung Galaxy A14.jpg',
        'Motorola Moto G14': 'Motorola Moto G14.jpg',
        'Realme C55': 'Realme C55.jpg',
        'POCO M6': 'POCO M6.jpg',
        'Infinix Hot 40': 'Infinix Hot 40.jpg',
        'Nokia G22': 'Nokia G22.jpg',
        'vivo Y27': 'vivo Y27.jpg',
        'HONOR X7b': 'HONOR X7b.jpg',
        'TCL 40 SE': 'TCL 40 SE.jpg',
        // ...resto de modelos de gama baja
    };

    function createInfoModal(card) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // Actualizar la creación del botón de cerrar
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-modal-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Función de cierre
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            modalContent.classList.remove('active');
            
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                document.body.style.overflow = '';
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modalContent.appendChild(closeBtn);

        // Obtener información de la tarjeta
        const title = card.querySelector('.card-header h4').textContent;
        const icon = card.querySelector('.card-header i').cloneNode(true);
        const infoContent = card.querySelector('.info-details, .info-content');

        // Crear encabezado del modal
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

            // Agregar botones "Ver imagen" a los modelos de smartphones
            const phoneItems = contentClone.querySelectorAll('li');
            phoneItems.forEach(item => {
                const phoneName = item.textContent.split('\n')[0].trim();
                if (phoneName in phoneImages) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'phone-item-wrapper';
                    
                    // Crear contenedor flex para el nombre y el botón
                    const flexContainer = document.createElement('div');
                    flexContainer.className = 'phone-flex-container';
                    
                    // Mantener el contenido original
                    const contentSpan = document.createElement('span');
                    contentSpan.className = 'phone-name';
                    contentSpan.innerHTML = item.innerHTML;
                    
                    // Crear botón de imagen
                    const viewButton = document.createElement('button');
                    viewButton.className = 'view-image-btn';
                    viewButton.innerHTML = `
                        <i class="fas fa-image"></i>
                        Ver imagen
                    `;
                    
                    // Agregar elementos al contenedor flex
                    flexContainer.appendChild(contentSpan);
                    flexContainer.appendChild(viewButton);
                    
                    // Reemplazar el contenido del item
                    item.innerHTML = '';
                    item.appendChild(flexContainer);

                    // Agregar evento al botón
                    viewButton.addEventListener('click', () => {
                        createImageModal(phoneName, modalOverlay, modalContent);
                    });
                }
            });
            
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(contentClone);
            modalOverlay.appendChild(modalContent);
            document.body.appendChild(modalOverlay);

            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';

            // Mostrar modal con animación
            requestAnimationFrame(() => {
                modalOverlay.classList.add('active');
                modalContent.classList.add('active');
            });

            // Configurar eventos de cierre
            setupModalClose(modalOverlay, modalContent);

            // Agregar evento para cerrar con ESC
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);

            // Agregar evento para cerrar al hacer clic fuera
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        }
    }

    function createImageModal(phoneName, infoOverlay, infoContent) {
        infoOverlay.classList.remove('active');
        
        const imageOverlay = document.createElement('div');
        imageOverlay.className = 'image-modal-overlay';

        const imageContent = document.createElement('div');
        imageContent.className = 'image-modal-content';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'image-modal-header';
        modalHeader.innerHTML = `
            <h3>${phoneName}</h3>
            <button class="close-image-btn">
                <i class="fas fa-times"></i>
            </button>
        `;

        const image = document.createElement('img');
        image.src = phoneImages[phoneName];
        image.alt = phoneName;

        imageContent.appendChild(modalHeader);
        imageContent.appendChild(image);
        imageOverlay.appendChild(imageContent);
        document.body.appendChild(imageOverlay);

        requestAnimationFrame(() => {
            imageOverlay.classList.add('active');
            imageContent.classList.add('active');
        });

        // Cerrar imagen y volver a información
        const closeImageBtn = modalHeader.querySelector('.close-image-btn');
        const closeImage = () => {
            imageOverlay.classList.remove('active');
            imageContent.classList.remove('active');
            
            setTimeout(() => {
                document.body.removeChild(imageOverlay);
                infoOverlay.classList.add('active');
            }, 300);
        };

        closeImageBtn.addEventListener('click', closeImage);
        imageOverlay.addEventListener('click', (e) => {
            if (e.target === imageOverlay) closeImage();
        });
    }

    // Configurar los botones de información
    const cards = document.querySelectorAll('.component-card');
    cards.forEach(card => {
        const infoBtn = card.querySelector('.info-btn');
        if (infoBtn) {
            infoBtn.addEventListener('click', () => createInfoModal(card));
        }
    });

    // Configuración de Google Sign-In
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: "32579672627-<resto>.apps.googleusercontent.com"
        }).then(() => {
            console.log('Autenticación de Google inicializada correctamente');
            
            // Renderizar el botón de Google
            google.accounts.id.renderButton(
                document.getElementById("googleSignIn"),
                { 
                    theme: "outline", 
                    size: "large",
                    width: 250 
                }
            );
        }).catch(error => {
            console.error('Error al inicializar Google Auth:', error);
        });
    });

    function toggleMenu() {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        sidebar.classList.toggle('active');
        
        // Cerrar menú al hacer clic en un enlace
        const menuLinks = document.querySelectorAll('.nav-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                }
            });
        });

        // Cerrar menú al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Agregar el botón de menú dinámicamente
    document.addEventListener('DOMContentLoaded', () => {
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.onclick = toggleMenu;
        document.body.appendChild(menuButton);
    });
});

function handleGoogleLogin(response) {
    const decoded = jwt_decode(response.credential);
    const email = decoded.email;
    
    if (email.endsWith('@gmail.com')) {
        // Login exitoso
        localStorage.setItem('currentUser', email);
        updateUI(true);
    } else {
        showError('Solo se permiten cuentas de Gmail');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function updateUI(isLoggedIn) {
    document.getElementById('loginSection').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('commentSection').style.display = isLoggedIn ? 'block' : 'none';
    if (isLoggedIn) {
        document.getElementById('userDisplay').textContent = `Usuario: ${localStorage.getItem('currentUser')}`;
    }
}

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