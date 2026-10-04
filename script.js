/* =========================================================
   O RETRATO DO RENASCIMENTO
   Navegação entre telas + pequenas interações
========================================================= */

const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".screen");


/* ---------------------------------------------------------
   TROCAR DE TELA
--------------------------------------------------------- */

function showScreen(screenName) {

    // Remove a seleção de todas as abas
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    // Esconde todas as telas
    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    // Encontra a aba correspondente
    const selectedTab = document.querySelector(
        `.tab[data-screen="${screenName}"]`
    );

    // Encontra a tela correspondente
    const selectedScreen = document.getElementById(screenName);

    // Ativa a aba
    if (selectedTab) {
        selectedTab.classList.add("active");
    }

    // Mostra a tela
    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    // Volta para o topo do site
    document.querySelector(".page-shell").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ---------------------------------------------------------
   CLIQUES NAS ABAS
--------------------------------------------------------- */

tabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        // Descobre qual tela a aba deve abrir
        const screenName = tab.dataset.screen;

        // Abre a tela
        showScreen(screenName);

    });

});


/* ---------------------------------------------------------
   BOTÕES QUE LEVAM PARA OUTRA TELA
--------------------------------------------------------- */

const navigationButtons =
    document.querySelectorAll("[data-go]");

navigationButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Descobre para qual tela o botão deve levar
        const target = button.dataset.go;

        // Abre a tela
        showScreen(target);

    });

});


/* ---------------------------------------------------------
   ACESSIBILIDADE: TECLADO
   Alt + número troca de seção
--------------------------------------------------------- */

document.addEventListener("keydown", (event) => {

    // Verifica se a tecla Alt está pressionada
    if (event.altKey && !event.ctrlKey && !event.metaKey) {

        const number = Number(event.key);

        const availableTabs = Array.from(tabs);

        // Verifica se o número corresponde a uma aba
        if (
            number >= 1 &&
            number <= availableTabs.length
        ) {

            const target =
                availableTabs[number - 1].dataset.screen;

            showScreen(target);

        }

    }

});

/* =========================================================
   AMPLIAR IMAGENS DAS OBRAS
========================================================= */

const imagesToZoom = document.querySelectorAll(
    ".work-image, .hero-art"
);

const imageModal = document.createElement("div");

imageModal.className = "image-modal";

imageModal.innerHTML = `
    <button class="image-modal-close" aria-label="Fechar imagem">
        ×
    </button>

    <img src="" alt="">
`;

document.body.appendChild(imageModal);

const modalImage = imageModal.querySelector("img");
const closeButton = imageModal.querySelector(".image-modal-close");


/* Abrir imagem */

imagesToZoom.forEach((image) => {

    image.addEventListener("click", () => {

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        imageModal.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});


/* Fechar pelo X */

closeButton.addEventListener("click", () => {

    imageModal.classList.remove("active");

    document.body.style.overflow = "";
});


/* Fechar clicando fora da imagem */

imageModal.addEventListener("click", (event) => {

    if (event.target === imageModal) {

        imageModal.classList.remove("active");

        document.body.style.overflow = "";
    }

});


/* Fechar com ESC */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        imageModal.classList.remove("active");

        document.body.style.overflow = "";
    }

});