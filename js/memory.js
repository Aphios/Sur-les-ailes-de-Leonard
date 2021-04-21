// **** VARIABLES ****

let loader = document.getElementById("loader"); // Loader displaying before game starts
let codeIndex = 0;
let cardCodes = ["a", "b", "c", "d", "e", "f", "g", "h"];
let hiddenCards = document.getElementsByClassName("game__grid-card");
let visibleCards = [];
let memory = document.getElementById("memory"); // Memory playground
let startDelay;

let memo = new MemoryManager(50000, memory, 400, 200, 8, hiddenCards, visibleCards, cardCodes);

// MAIN
//Create request to rijks API with random page number and 8 results per page
let url = "https://www.rijksmuseum.nl/api/en/collection?key=QhuX4FUw&ps=8&imgonly=true&p=" + randomInt(100);

// Fetch API data
fetchData(url)
    // Create images and related data and wait for each image to be loaded
    .then(function (artData) {
        let promises = [];
        for (let art of artData) {
            promises.push(loadImg(art, "illustration Mémory : "));
        }
        return Promise.all(promises);
    }).then(function (imgs) {
        // Add attributes and reshape to each image
        for (let img of imgs) {
            img.className = "game__grid-card card";
            img.dataset.code = cardCodes[codeIndex];
            codeIndex += 1;
            resizeImg(img, 100, 100);
            // Store a pair of images in visible cards array
            let imgClone = img.cloneNode(true);
            visibleCards.push(img);
            visibleCards.push(imgClone);
        }
        // Introduce some hazard in the cards positions
        visibleCards = shuffleArray(visibleCards);
        for (let i = 0; i < visibleCards.length; i++) {
            visibleCards[i].dataset.index = i + 1;
        }
        // Start game
        if(loader.parentNode){
            loader.parentNode.removeChild(loader);
        }
        memo.launch();
    }).catch(function (err) {
        console.error(err);
    });
