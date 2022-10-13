<div class="modal-container" id="modal_container_product">
  <div class="modal">
    <div class="modal_header">
      <h1 class="modal_header_title">Producto</h1>
      <span class="modal_header_date"></span>
      <button class="btn_close" id="close_Pro">
        <i class='bx bx-x'></i>
      </button>
    </div>
    <form class="addProductFrom" method="POST" enctype="multipart/form-data" id="addProductFrom">
        <div class="addProduct_body">
            <div class="modal_item">
                <label class="item-label">Nombre:</label>
                <input type="text" name="product_name" id="product_name">
            </div>
            <div class="modal_item">
                <label class="item-label">Precio:</label>
                <input type="text" name="product_price" id="product_price">
            </div>
            <div class="modal_item">
                <label class="item-label">Foto</label>
                <input type="file" name="file" id="file" class="item-file">
                <label for="file" class="item-label-file" id="fichero">
                    <i class='bx bx-image'></i>
                </label>
            </div>
        </div>
        <input type="hidden" name="action" value="addProduct">
        <button type="submit">Agregar</button>

    </form>
  </div>
</div>