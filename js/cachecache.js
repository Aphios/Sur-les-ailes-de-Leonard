
var eden = document.getElementById("eden");
var leonard = [document.getElementById("leonard")];

var cacheGame = new GameManager(50000, eden, 300, 100, progressbar, startbtn, restartBtn, winMsg, lostMsg, leonard, "click", handler); // Ne va pas marcher puisque handler est défini après
var endcachecache = cacheGame.endGame(true);

cacheGame.launch();
