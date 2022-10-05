<?php
    session_start();

    if(isset($_SESSION['usuario'])){
        if(!isset($_SESSION['rol'])){
            header('Location: ./index.php');
        }else{
            if($_SESSION['rol'] != 'user'){
                header('Location: ./index.php');
            }
        }
    }else{
        header('Location: ./index.php');
    }

    $user= $_SESSION['usuario'];
    $rol = $_SESSION['rol'];
    $phone = $_SESSION['phone'];
    $email = $_SESSION['email'];
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>

    <!-- font awesome cdn link  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>

    <!-- custom css file link  -->
    <link rel="stylesheet" href="./includes/css/style.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
</head>
<body>
    
<!-- header section starts  -->

<header class="header">

    <a href="#" class="logo"> <i class="fas fa-paw"></i> shop </a>

    <nav class="navbar">
        <a href="#home">Inicio</a>
       <!-- <a href="#about">Acerca</a> -->
        <a href="#citas">Citas</a>
        <a href="#shop">Tienda</a>
        <a href="#services">Servicios</a>
        <a href="#contact">Contacto</a>
    </nav>

    <div class="icons">
        <div class="fas fa-bars" id="menu-btn"></div>
        <div class="fas fa-user" id="user-btn"></div>
        <div class="fas fa-sign-out-alt" id="logout"></div>
    </div>

</header>

<!-- header section ends -->

<!-- home section starts  -->

<section class="home" id="home">

    <div class="content">
        <h3> <span>hola</span> bienvenido a datavet </h3>
        <a href="#" class="btn">Agenda tu cita aqui!</a>
    </div>

</section>

<!-- home section ends -->


<section class="citas" id="citas">

    <h1 class="heading"> Calendario de <span> Citas </span> </h1>

    <div class="calendar">
        <div class="calendar__info">
            <div class="calendar__month">
                <h1 id="month" class="month"></h1>
                
                <h1 id="year"></h1>
            </div>          
        </div>
    
        <div class="calendar__week" id="days">
            <div class="calendar__day calendar__item">LUNES</div>
            <div class="calendar__day calendar__item">MARTES</div>
            <div class="calendar__day calendar__item">MIERCOLES</div>
            <div class="calendar__day calendar__item">JUEVES</div>
            <div class="calendar__day calendar__item">VIERNES</div>
            <div class="calendar__day calendar__item">SABADO</div>
            <div class="calendar__day calendar__item">DOMINGO</div>
        </div>
    
        <div class="calendar__dates" id="dates"></div>
    </div>

</section>


</section>


<!-- shop section starts  -->

<section class="shop" id="shop">

    <h1 class="heading"> Nuestros <span> Productos </span> </h1>

    <div class="box-container" id="shop-container"></div>

</section>

<!-- shop section ends -->

<!-- services section starts  -->

<section class="services" id="services">

    <h1 class="heading"> Nuestros <span> Servicios </span> </h1>

    <div class="box-container" id="services-container">
        <div class="box">
            <i class="fas fa-dog"></i>
            <h3>Atención Medica</h3>
        </div>
        <div class="box">
            <i class="fas fa-cat"></i>
            <h3>Vacunación</h3>
        </div>
        <div class="box">
            <i class="fas fa-bath"></i>
            <h3>Hospitalización</h3>
        </div>
        <div class="box">
            <i class="fas fa-drumstick-bite"></i>
            <h3>Campañas de Esterilización</h3>
        </div>
    </div>

</section>

<!-- services section ends -->

<section class="contact" id="contact">

    <div class="box-container">
        <form action="" class="contact_us">
            <h3>Contacto</h3>
            <input type="text" placeholder="Nombre" class="box">
            <input type="email" placeholder="Correo" class="box">
            <input type="tumber" placeholder="Telefono" class="box">
            <textarea name="" placeholder="Mensaje" id="" cols="30" rows="10"></textarea>
            <input type="submit" value="Enviar" class="btn">
        </form>

        <div class="about">
            <h3>Sobre Nosotros</h3>
           
        </div>
    </div>

    

</section>

<?php include_once "./Pages/citas.php" ?>
<?php include_once "./Pages/profile.php" ?>


<script src="./includes/js/jquery.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>

<!-- custom js file link  -->
<script src="./includes/js/script.js"></script>

</body>
</html>