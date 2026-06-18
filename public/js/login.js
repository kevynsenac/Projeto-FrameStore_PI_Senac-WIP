const API_URL = 'http://localhost:3000/api';

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

// Lógica de Autenticação na API
async function realizarLogin(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || 'Credenciais inválidas. Tente novamente.');
            return;
        }

        // Sucesso no login: salva dados na sessão e vai para o perfil
        localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
        window.location.href = 'perfil.html';

    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Não foi possível conectar ao servidor. Verifique se a API está rodando.');
    }
}

// Função realizarCadastro conectada à API
async function realizarCadastro(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const senha = document.getElementById('register-password').value;
    // O HTML atual não tem campo de nome, usaremos o prefixo do email como nome padrão provisório
    const nome = email.split('@')[0]; 

    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || 'Erro ao criar conta.');
            return;
        }

        alert('Conta criada com sucesso! Faça login para continuar.');
        showTab('login'); // Retorna o usuário para a aba de login

    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Não foi possível conectar ao servidor.');
    }
}