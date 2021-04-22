let riddle = document.getElementById("devinette");
let verse = document.getElementById("vers");
let legend = document.getElementById("legende");
let riddleForm = document.getElementById("form-propositions");

// Creation of multiple guess games
let riddles = [];
riddles.push(new MotsEnvolesManager(25000, riddle, 200, 100, "L'étang reflète, profond ................, la silhouette du saule noir", 'Paul Verlaine, extrait de La Bonne Chanson', ['miroir', 'abîme', 'voile'], 0));
riddles.push(new MotsEnvolesManager(25000, riddle, 200, 100, 'Le chat ouvrit les yeux, le .............. y entra. Le chat ferma les yeux, le ............... y resta', "Maurice Carême, extrait de l'Arlequin", ['moucheron', 'soleil', 'reflet'], 1));
riddles.push(new MotsEnvolesManager(25000, riddle, 200, 100, "Quand on est chat on n'est pas ................., on ne lèche pas les vilains moches parce qu'ils ont du sucre plein les poches", "Jacques Roubaud, extrait du Poème du chat", ["bête", "gourmand", "chien"], 2));
riddles.push(new MotsEnvolesManager(25000, riddle, 200, 100, "Il n'y a de pure lumière ni d'ombre dans les ............", "Pablo Neruda, extrait de Cette Lumière", ["nuages", "souvenirs", "amours"], 1));
riddles.push(new MotsEnvolesManager(25000, riddle, 200, 100, 'Marche doucement car tu marches sur mes ........', "William Butler Yeats, extrait de Lui qui aurait voulu pouvoir offrir le ciel", ["pieds", "fleurs", "rêves"], 2));
riddles.push(new MotsEnvolesManager(25000, riddle, 200, 100, 'Les .......... cousent les pièces et les morceaux de l\'univers pour nous en faire un vêtement', 'Ray Bradbury, Extrait de Fahrenheit 451', ['livres', 'étoiles', 'émotions'], 0));

// Random selection of one guess game
riddles = shuffleArray(riddles);
let currentRiddle = riddles[0];

// Start game
currentRiddle.display(verse, legend, 'labelprop');
let starter = setTimeout(function () {
    currentRiddle.launch();
}, 1000);
