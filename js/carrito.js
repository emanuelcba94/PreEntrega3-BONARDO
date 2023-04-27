// -------------------------- carrito -------------------------- // 

// -------------------------- productos en LocalStorage -------------------------- //
let productosCarrito = localStorage.getItem("productos-carrito:");
productosCarrito = JSON.parse(productosCarrito);

// -------------------------- nodos -------------------------- // 
const carritoVacio = document.querySelector("#carrito-vacio"); //--> informacion carrito vacio
const carritoVacioImg = document.querySelector(".carrito-img"); //--> imagen de carrito vacio
const carritoProductos = document.querySelector("#carrito-productos"); //--> caja, div de los productos
const carritoAcciones = document.querySelector("#carrito-acciones"); //--> carrito acciones
const carritoComprado = document.querySelector("#carrito-comprado"); //--> informacion carrito comprado
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); //--> boton eliminar producto
const totalPrecios = document.querySelector("#total"); //--> el precio total de todos los productos
const botonComprar = document.querySelector("#carrito-comprar"); //--> boton finalizar la compra

// -------------------------- productos a carrito -------------------------- //
function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoVacioImg.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        // carrito html vacio
        carritoProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-img" src="${producto.foto}" alt="${producto.titulo}">
                <div class="carrito-producto-info">
                    <small>Producto</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar <i class="bi bi-trash3-fill"></i></i></button>
    
            `
            carritoProductos.append(div);
        });
        
    } else {
        carritoVacio.classList.remove("disabled");
        carritoVacioImg.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    // boton de liminar producto
    botonEliminar();
    // precio total de los productos
    preciosTotal()
}

cargarProductosCarrito();

// -------------------------- boton eliminar producto -------------------------- //
function botonEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => { 
        boton.addEventListener("click", eliminarDeCarrito);
    });
}

function eliminarDeCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    
    // libreria sweetalert2
    Swal.fire({
        title: 'Seguro desea Eliminar?',
        text: "Se eliminara el producto seleccionado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Eliminado!',
            'El producto selecionado fue eliminado.',
            'success',
            productosCarrito.splice(index, 1),
            cargarProductosCarrito(),
            localStorage.setItem("productos-carrito:", JSON.stringify(productosCarrito)),
            )
        }
    })
}

// -------------------------- precio total productos -------------------------- //
function preciosTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`; 
}

// -------------------------- finalizar compra -------------------------- //
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito:", JSON.stringify(productosCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");

    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: '¡Tu compra fue realizada con exito!',
        showConfirmButton: false,
        timer: 3000
    })
}
