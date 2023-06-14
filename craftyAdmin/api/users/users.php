<?php 
    require("../connection.php");

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PATCH");

    $data = new stdClass();
    $data -> name = "testgame";

    $userID=$_GET["userID"];
    $username=$_GET["username"];
    $nickname=$_GET["nickname"];
    $tiktok=$_GET["tiktok"];
    $deleted=$_GET["deleted"];

    if($_SERVER["REQUEST_METHOD"]==="GET" && $userID !== null){
        try{
            $stmt = $conn -> prepare("SELECT * FROM users WHERE userID= ${userID}");
            $stmt -> execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $myData = $stmt->fetchAll();
            $data -> data = $myData;

        } catch (PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Connection error: ";
            $data -> error = $errormsg;
        }
        $myJson = json_encode($data);
        echo $myJson;
    } else if($_SERVER["REQUEST_METHOD"]==="GET"){
        try{
            $stmt = $conn -> prepare("SELECT * FROM users");
            $stmt -> execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $myData = $stmt->fetchAll();
            $data -> data = $myData;
        } catch(PDOException $error){
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
            $username = $data -> username;
            $nickname = $data -> nickname;
            $tiktok = $data -> tiktok;
            $deleted = $data -> deleted;

            $myData = "INSERT INTO users (username, nickname, tiktok, deleted)
            VALUES ('$username','$nickname','$tiktok', '$deleted')";
            $data -> SQL = $myData;
            $conn -> exec($myData);
        } catch (PDOException $error) {
            $errormsg = $error -> getMessage();
            $errorstr = "Post error: ";
            $data -> error = $errormsg;
        }
        $myJson = json_encode($data);
        echo $myJson;
    } else if($_SERVER["REQUEST_METHOD"]==="DELETE"){
        try{
            $myData = "UPDATE users SET deleted=1 WHERE userID = ${userID}";
            $data-> SQL = $myData;
            $conn -> exec($myData);
        } catch(PDOException $error){
            $errormsg = $error -> getMessage();
            $errorstr = "Delete error: ";
            $data -> error = $errormsg;
        }
    $myJson = json_encode($data);
    echo $myJson;

    } else if($_SERVER["REQUEST_METHOD"]==="PUT"){
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $userID = $data -> userID;
        $username = $data -> username;
        $nickname = $data -> nickname;
        $tiktok = $data -> tiktok;
        $deleted = $data -> deleted;

        $sql = "UPDATE users SET username = '$username', nickname = '$nickname', 
        tiktok = '$tiktok', deleted = '$deleted' WHERE userID = '$userID'";

        $conn -> exec($sql);
        
        if($conn->query($sql) === TRUE){
            $data->result="success";
        }else{
            $data->result=$conn->error;
        };

        $myJSON = json_encode($data);
        echo $myJSON; 
    } else if($_SERVER["REQUEST_METHOD"]==="PATCH"){
        $json = file_get_contents("php://input");
        $data = json_decode($json);
        $userID = $data -> userID;
        $username = $data -> username;
        $nickname = $data -> nickname;
        $tiktok = $data -> tiktok;
        $deleted = $data -> deleted;

        $columnValuePair = array();

        $sql = "UPDATE users SET ";

        if($username != ""){
            array_push($columnValuePair, "username = '$username'");
        }
        if($nickname != ""){
            array_push($columnValuePair, "nickname = '$nickname'");
        }
        if($tiktok != ""){
            array_push($columnValuePair, "tiktok = '$tiktok'");
        }
        if($deleted != ""){
            array_push($columnValuePair, "deleted = '$deleted'");
        }

        $comma_separated = implode(",", $columnValuePair);

        $sql .= $comma_separated;

        $sql .= " WHERE userID = '$userID'";

        $conn -> exec($sql);

        if($conn->query($sql) === TRUE){
            $data -> result="success";
        }else{
            $data -> result = $conn ->error;
        };

        $myJSON = json_encode($data);

        echo $myJSON; 
    }
?>