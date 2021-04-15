<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sur les ailes de Léonard</title>
    <link rel="stylesheet" href="minigames_style.css">
    </head>

    <body>
      <div class="page" id="page">

        <div class="ill_right"></div>
        <div class="ill_left"></div>

        <header class="banner" id="leo-navbar">
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

          <div class="game__header">
            <h2>Bienvenue !</h2>
            <p>Pars à la découverte de fabuleuses oeuvres d'art et découvre le plaisir des mots en voyageant sur les ailes de Léonard, le papillon aventurier !</p>
            <p>Choisis un jeu à effectuer avec lui.</p>
          </div>

          <div class="game__grid game__grid--index">
            <div class="game__pres">
              <a href="memory.php" alt="lien image vers le jeu du mémory">
                <img class="game__icon" src="imgs/memory_icon4.jpg" alt="Icone du jeu mémory">
              </a>
              <h3><a class="game__link" href="memory.php" alt="lien vers le jeu du mémory">Mémory</a></h3>
              <p>Retrouve les paires de cartes</p>
            </div>
            <div class="game__pres">
              <a href="matisse.php" alt="lien image vers le jeu l'atelier de Matisse">
                <img class="game__icon" src="imgs/matisse_icon4.jpg" alt="Icone du jeu L'atelier de Matisse">
              </a>
              <h3><a class="game__link" href="matisse.php" alt="lien vers le jeu l'atelier de Matisse">L'atelier de Matisse</a></h3>
              <p>Range l'atelier du peintre</p>
            </div>
            <div class="game__pres">
              <a href="poesy.php" alt="lien image vers le jeu Poesy">
                <img class="game__icon" src="imgs/poesy_icon4.jpg" alt="Icone du jeu Poesy">
              </a>
              <h3><a class="game__link" href="poesy.php" alt="lien vers le jeu Poesy">Poésy</a></h3>
              <p>Ecris un morceau de poème</p>
            </div>
            <div class="game__pres">
              <a href="cachecache.php" alt="lien image vers le jeu Cache-Cache">
                <img class="game__icon" src="imgs/cachecache_icon4.jpg" alt="">
              </a>
              <h3><a class="game__link" href="cachecache.php" alt="lien vers le jeu Cache-Cache">Cache-cache</a></h3>
              <p>Retrouve Léonard</p>
            </div>
            <div class="game__pres">
              <a href="porte.php" alt="lien image vers la porte mystère">
                <img class="game__icon" src="imgs/porte_icon4.jpg" alt="Icone de la porte mystère">
              </a>
              <h3><a class="game__link" href="porte.php" alt="lien vers la porte mystère">La porte mystère</a></h3>
              <p>Parviendras-tu à franchir la porte ?</p>
            </div>
            <div class="game__pres">
              <a href="motsenvoles.php" alt="lien image vers le jeu Mots Envolés">
                <img class="game__icon" src="imgs/mots_icon5.jpg" alt="Icone du jeu Mots Envoles">
              </a>
              <h3><a class="game__link" href="motsenvoles.php" alt="lien vers le jeu Mots Envoles">Mots envolés</a></h3>
              <p>Devine les mots manquants</p>
            </div>
          </div>
        </div>
    </div>

    <script src="js/common.js"></script>
    </body>

</html>