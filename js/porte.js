
let artwork = document.getElementById('img-double');
let imgNamePattern = /^(.*\/)(\w*)(_repro)(\.[pngjpife]{1,4})$/;
let reproSrc = '';
let originalSrc = '';

artwork.addEventListener('click', function(){
    // If images have already been switched at least once
    if(reproSrc != '' && originalSrc != ''){
        if(this.src === reproSrc){
            artwork.src = originalSrc;
        }else if(this.src === originalSrc){
            artwork.src = reproSrc;
        }
    // If user switches the images for the first time
    }else{
        reproSrc = this.src;
        // We look for the name of the original image, e.g. "thing_repro" => "thing"
        let imgName = reproSrc.match(imgNamePattern)[2];
        originalSrc = reproSrc.replace(imgNamePattern, '$1$2$4');
        artwork.src = originalSrc;
    }
})