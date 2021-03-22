// Common DOM Elements
var startBtn = document.getElementById("start");
var restartBtn = document.getElementById("restart");
var progressbar = document.getElementById("progressbar");
var winMsg = document.createElement("div");
winMsg.className = "popup-msg";
var lostMsg = winMsg.cloneNode(true);
winMsg.innerText = "Bravo !";
lostMsg.innerText = "Perdu !";
var page = document.getElementById("page");

// Common variables
var timeOut; // Timeout

// Common event listeners
restartBtn.addEventListener("click", function(){
    window.location.reload();
});

// Common functions
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

function randomInt(max){
    let randInt = 0;
    while(randInt === 0){
        randInt = Math.floor(Math.random() * max);
    }
    return randInt;
}

// Images Data Functions

/**
 * Fetches web data from an API
 * @param {String} url the ressource to fetch
 * @returns Promise with data
 */
function fetchData(url){
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

/**
 * Loads an image from web data
 * @param {Promise} artData the data collected from an API
 * @param {String} alt the alt parameter of the image
 * @returns Promise of loaded Image
 */
function loadImg(artData, alt){
    return new Promise(function(resolve, reject){
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.width = artData.webImage.width;
        img.height = artData.webImage.height;
        img.alt = alt + artData.title;
        img.addEventListener('load', function () {
            resolve(img);
        });
        img.addEventListener("error", function(){
            reject("Impossible de charger l'image");
        });
        img.src = artData.webImage.url;
    })
}

/**
 * Resizes an image
 * @param {Image} img 
 * @param {int} maxWidth 
 * @param {int} maxHeight 
 */
function resizeImg(img, maxWidth, maxHeight){
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let width = img.width;
    let height = img.height;
    // Calculate the new width and height values, according to the image ratio
    if (width > height) {
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    img.width = width;
    img.height = height;
    img.src = canvas.toDataURL();
}

// Game functions

/**
 * Sends information to server on player game points to add or deduct
 * @param {String} url destination on server
 * @param {int} pts number of points to add or deduct
 * @param {bool} add true for adding, false for deducting
 */
function sendPoints(url, pts, add){
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("X-Requested-With", "xmlhttprequest");
    request.addEventListener("load", function () {
        console.log(request.responseText);
    });
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send("points="+pts+"&addition="+add);
}

/**
 * Starts the timer and calls the endgame function when it's over
 * @param {int} secs : timer duration in seconds
 * @param {*} parentElt :the element to which we'll attach the endgame message
 * @param {int} ptsAdd  : number of points to add
 * @param {int} ptsDeduct : optional, number of points to deduct
 * @param {Function} playFunc : the function called to start the game
 */
function startTimer(secs, parentElt, playFunc, ptsAdd, ptsDeduct){
    progressbar.style.transform = "scaleX(1)";
    timeOut = setTimeout(function () { endGame(false, parentElt, ptsAdd, ptsDeduct) }, secs);
    // Disable the start button whilst game runs
    startBtn.removeEventListener("click", playFunc);
    startBtn.classList.remove("btn--animated");
}

/**
 * 
 * @param {bool} win : true if game was won, false if it was lost
 * @param {*} parentElt : the element to which we'll attach the endgame message
 * @param {int} ptsAdd : number of points to add
 * @param {int} ptsDeduct : optional, number of points to deduct
 */
function endGame(win, parentElt, ptsAdd, ptsDeduct) {
    if (win) {
        parentElt.appendChild(winMsg);
        sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", ptsAdd, true);
    } else {
        parentElt.appendChild(lostMsg);
        if (typeof ptsDeduct !== 'undefined'){
            sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", ptsDeduct, false);
        }
    }
    // Stop timer and reset progressbar
    clearTimeout(timeOut);
    progressbar.style.display = "none";
}
