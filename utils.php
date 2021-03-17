<?php
// General utils

// Returns true if data is set and not empty
function exists($data){
    if(isset($data) and !empty($data)){
        return true;
    }
    return false;
}

// Returns sanitized string if it is of correct length
function getDataStr($data, $maxlen){
  if(strlen($data) < $maxlen){
      $data = filter_var($data, FILTER_SANITIZE_STRING);
      return $data;
    }
  return null;
}

// Returns sanitized mail if it is of correct length
function getDataMail($data, $maxlen){
    if(strlen($data) < $maxlen){
        $data = filter_var($data, FILTER_SANITIZE_EMAIL);
        if(filter_var($data, FILTER_VALIDATE_EMAIL)){
            return $data;
        }
      }
    return null;
  }