// CONSTANTS
const TOTAL_PAIRS = 8;

// VARIABLES
// Cache the cards currently flipped
var colorPair = [];
var blackPair = [];
// Number of pairs found
var pairs = 0;
// Cards
var colors = ["red", "red", "blue", "blue", "green", "green", "turquoise", "turquoise", "yellow", "yellow", "pink", "pink", "violet", "violet", "orange", "orange"];
var colorCards = [];
var blackCards = document.getElementsByClassName("game__grid-card");
// Timeout
var timeOut;


// FUNCTIONS
function shuffleArray(array) {
    let curId = array.length;
    while (curId !== 0) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

function hide(cacheIndex){
    // Replace coloredCard by black one and reset the cache
    colorPair[cacheIndex].parentNode.replaceChild(blackPair[cacheIndex], colorPair[cacheIndex]);
    colorPair[cacheIndex] = null;
    blackPair[cacheIndex] = null;
}

function reveal(blackCard, cacheIndex){
    // Replace the blackcard by the colored card of matching index and cache them
    for(let colored of colorCards){
        if(colored.dataset.index === blackCard.dataset.index){
            colorPair[cacheIndex] = colored;
            blackPair[cacheIndex] = blackCard;
            blackCard.parentNode.replaceChild(colored, blackCard);  
            return;
        }   
    }
}

// Handling cards flipping
const flipCard = function(){
    if(colorPair[0] && colorPair[1]){
        // Pair did not match : hide both cards and reveal new one
        hide(0);
        hide(1);
        reveal(this, 0);
    }else{
        if(colorPair[0]){
            // Reveal second card and check if it matches first
            reveal(this, 1);
            if(colorPair[0].dataset.code === colorPair[1].dataset.code){
                pairs += 1;
                colorPair[0] = null;
                colorPair[1] = null; 
                blackPair[0] = null;
                blackPair[1] = null;
            }
        }else{
            // Reveal first card
            reveal(this, 0);
        }
    }
    // Check if the game has been won
    if(pairs === TOTAL_PAIRS){
        endgame(true);
    }
};

// Launches the game with timeout
const play = function(){
    // Each default card may be flipped to see its color
    for(let card of blackCards){
        card.addEventListener("click", flipCard);
    }
    // Launch progress bar and timeout
    progressbar.style.transform = "scaleX(1)";
    timeOut = setTimeout(function(){endgame(false)}, 30000);
    // Disable the start button whilst game runs
    startBtn.removeEventListener("click", play);
    startBtn.classList.remove("btn--animated");
};

// Ending
function endgame(win){
    if(win){
        page.appendChild(winMsg);    
    }else{
        page.appendChild(lostMsg);
        // Disable flipping cards
        for(let card of blackCards){
            card.removeEventListener("click", flipCard);
        }
    }
    // Stop timer and reset progressbar
    clearTimeout(timeOut);
    progressbar.style.display = "none";
}


// MAIN
// Create an array of 16 colored cards (8 different colors)
colors = shuffleArray(colors);
for(let i=0; i<colors.length; i++){
    let image = document.createElement("img");
    image.src = "./imgs/" + colors[i] + ".png";
    image.alt = "colored memory card";
    image.className = "game__grid-card card";
    image.dataset.index = i+1;
    image.dataset.code = colors[i];
    colorCards.push(image);
}

// Pressing start button enables the game to start
startBtn.addEventListener("click", play);
