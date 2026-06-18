const games = [
    {
        title: "Forza Horizon 6",
        price: "R$ 299,00",
        image: "media/home/forza_horizon_6.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/forza_horizon_6_1.png", "media/others/forza_horizon_6_2.png", "media/others/forza_horizon_6_3.png"]
    },
    {
        title: "Assassin's Creed Black Flag",
        price: "R$ 119,99",
        image: "media/home/assassins_creed_black_flag.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/assassins_creed_1.png", "media/others/assassins_creed_2.png", "media/others/assassins_creed_3.png"]
    },
    {
        title: "ARC Raiders",
        price: "R$ 171,80",
        image: "media/home/arc_raiders.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/arc_raiders_1.png", "media/others/arc_raiders_2.png", "media/others/arc_raiders_3.png"]
    },
    {
        title: "FC 26",
        price: "R$ 299,00",
        image: "media/home/ea_fc_26.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/ea_fc_26_1.png", "media/others/ea_fc_26_2.png", "media/others/ea_fc_26_3.png"]
    },
    {
        title: "Need For Speed Heat",
        price: "R$ 26,99",
        image: "media/home/need_for_speed_heat.jpeg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/need_for_speed_1.png", "media/others/need_for_speed_2.png", "media/others/need_for_speed_3.png"]
    },
    {
        title: "Euro Truck Simulator",
        price: "R$ 15,99",
        image: "media/home/euro_truck_simulator.jpg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/euro_truck_simulator_2_1.png", "media/others/euro_truck_simulator_2_2.png", "media/others/euro_truck_simulator_2_3.png"]
    },
    {
        title: "GTA VI",
        price: "Em Breve!",
        image: "media/home/gta_vi.jpg",
        platform: "Steam e Rockstar",
        system: "Windows",
        gallery: ["media/others/gta_vi_1.png", "media/others/gta_vi_2.png", "media/others/gta_vi_3.png"]
    },
    {
        title: "Batman Arkham Knight",
        price: "R$ 26,99",
        image: "media/home/batman_arkham_knight.jpg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/batman_arkham_knight_1.png", "media/others/batman_arkham_knight_2.png", "media/others/batman_arkham_knight_3.png"]
    },
    {
        title: "Assetto Corsa",
        price: "R$ 59,99",
        image: "media/home/assetto_corsa.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/assetto_corsa_1.png", "media/others/assetto_corsa_2.png", "media/others/assetto_corsa_3.png"]
    },
    {
        title: "GTA V",
        price: "R$ 74,99",
        image: "media/home/gta_v.jpg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["media/others/gta_v_1.png", "media/others/gta_v_2.png", "media/others/gta_v_3.png"]
    }
];

let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');

    slides[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    slides[currentSlide].classList.add('active');
}

setInterval(() => changeSlide(1), 5000);

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

let productImgIndex = 0;

function selectImg(src, index) {
    const mainImg = document.getElementById('current-img');
    if (mainImg) {
        mainImg.src = src;
        productImgIndex = index;

        const thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach(t => t.classList.remove('active'));
        if (thumbs[index]) thumbs[index].classList.add('active');
    }
}

function moveGallery(step) {
    const gameData = JSON.parse(localStorage.getItem('selectedGame'));

    if (gameData && gameData.gallery) {
        productImgIndex += step;

        if (productImgIndex >= gameData.gallery.length) productImgIndex = 0;
        if (productImgIndex < 0) productImgIndex = gameData.gallery.length - 1;

        selectImg(gameData.gallery[productImgIndex], productImgIndex);
    }
}

function loadGames() {
    const container = document.getElementById('games-container');

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.style.cursor = "pointer";

        card.onclick = () => {
            localStorage.setItem('selectedGame', JSON.stringify(game));
            window.location.href = "jogo.html";
        };

        const promoHTML = game.onSale ? `<span class="promo-badge">Promoção</span>` : '';
        card.innerHTML = `
            ${promoHTML}
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p class="price"> ${game.price}</p>
        `;
        container.appendChild(card);
    });
}

function loadProductDetails() {
    const gameData = JSON.parse(localStorage.getItem('selectedGame'));

    if (gameData) {
        document.querySelector('.game-title').innerText = gameData.title;
        document.querySelector('.price-section .value').innerText = gameData.price;
        document.getElementById('current-img').src = gameData.image;
        document.querySelector('.info-text strong').innerText = gameData.platform;

        const thumbContainer = document.querySelector('.thumb-list');
        thumbContainer.innerHTML = "";

        if (gameData.gallery && gameData.gallery.length > 0) {
            gameData.gallery.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = index === 0 ? "thumb active" : "thumb";
                img.onclick = () => selectImg(imgSrc, index);
                thumbContainer.appendChild(img);
            });
        }
    }
}

if (window.location.pathname.includes("jogo.html")) {
    window.onload = loadProductDetails;
} else {
    window.onload = loadGames;
}