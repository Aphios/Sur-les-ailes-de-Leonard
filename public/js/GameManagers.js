class GameManager {
    constructor(duration, domGame, ptsAdd, ptsDeduct) {
        this.duration = duration;
        this.domGame = domGame;
        this.ptsAdd = ptsAdd;
        this.ptsDeduct = ptsDeduct;
        this.timeOut = null;
        this.progressbar = document.getElementById("progressbar");
        this.winMsg = document.createElement("div");
        this.winMsg.className = "popup-msg";
        this.lostMsg = this.winMsg.cloneNode(true);
        this.winMsg.innerText = "Bravo !";
        this.lostMsg.innerText = "Perdu !";
        this.restartBtn = document.getElementById("restart");
    }

    /**
     * Starts the game timer and enables restart button
     */
    launch() {
        this.restartBtn.addEventListener("click", function () {
            window.location = location.href;
        });
        this.progressbar.style.transform = "scaleX(1)";
        this.timeOut = setTimeout( () => { 
            this.endGame(false); 
        }, this.duration);
    }

    /**
     * Displays endgame message, add or deducts player points and clears progressbar
     * @param {bool} win indicates whether the game is won or lost
     */
    endGame(win) {
        if (win) {
            this.domGame.appendChild(this.winMsg);
            this.sendPoints(this.ptsAdd, true);
        } else {
            this.domGame.appendChild(this.lostMsg);
            this.sendPoints(this.ptsDeduct, false);
        }
        // Stop timer and reset progressbar
        clearTimeout(this.timeOut);
        this.progressbar.style.display = "none";
    }

    /**
        * Sends information to server on player game points to add or deduct
        * @param {String} url destination on server
        * @param {Number} pts number of points to add or deduct
        * @param {bool} add true for adding, false for deducting
     */
    sendPoints(pts, add) {
        let request = new XMLHttpRequest();
        request.open("POST", "https://sur-les-ailes-de-leonard.fr/php/ajax_pts.php");
        request.setRequestHeader("X-Requested-With", "xmlhttprequest");
        request.addEventListener("load", function () {
            console.log(request.responseText);
        });
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send("points=" + pts + "&addition=" + add);
    }
}

class CacheCacheManager extends GameManager{
    constructor(duration, domGame, ptsAdd, ptsDeduct, hiddenElt){
        super(duration, domGame, ptsAdd, ptsDeduct);
        this.hiddenElt = hiddenElt;
        this.winCacheCache = this.winCacheCache.bind(this);
    }

    launch(){
        super.launch();
        this.hiddenElt.addEventListener("click", this.winCacheCache);
    }

    winCacheCache(){
        this.endGame(true);
    }

    endGame(win){
        super.endGame(win);
        this.hiddenElt.removeEventListener("click", this.winCacheCache);
    }
}

class MemoryManager extends GameManager{
    constructor(duration, domGame, ptsAdd, ptsDeduct, totalPairs, hiddenCards, visibleCards, cardCodes){
        super(duration, domGame, ptsAdd, ptsDeduct);
        this.totalPairs = totalPairs; // Number of pairs to be found
        this.cardCodes = cardCodes;  // Card identifiers
        this.hiddenCards = hiddenCards;  // array containing the dom hidden card elements
        this.visibleCards = visibleCards;  // contains the dom visible card elements
        this.hiddenPair = [];  // cache for the hidden side of cards displayed on screen
        this.visiblePair = [];  // cache for the visible side of cards displayed on screen
        this.pairs = 0;  // Counts the number of pairs the player finds
        this.flipCard = this.flipCard.bind(this);
    }

    launch(){
        super.launch();
        for (let card of this.hiddenCards) {
            card.addEventListener("click", this.flipCard);
        }
    }

    endGame(win){
        super.endGame(win);
        for (let card of this.hiddenCards) {
            card.removeEventListener("click", this.flipCard);
        } 
    }

