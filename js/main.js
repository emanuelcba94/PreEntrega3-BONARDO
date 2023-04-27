// -------------------------- productos desde el JSON -------------------------- // 
let productosMasZapas = [];

fetch("./productos.json")
    .then(res => res.json())
    .then(data => {
        productosMasZapas = data;
        cargarProductos(); 
        botonAgregar();
    })

// -------------------------- nodos -------------------------- // 
const contenedorProductos = document.querySelector("#contenedor-productos");    //--> agregar productos
let productoAgregar = document.querySelectorAll(".producto-agregar");   //--> botones agregar a carrito
const numeroCarrito = document.querySelector("#numero-carrito");    //--> numero de carrito 


// -------------------------- cargar productos -------------------------- // 
// contenedorProductos.innerHTML = "";
function cargarProductos() {

    productosMasZapas.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-img" src="${producto.foto}" alt="${producto.titulo}">
        <div class="productos-info">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Comprar <i class="icon-bolsa bi bi-bag-check-fill"></i></button>
        </div>
        `
        contenedorProductos.append(div);
    })

} 
cargarProductos();

// -------------------------- botones agregar productos -------------------------- // 
function botonAgregar() {
    productoAgregar = document.querySelectorAll(".producto-agregar");

    productoAgregar.forEach(boton => { 
        boton.addEventListener("click", agregarAlCarrito);
    });
}
botonAgregar();
// console.log(productoAgregar);

// -------------------------- array de carrito vacio y localStorage -------------------------- // 
// si hay algo en el carrito parse y actualiza numero y sino vaciar carrito
let carritoMasZapas; 
let productosCarritoLs = localStorage.getItem("productos-carrito:");

if (productosCarritoLs) {
    carritoMasZapas = JSON.parse(productosCarritoLs);
    numeroDeCarrito()
} else {
    carritoMasZapas = [];
}

// -------------------------- agregar productos a carrito y actualizar numero y localStorage -------------------------- // 
function agregarAlCarrito(e) {

    const idAgregar = e.currentTarget.id;
    const productoAgregado = productosMasZapas.find(producto => producto.id === idAgregar);

    if(carritoMasZapas.some(producto => producto.id === idAgregar)) {
        const index = carritoMasZapas.findIndex(producto => producto.id === idAgregar);
        carritoMasZapas[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        carritoMasZapas.push(productoAgregado);
    }

    // numero de carrito 
    numeroDeCarrito();
    // console.log(carritoMasZapas);
    // -------------------------- localStorage -------------------------- // 
    localStorage.setItem("productos-carrito:", JSON.stringify(carritoMasZapas));
    // console.log(productoAgregado);

    // libreria toastify 
    Toastify({
        text: "Producto Agregado",
        duration: 2000,
        destination: "./carrito.html",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #ffa65e, #FF7300)",
        textTransform: "uppercase",
        fontWeight: "600",
        },
        onClick: function(){} 
    }).showToast();
}

// -------------------------- numero carrito -------------------------- //
function numeroDeCarrito() {
    let nuevoNumero = carritoMasZapas.reduce((acc, producto) => acc + producto.cantidad, 0); 
    numeroCarrito.innerText = nuevoNumero;
}