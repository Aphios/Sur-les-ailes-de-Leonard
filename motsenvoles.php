<?php
	require_once 'utils.php';
	require_once 'DBManager.php';
    session_start();
    if(!isset($_SESSION["points"])){
        $_SESSION["points"] = 0;
    }
?>

<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mots envolés</title>
    <link rel="stylesheet" href="minigames_style.css">
    </head>

    <body>
      <div class="page" id="page">

        <header class="banner">
            <h1><a class="banner__link" href="index.php">Sur les ailes de Léonard</a></h1>
            <div class="banner__menu">
              <p><a class="menu__link" href="info.php">Informations et mentions légales</a></p>
              <p><a class= "menu__link" href="contact.php">Contact</a></p>
            </div>
        </header>

        <div class="game">

          <div class="game__points"><?=$_SESSION["points"]?> points</div>

          <div class="game__header">
            <h2>Mots envolés</h2>
            <p>Léonard aime collecter les poésies. Malheureusement, il emporte parfois sur ses ailes certains mots !</p>
            <p>Essaie de deviner quel est le mot manquant dans cet extrait de poème.</p>
            <p>Fais vite, le sablier tourne...</p>
          </div>

          <div class="game__zone" id="devinette">

            <div class="game__illustration--top-left"><img src="imgs/porte_illustration.png" alt="Illustration représentant Léonard portant un mot sur ses ailes"></div>
            <p id="vers"></p>
            <p id="legende" class="citation"></p>
            <p>&nbsp</p>
            <p>Quel est le mot qui s'est envolé ?</p>
            <form method="post" action="motsenvoles.php" id="form-propositions">
                <input type="radio" name="proposition" value="0" id="prop0" /> <label for="prop1" class="labelprop"></label><br />
                <input type="radio" name="proposition" value="1" id="prop1" /> <label for="prop2" class="labelprop"></label><br />
                <input type="radio" name="proposition" value="2" id="prop2" /> <label for="prop3" class="labelprop"></label><br />
                <input type="submit" value="Choisir">
            </form>

            <div class="timer">
                <div class="btn__time btn" id="start">Temps</div>
                <div class="timer__progress-bar">
                    <div class="timer__progress-bar--fill" id="progressbar"></div>
                </div>
            </div>
        
            <div class="btn__restart--center btn--animated btn" id="restart">Rejouer</div>

          </div>
        </div>        
    </div>

    <script src="js/common.js"></script>
    <script src="js/GameManagers.js"></script>
    <script src="js/mots.js"></script>
    </body>

</html>