    /**
     * Replaces the visible side of a card (image) by its hidden side (cover)
     * @param {Number} cacheIndex the index of the cached cards that must be switched
     */
    hide(cacheIndex) {
        this.visiblePair[cacheIndex].parentNode.replaceChild(this.hiddenPair[cacheIndex], this.visiblePair[cacheIndex]);
        this.visiblePair[cacheIndex] = null;
        this.hiddenPair[cacheIndex] = null;
    }

    /**
     * Replaces the hidden side of a card (cover) by its visible side (image)
     * hidden and visible card elements are put in a cache
     * @param {HTMLElement} hiddenCard : the card to be flipped
     * @param {Number} cacheIndex  : the index of the cache array where the cards need to be put in
     */
    reveal(hiddenCard, cacheIndex) {
        for (let card of this.visibleCards) {
            if (card.dataset.index === hiddenCard.dataset.index) {
                this.visiblePair[cacheIndex] = card;
                this.hiddenPair[cacheIndex] = hiddenCard;
                hiddenCard.parentNode.replaceChild(card, hiddenCard);
                return;
            }
        }
    }

    /**
     * Handles card flipping and pair comparison
     * If a pair is found, it stays displayed
     * If all pairs are found, the game is won
     * @param {domEvent} e : the click event that triggered flipCard
     */
    flipCard(e) {
        if (this.visiblePair[0] && this.visiblePair[1]) {
            // Pair did not match : hide both cards and reveal new one
            this.hide(0);
            this.hide(1);
            this.reveal(e.target, 0); // VERIFIER ICI E et E.TARGET
        } else {
            if (this.visiblePair[0]) {
                // Reveal second card and check if it matches first
                this.reveal(e.target, 1);
                if (this.visiblePair[0].dataset.code === this.visiblePair[1].dataset.code) {
                    this.pairs += 1;
                    this.visiblePair[0] = null;
                    this.visiblePair[1] = null;
                    this.hiddenPair[0] = null;
                    this.hiddenPair[1] = null;
                }
            } else {
                // Reveal first card
                this.reveal(e.target, 0);
            }
        }
        // Check if the game has been won
        if (this.pairs === this.totalPairs) {
            this.endGame(true);
        }
    }
}

class MatisseManager extends GameManager{
    constructor(duration, domGame, ptsAdd, ptsDeduct){
        super(duration, domGame, ptsAdd, ptsDeduct);
        this.cruche = document.getElementById("cruche");
        this.statuette = document.getElementById("statuette");
        this.dessin = document.getElementById("dessin");
        this.zoneCruche = document.getElementById("zone__cruche");
        this.zoneStatuette = document.getElementById("zone__statuette");
        this.zoneDessin = document.getElementById("zone__dessin");
        this.dragData = ["cruche", "dessin", "statuette"];
        this.allowDrop = this.allowDrop.bind(this);
        this.moveElt = this.moveElt.bind(this);
        this.dropElt = this.dropElt.bind(this);
    }

    launch(){
        super.launch();
        //Allow drop on drop zones
        this.zoneCruche.addEventListener('dragover', this.allowDrop);
        this.zoneStatuette.addEventListener('dragover', this.allowDrop);
        this.zoneDessin.addEventListener('dragover', this.allowDrop);
        // Initiliaze movement on draggable items
        this.cruche.addEventListener('dragstart', this.moveElt);
        this.statuette.addEventListener('dragstart', this.moveElt);
        this.dessin.addEventListener('dragstart', this.moveElt);
        // Handle drop on dropzones
        this.zoneCruche.addEventListener("drop", this.dropElt);
        this.zoneDessin.addEventListener("drop", this.dropElt);
        this.zoneStatuette.addEventListener("drop", this.dropElt);

    }

