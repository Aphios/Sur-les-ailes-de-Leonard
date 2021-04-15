// Common DOM Elements

let page = document.getElementById("page");

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

