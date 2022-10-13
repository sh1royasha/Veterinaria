import {getProductsAdmin,inputfile,notyf,logOut,showCitasTodayAdmin,paginationUse,addCitas,showCitas,paginationUseCit} from './main.js'
$(document).ready(function(){
    /* MODAL VARIABLES */
    let modal = document.getElementById('modal_container')
    let modalcloseCit = document.getElementById('close')
    let modalOpenCit = document.getElementById('add_Cit')
    let addCitForm = document.querySelector('.addcitFrom')
    let modalOpenProduct = document.getElementById('add_Prod');
    let modalcloseProduct = document.getElementById('close_Pro')
    let modalProduct = document.getElementById('modal_container_product');
    let addProductFrom = document.getElementById('addProductFrom')
    /* MODAL ABRIR Y CERRAR*/
    modalOpenCit.addEventListener('click', () =>{
        modal.classList.add('show');
    })

    modalcloseCit.addEventListener('click',()=>{
        modal.classList.remove('show');
        addCitForm.reset();
    })

    modalOpenProduct.addEventListener('click',()=>{
        modalProduct.classList.add('show');
    })

    
    modalcloseProduct.addEventListener('click',()=>{
        modalProduct.classList.remove('show');
        addProductFrom.reset();
    })

    notyf

    logOut()
    addCitas();
    showCitas();
    paginationUse();
    showCitasTodayAdmin();
    paginationUseCit();
    inputfile();
    getProductsAdmin();
    
    /* fecha del dia actual */
    // date_today
})