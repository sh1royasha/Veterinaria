$(document).ready(function(){

    const path = window.location.pathname;
    const mostrarCitas = document.querySelector('.dates');
    const cit_day = document.querySelector('.modal_header_date');

    if( path == "/petshop/index.php"){
    
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });

        register();
        login();

        }else{

        const modal = document.getElementById("modal_container");
        const close = document.getElementById('close')

        close.addEventListener('click', ()=>{
            modal.classList.remove('show')
            setTimeout(function(){
                $('#dat').empty();
                mostrarCitas.classList.remove('available');
                mostrarCitas.classList.remove('not_available');
            }, 300);	
        })

    function calendar(){
        let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
        let daysNames = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado',]
        let currentDate = new Date();
        let currentDay = currentDate.getDate();
        let monthNumber = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        let dates = document.getElementById('dates');
        let month = document.getElementById('month');
        let year = document.getElementById('year');

        let prevMonthDOM = document.getElementById('prev-month');
        let nextMonthDOM = document.getElementById('next-month');
        
        month.textContent = monthNames[monthNumber];
        year.textContent = currentYear.toString();
    
        const writeMonth = (month) => {
        
            for(let i = startDay(); i>0;i--){
                dates.innerHTML += ` <div class="calendar__date calendar__last-days">
                    ${getTotalDays(monthNumber-1)-(i-1)}
                </div>`;
            }
        
            for(let i=1; i<=getTotalDays(month); i++){
                if(i===currentDay) {
                    dates.innerHTML += `
                    <div class="calendar__date calendar__item calendar__today">
                        <button value="${i}" class="btn-day btn-day-today">
                            ${i}
                        </button>
                    </div>`;
                }else{
                    dates.innerHTML += ` 
                    <div class="calendar__date calendar__item">
                        <button value="${i}" class="btn-day">
                            ${i}
                        </button>
                    </div>`;
                }
            }

        }   
    
        const getTotalDays = month => {
            if(month === -1) month = 11;
        
            if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
                return  31;
        
            } else if (month == 3 || month == 5 || month == 8 || month == 10) {
                return 30;
        
            } else {
        
                return isLeap() ? 29:28;
            }
        }
        
        const isLeap = () => {
            return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
        }
        
        const startDay = () => {
            let start = new Date(currentYear, monthNumber, 1);
            return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
        }
        
        const setNewDate = () => {
            currentDate.setFullYear(currentYear,monthNumber,currentDay);
            month.textContent = monthNames[monthNumber];
            year.textContent = currentYear.toString();
            dates.textContent = '';
            writeMonth(monthNumber);
        }
        
        writeMonth(monthNumber);  

        function show(){
            const day = document.querySelectorAll('.btn-day');
            day.forEach(nu=>{
                nu.addEventListener('click', function(){
                    modal.classList.add('show');
                    let citaDia = nu.value;
                    let citaMes = monthNumber+1;
                    let citaAno = currentYear.toString();
                    let cita = `${citaAno}-${citaMes}-${citaDia}`;
                    let numerodia = new Date(cita).getDay();
                    let nombredia = daysNames[numerodia];
                    cit_day.innerHTML = `${nombredia}, ${citaDia} De ${monthNames[monthNumber]} De ${currentYear.toString()}`
                    console.log(nombredia);
                    citas(cita);
                });
            })
        }

        show();
    
    }

    function citas(cita){
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{action: "citas", fecCit: cita},
            success: function(response){ 
                console.log(response)
                mostrarCitas.classList.add('available');
                let e1 = response[1].timeStart.split(':');
                response.forEach( cit => {
                    let horaIni = cit.timeStart.split(':');
                    let horaFin = cit.timeEnd.split(':');
                    mostrarCitas.innerHTML +=`
                    <button class="citas_btn" value="${cit.dateCit}/${horaIni}/${horaFin}">
                        <span>${horaIni[0]}:${horaIni[1]}</span>
                        <span>-</span>
                        <span>${horaFin[0]}:${horaFin[1]}</span>
                    </button>
                    `
                })
                let btns = document.querySelectorAll('.citas_btn');
                btns.forEach( btn =>{
                    btn.addEventListener('click',function(){
                        let addCit = btn.value;
                    })
                })
            },
            error: function(response){
                mostrarCitas.classList.add('not_available');
                mostrarCitas.innerHTML = `
                    <h1>${response.responseText}</h1>
                `    
            }
        })
    }

    calendar()


    let loginForm = document.querySelector('.header .login-form');

    document.querySelector('#login-btn').onclick = () =>{
        loginForm.classList.toggle('active');
        navbar.classList.remove('active');
    }

    let navbar = document.querySelector('.header .navbar');

    document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.toggle('active');    
        loginForm.classList.remove('active');
    }


    const images = [
        {
            nombre: "product_01"
        },
        {
            nombre: "product_02"
        },
        {
            nombre: "product_03"
        }
    ];

    const services = [
        {
            nombre: "dog boarding",
            icon: "fa-dog"
        },
        {
            nombre: "cat boarding",
            icon: "fa-cat"
        },
        {
            nombre: "spa & grooming",
            icon: "fa-bath"
        },
        {
            nombre: "healthy meal",
            icon: "fa-drumstick-bite"
        },
        {
            nombre: "activity exercise",
            icon: "fa-baseball-ball"
        },
        {
            nombre: "health care",
            icon: "fa-heartbeat"
        }
    ]

    let shop = document.querySelector("#shop-container");
    let serv = document.querySelector("#services-container");

    images.forEach(image =>{
        shop.innerHTML +=`
            <div class="box">
                <div class="image">
                    <img src="./assets/image/${image.nombre}.jpg" alt="">
                </div>
                <div class="content">
                    <h3>air-dried food</h3>
                    <div class="amount"> $15.00 - $30.00 </div>
                </div>
            </div>
        `
    })

    services.forEach(service =>{
        serv.innerHTML += `
            <div class="box">
                <i class="fas ${service.icon}"></i>
                <h3>${service.nombre}</h3>
                <a href="#" class="btn">read more</a>
            </div>
        `
    })

    }

    
        // Create an instance of Notyf
        let notyf = new Notyf({
            duration: 1000,
            position: {
                x: 'right',
                y: 'top',
            },
            types: [
                {
                type: 'error',
                background: 'indianred',
                duration: 2000
                },
                {
                type: 'success',
                background: 'mediumseagreen',
                duration: 2000
                }
            ]
        });

    function login(){
        $(document).on("submit","#sign-in-form",function (e){
            e.preventDefault();
            let status = false;
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            
            let sing = document.querySelector("#sign-in-form")
            let sing_inputs = sing.querySelectorAll(".input-field")
            let sing_up_email = document.querySelector("#sing_up_email").value;
            let sing_up_password = document.querySelector("#sing_up_password").value;

            if(sing_up_email === ''){
                status = false;
                sing_inputs[0].classList.add('error');
                notyf.error('Falta llenar el campo correo');
            }else{
                status = true;
                sing_inputs[0].classList.remove('error');
            }

            if(sing_up_password === ''){
                status = false;
                sing_inputs[1].classList.add('error');
                notyf.error('Falta llenar el campo contraseña');
            }else{
                status = true;
                sing_inputs[1].classList.remove('error');
            }

            if(status){
                $.ajax({
                    url: "includes/php/actions.php",
                    type: "POST",
                    dataType: "json",
                    data: new FormData(this),
                    processData: false,
                    contentType: false,
                    success: function(response){
                        let infoName = response['name'];
                        let infoPhone = response['phone'];
                        let infoEmail = response['email'];
                        let infoRol = response['rol'];
                        $.ajax({
                            url:'includes/php/sessiones.php',
                            type: "POST",
                            data:{
                                nombre: infoName,
                                telefono: infoPhone,
                                email: infoEmail,
                                rol: infoRol
                            },            
                        }).done(function(result){
                            notyf.success("Usuario Correcto Entrando Al Dashboard")
                            setTimeout(function(){
                                sing.reset();
                                location.reload(true);
                            }, 500);
                        })
                    },
                    error: function(response){    
                        notyf.error(response.responseText);
                    }
                   })
            }
        })
    }


    function register(){
        $(document).on("submit", "#sign-up-form",function (e){
            e.preventDefault();
            let status = false;
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
            
            let sing = document.querySelector("#sign-up-form")
            let sing_inputs = sing.querySelectorAll(".input-field")
            let sing_name = document.querySelector("#sing_name").value;
            let sing_email = document.querySelector("#sing_email").value;
            let sing_password = document.querySelector("#sing_password").value;
            let sing_phone = document.querySelector("#sing_phone").value;
            
            if(sing_name === '' || sing_name.length<5){
                status = false;
                sing_inputs[0].classList.add('error');
                notyf.error('Falta el campo nombre o el formato esta incorrecto');
            }else{
                status = true;
                sing_inputs[0].classList.remove('error');
            }

            if(sing_email === '' || !regexEmail.test(sing_email)){
                sing_inputs[1].classList.add('error');
                status = false;
                notyf.error('Falta el campo email o el formato esta incorrecto');
            }else{
                status = true;
                sing_inputs[1].classList.remove('error');
            }

            if(sing_password === '' || sing_password.length<5){
                sing_inputs[2].classList.add('error');
                notyf.error('Falta el campo password o el formato esta incorrecto');
                status = false;
            }else{
                status = true;
                sing_inputs[2].classList.remove('error');
            }

            if(sing_phone.length != 10 | sing_phone.length > 10){
                sing_inputs[3].classList.add('error');
                notyf.error('Falta el campo telefono o el formato esta incorrecto');
                status = false;
            }else{
                status = true;
                sing_inputs[3].classList.remove('error');
            }

            if(status){
                $.ajax({
                    url: "includes/php/actions.php",
                    type: "POST",
                    dataType: "json",
                    data: new FormData(this),
                    processData: false,
                    contentType: false,
                    success: function(response){
                        notyf.success("Usuarios creado Exitosamente");
                        sing.reset();
                    },
                    error: function(response){    
                        notyf.error(response.responseText);
                    }
                   })
            }
          
        })
    }

    function logOut(){
        $('#logout').click(function(){
            $.ajax({
                url: "./includes/php/logout.php",
                type: "GET",
                data: {action: "out"},
                success: function(response){
                    location.reload(true);
                }
            })
        })
    }

    logOut();
})