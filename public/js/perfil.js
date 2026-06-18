const API_URL = 'http://localhost:3000/api';
let usuarioLogado = null;

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('closed');
}

// Controle visual de abas
function switchTab(tabId) {
    // Atualiza botões
    document.querySelectorAll('.tab-profile').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('inactive');
    });
    event.target.classList.add('active');
    event.target.classList.remove('inactive');

    // Atualiza conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

// Verifica se o usuário está logado
function verificarAutenticacao() {
    const userStr = localStorage.getItem('usuarioLogado');
    if (!userStr) {
        // Redireciona para o login caso não exista sessão
        window.location.href = 'login.html';
        return false;
    }
    usuarioLogado = JSON.parse(userStr);
    return true;
}

function formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Carrega os dados básicos de cabeçalho e Minha Conta
function carregarDadosUsuario() {
    document.getElementById('nome-usuario').innerText = `Olá, ${usuarioLogado.nome}`;
    document.getElementById('email-usuario').innerHTML = `<i class="fas fa-user"></i> ${usuarioLogado.email}`;
    document.getElementById('saldo-usuario').innerText = formatPrice(usuarioLogado.saldo);
    document.getElementById('pontos-usuario').innerHTML = `${usuarioLogado.pontos} <i class="fas fa-star" style="font-size: 1.2rem;"></i>`;

    // Revela botão do painel administrativo se o usuário possuir privilégios
    if (usuarioLogado.adm) {
        document.getElementById('admin-panel-container').style.display = 'block';
    }
}

// Busca a biblioteca de jogos do backend
async function carregarBiblioteca() {
    try {
        const response = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/biblioteca`);
        if (!response.ok) throw new Error('Falha ao carregar biblioteca');
        
        const jogos = await response.json();
        const container = document.getElementById('biblioteca-container');
        container.innerHTML = '';

        if (jogos.length === 0) {
            container.innerHTML = '<p>Você ainda não possui jogos na sua biblioteca.</p>';
            return;
        }

        jogos.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.style.cursor = "pointer";
            
            // Permite acessar a página do jogo para ver detalhes/jogar
            card.onclick = () => window.location.href = `jogo.html?id=${game.id}`;

            const imgSrc = game.cover ? game.cover : '../src/templates/assets/cover/site_logo.png';
            const dataCompra = new Date(game.data_compra).toLocaleDateString('pt-BR');

            card.innerHTML = `
                <img src="${imgSrc}" alt="${game.titulo}" style="width: 100%; border-radius: 8px;">
                <h3>${game.titulo}</h3>
                <p style="font-size: 0.8rem; color: #a5b1c2;">Adquirido em: ${dataCompra}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        document.getElementById('biblioteca-container').innerHTML = '<p>Erro ao carregar os jogos.</p>';
    }
}

// Busca os cupons do usuário
async function carregarCupons() {
    try {
        const response = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/cupons`);
        if (!response.ok) throw new Error('Falha ao carregar cupons');

        const cupons = await response.json();
        const container = document.getElementById('cupons-container');
        container.innerHTML = '';

        if (cupons.length === 0) {
            container.innerHTML = '<p>Você não possui cupons na sua carteira.</p>';
            return;
        }

        cupons.forEach(cupom => {
            const status = cupom.usado ? "Usado" : "Disponível";
            const classUsado = cupom.usado ? "usado" : "";
            
            const li = document.createElement('li');
            li.className = `coupon-item ${classUsado}`;
            li.innerHTML = `
                <div>
                    <strong>${cupom.nome}</strong>
                    <p style="font-size: 0.9rem; color: #ccc; margin: 5px 0 0 0;">${cupom.tipo}</p>
                </div>
                <div style="text-align: right;">
                    <span style="display: block; font-size: 1.2rem; color: #fff; font-weight: bold;">- R$ ${cupom.desconto}</span>
                    <span style="font-size: 0.8rem;">Status: ${status}</span>
                </div>
            `;
            container.appendChild(li);
        });

    } catch (error) {
        console.error(error);
        document.getElementById('cupons-container').innerHTML = '<p>Erro ao carregar cupons.</p>';
    }
}

function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}

// Execução inicial
window.onload = () => {
    if (verificarAutenticacao()) {
        carregarDadosUsuario();
        carregarBiblioteca();
        carregarCupons();
    }
};