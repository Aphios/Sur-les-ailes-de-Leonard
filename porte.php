<?php
session_start();
if(!isset($_SESSION["points"])){
  $_SESSION["points"] = 0;           
}
?>

<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>La porte Mystère</title>
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
              <h2>La porte mystère</h2>
              <?php
                if($_SESSION["points"]<1000){
                  echo "<p>Zut ! La porte ne veut pas s'ouvrir...</p>";
                  echo "<p>Tu n'as pas collecté assez de points. Retourne effectuer quelques jeux et reviens ici plus tard.</p>";
                }else{
              ?>
              <p>Bravo !</p>
              <p>Tu as réussi à entrer dans le monde étrange caché derrière la porte mystère...</p>
            </div>
              
              <div class="game__zone">
              <div class="game__illustration--top-left"><img src="imgs/porte_illustration.png" alt="Illustration représentant Léonard"></div>
                <p>Contenu de la page à créer</p>
              </div>
              
            <?php
              }
            ?>          
            </div>
        </div>

    <script src="js/common.js"></script>
    <script src="js/porte.js"></script>

    </body>

</html>