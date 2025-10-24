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



// agregar producto al carrito
function agregarAlCarrito(id){
    // Obtener nombre y precio desde el DOM
    let nombre = document.getElementById(`nombre${id}`).textContent;
    let precioTexto = document.getElementById(`precio${id}`).textContent;
    let precio = parseFloat(precioTexto.replace("USD", "").trim());

    // Crear objeto producto
    let producto = {nombre, precio};

    // Agregar producto al carrito, validar si ya existe
    const existente = carrito.find((item) => item.nombre === nombre);
    if (existente){
        existente.cantidad++;
    }else{
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Actualizar el HTML del carrito
    mostrarCarrito();
}


// mostrar los productos en el carrito
function mostrarCarrito(){
    carritoLista.innerHTML = ""; // Limpiar contenido previo

    if(carrito.length === 0){
        carritoLista.innerHTML = `<p class="void-cart">No tiene artículos en su carrito.</p>`;
        totalCarrito.textContent = "0.00";
        return;
    }
    carrito.forEach((item) =>{
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<p>${item.nombre} (x${item.cantidad}) - USD ${(item.precio * item.cantidad)}</p>`;
    carritoLista.appendChild(div);

    });
    // Calcular total
    let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalCarrito.textContent = total;
}

// Función para vaciar el carrito
function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
}

// Función para simular pago
function simularPago(){
    if(carrito.length === 0){
        alert("El carrito está vacío. Agregue productos antes de pagar.");
        return;
    }
    let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    alert(`Pago simulado con éxito.\nTotal abonado: USD ${total}`);
    vaciarCarrito();
}

// Asignar eventos a los botones de productos (usando this.id)
boton1.onclick = function(){ agregarAlCarrito(this.id.replace("producto", ""));};
boton2.onclick = function(){ agregarAlCarrito(this.id.replace("producto", ""));};
boton3.onclick = function(){ agregarAlCarrito(this.id.replace("producto", ""));};

// Asignar eventos a los botones del carrito
botonVaciar.onclick = vaciarCarrito;
botonPagar.onclick = simularPago;