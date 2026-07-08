// ============================
// MODELO MOVIMIENTO
// ============================

// Importar Mongoose
const mongoose =
require("mongoose")

// Crear esquema
const MovimientoSchema =
new mongoose.Schema({

fecha:{

type:String,

required:true

},

tipo:{

type:String,

required:true,

enum:["entrada","salida"]

},

nombre:{

type:String,

required:true

},

cantidad:{

type:Number,

required:true,

min:1

}

})

// Exportar modelo
module.exports=

mongoose.model(

"Movimiento",

MovimientoSchema

)