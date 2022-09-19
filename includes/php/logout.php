<?php

$action = $_REQUEST['action'];
if($action == 'out'){
    session_start();
    session_destroy();
    header('Location: ../../index.php');
}
?>