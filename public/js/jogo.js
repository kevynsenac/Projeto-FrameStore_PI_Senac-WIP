function adicionarAoCarrinho() {
    console.log("Botão comprar clicado!"); // Para você ver no F12 se está funcionando

    // 1. Pega os dados do jogo que estão na tela
    const tituloElement = document.querySelector('.game-title');
    const precoElement = document.querySelector('.value');
    const imagemElement = document.getElementById('current-img');
    const listaItens = document.getElementById('cart-items-list');

    // Verificação de segurança: se os elementos existem na tela
    if (!tituloElement || !precoElement || !imagemElement) {
        console.error("Erro: Elementos do jogo não encontrados na página.");
        return;
    }

    const titulo = tituloElement.innerText;
    const preco = precoElement.innerText;
    const imagem = imagemElement.src;

    // 2. CONDIÇÃO: Verifica se o jogo já está no carrinho
    const itensNoCarrinho = listaItens.querySelectorAll('strong');
    let jogoJaAdicionado = false;

    itensNoCarrinho.forEach(item => {
        if (item.innerText === titulo) {
            jogoJaAdicionado = true;
        }
    });

    if (jogoJaAdicionado) {
        alert("Este jogo já está no seu carrinho!");
        document.getElementById('cart-modal').style.display = 'block';
        return; 
    }

    // 3. Adiciona o HTML do novo item
    const itemHTML = `
        <div class="cart-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border-bottom: 1px solid #444; padding-bottom: 5px;">
            <img src="${imagem}" alt="${titulo}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
            <div>
                <p style="margin: 0;"><strong>${titulo}</strong></p>
                <p style="color: #00ff00; margin: 0;">R$ ${preco}</p>
            </div>
        </div>
    `;

    listaItens.innerHTML += itemHTML;
    
    // Atualiza o total visual
    document.getElementById('cart-total-value').innerText = `R$ ${preco}`;

    // 4. Mostra o modal
    document.getElementById('cart-modal').style.display = 'block';
}

function fecharCarrinho() {
    document.getElementById('cart-modal').style.display = 'none';
}

