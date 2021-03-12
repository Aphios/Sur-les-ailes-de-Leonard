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
var restartBtn = document.getElementById("restart");

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

// Modifies an Image by resizing it
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

// Modifies an Image by cropping it to its center
function cropImg(img, maxWidth, maxHeight){
    let outputWidth = img.width;
    let outputHeight = img.height;
    // Calculate the desired aspect ratio of our output image
    let ratio = maxWidth/maxHeight;
    // Calculate the initial aspect ratio of our input image
    let inputImgRatio = img.width/img.height;
    // if the initial image ratio is bigger than the target ratio
    if (inputImgRatio > ratio) {
        outputWidth = img.height * ratio;
    } else if (inputImgRatio < ratio) {
        outputHeight = img.width / ratio;
    }
    let canvas = document.createElement("canvas");
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    // calculate the position to draw the image at
    let outputX = (outputWidth - img.width) * 0.5;
    let outputY = (outputHeight - img.height) * 0.5;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, outputX, outputY);
    img.width = outputWidth;
    img.height = outputHeight;
    img.src = canvas.toDataURL();
}
