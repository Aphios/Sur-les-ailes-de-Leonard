<?php
  session_start();
  if(!isset($_SESSION["points"])){
    $_SESSION["points"] = 0;
  }
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="minigames_style.css">
    <title>Cache-cache</title>
</head>
<body>
    <div class="page" id="page">

        <header class="banner banner--slide">
            <h1><a class="banner__link" href="index.php">Sur les ailes de Léonard</a></h1>
            <div class="banner__menu">
              <p><a class="menu__link" href="infos.php">Informations et mentions légales</a></p>
              <p><a class= "menu__link" href="contact.php">Contact</a></p>
            </div>
        </header>

        <div class="game">

            <div class="game__points"><?=$_SESSION["points"]?> points</div>

            <div class="game__header">
                <h2>Cache-cache</h2>
                <p>Léonard s'est caché dans ce tableau créé par le peintre Brueghel l'Ancien.</p>
                <p>Retrouve-le vite et clique sur lui avant que le temps ne soit écoulé !</p>
            </div>

            <div class="game__zone game__zone--cc">

                <div class="game__clic" id="eden">
                    <div class="clic__zone" id="leonard">
                    </div>
                </div>

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
    <script src="js/cachecache.js"></script>
    
</body>
</html>