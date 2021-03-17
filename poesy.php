<?php
	require_once 'utils.php';
	require_once 'DBManager.php';
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

          <div class="game__header">
            <h2>Poesy</h2>
            <p>Invente un vers de poésie et tu dévcouvriras ensuite une poésie aléatoire composée rien que pour toi !</p>
          </div>

          <form action="poesy.php" class="form__center" method="post">
            <p><label for="strophe">Ecris ton vers ici :</label></p>
            <p><textarea name="strophe" id="strophe" maxlength="200" rows="1" cols="40" required></textarea></p>
            <input type="submit" class="btn btn--animated btn__submit" value="Envoyer" />
          </form>

          <?php
            if(exists($_POST["strophe"])){
              $strophe = getDataStr($_POST['strophe'], 200);
              if($strophe){
                $db = new DBManager();
                $db->addStrophe($strophe);
                $stropheId = $db->getDB()->lastInsertId();
                $stropheJoueur = $db->getStrophe($stropheId);
                $allStrophes = $db->getAllStrophes();
                shuffle($allStrophes);
                $randomStrophes = array_slice($allStrophes, 0, 9);
                $randomStrophes = array_merge($randomStrophes, $stropheJoueur);
                foreach($randomStrophes as $s){
                  echo "<p>".htmlspecialchars($s["Strophe"])."</p>";
                }
              }else{
                echo "<p>Oups ! L'envoi de ton vers n'a pas fonctionné ! Essaie à nouveau.</p>";
              }
            }
          ?>


        </div>
            
    </div>
    </body>

</html>