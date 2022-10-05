import {notyf,logOut,showCitasTodayAdmin,paginationUse,addCitas,showCitas,paginationUseCit} from './main.js'
$(document).ready(function(){
    /* MODAL VARIABLES */
    let modal = document.getElementById('modal_container')
    let modalclose = document.getElementById('close')
    let modalOpen = document.getElementById('add_Cit')
    let addCitForm = document.querySelector('.addcitFrom')

    /* MODAL ABRIR Y CERRAR*/
    modalOpen.addEventListener('click', () =>{
        modal.classList.add('show');
    })

    modalclose.addEventListener('click',()=>{
        modal.classList.remove('show');
        addCitForm.reset();
    })

    notyf

    logOut()
    addCitas();
    showCitas();
    paginationUse();
    showCitasTodayAdmin();
    paginationUseCit();
    
    /* fecha del dia actual */
    // date_today
})