let eden = document.getElementById("eden");
let leonard = document.getElementById("leonard");

let cachecache = new CacheCacheManager(50000, eden, 300, 100, leonard);

let startDelay = setTimeout(function () {
    cachecache.launch();
}, 5000);