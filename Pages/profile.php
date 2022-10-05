<div class="modal-container" id="modal_container_user">
  <div class="modal modal_user">
    <div class="modal_header">
      <h1 class="modal_header_title">Usuario</h1>
      <span class="modal_header_date"></span>
      <button class="btn_close" id="close_user">
        <i class='bx bx-x'></i>
      </button>
    </div>
    <div class="modal_body">
        <div class="user">
          <div class="user_info"></div>
          <div class="user_cit">
            <h1>Mis citas</h1>
            <div class="user_cit_name">
              <h3 class="title">Fecha</h3>
              <h3 class="title">Horario</h3>
            </div>
            <div class="user_cit_list"></div>
          </div>
        </div>
    </div>
  </div>
  <input type="hidden" value="<?php echo $email ?>" id="user_profile">
  <input type="hidden" value="<?php echo $user ?>" id="user_profile_name">
  <input type="hidden" value="<?php echo $phone ?>" id="user_profile_phone">
</div>