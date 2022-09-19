<?php
    //$idusuario = $_POST['idusuario'];
    $nombre = $_POST['nombre'];
    $rol = $_POST['rol'];
    $phone = $_POST['telefono'];
    $email = $_POST['email'];
    session_start();
    //$_SESSION['id']= $idusuario;
    $_SESSION['usuario'] = $nombre;
    $_SESSION['rol'] = $rol;
    $_SESSION['email'] = $email;
    $_SESSION['phone'] = $phone;
?>