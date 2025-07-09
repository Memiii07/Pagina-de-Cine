document.addEventListener('DOMContentLoaded', function() {
    // 1. Elementos del DOM
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const goToRegister = document.getElementById('goToRegister');
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const headerLoginBtn = document.getElementById('header-login-btn'); // Botón en el header

    // 2. Función para abrir el modal
    function openLoginModal() {
        if(loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Deshabilitar scroll
            // Limpiar formulario y errores al abrir
            if(loginForm) loginForm.reset();
            if(emailError) {
                emailError.textContent = '';
                emailError.style.display = 'none';
            }
            if(passwordError) {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }
            // Remover clases de error
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
            
            // Validar campos
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            
            if(isEmailValid && isPasswordValid) {
                // Cerrar el modal
                if(loginModal) loginModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restaurar scroll
                
                // Redirigir a la página principal
                window.location.href = "/Pagina Principal/PgPrincipal.html";
            }
        });
    }
    
    // 10. Cerrar modal
    if(closeLogin) {
        closeLogin.addEventListener('click', function() {
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaurar scroll
        });
    }
    
    // 11. Cerrar al hacer clic fuera del modal
    if(loginModal) {
        loginModal.addEventListener('click', function(e) {
            if(e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restaurar scroll
            }
        });
    }
    
    // 12. Ir a registro
    if(goToRegister) {
        goToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaurar scroll
            window.location.href = "/Registro/Registro.html";
        });
    }

    // 13. Si usas fetch para cargar el modal dinámicamente
    if(!loginModal) {
        fetch('modal-login.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('modal-container').innerHTML = html;
                // Volver a ejecutar este script para asignar eventos
                initializeModal();
            })
            .catch(error => console.error('Error al cargar el modal:', error));
    }
});

// Función global para abrir el modal desde cualquier lugar
window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};