<?php
    $hostname="mysql.craftybymelissa.xyz";
    $username = "crafty_lex";
    $password = "AnaRodLex";
    $database = "craftybymelissa_dev";
    $link = mysqli_connect($hostname,$username,$password,$database)

    if (mysqli_connect_errno()){
        echo "Connect failed: %s/n".mysqli_connect_error();
        exit();
    } else {
?>
    it worked
<?php          
    }
?>
hello world