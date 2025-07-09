document.addEventListener('DOMContentLoaded', function() {
    // ========== FUNCIONALIDAD PARA LOGIN (EXISTENTE) ==========
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

    // Función para abrir el modal de login (existente)
    window.openLoginModal = function() {
        if(loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetLoginForm();
        }
    };

    // Resetear formulario login (existente)
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

    // Eventos para abrir modal (existente)
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

    // Validación login (existente)
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
    
    // Submit login (existente)
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

// ========== FUNCIONALIDAD PARA "OLVIDÉ MI CONTRASEÑA" ==========
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');

    // Validación en tiempo real
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmailForgot);
    phoneInput.addEventListener('input', validatePhone);

    function validateUsername() {
        const username = usernameInput.value.trim();
        if (username === '') {
            showError(usernameInput, usernameError, 'El nombre de usuario es requerido');
            return false;
        } else if (username.length < 4) {
            showError(usernameInput, usernameError, 'Mínimo 4 caracteres');
            return false;
        } else {
            showSuccess(usernameInput, usernameError);
            return true;
        }
    }

    function validateEmailForgot() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError(emailInput, emailError, 'El correo es requerido');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Ingresa un correo válido (ej: usuario@dominio.com)');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }

    function validatePhone() {
        const phone = phoneInput.value.trim();
        const phoneRegex = /^[+]?[0-9\s-]{8,15}$/; // Solo números, +, espacios o guiones
        if (phone === '') {
            showError(phoneInput, phoneError, 'El teléfono es requerido');
            return false;
        } else if (!phoneRegex.test(phone)) {
            showError(phoneInput, phoneError, 'Solo números, +, espacios o guiones');
            return false;
        } else {
            showSuccess(phoneInput, phoneError);
            return true;
        }
    }

    // Envío del formulario
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmailForgot();
        const isPhoneValid = validatePhone();

        if (isUsernameValid && isEmailValid && isPhoneValid) {
            alert('Instrucciones enviadas. Revisa tu correo electrónico.');
            window.location.href = "/Pagina Principal/PgPrincipal.html"; // Redirige si es necesario
        }
    });
}

// ========== FUNCIONES COMPARTIDAS ==========
function showError(input, errorElement, message) {
    input.style.borderColor = '#ce0728'; // Borde rojo
    input.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showSuccess(input, errorElement) {
    input.style.borderColor = '#4CAF50'; // Borde verde
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}
    // Cerrar modal (existente)
    if(closeLogin) {
        closeLogin.addEventListener('click', function() {
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Cerrar al hacer clic fuera (existente)
    if(loginModal) {
        loginModal.addEventListener('click', function(e) {
            if(e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Ir a registro desde login (existente)
    if(goToRegister) {
        goToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if(loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            window.location.href = "/Registro/Registro.html";
        });
    }
});