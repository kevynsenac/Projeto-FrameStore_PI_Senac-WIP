const API_URL_JOGO = 'http://localhost:3000/api';
let galeria = [];
let imagemAtualIndex = 0;
let jogoAtual = null;

async function carregarDetalhesJogo() {
    const urlParams = new URLSearchParams(window.location.search);
    const jogoId = urlParams.get('id');

    if (!jogoId) {
        document.querySelector('.game-title').innerText = "Jogo não encontrado.";
        return;
    }

    try {
        const response = await fetch(`${API_URL_JOGO}/jogos/${jogoId}`);
        if (!response.ok) throw new Error('Falha ao buscar detalhes do jogo.');

        jogoAtual = await response.json();
        renderizarDetalhes(jogoAtual);
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector('.game-title').innerText = "Erro ao carregar os dados.";
    }
}

function formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function renderizarDetalhes(game) {
    document.querySelector('.game-title').innerText = game.titulo;
    
    let precoFinal = parseFloat(game.preco);
    const temDesconto = game.desconto && parseFloat(game.desconto) > 0;
    const priceSection = document.querySelector('.price-section');
    
    if (temDesconto) {
        precoFinal -= precoFinal * (parseFloat(game.desconto) / 100);
        priceSection.innerHTML = `
            <span style="text-decoration: line-through; font-size: 0.6em; color: #aaa; display: block;">${formatPrice(game.preco)}</span>
            <span class="value">${formatPrice(precoFinal)}</span>
        `;
    } else {
        priceSection.innerHTML = `<span class="value">${formatPrice(precoFinal)}</span>`;
    }

    if (game.platform) {
        document.getElementById('game-platform').innerText = game.platform;
    }

    // Filtra campos nulos e constrói o array da galeria a partir das colunas do DB
    galeria = [game.cover, game.screenshot1, game.screenshot2, game.screenshot3].filter(img => img != null && img !== '');
    
    if (galeria.length === 0) {
        galeria = ['media/home/placeholder.jpg'];
    }

    const thumbContainer = document.querySelector('.thumb-list');
    thumbContainer.innerHTML = '';

    galeria.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = index === 0 ? "thumb active" : "thumb";
        img.onclick = () => selectImg(imgSrc, index);
        thumbContainer.appendChild(img);
    });

    selectImg(galeria[0], 0);
}

function selectImg(src, index) {
    const mainImg = document.getElementById('current-img');
    if (mainImg) {
        mainImg.src = src;
        imagemAtualIndex = index;

        const thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach(t => t.classList.remove('active'));
        if (thumbs[index]) thumbs[index].classList.add('active');
    }
}

function moveGallery(step) {
    if (galeria.length === 0) return;
    
    imagemAtualIndex += step;
    if (imagemAtualIndex >= galeria.length) imagemAtualIndex = 0;
    if (imagemAtualIndex < 0) imagemAtualIndex = galeria.length - 1;

    selectImg(galeria[imagemAtualIndex], imagemAtualIndex);
}

function adicionarAoCarrinho() {
    if (!jogoAtual) return;

    const titulo = jogoAtual.titulo;
    const precoText = document.querySelector('.price-section .value').innerText;
    const imagem = galeria[0];
    const listaItens = document.getElementById('cart-items-list');

    const itensNoCarrinho = listaItens.querySelectorAll('.cart-item-title');
    let jogoJaAdicionado = false;

    itensNoCarrinho.forEach(item => {
        if (item.innerText === titulo) jogoJaAdicionado = true;
    });

    if (jogoJaAdicionado) {
        alert("Este jogo já está no seu carrinho!");
        document.getElementById('cart-modal').style.display = 'block';
        return; 
    }

    const itemHTML = `
        <div class="cart-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border-bottom: 1px solid #444; padding-bottom: 5px;">
            <img src="${imagem}" alt="${titulo}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
            <div>
                <p style="margin: 0;"><strong class="cart-item-title">${titulo}</strong></p>
                <p style="color: #00ff00; margin: 0;">${precoText}</p>
            </div>
        </div>
    `;

    listaItens.innerHTML += itemHTML;
    
    // Atualiza o total visual do carrinho (Para simplificar, exibe o preço do item adicionado. A lógica completa somaria os valores)
    document.getElementById('cart-total-value').innerText = precoText;
    document.getElementById('cart-modal').style.display = 'block';
}

function fecharCarrinho() {
    document.getElementById('cart-modal').style.display = 'none';
}

window.onload = carregarDetalhesJogo;