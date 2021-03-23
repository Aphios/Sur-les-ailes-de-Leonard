
// TODO refaire avec les nouvelles classes

const TOTAL_PAIRS = 8; // Number of pairs to be found

// **** VARIABLES ****

// Caches for the cards that are currently flipped
var visiblePair = [];
var hiddenPair = [];

var pairs = 0; // Number of pairs found by player

// Cards
var codeIndex = 0; // NOT IN GAME
//var codes = ["red", "red", "blue", "blue", "green", "green", "turquoise", "turquoise", "yellow", "yellow", "pink", "pink", "violet", "violet", "orange", "orange"];
var cardCodes = ["a", "b", "c", "d", "e", "f", "g", "h"];
var visibleCards = [];
var hiddenCards = document.getElementsByClassName("game__grid-card");

var memory = document.getElementById("memory"); // Memory playground
var timerEnd; // Timeout after which card event listeners are removed

// **** FUNCTIONS ****

// Replaces visible side card by hidden side one and reset the cache
function hide(cacheIndex) {
    visiblePair[cacheIndex].parentNode.replaceChild(hiddenPair[cacheIndex], visiblePair[cacheIndex]);
    visiblePair[cacheIndex] = null;
    hiddenPair[cacheIndex] = null;
}

// Replaces the hidden side card by the visible side card of matching index and cache them
function reveal(hiddenCard, cacheIndex) {
    for (let card of visibleCards) {
        if (card.dataset.index === hiddenCard.dataset.index) {
            visiblePair[cacheIndex] = card;
            hiddenPair[cacheIndex] = hiddenCard;
            hiddenCard.parentNode.replaceChild(card, hiddenCard);
            return;
        }
    }
}

// Handles cards flipping
function flipCard() {
    if (visiblePair[0] && visiblePair[1]) {
        // Pair did not match : hide both cards and reveal new one
        hide(0);
        hide(1);
        reveal(this, 0);
    } else {
        if (visiblePair[0]) {
            // Reveal second card and check if it matches first
            reveal(this, 1);
            if (visiblePair[0].dataset.code === visiblePair[1].dataset.code) {
                pairs += 1;
                visiblePair[0] = null;
                visiblePair[1] = null;
                hiddenPair[0] = null;
                hiddenPair[1] = null;
            }
        } else {
            // Reveal first card
            reveal(this, 0);
        }
    }
    // Check if the game has been won
    if (pairs === TOTAL_PAIRS) {
        endGame(true, memory, 400);
        clearTimeout(timerEnd);
    }
}

// Launches the game with a timeout
function playMemory() {
    // Each default card may be flipped to see its content
    for (let card of hiddenCards) {
        card.addEventListener("click", flipCard);
    }
    startTimer(50000, memory, playMemory, 400, 200);
    timerEnd = setTimeout(function () { 
        // Disable flipping cards
        for (let card of hiddenCards) {
            card.removeEventListener("click", flipCard);
        } 
        clearTimeout(timerEnd);
    }, 50000);

    /*
    // Launch progress bar and timeout   
    progressbar.style.transform = "scaleX(1)";
    timeOut = setTimeout(function () { endmemory(false) }, 50000);
    // Disable the start button whilst game runs
    startBtn.removeEventListener("click", play);
    startBtn.classList.remove("btn--animated");
    */
};


/* Ends the game
function endgame(win);
    if (win) {
        memory.appendChild(winMsg);
        sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", 400, true);
    } else {
        memory.appendChild(lostMsg);
        sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", 200, false);
        // Disable flipping cards
        for (let card of hiddenCards) {
            card.removeEventListener("click", flipCard);
        }
    }
    // Stop timer and reset progressbar
    clearTimeout(timeOut);
    progressbar.style.display = "none";
}
*/


// MAIN
//Create request to rijks API with random page number and 8 results per page
let randPage = randomInt(100);
let url = "https://www.rijksmuseum.nl/api/en/collection?key=QhuX4FUw&ps=8&imgonly=true&p=" + randPage;

// Fetch API data
fetchData(url)
    // Create images and related data and wait for each image to be loaded
    .then(function (artData) {
        let promises = [];
        for (let art of artData) {
            promises.push(loadImg(art, "illustration Mémory : "));
        }
        return Promise.all(promises);
    }).then(function (imgs) {
        // Add attributes and reshape to each image
        for (let img of imgs) {
            img.className = "game__grid-card card";
            img.dataset.code = cardCodes[codeIndex];
            codeIndex += 1;
            resizeImg(img, 100, 100);
            // Store a pair of images in visible cards array
            let imgClone = img.cloneNode(true);
            visibleCards.push(img);
            visibleCards.push(imgClone);
        }
        // Introduce some hazard in the cards positions
        visibleCards = shuffleArray(visibleCards);
        for (let i = 0; i < visibleCards.length; i++) {
            visibleCards[i].dataset.index = i + 1;
        }
        // Enable the game to start by activating start button
        startBtn.addEventListener("click", playMemory);
    }).catch(function (err) {
        console.error(err);
    });
