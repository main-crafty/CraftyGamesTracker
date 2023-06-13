<?php 
    require('../connection.php');

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PATCH");

    $data = new stdClass();
    $data -> name = "testgame";

    $game_id = $_GET["game_id"];
    $newGame=$_GET["newGame"];
    $gameDescription=$_GET["gameDescription"];

    if ($_SERVER["REQUEST_METHOD"]==="GET" && $game_id !== null){
        try {
            $stmt= $conn -> prepare("SELECT * FROM games WHERE game_id = ${game_id}");
            $stmt -> execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $myData = $stmt->fetchAll();
            $data->data = $myData;
        } catch (PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Connection error: ";
            $data -> error = $errormsg;
        }
        $myJson = json_encode($data);
        echo $myJson;
    } else if($_SERVER["REQUEST_METHOD"]==="GET"){
    try{
        $stmt = $conn -> prepare("SELECT * FROM games");
        $stmt -> execute();
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $myData = $stmt->fetchAll();
        $data->data = $myData;
    } catch (PDOException $error){
        $errormsg = $error -> getMessage();
        $errorstr = "Connection error: ";
        $data -> error = $errormsg;
    }
    $myJson = json_encode($data);
    echo $myJson;
    } else if($_SERVER["REQUEST_METHOD"]==="POST"){
    try{
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $game_id = $data -> game_id;
        $game_name = $data -> game_name;
        $game_description = $data -> game_description;
        $deleted = $data -> deleted;

        $myData = "INSERT INTO games (game_name, game_description,deleted)
        VALUES ('$game_name', '$game_description','$deleted')";
        $data-> SQL=$myData;
        $conn-> exec($myData);
    } catch (PDOException $error) {
        $errormsg = $error -> getMessage();
        $errorstr = "Post error: ";
        $data -> error = $errormsg;
    }
    $myJson= json_encode($data);
    echo $myJson;
        
     } else if($_SERVER["REQUEST_METHOD"]==="DELETE"){
    try{
        $myData = "UPDATE games SET deleted=1 WHERE game_id= ${game_id}";
        $data-> SQL = $myData;
        $conn -> exec($myData);
    } catch (PDOException $error) {
        $errormsg = $error -> getMessage();
        $errorstr = "Delete error: ";
        $data -> error = $errormsg;
    }
    $myJson = json_encode($data);
    echo $myJson;

    } else if($_SERVER["REQUEST_METHOD"]==="PUT"){
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $game_id = $data -> game_id;
        $game_name = $data -> game_name;
        $game_description = $data -> game_description;
        $deleted = $data -> deleted;

        $sql = "UPDATE games SET game_name = '$game_name',  game_description = '$game_description', 
        deleted = '$deleted' WHERE game_id = '$game_id'";

        $conn -> exec($sql);
        if($conn->query($sql)=== TRUE){
            $data->result="success";
        } else {
            $data->result = $link->error;
        };

        $myJSON = json_encode($data);
        echo $myJSON;
        
    } else if($_SERVER["REQUEST_METHOD"]==="PATCH"){
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $game_id = $data -> game_id;
        $game_name = $data -> game_name;
        $game_description = $data -> game_description;
        $deleted = $data -> deleted;

        $columnValuePair = array();

        $sql = "UPDATE games SET ";

        if($game_name != ""){
            array_push($columnValuePair, "game_name = '$game_name'");
        }
        if($game_description != ""){
            array_push($columnValuePair, "game_description = '$game_description'");
        }
        if($deleted != ""){
            array_push($columnValuePair, "deleted = '$deleted'");
        }

        $comma_separated = implode(",", $columnValuePair);

        $sql .= $comma_separated;

        $sql .= " WHERE game_id = '$game_id'";

        $conn -> exec($sql);

        if($conn->query($sql) === TRUE){
            $data->result="success";
        } else {
            $data->result = $link->error;
        };

        $myJSON = json_encode($data);

        echo $myJSON;
    }
?>