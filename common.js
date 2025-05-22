document.addEventListener('DOMContentLoaded', () => {
    // Configuración común para todas las páginas
    const commonConfig = {
        init() {
            this.setupMenu();
            this.setupModals();
            this.setupGoogleAuth();
            this.setupAutoRefresh();
            this.checkSession();
        },

        setupMenu() {
            // Agregar botón de menú
            const menuButton = document.createElement('button');
            menuButton.className = 'menu-toggle';
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            menuButton.onclick = this.toggleMenu;
            document.body.appendChild(menuButton);
        },

        toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');

            // Cerrar al hacer clic en enlaces
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 1024) {
                        sidebar.classList.remove('active');
                    }
                });
            });

            // Cerrar al hacer scroll
            window.addEventListener('scroll', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                }
            });
        },

        setupModals() {
            // Configurar modales de información
            document.querySelectorAll('.component-card').forEach(card => {
                const infoBtn = card.querySelector('.info-btn');
                if (infoBtn) {
                    infoBtn.addEventListener('click', () => this.createModal(card));
                }
            });
        },

        createModal(card) {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const title = card.querySelector('.card-header h4').textContent;
            const icon = card.querySelector('.card-header i').cloneNode(true);
            const infoContent = card.querySelector('.info-details, .info-content');

            if (infoContent) {
                const contentClone = infoContent.cloneNode(true);
                contentClone.style.display = 'block';

                modalContent.innerHTML = `
                    <div class="modal-header">
                        ${icon.outerHTML}
                        <h3>${title}</h3>
                    </div>
                `;

                modalContent.appendChild(contentClone);
                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);

                requestAnimationFrame(() => {
                    modalOverlay.classList.add('active');
                    modalContent.classList.add('active');
                });

                this.setupModalClose(modalOverlay, modalContent);
            }
        },

        setupModalClose(overlay, content) {
            // Cerrar al hacer clic fuera
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay, content);
                }
            });

            // Cerrar con ESC
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    this.closeModal(overlay, content);
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        },

        closeModal(overlay, content) {
            overlay.classList.remove('active');
            content.classList.remove('active');
            
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        },

        setupGoogleAuth() {
            if (document.getElementById('googleSignIn')) {
                gapi.load('auth2', () => {
                    gapi.auth2.init({
                        client_id: "32579672627-<resto>.apps.googleusercontent.com"
                    }).then(() => {
                        google.accounts.id.renderButton(
                            document.getElementById("googleSignIn"),
                            { theme: "outline", size: "large", width: 250 }
                        );
                    });
                });
            }
        },

        setupAutoRefresh() {
            if (window.CommentSystem) {
                new CommentSystem();
            }
        },

        checkSession() {
            const savedUser = localStorage.getItem('currentUser');
            const savedSession = localStorage.getItem('sessionActive');
            
            if (savedUser && savedSession === 'true') {
                this.updateUI(true);
            }
        },

        updateUI(isLoggedIn) {
            const loginSection = document.getElementById('loginSection');
            const commentSection = document.getElementById('commentSection');
            const userDisplay = document.getElementById('userDisplay');

            if (loginSection) loginSection.style.display = isLoggedIn ? 'none' : 'block';
            if (commentSection) commentSection.style.display = isLoggedIn ? 'block' : 'none';
            if (userDisplay && isLoggedIn) {
                userDisplay.textContent = `Usuario: ${localStorage.getItem('currentUser')}`;
            }
        }
    };

    // Inicializar configuración común
    commonConfig.init();
});