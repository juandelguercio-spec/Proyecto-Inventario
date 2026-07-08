// ======================================================
// IMPORTACIONES
// ======================================================

// Express
const express =
require("express")

// CORS
const cors =
require("cors")

// Excel
const Excel =
require("exceljs")

// MongoDB
const mongoose =
require("mongoose")

// Modelos
const Producto =
require("./models/Producto")

const Movimiento =
require("./models/Movimiento")



// ======================================================
// CONEXIÓN A MONGODB
// ======================================================

mongoose.connect(

"mongodb://127.0.0.1:27017/Inventario"

)

.then(()=>{

console.log(

"✅ MongoDB conectado"

)

})

.catch(error=>{

console.log(

"❌ Error al conectar MongoDB"

)

console.log(error)

})




// ======================================================
// CONFIGURACIÓN EXPRESS
// ======================================================

const app =
express()

app.use(cors())

app.use(express.json())




// ======================================================
// LOGIN
// ======================================================

app.post(

"/login",

(req,res)=>{

const{

usuario,

clave

}=

req.body



if(

usuario==="admin"

&&

clave==="123"

){

return res.json({

ok:true

})

}



res.status(401).json({

ok:false,

mensaje:

"Credenciales incorrectas"

})

})




// ======================================================
// INICIAR SERVIDOR
// ======================================================

app.listen(

3000,

()=>{

console.log(

"🚀 Servidor iniciado"

)

})

// ======================================================
// OBTENER PRODUCTOS
// ======================================================

app.get(

"/productos",

async(req,res)=>{

try{

const productos=

await Producto.find()

res.json(productos)

}

catch(error){

res.status(500).json(error)

}

})

// ======================================================
// CREAR PRODUCTO
// ======================================================

app.post(

"/productos",

async(req,res)=>{

try{

const{

nombre,

categoria,

cantidad,

precio

}=

req.body



// Verificar que no exista

const existe=

await Producto.findOne({

nombre

})



if(existe){

return res.status(400).json({

mensaje:

"Ya existe un producto con ese nombre."

})

}



// Crear producto

const producto=

new Producto({

nombre,

categoria,

cantidad,

precio

})



await producto.save()



res.json({

mensaje:

"Producto guardado correctamente."

})

}

catch(error){

res.status(500).json({

mensaje:error.message

})

}

})

// ======================================================
// EDITAR PRODUCTO
// ======================================================

app.put(

"/productos/:id",

async(req,res)=>{

try{

await Producto.findByIdAndUpdate(

req.params.id,

req.body

)

res.json({

mensaje:"Producto actualizado"

})

}

catch(error){

res.status(500).json(error)

}

})

// ======================================================
// ELIMINAR PRODUCTO
// ======================================================

app.delete(

"/productos/:id",

async(req,res)=>{

try{

await Producto.findByIdAndDelete(

req.params.id

)

res.json({

mensaje:"Producto eliminado"

})

}

catch(error){

res.status(500).json(error)

}

})

// ======================================================
// REGISTRAR MOVIMIENTO
// ======================================================

app.post(

"/movimiento",

async(req,res)=>{

try{

const{

fecha,

tipo,

nombre,

cantidad

}=

req.body



// Buscar producto

const producto=

await Producto.findOne({

nombre

})



if(!producto){

return res.status(404).json({

mensaje:

"Producto no encontrado"

})

}



// Entrada

if(tipo==="entrada"){

producto.cantidad+=cantidad

}



// Salida

if(tipo==="salida"){

if(cantidad>producto.cantidad){

return res.status(400).json({

mensaje:

"No puede salir más del stock disponible."

})

}

producto.cantidad-=cantidad

}



// Guardar cambios

await producto.save()



// Registrar historial

const movimiento=

new Movimiento({

fecha,

tipo,

nombre,

cantidad

})



await movimiento.save()



res.json({

mensaje:

"Movimiento registrado"

})

}

catch(error){

res.status(500).json({

mensaje:error.message

})

}

})

// ======================================================
// REPORTE EXCEL
// ======================================================

app.get(

"/reporte",

async(req,res)=>{

try{

const libro=

new Excel.Workbook()



// ======================
// HOJA MOVIMIENTOS
// ======================

const hoja1=

libro.addWorksheet(

"Movimientos"

)



hoja1.columns=[

{

header:"Fecha",

key:"fecha"

},

{

header:"Tipo",

key:"tipo"

},

{

header:"Producto",

key:"nombre"

},

{

header:"Cantidad",

key:"cantidad"

}

]



const movimientos=

await Movimiento.find()

.sort({

_id:-1

})



movimientos.forEach(m=>{

hoja1.addRow({

fecha:m.fecha,

tipo:m.tipo,

nombre:m.nombre,

cantidad:m.cantidad

})

})



// ======================
// HOJA INVENTARIO
// ======================

const hoja2=

libro.addWorksheet(

"Inventario"

)



hoja2.columns=[

{

header:"Producto",

key:"nombre"

},

{

header:"Categoria",

key:"categoria"

},

{

header:"Cantidad",

key:"cantidad"

},

{

header:"Precio",

key:"precio"

},

{

header:"Estado",

key:"estado"

}

]



const productos=

await Producto.find()

.sort({

nombre:1

})



productos.forEach(p=>{

hoja2.addRow({

nombre:p.nombre,

categoria:p.categoria,

cantidad:p.cantidad,

precio:p.precio,

estado:

p.cantidad<5

?

"STOCK BAJO"

:

"OK"

})

})



// Descargar

res.setHeader(

"Content-Type",

"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

)



res.setHeader(

"Content-Disposition",

'attachment; filename="reporte.xlsx"'

)



await libro.xlsx.write(

res

)



res.end()

}

catch(error){

res.status(500).json({

mensaje:error.message

})

}

})