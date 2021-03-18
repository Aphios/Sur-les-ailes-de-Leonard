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
    <title>L'atelier de Matisse</title>
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
                <h2>L'atelier de Matisse</h2>
                <p>Aide le peintre Matisse a ranger sa chambre.</p>
                <p>Clique sur les objets, fais-les glisser et depose-les au bon endroit.</p>
            </div>
    
            <div class="game__dnd" id="painting">
                <div class="dnd__zone zone__cruche" id="zone__cruche"></div>
                <div class="dnd__zone zone__dessin" id="zone__dessin"></div>
                <div class="dnd__zone zone__statuette" id="zone__statuette"></div>
                <div class="dnd__elt elt__cruche" id="cruche" draggable="true" ></div>
                <div class="dnd__elt elt__statuette" id="statuette" draggable="true"></div>
                <div class="dnd__elt elt__dessin" id="dessin" draggable="true"></div>
            </div>
    
            <div class="btn__restart--center btn--animated btn" id="restart">Rejouer</div>
            
        </div>

    </div>

        
    <script src="js/common.js"></script>
    <script src="js/matisse.js"></script>
    
</body>
</html>