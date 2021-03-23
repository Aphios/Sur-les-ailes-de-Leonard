class GameManager {
    constructor(duration, domGame, ptsAdd, ptsDeduct) {
        this.duration = duration;
        this.domGame = domGame;
        this.ptsAdd = ptsAdd;
        this.ptsDeduct = ptsDeduct;
        this.interactiveElts = interactiveElts;
        this.playEvent = playEvent;
        this.playFunc = playFunc;
        this.timeOut = null;
        this.progressbar = document.getElementById("progressbar");
        this.winMsg = document.createElement("div");
        this.winMsg.className = "popup-msg";
        this.lostMsg = this.winMsg.cloneNode(true);
        this.winMsg.innerText = "Bravo !";
        this.lostMsg.innerText = "Perdu !";
        this.restartBtn = document.getElementById("restart");
    }

    launch() {
        this.startTimer();
        this.restartBtn.addEventListener("click", function () {
            window.location.reload();
        });
    }

    startTimer() {
        this.progressbar.style.transform = "scaleX(1)";
        this.timeOut = setTimeout(function () {
            this.endGame(false, this.domGame, this.ptsAdd, this.ptsDeduct)
        }, this.duration);
    }

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
        * @param {int} pts number of points to add or deduct
        * @param {bool} add true for adding, false for deducting
     */
    sendPoints(pts, add) {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php");
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
    }

    launch(){
        super();
        this.hiddenElt.addEventListener("Click", this.winCacheCache);
    }

    winCacheCache(){
        this.endGame(true);
    }

    endGame(win){
        super(win);
        this.hiddenElt.removeEventListener("click", this.winCacheCache);
    }
}

class MemoryManager extends GameManager{
    constructor(duration, domGame, ptsAdd, ptsDeduct, totalPairs, hiddenCards, cardCodes){
        super(duration, domGame, ptsAdd, ptsDeduct);
        this.totalPairs = totalPairs; // Number of pairs to be found
        this.cardCodes = cardCodes;  // Card identifiers
        this.hiddenCards = hiddenCards;  // array containing the dom hidden card elements
        this.visibleCards = [];  // contains the dom visible card elements
        this.hiddenPair = [];  // cache for the hidden side of cards displayed on screen
        this.visiblePair = [];  // cache for the visible side of cards displayed on screen
        this.pairs = 0;  // Counts the number of pairs the player finds
    }

    launch(){
        super();
        for (let card of this.hiddenCards) {
            card.addEventListener("click", this.flipCard);
        }
    }

    endGame(win){
        super(win);
        for (let card of this.hiddenCards) {
            card.removeEventListener("click", this.flipCard);
        } 
    }

    // Replaces visible side card by hidden side one and reset the cache
    hide(cacheIndex) {
        this.visiblePair[cacheIndex].parentNode.replaceChild(this.hiddenPair[cacheIndex], this.visiblePair[cacheIndex]);
        this.visiblePair[cacheIndex] = null;
        this.hiddenPair[cacheIndex] = null;
    }

    // Replaces the hidden side card by the visible side card of matching index and cache them
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

    // Handles cards flipping and cards comparison
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
        if (this.hiddenPairpairs === this.totalPairs) {
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
    }

    launch(){
        super();
        //Allow drop on drop zones
        this.zoneCruche.addEventListener('dragover', allowDrop);
        this.zoneStatuette.addEventListener('dragover', allowDrop);
        this.zoneDessin.addEventListener('dragover', allowDrop);
        // Initiliaze movement on draggable items
        this.cruche.addEventListener('dragstart', moveElt);
        this.statuette.addEventListener('dragstart', moveElt);
        this.dessin.addEventListener('dragstart', moveElt);
        // Handle drop on dropzones
        this.zoneCruche.addEventListener("drop", dropElt);
        this.zoneDessin.addEventListener("drop", dropElt);
        this.zoneStatuette.addEventListener("drop", dropElt);

    }

    endGame(win){
        super(win);
        this.zoneCruche.removeEventListener('dragover', allowDrop);
        this.zoneStatuette.removeEventListener('dragover', allowDrop);
        this.zoneDessin.removeEventListener('dragover', allowDrop);
        this.cruche.removeEventListener('dragstart', moveElt);
        this.statuette.removeEventListener('dragstart', moveElt);
        this.dessin.removeEventListener('dragstart', moveElt);
        this.zoneCruche.removeEventListener("drop", dropElt);
        this.zoneDessin.removeEventListener("drop", dropElt);
        this.zoneStatuette.removeEventListener("drop", dropElt);
    }

    //Allow drop on drop zones and stop event from propagating
    allowDrop(e){
        e.preventDefault();
        e.stopPropagation();
    }

    // Initialize movement draggable elements
    moveElt(event){
        let eltId = event.target.id;
        let dt = event.dataTransfer;
        dt.setData("text/uri-list", "./imgs/" + eltId + ".png");
        dt.setData("text/plain", eltId);
        dt.dropEffect = "move";
    }

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
            elt.removeEventListener("drastart", moveElt);
            zone.removeEventListener("dragover", allowDrop);
        }
        // If all three objects have been correctly placed, display win message
        let found = document.getElementsByClassName("elt__found").length;
        if (found === 3) {
            this.endGame(true);
        }
    }
}