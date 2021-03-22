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
    <title>Poesy</title>
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
            <h2>Poesy</h2>
            <p>Invente un vers de poésie et tu découvriras ensuite un curieux poème, composé rien que pour toi !</p>
          </div>

          <div class="game__zone">

            <div class="game__illustration"><img src="imgs/poesy_illustration2.png" alt="Illustration : Léonard sur une fleur"></div>

            <form action="poesy.php" class="game__form" method="post">
              <p><label for="strophe">Ecris ton vers ici : </label><input type="text" name="strophe" id="strophe" maxlength="200" size="50" required /></p>
              <input type="submit" class="btn btn--animated btn__submit" value="Envoyer" />
            </form>

            <?php
              if(exists($_POST["strophe"])){
                $strophe = getDataStr($_POST['strophe'], 200);
                if($strophe){
                  // Credit points
                  $_SESSION["points"] += 200;
                  // Add to database
                  $db = new DBManager();
                  $db->addStrophe($strophe);
                  // Compose poem
                  $stropheId = $db->getDB()->lastInsertId();
                  $stropheJoueur = $db->getStrophe($stropheId);
                  $allStrophes = $db->getAllStrophesButOne($stropheId);
                  $randomStrophes = [];
                  foreach($allStrophes as $s){
                    array_push($randomStrophes, $s["Strophe"]);
                  }
                  shuffle($randomStrophes);
                  $randomStrophes = array_slice($randomStrophes, 0, 9);
                  array_push($randomStrophes, $stropheJoueur["Strophe"]);
                  echo "<p>Merci de ta contribution ! Et voici ton poème :</p><p>&nbsp;</p>";
                  foreach($randomStrophes as $s){
                    // Decode any html entity from the database before echoing it safely
                    echo "<p>".htmlspecialchars(html_entity_decode($s, ENT_QUOTES))."</p>";
                  }
                }else{
                  echo "<p>Oups ! L'envoi de ton vers n'a pas fonctionné ! Essaie à nouveau.</p>";
                }
              }
            ?>         
          </div>
        </div>        
    </div>
    </body>

</html>