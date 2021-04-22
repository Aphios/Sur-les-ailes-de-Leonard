//Sets elements only available to desktop devices

// Allow dropdown banner
if (!("ontouchstart" in document.documentElement)) {
    document.getElementById("banner").className += " no__touch";
}