const gameContainer = document.getElementById("game-container");
const restartButton = document.getElementById("restart-button");

const totalPairs = 8;

const images = [
    "images/image1.webp", "images/image2.webp", "images/image3.png",
    "images/image4.webp", "images/image5.webp", "images/image6.webp",
    "images/image7.webp", "images/image8.webp"
];


function initializeGame() {
    gameContainer.innerHTML = "";

    const cardValues = Array.from({ length: totalPairs }, (_, i) => i + 1);
    const allCardValues = [...cardValues, ...cardValues];
    const shuffledValues = allCardValues.sort(() => Math.random() - 0.5);

    shuffledValues.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.cardValue = value; 
        card.style.backgroundImage = "url('images/back.jpg')"; 
        gameContainer.appendChild(card);
    });

    addCardListeners();
}

let flippedCards = [];
let matchedPairs = 0;

function addCardListeners() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

            
            const cardValue = card.dataset.cardValue;
            card.style.backgroundImage = `url('${images[cardValue - 1]}')`;
            card.classList.add("flipped");

            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        });
    });
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.cardValue === card2.dataset.cardValue) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                celebrate();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.style.backgroundImage = "url('images/back.jpg')";
            card2.style.backgroundImage = "url('images/back.jpg')";
        }, 1000);
    }

    flippedCards = [];
}

// Función para mostrar confeti
function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#bb0000', '#ffffff']
    });
}

// Reiniciar el juego
restartButton.addEventListener("click", () => {
    matchedPairs = 0;
    flippedCards = [];
    initializeGame();
});

// Inicializar el juego al cargar la página
initializeGame();
