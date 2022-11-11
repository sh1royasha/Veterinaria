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
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
    <title>Administrador</title>
</head>
<body class="admin">

    <!-- header section starts  -->
    <header class="header">

        <a href="#" class="logo"> <i class="fas fa-paw"></i> Datevet </a>

        <nav class="navbar">
            <a href="#citas_admin">Citas</a>
            <a href="#Productos_admin">Productos</a>
            <a href="#Usuarios_admin">Usuarios</a>
        </nav>

        <div class="icons">
            <div class="fas fa-bars" id="menu-btn"></div>
            <div class="fas fa-sign-out-alt" id="logout"></div>
        </div>

    </header>

    <!-- home section -->
    <section class="home_admin">
        <div class="home_admin_cit">
            <h1>
                <i class='bx bx-calendar'></i>    
                Citas Del Dia
                <span>

                </span>
            </h1>
            <div class="cit_container">
                <div class="list-name-cit">
                    <h3 class="cit_name_title">Horario</h3>
                    <h3 class="cit_name_title">Cliente</h3>
                    <h3 class="cit_name_title">Correo</h3>
                    <h3 class="cit_name_title">Telefono</h3>
                </div>
                <div class="list-cit-today"></div>
                <nav id="paginationCit">
                </nav>
                <input type="hidden" name="currentpagetoday" id="currentpagetoday" value="1"> 
            </div>
        </div>
    </section>

    <section class="citas_admin" id="citas_admin">
        <div class="citas_admin_list">
            <div class="list_info">
                <h1>
                    <i class='bx bx-spreadsheet'></i>
                    Citas
                </h1>
                <button id="add_Cit">
                    <i class='bx bx-plus'></i>
                    Agregar</button>
            </div>
            <div class="list-cit">
                <div class="list-cit-names">
                    <h3 class="cit_name_title">Fecha</h3>
                    <h3 class="cit_name_title">Horario</h3>
                    <h3 class="cit_name_title">Estado</h3>
                    <h3 class="cit_name_title">Opciones</h3>
                </div>
                <div class="list-cit-list"></div>
                <nav id="pagination">
                </nav>
                <input type="hidden" name="currentpage" id="currentpage" value="1">
            </div>
        </div>
    </section>

    <section class="Productos_admin" id="Productos_admin">
        <div class="Productos_admin_list">
            <div class="list_info">
                <h1>
                    <i class='bx bx-package'></i>
                    Productos
                </h1>
                <button id="add_Prod">
                    <i class='bx bx-plus'></i>
                    Agregar</button>
            </div>
            <div class="list-product">
            </div>
        </div>
    </section>

    <section class="Usuarios_admin" id="Usuarios_admin">
        <div class="Usuarios_admin_list">
            <div class="list_info">
                <h1>
                    <i class='bx bx-user'></i>
                    Usuarios
                </h1>
            </div>
            <div class="list-users">
                <div class="list-users-name">
                    <h3 class="cit_name_title">Nombre</h3>
                    <h3 class="cit_name_title">Correo</h3>
                    <h3 class="cit_name_title">Telefono</h3>
                    <h3 class="cit_name_title">Rol</h3>
                </div>
                <div class="list_users">
                    
                </div>
            </div>
        </div>
    </section>


    <script src="./includes/js/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
    <script type="module" src="./includes/js/admin.js"></script>
    
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <?php include_once "./Pages/addCitas.php" ?>
    <?php include_once "./Pages/AddProduct.php" ?>

</body>
</html>