// -------------------------- array de productos -------------------------- // 
const productosMasZapas = [
    {
        id: "nike-01",
        titulo: "Nike 01",
        foto: "./img/nike/nike-01.jpg",
        precio: 35499
    },
    {
        id: "nike-02",
        titulo: "Nike 02",
        foto: "./img/nike/nike-02.jpg",
        precio: 33999
    },
    {
        id: "nike-03",
        titulo: "Nike 03",
        foto: "./img/nike/nike-03.jpg",
        precio: 43499
    },
    {
        id: "nike-04",
        titulo: "Nike 04",
        foto: "./img/nike/nike-04.jpg",
        precio: 49999
    },
    {
        id: "nike-05",
        titulo: "Nike 05",
        foto: "./img/nike/nike-05.jpg",
        precio: 43399
    },
    {
        id: "nike-06",
        titulo: "Nike 06",
        foto: "./img/nike/nike-06.jpg",
        precio: 31999
    },
    {
        id: "puma-01",
        titulo: "Puma 01",
        foto: "./img/puma/puma-01.jpg",
        precio: 39999
    },
    {
        id: "puma-02",
        titulo: "Puma 02",
        foto: "./img/puma/puma-02.jpg",
        precio: 42499
    },
    {
        id: "puma-03",
        titulo: "Puma 03",
        foto: "./img/puma/puma-03.jpg",
        precio: 45499
    },
    {
        id: "puma-04",
        titulo: "Puma 04",
        foto: "./img/puma/puma-04.jpg",
        precio: 55.499
    },
    {
        id: "puma-05",
        titulo: "Puma 05",
        foto: "./img/puma/puma-05.jpg",
        precio: 43999
    },
    {
        id: "puma-06",
        titulo: "Puma 06",
        foto: "./img/puma/puma-06.jpg",
        precio: 62499
    },
    
]

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

/* 
<div class="producto">
<img class="producto-imagen" src="./img/nike/nike-01.jpg" alt="">
<div class="producto-detalles">
    <h3 class="producto-titulo">Nike 01</h3>
    <p class="producto-precio">$1000</p>
    <button class="producto-agregar">Agregar</button>
</div>
</div> 
*/

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
}

// -------------------------- numero carrito -------------------------- //
function numeroDeCarrito() {
    let nuevoNumero = carritoMasZapas.reduce((acc, producto) => acc + producto.cantidad, 0); 
    numeroCarrito.innerText = nuevoNumero;
}