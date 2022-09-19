<?php
    session_start();

    $action = $_REQUEST['action'];

    if(!empty($action)){
        require_once './proccess.php';
        $obj = new Process();
    }

    if($action == 'users' && !empty($_POST)){
        $name = $_POST['sing_name'];
        $email = $_POST['sing_email'];
        $password = password_hash($_POST['sing_password'],PASSWORD_DEFAULT);
        $phone = $_POST['sing_phone'];

        $user = [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'phone' => $phone
        ];

        $adduser = $obj->add($user,'usuario');
        if(isset($adduser)){
            echo json_encode($user);
        }
        
    }

    if($action == 'login'){
        $email = $_POST['sing_up_email'];
        $password = $_POST['sing_up_password'];
        $loguser = $obj->log('usuario','email','password',$email,$password);
        if(!empty($loguser)){
            echo json_encode($loguser);
        }else{
            echo "Usuario o Contraseña incorrecta";
        }
        
    }

    if($action == 'citas'){
        $fecha = $_REQUEST['fecCit'];
        $cita = $obj->datesDis('citas','dateCit',$fecha);
        if(!empty($cita)){
            echo json_encode($cita);
        }else{
            echo "no hay citas disponibles para este dia";
        }
        
    }

    if($action == 'information'){
        $username = $_REQUEST['userMail'];
        $informatio = $obj->records('usuario','email',$username);
        echo json_encode($informatio);

    }

?>