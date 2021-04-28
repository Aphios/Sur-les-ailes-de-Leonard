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
    <link rel="stylesheet" href="css/style.css">
    <title>Memory</title>
</head>

<body>

    <div class="loader" id="loader">
        <div class="loader__icon"></div>
    </div>

    <div class="page" id="page">
        
        <div class="ill_right"></div>
        <div class="ill_left"></div>

        <header class="banner banner--slide" id="banner">
            <div class="banner__head">
                <h1 class="banner__title"><a class="banner__link" href="index.php">Sur les ailes de Léonard</a></h1>
                <img class="logo" src="imgs/logo.png" alt="Logo Léonard">
            </div>
            <div class="banner__menu">
              <p><a class="menu__link" href="infos.php">Informations et mentions légales</a></p>
              <p><a class= "menu__link" href="contact.php">Contact</a></p>
            </div>
        </header>

        <div class="game" id="game-memory">

            <div class="game__points"><?=$_SESSION["points"]?> points</div>
            <div class="game__header">
                <h2>Mémory</h2>
                <p>Clique sur les images pour retrouver les paires dans le temps imparti !</p>
            </div>

            <div class="game__zone">

                <div class="game__grid game__grid--memory"  id="memory">

                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="1">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="2">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="3">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="4">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="5">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="6">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="7">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="8">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="9">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="10">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="11">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="12">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="13">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="14">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="15">
                    <img class="game__grid-card card" src="imgs/default.png" alt="memory card" data-index="16">
                </div>
        
                <div class="timer">
                    <div class="btn__time btn" id="start"><img class="time__icon" id="time-btn" src="imgs/sablier.png" alt="icône sablier"></div>
                    <div class="timer__progress-bar">
                        <div class="timer__progress-bar--fill" id="progressbar"></div>
                    </div>
                </div>
        
                <div class="btn__restart--center btn--animated btn" id="restart">Rejouer</div>
            
            </div>
            
        </div>

    </div>

    <script src="js/common.js"></script>
    <script src="js/notouch.js"></script>
    <script src="js/GameManagers.js"></script>
    <script src="js/memory.js"></script>

</body>
</html>