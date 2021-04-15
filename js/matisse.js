let matisse = document.getElementById("painting");

// If we have a desktop device, we play on drag and drop mode
//if (!("ontouchstart" in document.documentElement)) {
    let dnd = new MatisseManager(50000, matisse, 200, 100);
    let startDelay = setTimeout(function () {
        dnd.launch();
    }, 5000);


// For tablets and phones, we play on touch mode
//}else{

//}