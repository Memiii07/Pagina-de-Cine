document.addEventListener('DOMContentLoaded', function() {
    // ========== FUNCIONALIDAD PARA LOGIN ==========
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const goToRegister = document.getElementById('goToRegister');
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginEmailError = document.getElementById('email-error');
    const loginPasswordError = document.getElementById('password-error');
    const headerLoginBtn = document.getElementById('header-login-btn');
    const openLoginModalLink = document.getElementById('openLoginModal');

    // Función para abrir el modal de login
    window.openLoginModal = function() {
        if(loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetLoginForm();
        }
    };

    // Función para resetear el formulario de login
    function resetLoginForm() {
        if(loginForm) loginForm.reset();
        if(loginEmailError) {
            loginEmailError.textContent = '';
            loginEmailError.style.display = 'none';
        }
        if(loginPasswordError) {
            loginPasswordError.textContent = '';
            loginPasswordError.style.display = 'none';
        }
        if(loginEmailInput) loginEmailInput.parentElement.classList.remove('error', 'success');
        if(loginPasswordInput) loginPasswordInput.parentElement.classList.remove('error', 'success');
    }

    // Asignar eventos para abrir el modal
    if(headerLoginBtn) {
        headerLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }

    if(openLoginModalLink) {
        openLoginModalLink.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }

    // Validación en tiempo real para login
    if(loginEmailInput) loginEmailInput.addEventListener('input', validateLoginEmail);
    if(loginPasswordInput) loginPasswordInput.addEventListener('input', validateLoginPassword);
    
    function validateLoginEmail() {
        const email = loginEmailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(email === '') {
            showError(loginEmailInput, loginEmailError, 'El correo electrónico es requerido');
            return false;
        } else if(!emailRegex.test(email)) {
            showError(loginEmailInput, loginEmailError, 'Por favor ingresa un correo válido');
            return false;
        } else {
            showSuccess(loginEmailInput, loginEmailError);
            return true;
        }
    }
    
    function validateLoginPassword() {
        const password = loginPasswordInput.value.trim();
        
        if(password === '') {
            showError(loginPasswordInput, loginPasswordError, 'La contraseña es requerida');
            return false;
        } else if(password.length < 6) {
            showError(loginPasswordInput, loginPasswordError, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        } else {
            showSuccess(loginPasswordInput, loginPasswordError);
            return true;
        }
    }
    
    // Manejar envío del formulario de login
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isEmailValid = validateLoginEmail();
            const isPasswordValid = validateLoginPassword();
            
            if(isEmailValid && isPasswordValid) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                window.location.href = "/Pagina Principal/PgPrincipal.html";
            }
        });
    }

    // ========== FUNCIONALIDAD PARA REGISTRO ==========
    const registerForm = document.getElementById('registerForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');

    // Validación en tiempo real para registro
    if(nombreInput) nombreInput.addEventListener('input', validateNombre);
    if(emailInput) emailInput.addEventListener('input', validateEmail);
    if(passwordInput) passwordInput.addEventListener('input', validatePassword);
    if(confirmInput) confirmInput.addEventListener('input', validateConfirmPassword);

    function validateNombre() {
        const nombre = nombreInput.value.trim();
        
        if(nombre === '') {
            showError(nombreInput, nombreError, 'El nombre completo es requerido');
            return false;
        } else if(nombre.length < 3) {
            showError(nombreInput, nombreError, 'El nombre debe tener al menos 3 caracteres');
            return false;
        } else {
            showSuccess(nombreInput, nombreError);
            return true;
        }
    }
    
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
    
    function validatePassword() {
        const password = passwordInput.value.trim();
        
        if(password === '') {
            showError(passwordInput, passwordError, 'La contraseña es requerida');
            return false;
        } else if(password.length < 8) {
            showError(passwordInput, passwordError, 'La contraseña debe tener al menos 8 caracteres');
            return false;
        } else {
            showSuccess(passwordInput, passwordError);
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const confirm = confirmInput.value.trim();
        const password = passwordInput.value.trim();
        
        if(confirm === '') {
            showError(confirmInput, confirmError, 'Por favor confirma tu contraseña');
            return false;
        } else if(confirm !== password) {
            showError(confirmInput, confirmError, 'Las contraseñas no coinciden');
            return false;
        } else {
            showSuccess(confirmInput, confirmError);
            return true;
        }
    }

    // Manejar envío del formulario de registro
    if(registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNombreValid = validateNombre();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmValid = validateConfirmPassword();
            
            if(isNombreValid && isEmailValid && isPasswordValid && isConfirmValid) {
                // Aquí iría la lógica para enviar los datos del registro
                window.location.href = "/Pagina Principal/PgPrincipal.html";
            }
        });
    }

    // ========== FUNCIONES COMPARTIDAS ==========
    function showError(input, errorElement, message) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('success');
        inputGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function showSuccess(input, errorElement) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error');
        inputGroup.classList.add('success');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Cerrar modal
    if(closeLogin) {
        closeLogin.addEventListener('click', function() {
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Cerrar al hacer clic fuera del modal
    if(loginModal) {
        loginModal.addEventListener('click', function(e) {
            if(e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Ir a registro desde el modal de login
    if(goToRegister) {
        goToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            window.location.href = "/Registro/Registro.html";
        });
    }
});