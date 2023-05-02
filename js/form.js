// -------------------------- formulario -------------------------- //

// -------------------------- nodos formulario -------------------------- // 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const formularioContenedor = document.querySelector(".formulario-contenedor");

// -------------------------- expreciones regulares formulario  -------------------------- //
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

// campos btn guardar
const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false	
}

// validar cada input
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			localStorage.setItem("nombre", nombre.value);
		break; 
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break; 
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;  
	}
}

// validar cada campo 
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('bi-check-circle-fill');
		document.querySelector(`#grupo__${campo} i`).classList.remove('bi-x-circle-fill');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.add('bi-x-circle-fill');
		document.querySelector(`#grupo__${campo} i`).classList.remove('bi-check-circle-fill');	
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

// ingresar a cada input
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('keyup', validarFormulario);
});

// btn guardar
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.correo && campos.telefono && terminos.checked) {
		formulario.reset();

		nombreLS = localStorage.getItem("nombre");

        Swal.fire({
            icon: 'success',
            title: `Excelente ¡${nombreLS.toUpperCase()}!`,
            text: 'Tu datos se guardaron correctamente!',
        })
        
        setTimeout(() => {
            formularioContenedor.classList.add("disabled");
        }, 1000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		}) ;
		
	} else {
		Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Por favor rellena el formulario correctamente!',
        })
	}
})