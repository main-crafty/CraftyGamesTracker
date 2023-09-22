<?php 
    require('../connection.php');

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PATCH");

    $data = new stdClass();
    $data -> name = "testgame";

    $gameID = $_GET["gameID"];
    $newGame=$_GET["newGame"];
    $gameDescription=$_GET["gameDescription"];

    if ($_SERVER["REQUEST_METHOD"]==="GET" && $gameID !== null){
        try {
            $stmt= $conn -> prepare("SELECT * FROM games WHERE gameID = ${gameID}");
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
        $gameID = $data -> gameID;
        $gameName = $data -> gameName;
        $gameDescription = $data -> gameDescription;
        $deleted = $data -> deleted;

        $myData = "INSERT INTO games (gameName, gameDescription,deleted)
        VALUES ('$gameName', '$gameDescription','$deleted')";
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
        $myData = "UPDATE games SET deleted=1 WHERE gameID= ${gameID}";
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
        $gameID = $data -> gameID;
        $gameName = $data -> gameName;
        $gameDescription = $data -> gameDescription;
        $deleted = $data -> deleted;

        $sql = "UPDATE games SET gameName = '$gameName',  gameDescription = '$gameDescription', 
        deleted = '$deleted' WHERE gameID = '$gameID'";

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
        $gameID = $data -> gameID;
        $gameName = $data -> gameName;
        $gameDescription = $data -> gameDescription;
        $deleted = $data -> deleted;

        $columnValuePair = array();

        $sql = "UPDATE games SET ";

        if($gameName != ""){
            array_push($columnValuePair, "gameName = '$gameName'");
        }
        if($gameDescription != ""){
            array_push($columnValuePair, "gameDescription = '$gameDescription'");
        }
        if($deleted != ""){
            array_push($columnValuePair, "deleted = '$deleted'");
        }

        $comma_separated = implode(",", $columnValuePair);

        $sql .= $comma_separated;

        $sql .= " WHERE gameID = '$gameID'";

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