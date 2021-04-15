<?php
	require_once 'utils.php';
	require_once 'DBManager.php';
?>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact</title>
    <link rel="stylesheet" href="minigames_style.css">
    </head>

    <body>
      <div class="page" id="page">
	  	<div class="ill_right"></div>
        <div class="ill_left"></div>
		
	  	<header class="banner">
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
          <h2>Contact</h2>
		
		<?php
		    if(exists($_POST['nom']) && exists($_POST['prenom']) && exists($_POST['mail']) && exists($_POST['message'])){
				$nom = getDataStr($_POST['nom'], 50);
				$prenom = getDataStr($_POST['prenom'], 50);
				$email = getDataMail($_POST['mail'], 80);
				$msg = getDataStr($_POST['message'], 5000);
				if($nom && $prenom && $email && $msg){
					$db = new DBManager();
					$db->addPersonne($nom, $prenom, $email);
					$personneId = $db->getDB()->lastInsertId();
					$db->addMsg($msg, $personneId);
					echo "<p>Merci $prenom, nous avons bien reçu ton message !</p>";
				}else{
					echo "<p>Oups, les éléments que tu as envoyés ne sont apparemment pas corrects...</p>";
					echo "<p><a href='contact.php'>Essaye à nouveau en cliquant ici !</a></p>";
				}
		  	}else{
		?>

          <p>Tu souhaites nous envoyer un petit mot ?</p>
          <p>Demande l'aide d'un adulte pour écrire tes coordonnées et ton message.</p>
          </div>

		  <div class="game__zone">

			<form class="game__form game__form--center" method="post" action="contact.php">
				<fieldset>
					<legend>Tes coordonnées</legend>
					<p>
					<label for="nom">Nom :</label>
					<input type="text" name="nom" id="nom" maxlength="50" required />
					</p>
					<p>
					<label for="prenom">Prénom :</label>
					<input type="text" name="prenom" id="prenom" maxlength="50" required />
					</p>
					<p>
					<label for="mail">Adresse email :</label>
					<input type="email" name="mail" id="mail" required maxlength="80" required />
					</p>
				</fieldset>
				<fieldset>
					<legend>Ton message :</legend>
					<textarea class="form__txtarea" name="message" id="message" required maxlength="5000" cols="40" rows="15">Ecris ton message ici (5000 caractères max).</textarea>       
				</fieldset>
				<input class="btn btn--animated btn__submit--center" type="submit" value="Envoyer" />
			</form>
			</div>
			<?php
				}
			?>
		  </div>
		
    </body>

</html>