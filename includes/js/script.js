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
        

        }else if(path == "/petshop/admin.php"){
        
            logOut();
            let modal = document.getElementById("modal_container");
            let close = document.getElementById('close')
            let citOp = document.getElementById("add_Cit")
            let citDates = document.querySelector('.addcitFrom')

            /*fehca actual */
            let date = new Date();
            let today_date = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
            showCitasToday(today_date);

            citOp.addEventListener('click', ()=>{
                modal.classList.add('show');
            })

            close.addEventListener('click', ()=>{
                modal.classList.remove('show')	
                citDates.reset()
            })

            showCitas();

            addCitas();

            // pagination
            $(document).on("click", "ul.pagination li a", function (e) {
                e.preventDefault();
                var $this = $(this);
                const pagenum = $this.data("page");
                $("#currentpage").val(pagenum);
                showCitas();
                $this.parent().siblings().removeClass("active");
                $this.parent().addClass("active");
            });
            
        }else{
            profileCit();
            profile();
        const modal = document.getElementById("modal_container");
        const close = document.getElementById('close')

        const modal_user = document.getElementById("modal_container_user");
        const close_user = document.getElementById('close_user')
        const user = document.getElementById('user-btn');

        user.addEventListener('click', ()=>{
            modal_user.classList.add('show')
        })

        close_user.addEventListener('click', ()=>{
            modal_user.classList.remove('show')
        })

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
                    let cit_dat = `${nombredia}, ${citaDia} De ${monthNames[monthNumber]} De ${currentYear.toString()}`
                    cit_day.innerHTML = cit_dat;
                    citas(cita,cit_dat);
                });
            })
        }

        show();
    
    }

    function citas(cita,cit_dat){
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{action: "citas", fecCit: cita},
            success: function(response){ 
                mostrarCitas.classList.add('available');
                response.forEach( cit => {
                    let horaIni = cit.timeStart.split(':');
                    let horaFin = cit.timeEnd.split(':');
                    mostrarCitas.innerHTML +=`
                    <button class="citas_btn" value="${cit.dateCit},${cit.timeStart},${cit.timeEnd},${cit.id}" ${cit.available ? "" : "disabled"}>
                        <span>${horaIni[0]}:${horaIni[1]}</span>
                        <span>-</span>
                        <span>${horaFin[0]}:${horaFin[1]}</span>
                    </button>
                    `
                })
                let btns = document.querySelectorAll('.citas_btn');
                btns.forEach( btn =>{
                    btn.addEventListener('click',function(){
                        let addCit = btn.value.split(',');
                        let horaIni = addCit[1].split(':');
                        let horaFin = addCit[2].split(':');
                        let citId = addCit[3];
                        Swal.fire({
                            title: 'Deseas agendar esta cita?',
                            html: `
                                <div class="show_cit">
                                    <h3>${cit_dat}</h3>
                                    <h3>${horaIni[0]}:${horaIni[1]} - ${horaFin[0]}:${horaFin[1]}</h3>
                                </div>
                            `,
                            showCancelButton: true,
                            confirmButtonText: 'Agendar',
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                saveCit(addCit,citId)
                            } 
                          })
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

/*
    let loginForm = document.querySelector('.header .login-form');

    document.querySelector('#user-btn').onclick = () =>{
        loginForm.classList.toggle('active');
        navbar.classList.remove('active');
    }

    let navbar = document.querySelector('.header .navbar');

    document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.toggle('active');    
        loginForm.classList.remove('active');
    }
*/

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

    let shop = document.querySelector("#shop-container");

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

    /* Funcion para logear */
    function login(){
        $(document).on("submit","#sign-in-form",function (e){
            e.preventDefault();
            let status = true;
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
                sing_inputs[0].classList.remove('error');
            }

            if(sing_up_password === ''){
                status = false;
                sing_inputs[1].classList.add('error');
                notyf.error('Falta llenar el campo contraseña');
            }else{
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
                            notyf.success("Usuario Correcto. Ingresando....")
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

    /* Funcion para Registrar */
    function register(){
        $(document).on("submit", "#sign-up-form",function (e){
            e.preventDefault();
            let status = true;
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
                sing_inputs[0].classList.remove('error');
            }

            if(sing_email === '' || !regexEmail.test(sing_email)){
                sing_inputs[1].classList.add('error');
                status = false;
                notyf.error('Falta el campo email o el formato esta incorrecto');
            }else{
                sing_inputs[1].classList.remove('error');
            }

            if(sing_password === '' || sing_password.length<5){
                sing_inputs[2].classList.add('error');
                notyf.error('Falta el campo password o el formato esta incorrecto');
                status = false;
            }else{
                sing_inputs[2].classList.remove('error');
            }

            if(sing_phone.length != 10 | sing_phone.length > 10){
                sing_inputs[3].classList.add('error');
                notyf.error('Falta el campo telefono o el formato esta incorrecto');
                status = false;
            }else{
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

    /* Funcion para Cerrar Sesión */
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

    function pagination(totalpages, currentpage) {
        var pagelist = "";
        if (totalpages > 1) {
          currentpage = parseInt(currentpage);
          pagelist += `<ul class="pagination justify-content-center pagination-list">`;
          const prevClass = currentpage == 1 ? " disabled" : "";
          pagelist += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${
            currentpage - 1
          }">Previous</a></li>`;
          for (let p = 1; p <= totalpages; p++) {
            const activeClass = currentpage == p ? " active" : "";
            pagelist += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
          }
          const nextClass = currentpage == totalpages ? " disabled" : "";
          pagelist += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${
            currentpage + 1
          }">Next</a></li>`;
          pagelist += `</ul>`;
        }
      
        $("#pagination").html(pagelist);
    }

    function getcitasrow(citas) {
        let horaIni = citas.timeStart.split(':');
        let horaFin = citas.timeEnd.split(':');
        let fechaCit = citas.dateCit.split('-');
        let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
            if(fechaCit[1] === '01')fechaCit[1]=1;
            if(fechaCit[1] === '02')fechaCit[1]=2;
            if(fechaCit[1] === '03')fechaCit[1]=3;
            if(fechaCit[1] === '04')fechaCit[1]=4;
            if(fechaCit[1] === '05')fechaCit[1]=5;
            if(fechaCit[1] === '06')fechaCit[1]=6;
            if(fechaCit[1] === '07')fechaCit[1]=7;
            if(fechaCit[1] === '08')fechaCit[1]=8;
            if(fechaCit[1] === '09')fechaCit[1]=9;
        var citasRow = "";
        if (citas) {
            citasRow = `
                        <div class="cit_all">
                            <span class="cit_all_info">
                                ${fechaCit[2]}-${monthNames[fechaCit[1]-1]}-${fechaCit[0]}
                            </span>
                            <span class="cit_all_info">
                                ${horaIni[0]}:${horaIni[1]} - ${horaFin[0]}:${horaFin[1]}
                            </span>
                            ${citas.available ?
                                    `
                                        <span class="cit_all_info">
                                            Disponible
                                        </span>
                                    ` :
                                    `<span class="cit_all_info">
                                    Ocupado
                                </span>`
                            }
                            <button class="cit_all_btn" value="${citas.id}">
                                <i class='bx bx-trash'></i>
                            </button>                        
                        </div>`;
        }
        return citasRow;
    }
      
    function showCitas(){
        var pageno = $("#currentpage").val();
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{ page: pageno,action: "show_Citas"},
            success: function(response){ 
                if(response.citas){
                    var playerslist = "";
                    $.each(response.citas, function (index, citas) {
                      playerslist += getcitasrow(citas);
                    });
                    $(".list-cit-list").html(playerslist);
                    let totalPlayers = response.count;
                    let totalpages = Math.ceil(parseInt(totalPlayers) / 5);
                    const currentpage = $("#currentpage").val();
                    pagination(totalpages, currentpage);
                }
            },
            error: function(response){
                console.log(response); 
            }
        })
    }

    function addCitas(){
        $(document).on("submit", '.addcitFor' ,function (e){
            e.preventDefault();
            let citDates = document.querySelector('.addcitFor')
            let cit_date = document.getElementById('cit_date').value;
            let time_start = document.getElementById('time_start').value;
            let time_end = document.getElementById('time_end').value;
            let status = true;
            let modal = document.getElementById("modal_container");

            if(cit_date === ''){
                status = false;
                notyf.error('Falta llenar el campo fecha');
            }

            if(time_start === ''){
                status = false;
                notyf.error('Falta llenar el campo Hora Inicial');
            }

            if(time_end === ''){
                status = false;
                notyf.error('Falta llenar el campo Hora Final');
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
                        notyf.success("Cita Creada Exitosamente");
                        modal.classList.remove('show')
                        citDates.reset();
                        showCitas();
                    },
                    error: function(response){    
                        notyf.error(response.responseText);
                    }
                })
            }
            
        })
    }

    function showCitasToday(day){
        let cit_container = document.querySelector('.cit_container');
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{  action: "show_Citas_Today", day: day},
            success: function(response){
                console.log(response);
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    function saveCit(citDate,citId){
        let cit_dat = citDate[0];
        let cit_time_start = citDate[1];
        let cit_time_end = citDate[2];
        let nombre = document.getElementById('user_profile_name').value;
        let email = document.getElementById('user_profile').value;
        let telefono = document.getElementById('user_profile_phone').value;
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{  action: "save_Citas", date: cit_dat, 
            timeStart:cit_time_start, timeEnd: cit_time_end,
            name: nombre, email: email, telefono:telefono, id:citId},
            success: function(response){
                if(response){
                notyf.success("Cita Agregada Exitosamente");
                }
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    function profile(){
        let user= document.getElementById('user_profile').value
        let user_info = document.querySelector('.user_info');
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{  action: "profile", user: user},
            success: function(response){
                user_info.innerHTML = `
                        <div class="user_info_item">
                            <i class='bx bx-user-circle'></i>
                            <span>${response[0].name}</span>
                        </div>
                        <div class="user_info_item">
                            <i class='bx bx-envelope'></i>
                            <span>${response[0].email}</span>
                        </div>
                        <div class="user_info_item">
                            <i class='bx bx-phone'></i>
                            <span>${response[0].phone}</span>
                        </div>
                      
                `
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    function profileCit(){
        let user= document.getElementById('user_profile').value
        let user_info = document.querySelector('.user_cit_list');
        let date = new Date();
        let output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
            
        
        $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{  action: "profileCit", user: user, date: output},
            success: function(response){
                if(response){
                    response.forEach(cit=>{
                        let horaIni = cit.timeStart.split(':');
                        let horaFin = cit.timeEnd.split(':');
                        let fechaCit = cit.citdat.split('-');
                        if(fechaCit[1] === '01')fechaCit[1]=1;
                        if(fechaCit[1] === '02')fechaCit[1]=2;
                        if(fechaCit[1] === '03')fechaCit[1]=3;
                        if(fechaCit[1] === '04')fechaCit[1]=4;
                        if(fechaCit[1] === '05')fechaCit[1]=5;
                        if(fechaCit[1] === '06')fechaCit[1]=6;
                        if(fechaCit[1] === '07')fechaCit[1]=7;
                        if(fechaCit[1] === '08')fechaCit[1]=8;
                        if(fechaCit[1] === '09')fechaCit[1]=9;
                        user_info.innerHTML = `
                            <span>
                                ${fechaCit[2]}-${monthNames[fechaCit[1]-1]}-${fechaCit[0]}
                            </span>
                            <span>
                                ${horaIni[0]}:${horaIni[1]} - ${horaFin[0]}:${horaFin[1]}
                            </span>
                        `
                    })
                }
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    logOut();
})