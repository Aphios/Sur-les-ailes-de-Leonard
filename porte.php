<?php
session_start();
require 'Article.php';
if(!isset($_SESSION["points"])){
  $_SESSION["points"] = 0;           
}
/*
TODO compléter en ajoutant des articles (textes et images à créer)
les ajouter dans l'array articles
*/
$articles = [];
$article1 = new Article('imgs/ferroniere_repro.jpg', 'central card', 'articles/ferroniere.txt', 'central central--mid', 'Reproduction style cartoon de la belle Ferroniere');
$article2 = new Article('imgs/ours_repro.png', 'central card', 'articles/ours.txt', 'central central --mid', "Reproduction style néon d'un dessin d'ours");
array_push($articles, $article1, $article2);
shuffle($articles);
$currentArticle = $articles[0];
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

        <div class="ill_right"></div>
        <div class="ill_left"></div>

        <header class="banner banner--slide">
            <div class="banner__head">
              <h1 class="banner__title"><a class="banner__link" href="index.php">Sur les ailes de Léonard</a></h1>
              <img class="logo" src="imgs/logo.png" alt="Logo Léonard">
            </div>
            <div class="banner__menu">
              <p><a class="menu__link" href="infos.php">Informations et mentions légales</a></p>
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
                <div class="game__illustration--btm-right"><img src="imgs/porte_illustration.png" alt="Illustration représentant Léonard"></div>
                <div class="game__centered" id="article-container">
                  <?php $currentArticle->displayArticle(); ?>
                </div>
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