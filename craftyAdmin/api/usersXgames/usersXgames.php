<?php 

    require("../connection.php");

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PATCH");

    $data = new stdClass();
    $data -> name = "testgame";


    
    try{
        $refSQL= $conn -> prepare("ALTER TABLE userXgames 
        ADD FOREIGN KEY (userID) REFERENCES users(userID),
        ADD FOREIGN KEY (gameID) REFERENCES games(gameID)");
        $refSQL -> execute();
        $result = $refSQL->setFetchMode(PDO::FETCH_ASSOC);
        $myData = $refSQL->fetchAll();
        $data -> data = $myData;
    }catch(PDOException $error){
        $errormsg = $error -> getMessage();
        $errorstr = "Connection error: ";
        $data -> error = $errormsg;
    }
    $myJson = json_encode($data);

    if($_SERVER["REQUEST_METHOD"]==="GET" && $userXgamesID !== null){
        $userXgamesID=$_GET["userXgamesID"];
        $userID=$_GET["userID"];
        $gameID=$_GET["gameID"];
        $deleted=$_GET["deleted"];
        try {
            $stmt = $conn -> prepare("SELECT * FROM userXgames WHERE userXgameID = ${userXgamesID}");
            $stmt -> execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $myData = $stmt->fetchAll();
            $data->data= $myData;
        }catch(PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Connection error: ";
            $data -> error = $errormsg;
        }
        $myJson = json_encode($data);
        echo $myJson;
    } else if ($_SERVER["REQUEST_METHOD"]==="GET"){
        try{
            $stmt = $conn -> prepare("SELECT * FROM userXgames");
            $stmt -> execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $myData = $stmt->fetchAll();
            $data->data = $myData;
        }catch(PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Connection error: ";
            $data -> error = $errormsg;
        }
        $myJson = json_encode($data);
        echo $myJson;
    } else if ($_SERVER["REQUEST_METHOD"]==="POST"){
        try{
            $json = file_get_contents("php://input");
            $data = json_decode($json);
            $userID = $data -> userID;
            $gameID = $data -> gameID;
            $quantity = $data -> quantity;
            $deleted = $data -> deleted;

            $myData = "INSERT INTO userXgames (userID, gameID, quantity, deleted)
            VALUES ('$userID', '$gameID', '$quantity','$deleted')"; 
            $data -> SQL = $myData;
            
            for($x = 0; $x < $quantity; $x++){
                $conn -> exec($myData);
            };
        }catch(PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Post error: ";
            $data -> error = $errormsg;
        }
        $myJson = json_encode($data);
        echo $myJson; 
    } else if($_SERVER["REQUEST_METHOD"]==="DELETE"){
        try{
            $userXgamesID = $_GET["userXgameID"];
            $myData = "UPDATE userXgames SET deleted=1 WHERE userXgameID = $userXgamesID";
            $data-> SQL = $myData;
            $conn -> exec($myData);
        }catch(PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Delete error: ";
            $data -> error = $errormsg;
        }
    $myJson = json_encode($data);
    echo $myJson;

    } else if($_SERVER["REQUEST_METHOD"]==="PUT"){
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $userXgameID = $data -> userXgameID;
        $userID = $data -> userID;
        $gameID = $data -> gameID;
        $deleted = $data -> deleted;

        $sql = "UPDATE userXgames SET userID = '$userID', 
        gameID = '$gameID', deleted = '$deleted' WHERE userXgameID = '$userXgameID'";

        $updateCount = $conn -> exec($sql);

        if($updateCount !== false && $updateCount > 0 ){
            $data->result="success";
        }else{
            // $data->result=$conn->error;
            $data->sql=$sql;
            $data->error="record already updated";
        };

        $myJSON = json_encode($data);
        echo $myJSON;
        
     } else if($_SERVER["REQUEST_METHOD"]==="PATCH"){
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $userXgameID = $data -> userXgameID;
        $userID = $data -> userID;
        $gameID = $data -> gameID;
        $deleted = $data -> deleted;

        $columnValuePair = array();

        $sql= "UPDATE userXgames SET ";

        if($userID != ""){
            array_push($columnValuePair, "userID = '$userID'");
        }
        if($gameID != ""){
            array_push($columnValuePair, "gameID = '$gameID'");
        }
        if($deleted != ""){
            array_push($columnValuePair, "deleted = '$deleted'");
        }

        $comma_separated = implode(",", $columnValuePair);

        $sql .= $comma_separated;

        $sql .= " WHERE userXgameID = '$userXgameID'";

        $conn -> exec($sql);

        if($conn->query($sql) === TRUE){
            $data -> result="success";
        }else{
            //$data -> result = $conn ->error;
            $data->sql=$sql;
            $data->error="record already updated";
        };

        $myJSON = json_encode($data);

        echo $myJSON; 
    }

?>