// ======================================================
// VARIABLES
// ======================================================

// Lista de productos
let productos = []

// Id del producto que se está editando
let editando = null



// ======================================================
// LOGIN
// ======================================================

async function iniciarSesion(){

const usuario =
document.getElementById("usuario").value

const clave =
document.getElementById("clave").value


const respuesta =
await fetch(

"http://localhost:3000/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

usuario,
clave

})

}

)


// Si las credenciales son incorrectas
if(!respuesta.ok){

alert("Credenciales incorrectas")

return

}


document.getElementById("login").style.display="none"

document.getElementById("panel").style.display="block"

cargar()

}





// ======================================================
// CARGAR PRODUCTOS
// ======================================================

async function cargar(){

const respuesta =
await fetch(

"http://localhost:3000/productos"

)

productos =
await respuesta.json()


// Llenar selector de movimientos

const selector =
document.getElementById("movNombre")

selector.innerHTML =

`<option value="">Seleccione producto</option>`


productos.forEach(p=>{

selector.innerHTML +=

`<option value="${p.nombre}">

${p.nombre}

</option>`

})


mostrar()

}





// ======================================================
// MOSTRAR TABLA
// ======================================================

function mostrar(){

const tabla =
document.getElementById("tabla")

tabla.innerHTML=""


productos.forEach(p=>{

tabla.innerHTML +=

`

<tr>

<td>${p._id}</td>

<td>${p.nombre}</td>

<td>${p.categoria}</td>

<td>${p.cantidad}</td>

<td>$${p.precio}</td>

<td>

<button onclick="editar('${p._id}')">

Editar

</button>

<button onclick="eliminarProducto('${p._id}')">

Eliminar

</button>

</td>

</tr>

`

})

}





// ======================================================
// GUARDAR PRODUCTO
// ======================================================

async function guardarProducto(){

const nombre =
document.getElementById("nombre").value.trim()

const cantidad =
Number(document.getElementById("cantidad").value)

const precio =
Number(document.getElementById("precio").value)

const categoria =
document.getElementById("categoria").value



// =====================
// VALIDACIONES
// =====================

if(nombre==""){

alert("Ingrese el nombre del producto")

return

}


if(categoria==""){

alert("Seleccione una categoría")

return

}


if(cantidad<=0){

alert("La cantidad debe ser mayor que cero")

return

}


if(!Number.isInteger(cantidad)){

alert("La cantidad debe ser un número entero")

return

}


if(precio<=0){

alert("El precio debe ser mayor que cero")

return

}



// Datos

const datos={

nombre,

categoria,

cantidad,

precio

}



let respuesta



// =====================
// EDITAR
// =====================

if(editando){

respuesta=

await fetch(

`http://localhost:3000/productos/${editando}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(datos)

}

)

editando=null

}



// =====================
// CREAR
// =====================

else{

respuesta=

await fetch(

"http://localhost:3000/productos",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(datos)

}

)

}



// Mostrar mensaje del servidor

const mensaje =
await respuesta.json()

if(!respuesta.ok){

alert(mensaje.mensaje)

return

}


limpiar()

cargar()

}





// ======================================================
// EDITAR
// ======================================================

function editar(id){

const producto =

productos.find(

p=>p._id===id

)

editando=id


document.getElementById("nombre").value=
producto.nombre

document.getElementById("cantidad").value=
producto.cantidad

document.getElementById("precio").value=
producto.precio

document.getElementById("categoria").value=
producto.categoria

}





// ======================================================
// ELIMINAR
// ======================================================

async function eliminarProducto(id){

const confirmar=

confirm(

"¿Eliminar producto?"

)

if(!confirmar){

return

}


const respuesta=

await fetch(

`http://localhost:3000/productos/${id}`,

{

method:"DELETE"

}

)


const mensaje=
await respuesta.json()

if(!respuesta.ok){

alert(mensaje.mensaje)

return

}


cargar()

}

// ======================================================
// REGISTRAR MOVIMIENTO
// ======================================================

async function registrarMovimiento(tipo){

const nombre =
document.getElementById("movNombre").value

const cantidad =
Number(document.getElementById("movCantidad").value)


// =====================
// VALIDACIONES
// =====================

if(nombre==""){

alert("Seleccione un producto")

return

}

if(cantidad<=0){

alert("La cantidad debe ser mayor que cero")

return

}

if(!Number.isInteger(cantidad)){

alert("La cantidad debe ser un número entero")

return

}


// =====================
// ENVIAR AL SERVIDOR
// =====================

const respuesta =

await fetch(

"http://localhost:3000/movimiento",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

fecha:new Date().toLocaleDateString(),

tipo,

nombre,

cantidad

})

}

)


const mensaje =
await respuesta.json()


if(!respuesta.ok){

alert(mensaje.mensaje)

return

}


alert(mensaje.mensaje)

limpiarMovimiento()

cargar()

}





// ======================================================
// LIMPIAR PRODUCTO
// ======================================================

function limpiar(){

document.getElementById("nombre").value=""

document.getElementById("cantidad").value=""

document.getElementById("precio").value=""

document.getElementById("categoria").value=""

}





// ======================================================
// LIMPIAR MOVIMIENTO
// ======================================================

function limpiarMovimiento(){

document.getElementById("movNombre").value=""

document.getElementById("movCantidad").value=""

}





// ======================================================
// CERRAR SESIÓN
// ======================================================

function cerrarSesion(){

editando=null

productos=[]


document.getElementById("usuario").value=""

document.getElementById("clave").value=""


document.getElementById("login").style.display="block"

document.getElementById("panel").style.display="none"

}





// ======================================================
// REPORTE EXCEL
// ======================================================

function generarReporte(){

window.open(

"http://localhost:3000/reporte",

"_blank"

)

}