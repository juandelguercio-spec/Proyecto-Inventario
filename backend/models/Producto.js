// ============================
// MODELO PRODUCTO
// ============================

// Importar Mongoose
const mongoose =
require("mongoose")

// Crear el esquema del producto
const ProductoSchema =
new mongoose.Schema({

nombre:{

type:String,

required:true,

trim:true

},

categoria:{

type:String,

required:true

},

cantidad:{

type:Number,

required:true,

min:0

},

precio:{

type:Number,

required:true,

min:0

}

})


// Exportar el modelo

module.exports=

mongoose.model(

"Producto",

ProductoSchema

)