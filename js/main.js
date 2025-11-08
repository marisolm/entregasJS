// Variable para almacenar los productos agregados
let carrito = [];

// Capturar botones de productos
let boton1 = document.getElementById("producto1");
let boton2 = document.getElementById("producto2");
let boton3 = document.getElementById("producto3");

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

// agregar producto al carrito
function agregarAlCarrito(id) {
    let nombre = document.getElementById(`nombre${id}`).textContent;
    let precioTexto = document.getElementById(`precio${id}`).textContent;
    let precio = parseInt(precioTexto.replace("USD", "").trim());

    // agregar producto al carrito, validar si ya existe
    const existente = carrito.find((item) => item.nombre === nombre);
    if(existente){
        existente.cantidad++;
    }else{
        carrito.push({ nombre, precio, cantidad: 1 });
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

function actualizarContador() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
}

// simular pago
function simularPago(){
    if(carrito.length === 0){
        alert("El carrito está vacío. Agregue productos antes de pagar.");
        return;
    }
    let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    alert(`Pago simulado con éxito.\nTotal abonado: USD ${total}`);

    vaciarCarrito();
    actualizarContador();
}

// Asignar eventos a los botones de productos (usando this.id)
boton1.onclick = function(){ agregarAlCarrito(this.id.replace("producto", ""));};
boton2.onclick = function(){ agregarAlCarrito(this.id.replace("producto", ""));};
boton3.onclick = function(){ agregarAlCarrito(this.id.replace("producto", ""));};

// Asignar eventos a los botones del carrito
botonVaciar.onclick = vaciarCarrito;
botonPagar.onclick = simularPago;

// cargar carrito desde memoria al iniciar la página si existe
cargarCarrito();