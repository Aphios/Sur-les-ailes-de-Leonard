<?php
session_start();

function isAjax(){
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if(isAjax()){
    if(isset($_POST["points"]) && isset($_POST["addition"])){
        $pts = $_POST["points"];
        $add = $_POST["addition"];
        if(isset($_SESSION["points"])){
            if($add === 'true'){
                $_SESSION["points"] += $pts;
            }else if($add === 'false'){
                $_SESSION["points"] -= $pts;
                // Points can't be under 0
                if($_SESSION["points"] < 0){
                    $_SESSION["points"] = 0;
                }
            }
        }else{
            if($add === 'true'){
                $_SESSION["points"] = $pts;
            }
        }
        echo $_SESSION["points"];
    }
}


