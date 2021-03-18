// **** CONSTANTS ****

const TOTAL_PAIRS = 8; // Number of pairs to be found

// **** VARIABLES ****

// Caches for the cards that are currently flipped
var visiblePair = [];
var hiddenPair = [];

var pairs = 0; // Number of pairs found by player

// Cards
var codeIndex = 0;
//var codes = ["red", "red", "blue", "blue", "green", "green", "turquoise", "turquoise", "yellow", "yellow", "pink", "pink", "violet", "violet", "orange", "orange"];
var codes = ["a", "b", "c", "d", "e", "f", "g", "h"];
var visibleCards = [];
var hiddenCards = document.getElementsByClassName("game__grid-card");

var timeOut; // Timeout
var memory = document.getElementById("memory"); // Memory playground

// **** FUNCTIONS ****

// Replaces visible side card by hidden side one and reset the cache
function hide(cacheIndex){
    visiblePair[cacheIndex].parentNode.replaceChild(hiddenPair[cacheIndex], visiblePair[cacheIndex]);
    visiblePair[cacheIndex] = null;
    hiddenPair[cacheIndex] = null;
}

// Replaces the hidden side card by the visible side card of matching index and cache them
function reveal(hiddenCard, cacheIndex){
    for(let card of visibleCards){
        if(card.dataset.index === hiddenCard.dataset.index){
            visiblePair[cacheIndex] = card;
            hiddenPair[cacheIndex] = hiddenCard;
            hiddenCard.parentNode.replaceChild(card, hiddenCard);  
            return;
        }   
    }
}

// Handles cards flipping
function flipCard(){
    if(visiblePair[0] && visiblePair[1]){
        // Pair did not match : hide both cards and reveal new one
        hide(0);
        hide(1);
        reveal(this, 0);
    }else{
        if(visiblePair[0]){
            // Reveal second card and check if it matches first
            reveal(this, 1);
            if(visiblePair[0].dataset.code === visiblePair[1].dataset.code){
                pairs += 1;
                visiblePair[0] = null;
                visiblePair[1] = null; 
                hiddenPair[0] = null;
                hiddenPair[1] = null;
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

// Launches the game with a timeout
function play(){
    // Each default card may be flipped to see its color
    for(let card of hiddenCards){
        card.addEventListener("click", flipCard);
    }
    // Launch progress bar and timeout
    progressbar.style.transform = "scaleX(1)";
    timeOut = setTimeout(function(){endgame(false)}, 30000);
    // Disable the start button whilst game runs
    startBtn.removeEventListener("click", play);
    startBtn.classList.remove("btn--animated");
};

// Ends the game
function endgame(win){
    if(win){
        memory.appendChild(winMsg);
        sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", 400, true);    
    }else{
        memory.appendChild(lostMsg);
        sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", 200, false);
        // Disable flipping cards
        for(let card of hiddenCards){
            card.removeEventListener("click", flipCard);
        }
    }
    // Stop timer and reset progressbar
    clearTimeout(timeOut);
    progressbar.style.display = "none";
}

// Fetches images data from an API and returns a Promise
function fetchDataImgs(url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();       
        xhr.addEventListener("load", function(){
            resolve(JSON.parse(this.responseText).artObjects);
        });      
        xhr.addEventListener("error", function () {
            reject("Impossible de récupérer les données de l'API");
        });       
        xhr.open('GET', url);
        xhr.send();
    });
}

// Returns a Promise of the loaded img with some API Data
function loadImg(artData){
    return new Promise(function(resolve, reject){
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.width = artData.webImage.width;
        img.height = artData.webImage.height;
        img.alt = "illustration Mémory : " + artData.title;
        img.addEventListener('load', function () {
            resolve(img);
        });
        img.addEventListener("error", function(){
            reject("Impossible de charger l'image");
        });
        img.src = artData.webImage.url;
    })
}

// MAIN

//Create request to rijks API with random page number and 8 results per page
let randPage = randomInt(100);
let url = "https://www.rijksmuseum.nl/api/en/collection?key=QhuX4FUw&ps=8&imgonly=true&p=" + randPage;

// Fetch API data
fetchDataImgs(url)
// Create images and related data and wait for each image to be loaded
.then(function(artData){
    let promises = [];
    for(let art of artData){
        promises.push(loadImg(art));
    }
    return Promise.all(promises);
}).then(function(imgs){
    // Add attributes and reshape to each image
    for(let img of imgs){
        img.className = "game__grid-card card";
        img.dataset.code = codes[codeIndex];
        codeIndex += 1;
        resizeImg(img,100, 100);
        //cropImg(img, 100, 100);
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
    startBtn.addEventListener("click", play);
}).catch(function(err){
    console.error(err);
});



/*
PREVIOUS CODE WITH COLORED SQUARES AS CARDS
Create an array of 16 colored cards (8 different colors)
codes = shuffleArray(codes);
for(let i=0; i<codes.length; i++){
    let image = document.createElement("img");
    image.src = "./imgs/" + codes[i] + ".png";
    image.alt = "colored memory card";
    image.className = "game__grid-card card";
    image.dataset.index = i+1;
    image.dataset.code = codes[i];
    visibleCards.push(image);
}

xhr.addEventListener("load", function () {
    let artCollection = JSON.parse(this.responseText).artObjects;
    for (let art of artCollection) {
        // We construct a new Image from the data sent by Rijks'API
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.width = art.webImage.width;
        img.height = art.webImage.height;
        img.alt = "illustration Mémory : " + art.title;
        img.className = "game__grid-card card";
        img.dataset.code = codes[codeIndex];
        codeIndex += 1;
        // We resize and crop the image to a 100*100px format
        img.addEventListener("load", function(){
            resizeImg(this, 200, 200);
            cropImg(this, 100, 100);
            // We insert a pair of the image in our cards collection
            var imgClone = this.cloneNode(true);
            visibleCards.push(this);
            visibleCards.push(imgClone);
        });
        img.src = art.webImage.url;
    }

});
xhr.send();
*/

