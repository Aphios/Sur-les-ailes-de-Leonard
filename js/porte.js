/* TODO :
Est-ce que je veux vraiment faire appel à l'API du Rijks ?
Car le titre sera en anglais :/
Sinon, ce code n'est pas nécessaire
SI oui, il faut vérifier la taille du browser,
resizer l'image selon cette taille
+ ajouter un event listener au cas où la fenêtre soit redimensionnée

*/

/*let url = "https://www.rijksmuseum.nl/api/en/collection?key=QhuX4FUw&ps=1&imgonly=true&p=" + randomInt(100);
var title = "";
fetchDataImgs(url)
.then(function(artData){
    title = artData.longTitle;
    return loadImg(artData, "Oeuvre d'art : ");
}).then(function(img){
    img.className = "game__img";
    // if browser resolution :
    if(img.width<900){
        resizeImg(img, 900, 900);

    }
    
    document.getElementById("").appendChild(img);
    document.getElementById("").appendChild(document.createTextNode(title));
});
*/