    endGame(win){
        super.endGame(win);
        this.zoneCruche.removeEventListener('dragover', this.allowDrop);
        this.zoneStatuette.removeEventListener('dragover', this.allowDrop);
        this.zoneDessin.removeEventListener('dragover', this.allowDrop);
        this.cruche.removeEventListener('dragstart', this.moveElt);
        this.statuette.removeEventListener('dragstart', this.moveElt);
        this.dessin.removeEventListener('dragstart', this.moveElt);
        this.zoneCruche.removeEventListener("drop", this.dropElt);
        this.zoneDessin.removeEventListener("drop", this.dropElt);
        this.zoneStatuette.removeEventListener("drop", this.dropElt);
    }

    /**
     * Allows drop on drop zones and stops event from propagating
     * @param {domEvent} e the event that triggered allowDrop
     */
    allowDrop(e){
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Initializes movement on draggable items
     * @param {domEvent} event the event that triggered moveElt
     */
    moveElt(event){
        let eltId = event.target.id;
        let dt = event.dataTransfer;
        dt.setData("text/uri-list", "../imgs/" + eltId + ".png");
        dt.setData("text/plain", eltId);
        dt.dropEffect = "move";
    }

    /**
     * Handles the drop of a draggable item on a dropzone
     * If the element corresponds to the correct zone, it stays in place
     * If not, the element is rejected from the dropzone
     * If all elements have been dropped on the correct zones, the game is won
     * @param {domEvent} event the event that triggered dropElt
     */
    dropElt(event) {
        event.preventDefault();
        let zone = event.target;
        let zoneId = zone.id.slice(6, zone.id.length);
        let eltId = event.dataTransfer.getData("text/plain");
        let elt = document.getElementById(eltId);
        // If element has been dragged on the correct zone, we move it permanently to this zone
        if (zoneId === eltId) {
            for (let obj of this.dragData) {
                if (obj === eltId) {
                    elt.className = "dnd__elt elt__" + eltId + " elt__found";
                    break;
                }
            }
            elt.draggable = false;
            elt.removeEventListener("drastart", this.moveElt);
            zone.removeEventListener("dragover", this.allowDrop);
        }
        // If all three objects have been correctly placed, display win message
        let found = document.getElementsByClassName("elt__found").length;
        if (found === 3) {
            this.endGame(true);
        }
    }
}

class MotsEnvolesManager extends GameManager{
    /**
     * @param {String} sentence sentence where a word is missing
     * @param {String} legend description of the sentence, e.g. title, author...
     * @param {Array} proposals array of three strings representing the potential solutions for the missing words
     * @param {Number} solutionIndex index of the correct solution in proposals array
     * @param {HTMLElement} form where the game data needs to be displayed
     */
    constructor(duration, domGame, ptsAdd, ptsDeduct, sentence, legend, proposals, solutionIndex) {
        super(duration, domGame, ptsAdd, ptsDeduct);
        this.sentence = sentence;
        this.legend = legend;
        this.solutionIndex = solutionIndex;
        this.proposals = proposals;
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    /**
     * Displays the enigma on the webpage
     * @param {HTMLElement} sentence the dom paragraph that will contain the sentence
     * @param {HTMLElement} legend the dom paragraph that will contain the legend
     * @param {String} propsClass name of the dom class for proposal labels
     */
    display(sentence, legend, propsClass){
        for(let i=0; i<this.proposals.length; i++){
            this.domGame.getElementsByClassName(propsClass)[i].innerText = this.proposals[i];
        }
        sentence.innerText = this.sentence;
        legend.innerText = this.legend;
    }

    launch(){
        super.launch();
        this.domGame.addEventListener('submit', this.checkAnswer);
    }

    endGame(win){
        super.endGame(win);
        this.domGame.removeEventListener('submit', this.checkAnswer);
        this.domGame.addEventListener('submit', function(e){
            e.preventDefault();
        })
    }

    checkAnswer(e){
        e.preventDefault();
        let answer = document.querySelectorAll('input[type="radio"]:checked')[0];
        if(answer.value == this.solutionIndex){
            this.endGame(true);
        }else{
            this.endGame(false);
        }

    }

}