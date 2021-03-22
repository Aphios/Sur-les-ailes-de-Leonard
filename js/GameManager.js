class GameManager{
    constructor(duration, domGame, ptsAdd, ptsDeduct, progressbar, startBtn, restartBtn, winMsg, lostMsg, interactiveElts, playEvent, playFunc){
        this.duration = duration;
        this.domGame = domGame;
        this.ptsAdd = ptsAdd;
        this.ptsDeduct = ptsDeduct;
        this.interactiveElts = interactiveElts;
        this.progressbar = progressbar;
        this.timeOut = null;
        this.startBtn = startBtn;
        this.winMsg = winMsg;
        this.lostMsg = lostMsg;
        this.restartBtn = restartBtn;
        this.playEvent = playEvent;
        this.playFunc = playFunc;
    }

    launch(){
        this.startBtn.addEventListener("click", function play(){
            for(let elt of this.interactiveElts){
                elt.addEventListener(this.playEvent, this.playFunc);
            }
            this.startTimer();
        });
        this.restartBtn.addEventListener("click", function(){
            window.location.reload();
        });
    }

    startTimer(){
        this.progressbar.style.transform = "scaleX(1)";
        this.timeOut = setTimeout(function () { 
            this.endGame(false, this.domGame, this.ptsAdd, this.ptsDeduct) 
        }, this.duration);
        // Disable the start button whilst game runs
        this.startBtn.removeEventListener("click", play);
        this.startBtn.classList.remove("btn--animated");
    }

    endGame(win){
        if (win) {
            this.domGame.appendChild(this.winMsg);
            sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", this.ptsAdd, true);
        } else {
            this.domGame.appendChild(this.lostMsg);
            if (typeof ptsDeduct !== 'undefined'){
                sendPoints("http://localhost/Projets_sass/sur-les-ailes-de-leonard/ajax_pts.php", this.ptsDeduct, false);
            }
        }
        // Stop timer and reset progressbar
        clearTimeout(this.timeOut);
        this.progressbar.style.display = "none";
        for(let elt of this.interactiveElts){
            // Revoir ci-dessous
            elt.removeEventListener(this.playEvent, this.playFunc);
        }
    }
}