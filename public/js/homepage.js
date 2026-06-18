let currentSlide = 0;
let bannerInterval;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    slides[currentSlide].classList.remove('active');
    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    slides[currentSlide].classList.add('active');
}

function startBannerInterval() {
    clearInterval(bannerInterval);
    bannerInterval = setInterval(() => changeSlide(1), 5000);
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// ==========================================
// INTEGRAÇÃO COM BANCO DE DADOS (API)
// ==========================================

const API_URL = 'http://localhost:3000/api';

async function fetchGames() {
    try {
        const response = await fetch(`${API_URL}/jogos`);
        if (!response.ok) throw new Error('Falha ao buscar os jogos do servidor.');

        const jogos = await response.json();
        
        renderBanner(jogos);
        renderGames(jogos);
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('games-container').innerHTML = '<p style="color: white; text-align: center;">Erro ao carregar o catálogo de jogos.</p>';
    }
}

function renderBanner(jogos) {
    const bannerSlider = document.getElementById('banner-slider');
    
    // Remove os elementos de slide antigos caso existam, preservando os botões de navegação
    const existingSlides = bannerSlider.querySelectorAll('.slide');
    existingSlides.forEach(slide => slide.remove());

    // Seleciona até 3 jogos que possuem imagem de capa para compor o banner rotativo
    const jogosBanner = jogos.filter(j => j.cover).slice(0, 3);

    if (jogosBanner.length === 0) {
        // Slide padrão de segurança caso a tabela JOGOS esteja vazia
        const placeholderSlide = document.createElement('div');
        placeholderSlide.className = 'slide active';
        placeholderSlide.innerHTML = `<img src="../src/templates/assets/cover/site_logo.png" alt="Nenhum jogo disponível">`;
        bannerSlider.insertBefore(placeholderSlide, bannerSlider.querySelector('.prev'));
        return;
    }

    jogosBanner.forEach((game, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = index === 0 ? 'slide active' : 'slide';
        slideDiv.style.cursor = 'pointer';
        
        // Redireciona o usuário para a página de detalhes correspondente ao clicar no banner
        slideDiv.onclick = () => {
            window.location.href = `jogo.html?id=${game.id}`;
        };

        slideDiv.innerHTML = `<img src="${game.cover}" alt="${game.titulo}">`;
        
        // Insere o slide antes do botão de navegação anterior ('prev')
        bannerSlider.insertBefore(slideDiv, bannerSlider.querySelector('.prev'));
    });

    currentSlide = 0;
    startBannerInterval();
}

function formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function renderGames(jogos) {
    const container = document.getElementById('games-container');
    container.innerHTML = '';

    jogos.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.style.cursor = "pointer";

        card.onclick = () => {
            window.location.href = `jogo.html?id=${game.id}`;
        };

        const temDesconto = game.desconto && parseFloat(game.desconto) > 0;
        const promoHTML = temDesconto ? `<span class="promo-badge">-${parseFloat(game.desconto)}%</span>` : '';
        const imgSrc = game.cover ? game.cover : 'media/home/placeholder.jpg';

        let precoFinal = parseFloat(game.preco);
        let precoHTML = `<p class="price">${formatPrice(precoFinal)}</p>`;

        if (temDesconto) {
            const valorDesconto = precoFinal * (parseFloat(game.desconto) / 100);
            precoFinal -= valorDesconto;
            precoHTML = `
                <span style="text-decoration: line-through; font-size: 0.8em; color: #aaa;">${formatPrice(game.preco)}</span>
                <p class="price">${formatPrice(precoFinal)}</p>
            `;
        }

        card.innerHTML = `
            ${promoHTML}
            <img src="${imgSrc}" alt="${game.titulo}" style="width: 100%; border-radius: 8px;">
            <h3>${game.titulo}</h3>
            ${precoHTML}
        `;
        container.appendChild(card);
    });
}

if (!window.location.pathname.includes("jogo.html")) {
    window.onload = fetchGames;
}