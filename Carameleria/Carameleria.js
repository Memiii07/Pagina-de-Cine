document.addEventListener('DOMContentLoaded', function() {
    // ========== SECCIÓN EXISTENTE DEL LOGIN MODAL ==========
    // 1. Elementos del DOM
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const goToRegister = document.getElementById('goToRegister');
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const headerLoginBtn = document.getElementById('header-login-btn');

    // 2. Función para abrir el modal
    function openLoginModal() {
        if(loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if(loginForm) loginForm.reset();
            if(emailError) {
                emailError.textContent = '';
                emailError.style.display = 'none';
            }
            if(passwordError) {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }
            if(emailInput) emailInput.parentElement.classList.remove('error', 'success');
            if(passwordInput) passwordInput.parentElement.classList.remove('error', 'success');
        }
    }

    // 3. Asignar evento al botón del header
    if(headerLoginBtn) {
        headerLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }

    // 4. Validación en tiempo real
    if(emailInput) emailInput.addEventListener('input', validateEmail);
    if(passwordInput) passwordInput.addEventListener('input', validatePassword);
    
    // 5. Función para validar email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(email === '') {
            showError(emailInput, emailError, 'El correo electrónico es requerido');
            return false;
        } else if(!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Por favor ingresa un correo válido');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }
    
    // 6. Función para validar contraseña
    function validatePassword() {
        const password = passwordInput.value.trim();
        
        if(password === '') {
            showError(passwordInput, passwordError, 'La contraseña es requerida');
            return false;
        } else if(password.length < 6) {
            showError(passwordInput, passwordError, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        } else {
            showSuccess(passwordInput, passwordError);
            return true;
        }
    }
    
    // 7. Mostrar mensaje de error
    function showError(input, errorElement, message) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('success');
        inputGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // 8. Mostrar éxito (validación correcta)
    function showSuccess(input, errorElement) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error');
        inputGroup.classList.add('success');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // 9. Manejar el envío del formulario
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            
            if(isEmailValid && isPasswordValid) {
                if(loginModal) loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                window.location.href = "/Pagina Principal/PgPrincipal.html";
            }
        });
    }
    
    // 10. Cerrar modal
    if(closeLogin) {
        closeLogin.addEventListener('click', function() {
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // 11. Cerrar al hacer clic fuera del modal
    if(loginModal) {
        loginModal.addEventListener('click', function(e) {
            if(e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 12. Ir a registro
    if(goToRegister) {
        goToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            window.location.href = "/Registro/Registro.html";
        });
    }

    // 13. Carga dinámica del modal
    if(!loginModal) {
        fetch('modal-login.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('modal-container').innerHTML = html;
                initializeModal();
            })
            .catch(error => console.error('Error al cargar el modal:', error));
    }

// ========== SECCIÓN DE CARAMELERÍA MEJORADA ==========
    // 1. Elementos del DOM para caramelería
    const floatingCart = document.getElementById('floatingCart');
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const categoriaLinks = document.querySelectorAll('.categoria-link');
    
    // Nuevos elementos para el modal del carrito
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // 2. Variables de estado
    let cartCount = 0;
    let cartItems = [];

    // 3. Sistema de contadores (se mantiene igual)
    document.querySelectorAll('.producto-card').forEach(card => {
        const menosBtn = card.querySelector('.menos');
        const masBtn = card.querySelector('.mas');
        const cantidadElement = card.querySelector('.cantidad');
        
        cantidadElement._cantidad = 0;
        cantidadElement.textContent = '0';
        
        menosBtn.addEventListener('click', () => {
            if (cantidadElement._cantidad > 0) {
                cantidadElement._cantidad--;
                cantidadElement.textContent = cantidadElement._cantidad;
            }
        });
        
        masBtn.addEventListener('click', () => {
            cantidadElement._cantidad++;
            cantidadElement.textContent = cantidadElement._cantidad;
        });
    });

    // 4. Función para renderizar los items del carrito
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            cartTotalElement.textContent = '$0.00';
            return;
        }
        
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h3>${item.nombre}</h3>
                    <p>${item.cantidad} x $${item.precio.toFixed(2)}</p>
                </div>
                <div class="cart-item-subtotal">
                    $${(item.precio * item.cantidad).toFixed(2)}
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.precio * item.cantidad;
        });
        
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // 5. Función para añadir al carrito (se mantiene igual)
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.producto-card');
            const cantidadElement = card.querySelector('.cantidad');
            const cantidad = cantidadElement._cantidad;
            const productoNombre = card.querySelector('.producto-nombre').textContent;
            const productoPrecio = parseFloat(card.querySelector('.producto-precio').textContent.replace('$', ''));
            
            if (cantidad > 0) {
                // Actualizar contador del carrito
                cartCount += cantidad;
                cartCountElement.textContent = cartCount;
                
                // Añadir/actualizar producto en el carrito
                const existingItem = cartItems.find(item => item.nombre === productoNombre);
                if (existingItem) {
                    existingItem.cantidad += cantidad;
                } else {
                    cartItems.push({
                        nombre: productoNombre,
                        precio: productoPrecio,
                        cantidad: cantidad
                    });
                }
                
                // Animación de añadir al carrito
                const productoImg = card.querySelector('.producto-img');
                const imgClone = productoImg.cloneNode(true);
                Object.assign(imgClone.style, {
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid #ce0728',
                    zIndex: '1000',
                    transition: 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)'
                });

                const rect = productoImg.getBoundingClientRect();
                imgClone.style.left = `${rect.left}px`;
                imgClone.style.top = `${rect.top}px`;
                
                document.body.appendChild(imgClone);
                
                const floatingCartRect = floatingCart.getBoundingClientRect();
                const targetX = floatingCartRect.left + floatingCartRect.width / 2 - 50;
                const targetY = floatingCartRect.top + floatingCartRect.height / 2 - 50;
                
                setTimeout(() => {
                    Object.assign(imgClone.style, {
                        left: `${targetX}px`,
                        top: `${targetY}px`,
                        width: '0',
                        height: '0',
                        opacity: '0'
                    });
                }, 10);
                
                setTimeout(() => {
                    document.body.removeChild(imgClone);
                    floatingCart.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        floatingCart.style.transform = 'scale(1)';
                    }, 300);
                }, 600);
                
                // Resetear contador
                cantidadElement._cantidad = 0;
                cantidadElement.textContent = '0';
                
                // Actualizar modal del carrito si está abierto
                if (cartModal.style.display === 'block') {
                    renderCartItems();
                }
            }
        });
    });

    // 6. Manejo del modal del carrito (MODIFICADO según lo solicitado)
    floatingCart.addEventListener('click', function(e) {
        e.preventDefault();
        renderCartItems();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Eliminamos cualquier llamada a openLoginModal() que estuviera aquí antes
    });

    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 7. Configuración del botón comprar (MODIFICADO según lo solicitado)
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de comprar.');
            return;
        }
        
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        openLoginModal(); // Esta es tu función existente para abrir el login
    });
    
    // 5. Navegación por categorías
    categoriaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            categoriaLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 7. Actualizar categoría activa al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 120;
        
        document.querySelectorAll('.productos-section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                categoriaLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Función global para abrir el modal desde cualquier lugar
window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};