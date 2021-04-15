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
    <title>Poésy</title>
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
            <h2>Poésy</h2>
            <p>Invente un vers de poésie et envoie-le à Léonard.</p>
            <p>Il te proposera alors un poème composé à partir de ta création !</p>
          </div>

          <div class="game__zone">

            <div class="game__illustration--btm-right"><img src="imgs/poesy_illustration.png" alt="Illustration : Léonard sur une fleur"></div>


            <div class="game__centered">
              
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
                    echo "<p>Merci de ta contribution !</p><p>Voici le poème qu'a composé Léonard pour toi (attention, Léonard a des goûts un peu curieux) :</p><p>&nbsp;</p>";
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
    </div>
    </body>

</html>