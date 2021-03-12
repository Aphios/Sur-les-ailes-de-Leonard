/* Idées d'amélioration :
- Pour corser la difficulté, il faudrait ajouter d'autres zones de drop "pièges"
*/

var cruche = document.getElementById("cruche");
var statuette = document.getElementById("statuette");
var dessin = document.getElementById("dessin");
var zoneCruche = document.getElementById("zone__cruche");
var zoneStatuette = document.getElementById("zone__statuette");
var zoneDessin = document.getElementById("zone__dessin");
var dragData = ["cruche", "dessin", "statuette"];

//Allow drop on drop zones and stop event from propagating
function allowDrop(e){
    e.preventDefault();
    e.stopPropagation();
}

// Initialize movement draggable elements
function moveElt(event){
    let eltId = event.target.id;
    let dt = event.dataTransfer;
    dt.setData("text/uri-list", "./imgs/" + eltId + ".png");
    dt.setData("text/plain", eltId);
    dt.dropEffect = "move";
}

function dropElt(event){
    event.preventDefault();
    let zone = event.target;
    let zoneId = zone.id.slice(6, zone.id.length);
    let eltId = event.dataTransfer.getData("text/plain");
    let elt = document.getElementById(eltId);
    // If element has been dragged on the correct zone, we move it permanently to this zone
    if(zoneId === eltId){
        for(let obj of dragData){
            if(obj === eltId){
                elt.className = "dnd__elt elt__" + eltId + " elt__found";
                break;
            }
        }
        elt.draggable = false;
        elt.removeEventListener("drastart", moveElt);
        zone.removeEventListener("dragover", allowDrop);
    }
    // If all three objects have been correctly placed, display win message
    let found = document.getElementsByClassName("elt__found").length;
    if(found === 3){
        document.getElementById("painting").appendChild(winMsg);
    }
}

//Allow drop on drop zones
zoneCruche.addEventListener('dragover', allowDrop);
zoneStatuette.addEventListener('dragover', allowDrop);
zoneDessin.addEventListener('dragover', allowDrop);

// Initiliaze movement on draggable items
cruche.addEventListener('dragstart', moveElt);
statuette.addEventListener('dragstart', moveElt);
dessin.addEventListener('dragstart', moveElt);

// Handle drop on dropzones
zoneCruche.addEventListener("drop", dropElt);
zoneDessin.addEventListener("drop", dropElt);
zoneStatuette.addEventListener("drop", dropElt);

