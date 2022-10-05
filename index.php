<?php
    session_start();
    if(isset($_SESSION['usuario'])){
        if($_SESSION['rol'] != 'admin'){
            header('Location: ./dashboard.php');
        }else{
            header('Location: ./admin.php');
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./includes/css/login.css">
    <script src="https://kit.fontawesome.com/1a8f0c8b1b.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form action="" class="sign-in-form" id="sign-in-form" autocomplete="off">
                    <h2 class="title">Iniciar Sesión</h2>
                    <div class="input-field">
                        <i class="fa-solid fa-user"></i>
                        <input type="email" placeholder="Correo" id="sing_up_email" name="sing_up_email">
                    </div>
                    <div class="input-field">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Contraseña" id="sing_up_password" name="sing_up_password">
                    </div>
                    <input type="hidden" name="action" value="login">
                    <input type="submit" value="Login" class="btn solid">
                </form>

                <form action="" class="sign-up-form" id="sign-up-form" autocomplete="off">
                    <h2 class="title">Registrarse</h2>
                    <div class="input-field">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" placeholder="Nombre" id="sing_name" name="sing_name">
                    </div>
                    <div class="input-field">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" placeholder="Correo" id="sing_email" name="sing_email">
                    </div>
                    <div class="input-field">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Contraseña" id="sing_password" name="sing_password">
                    </div>
                    <div class="input-field">
                        <i class="fa-solid fa-mobile"></i>
                        <input type="tel" placeholder="Telefono" id="sing_phone" name="sing_phone">
                    </div>
                    <input type="hidden" name="action" value="users">
                    <input type="submit" value="Sing up" class="btn solid">
                </form>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>No tienes cuenta?</h3>
                    <p>Registrate para que puedas iniciar sesión.</p>
                    <button class="btn transparent" id="sign-up-btn">Registrarse</button>
                </div>
                <img src="./assets/image/friend.svg" class="image" alt="">
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>Ya tienes cuenta?</h3>
                    <p>Ingresa con tu cuenta para conocer sobre DATEVET.</p>
                    <button class="btn transparent" id="sign-in-btn">Inicia Sesión</button>
                </div>
                <img src="./assets/image/pet.svg" class="image" alt="">
            </div>
        </div>
    </div>

    <script src="./includes/js/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
    <script type="module" src="./includes/js/login.js"></script>
</body>
</html>