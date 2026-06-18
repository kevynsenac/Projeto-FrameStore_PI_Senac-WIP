function showTab(tabName) {
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');
    const btnLogin = document.getElementById('btn-login');
    const btnRegister = document.getElementById('btn-register');

    if (tabName === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        btnLogin.classList.replace('inactive', 'active');
        btnRegister.classList.replace('active', 'inactive');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        btnLogin.classList.replace('active', 'inactive');
        btnRegister.classList.replace('inactive', 'active');
    }
}

function togglePassword(inputId, eyeId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeId);

    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
