<?php
    session_start();

    if(isset($_SESSION['usuario'])){
        if(!isset($_SESSION['rol'])){
            header('Location: ./index.php');
        }else{
            if($_SESSION['rol'] != 'admin'){
                header('Location: ./index.php');
            }
        }
    }else{
        header('Location: ./index.php');
    }
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- estilos css -->
    <link rel="stylesheet" href="./includes/css/style.css">

    <!-- font awesome cdn link  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
    
    <title>Administrador</title>
</head>
<body class="admin">

    <!-- header section starts  -->
    <header class="header">

        <a href="#" class="logo"> <i class="fas fa-paw"></i> shop </a>

        <nav class="navbar">
            <a href="#home">Inicio</a>
            <a href="#about">Acerca</a>
            <a href="#citas">Citas</a>
            <a href="#shop">Tienda</a>
            <a href="#services">Servicios</a>
            <a href="#contact">Contacto</a>
        </nav>

        <div class="icons">
            <div class="fas fa-bars" id="menu-btn"></div>
            <div class="fas fa-sign-out-alt" id="logout-btn"></div>
        </div>

    </header>

    <!-- home section -->
    <section class="home_admin">
        <div class="home_admin_info">
            <h1>
                <i class='bx bx-spreadsheet'></i>
                Información
            </h1>
        </div>
        <div class="home_admin_cit">
            <h1>
                <i class='bx bx-calendar'></i>    
                Citas
                <span>

                </span>
            </h1>
            <div class="cit_container">
                
            </div>
        </div>
    </section>

</body>
</html>