<?php 

    require("../connection.php");

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PATCH");

    $data = new stdClass();
    $data -> name = "testgame";


?>