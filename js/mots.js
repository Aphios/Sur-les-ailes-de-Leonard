/*

Au chargement de la page, on affiche de façon aléatoire un objet devinette
    Devinette est composé de :
    - un vers ou groupe de vers dont un mot à été effacé
    - trois propositions de mots à trouver sous forme de checkbox
    - un bouton valider
    - un mot solution

A l'appui sur le bouton valider du formulaire,
On annule l'envoi du formulaire via preventDefault
Si la value === solution
    on appelle endGame à true
    on enlève l'event listener sur submit
Sinon
    on appelle endGame à false
    on enlève l'event listener sur submit

*/

let devinette = document.getElementById("devinette");
let verse = document.getElementById("vers");
let legend = document.getElementById("legende");
let devinetteForm = document.getElementById("form-propositions");

// Creation of multiple guess games
let devinettes = [];
let motEnvole1 = new DevinetteManager(25000, devinette, 200, 100, "L'étang reflète, profond ................, la silhouette du saule noir", 'Paul Verlaine, extrait de La Bonne Chanson', ['miroir', 'abîme', 'voile'], 0, devinette);
devinettes.push(motEnvole1);
let motEnvole2 = new DevinetteManager(25000, devinette, 200, 100, 'Le chat ouvrit les yeux, le .............. y entra. Le chat ferma les yeux, le ............... y resta', "Maurice Carême, extrait de l'Arlequin", ['moucheron', 'soleil', 'reflet'], 1,devinette);
devinettes.push(motEnvole2);
let motEnvole3 = new DevinetteManager(25000, devinette, 200, 100, "Quand on est chat on n'est pas ................., on ne lèche pas les vilains moches parce qu'ils ont du sucre plein les poches", "Jacques Roubaud, extrait du Poème du chat", ["bête", "gourmand", "chien"], 2, devinette);
devinettes.push(motEnvole3);

// Random selection of one guess game
devinettes = shuffleArray(devinettes);
let motADeviner = devinettes[0];

// Start game
motADeviner.display(vers, legende, 'labelprop');
let starter = setTimeout(function () {
    motADeviner.launch();
}, 5000);
