<?php

class Article{
    protected $imageSrc;
    protected $imageClasses;
    protected $textSrc;
    protected $textClasses;

    public function __construct($imageSrc, $imageClasses, $textSrc, $textClasses, $alt){
        $this->imageSrc = $imageSrc;
        $this->imageClasses = $imageClasses;
        $this->textSrc = $textSrc;
        $this->textClasses = $textClasses;
        $this->alt = $alt;
    }

    public function displayArticle(){
        if($text = nl2br(file_get_contents($this->textSrc))){
            if(getimagesize($this->imageSrc)){
                echo "<p class='$this->imageClasses' ><img src='$this->imageSrc' alt='$this->alt' id='img-article'/></p>";
            }
            echo "<p class='$this->textClasses'>$text</p>";
        }else{
            throw new InvalidArgumentException("Le fichier source du texte n'existe pas");
        }
    }
}