/* FUNCIÓN CERRAR SESIÓN */
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

/* FUNCIÓN PARA REGISTRAR */
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

/*FUNCIÓN PARA LOGIN*/
function login(){
    $(document).on("submit","#sign-in-form",function (e){
        e.preventDefault();
        let status = true;
        
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
                        }, 300);
                    })
                },
                error: function(response){    
                    notyf.error(response.responseText);
                }
               })
        }
    })
}

/* FUNCIÓN PARA SWITCHEAR LOGIN Y REGISTRO */
function switchLogReg(){
    let sign_in_btn = document.querySelector("#sign-in-btn");
    let sign_up_btn = document.querySelector("#sign-up-btn");
    let container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

}

/* FUNCIÓN PARA CREAR NOTIFICACIÓN */
const notyf = new Notyf({
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

/* FECHA ACTUAL */
let date = new Date();
let date_today = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0'); 


/* FUNCIÓN AGREGAR CITAS - ADMIN */
function addCitas(){
    $(document).on("submit", '.addcitFrom' ,function (e){
        e.preventDefault();
        let citDates = document.querySelector('.addcitFrom')
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

/* FUNCIÓN MOSTRAR CITAS - ADMIN */
function showCitas(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url: "./includes/php/actions.php",
        type: "GET",
        dataType: "json",
        data:{ page: pageno,action: "show_Citas"},
        success: function(response){ 
            if(response.citas){
                let playerslist = "";
                $.each(response.citas, function (index, citas) {
                  playerslist += getcitasrow(citas);
                });
                $(".list-cit-list").html(playerslist);
                let totalPlayers = response.count;
                let totalpages = Math.ceil(parseInt(totalPlayers) / 5);
                const currentpage = $("#currentpage").val();
                pagination(totalpages, currentpage);
                delHor()
            }
        },
        error: function(response){
            console.log(response); 
        }
    })
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

function paginationCit(totalpages, currentpage) {
    var pagelist = "";
    if (totalpages > 1) {
      currentpage = parseInt(currentpage);
      pagelist += `<ul class="paginationCit justify-content-center pagination-list">`;
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
  
    $("#paginationCit").html(pagelist);
}

function paginationUse(){
    $(document).on("click", "ul.pagination li a", function (e) {
        e.preventDefault();
        var $this = $(this);
        const pagenum = $this.data("page");
        $("#currentpage").val(pagenum);
        showCitas();
        $this.parent().siblings().removeClass("active");
        $this.parent().addClass("active");
    });
}

function paginationUseCit(){
    $(document).on("click", "ul.paginationCit li a", function (e) {
        e.preventDefault();
        var $this = $(this);
        const pagenum = $this.data("page");
        $("#currentpagetoday").val(pagenum);
        showCitasTodayAdmin()
        $this.parent().siblings().removeClass("active");
        $this.parent().addClass("active");
    });
}

/* FUNCION MOSTRAR CITAS DEL DIA - ADMIN*/
function showCitasTodayAdmin(){
    var pageno = $("#currentpagetoday").val();
    /* FECHA ACTUAL */
    let date = new Date();
    let date_today = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');  
    let list_citas = document.querySelector('.list-cit-today');
    $.ajax({
        url: "./includes/php/actions.php",
        type: "GET",
        dataType: "json",
        data:{ page: pageno, action: "show_Citas_Today", day_today: date_today},
        success: function(response){
                if(response.registros){
                let citaslist = "";
                $.each(response.registros, function (index, citas) {
                    citaslist += getcitasTodayrow(citas);
                });
                
                $(".list-cit-today").html(citaslist);
                
                let totalPlayers = response.count;
                let totalpages = Math.ceil(parseInt(totalPlayers) / 5);
                const currentpage = $("#currentpagetoday").val();
                paginationCit(totalpages, currentpage);
            }

           if(Object.entries(response.registros).length === 0){
            list_citas.innerHTML = `
                <div class="list-cit-today-empty">
                <h3>NO HAY CITAS DISPONIBLES PARA HOY</h3>
                </div>
            `
           }

        },
        error: function(response){
            list_citas.innerHTML = `
                <h3>${response.responseText}</h3>
            `
        }
    })
}

function getcitasTodayrow(citas){
    let horaIni = citas.timeStart.split(':');
    let horaFin = citas.timeEnd.split(':');
    let citasRow = "";
    if (citas) {
        citasRow = `
            <div class="list-cit-item">
                <span>
                    ${horaIni[0]}:${horaIni[1]} - ${horaFin[0]}:${horaFin[1]}  
                </span>
                <span>
                    ${citas.name}
                </span>
                <span>
                    ${citas.email}
                </span>
                <span>
                    ${citas.phone}  
                </span>
            </div>`;
    }
    return citasRow;
}

function showProductsAdmin(){
    let list_product = document.querySelector('.list-product');
    $.ajax({
        url: "./includes/php/actions.php",
        type: "GET",
        dataType: "json",
        data: {action: "show_products_admin"},
        success: function(response){
            response.forEach(image =>{
                list_product.innerHTML +=`
                <div class="box">
                <div class="image">
                <img src="./assets/uploads/${image.photo}" alt="">
                </div>
                <div class="content">
                    <h3>${image.name}</h3>
                    <div class="amount">$ ${image.price}</div>
                </div>
            </div>
                `
            })
        },
        error: function(response){
            console.log(response)
        }
    })
}

function showUsersAdmin(){
    let list_users = document.querySelector('.list_users');
    $.ajax({
        url: "./includes/php/actions.php",
        type: "GET",
        dataType: "json",
        data: {action: "show_users_admin"},
        success: function(response){
            response.forEach(image =>{
                list_users.innerHTML +=`
                    <div class="list_users_list">
                        <span>${image.name}</span>
                        <span>${image.email}</span>
                        <span>${image.phone}</span>
                        <span>${image.rol}</span>
                    </div>       
                `
            })
        },
        error: function(response){
            console.log(response)
        }
    })
}

function getProductsAdmin(){
    $(document).on("submit","#addProductFrom",function(e){
        e.preventDefault();
        let name = document.getElementById('product_name');
        let price = document.getElementById('product_price');
        let img = document.getElementById('file');
        let fichero = document.getElementById('fichero');
        let status= true;

        if(name.value === ''){
            status = false;
            name.classList.add('error')
            notyf.error("falta rellenar el campo nombre");
        }else{
            name.classList.remove('error')
        }

        if(price.value === ''){
            status = false;
            price.classList.add('error')
            notyf.error("falta rellenar el campo precio");
        }else{
            price.classList.remove('error')
        }

        if(img.value === ''){
            status = false;
            fichero.classList.add('error')
            notyf.error("falta subir la imagen");
        }else{
            fichero.classList.remove('error')
        }

        if(status){
            $.ajax({
                url: "./includes/php/actions.php",
                type: "POST",
                dataType: "json",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function(response){
                    console.log(response)
                    
                },
                error: function(response){
                    console.log(response)
                }
            })
        }

    })
}

 /* Funcion agrega nombre del archivo a input */
 function inputfile(){
    /* NOMBRE INPUT FILE */
    document.getElementById('file').onchange = function () {
      document.getElementById('fichero').innerHTML = document.getElementById('file').files[0].name;
    }
  }

  function delHor(){
    let btns = document.querySelectorAll('.cit_all_btn');
    btns.forEach(del=>{
        del.addEventListener('click',function(){
            Swal.fire({
                title: 'Deseas eliminar este Horario?',
                showCancelButton: true,
                confirmButtonText: 'Si',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                   deleteCit(del.value) 
                   
                } 
              })
        })
    })
  }

  function deleteCit(indice){
    $.ajax({
            url: "./includes/php/actions.php",
            type: "GET",
            dataType: "json",
            data:{action: "delcitas", indice: indice},
        success: function(response){
            console.log(response);
            showCitas()
        },
        error: function(response){
            console.log(response)
        }
    })
  }


export {
    showUsersAdmin,showProductsAdmin,getProductsAdmin,
    register,login,switchLogReg,notyf,logOut,addCitas,
    showCitas,paginationUse,showCitasTodayAdmin,
    paginationUseCit,inputfile
}