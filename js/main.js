// Variable para almacenar los productos agregados
let carrito = [];

// Capturar elementos del carrito
let carritoLista = document.getElementById("carritoLista");
let totalCarrito = document.getElementById("totalCarrito");
let botonVaciar = document.getElementById("vaciarCarrito");
let botonPagar = document.getElementById("pagarCarrito");
let contadorCarrito = document.getElementById("contadorCarrito");


// guardar en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// cargar desde localStorage -si existe-
function cargarCarrito(){
    const carritoGuardado = localStorage.getItem("carrito");
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
    actualizarContador();
}

// cargar productos desde json
fetch("productos.json")
  .then((res) => res.json())
  .then((productos) => {
    mostrarProductos(productos);
  })
  .catch((error) => console.error("Error al cargar productos:", error));

  // mostrar productos en la página
function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const section = document.createElement("section");
    section.classList.add("product-item");

    section.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <p>USD ${producto.precio}</p>
      <button class="add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(section);
  });

  //escuchar los eventos de botones de los productos
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const producto = productos.find((p) => p.id == id);
      agregarAlCarrito(producto);
    });
  });
}

// agregar producto al carrito
function agregarAlCarrito(producto) {

    // agregar producto al carrito, validar si ya existe
    const existente = carrito.find((item) => item.nombre === producto.nombre);
    if (existente){
        existente.cantidad++;
    }else{
        carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    actualizarCarrito(); // actualizar el HTML del carrito
    guardarCarrito(); // guardar cada vez que se actualiza
}

// mostrar los productos en el carrito
function actualizarCarrito(){
    carritoLista.innerHTML = ""; // limpiar contenido previo

    if(carrito.length === 0){
        carritoLista.innerHTML = `<p class="void-cart">No tiene artículos en su carrito.</p>`;
        totalCarrito.textContent = "0";
        return;
    }
    carrito.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `<p>${item.nombre} (x${item.cantidad}) - USD ${item.precio * item.cantidad}</p>`;
        carritoLista.appendChild(div);
    });

    // calcular total
    let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalCarrito.textContent = total;

    actualizarContador();
}

// vaciar el carrito
function vaciarCarrito(){
    carrito = [];
    actualizarCarrito();
    localStorage.removeItem("carrito"); // limpiar también el almacenamiento
    actualizarContador();
}

// confirmación solo al presionar el botón Vaciar
function mensajesVaciar() {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "No hay productos para eliminar.", "info");
    return;
  }

  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos agregados.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire("Carrito vacío", "Todos los productos fueron eliminados.", "success");
    }
  });
}

function actualizarContador() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
}

// simular pago
function simularPago() {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "Agregue productos antes de pagar.", "warning");
    return;
  }
  let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  Swal.fire("Pago exitoso", `Total abonado: USD ${total}`, "success");
  vaciarCarrito();
}

// Asignar eventos a los botones del carrito
botonVaciar.onclick = mensajesVaciar;
botonPagar.onclick = simularPago;

// cargar carrito desde memoria al iniciar la página si existe
cargarCarrito();