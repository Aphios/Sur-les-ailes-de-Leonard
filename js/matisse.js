let matisse = document.getElementById("painting");
let dnd = new MatisseManager(50000, matisse, 200, 100);
let startDelay = setTimeout(function () {
    dnd.launch();
}, 5000);