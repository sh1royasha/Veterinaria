<div class="modal-container" id="modal_container">
  <div class="modal">
    <div class="modal_header">
      <h1 class="modal_header_title">Citas</h1>
      <span class="modal_header_date"></span>
      <button class="btn_close" id="close">
        <i class='bx bx-x'></i>
      </button>
    </div>
    <form class="addcitFrom" >
        <div class="addCit_body">
            <div class="modal_item">
                <label for="">Fecha</label>
                <input type="date" name="cit_date" id="cit_date">
            </div> 
            <div class="modal_item">
                <label for="">Hora Iniciada</label>
                <input type="time" name="cit_time_start" id="time_start">
            </div>
            <div class="modal_item">
                <label for="">Hora Finalizada</label>
                <input type="time" name="cit_time_end" id="time_end">
            </div>
        </div>
        <button type="submit">Agregar</button>
        <input type="hidden" name="action" value="addCit">
    </form>
  </div>
</div>