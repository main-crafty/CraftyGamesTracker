<?php 
$servername = "bicking.iad1-mysql-e2-4b.dreamhost.com";
$database = "craftybymelissa_dev";
$username = "crafty_lex";
$password = "AnaRodLex";
$creds = "mysql:host=$servername;dbname=$database;";
$dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

try {
    $conn = new PDO($creds, $username, $password, $dsn_Options);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error) {
    $errormsg = $error->getMessage();
}
?>