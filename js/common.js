// DOM Elements
var startBtn = document.getElementById("start");
var restartBtn = document.getElementById("restart");
var progressbar = document.getElementById("progressbar");
var winMsg = document.createElement("div");
winMsg.style = "position:absolute; z-index:10; top:50vh; left:40vw; font-size:70px; color:red; font-family:'Gaegu-Bold'; background-color: rgba(116, 85, 108, 0.7); padding:10px; border-radius:10px";
var lostMsg = winMsg.cloneNode(true);
winMsg.innerText = "Bravo !";
lostMsg.innerText = "Perdu !";
var page = document.getElementById("page");
var restartBtn = document.getElementById("restart");

// Common event listeners
restartBtn.addEventListener("click", function(){
    window.location.reload();
});