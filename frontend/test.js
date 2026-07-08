QUnit.test(

"Cantidad válida",

assert=>{

assert.true(

validarCantidad(5)

)

}

)



QUnit.test(

"Cantidad negativa",

assert=>{

assert.false(

validarCantidad(-5)

)

}

)



QUnit.test(

"Cantidad decimal",

assert=>{

assert.false(

validarCantidad(2.5)

)

}

)



QUnit.test(

"Nombre vacío",

assert=>{

assert.false(

validarNombre("")

)

}

)



QUnit.test(

"Nombre correcto",

assert=>{

assert.true(

validarNombre("Mouse")

)

}

)



QUnit.test(

"Precio válido",

assert=>{

assert.true(

validarPrecio(1000)

)

}

)



QUnit.test(

"Precio negativo",

assert=>{

assert.false(

validarPrecio(-100)

)

}

)



QUnit.test(

"Categoría válida",

assert=>{

assert.true(

validarCategoria("Tecnología")

)

}

)



QUnit.test(

"Categoría vacía",

assert=>{

assert.false(

validarCategoria("")

)

}

)



QUnit.test(

"Producto duplicado",

assert=>{

let lista=[

{

nombre:"Mouse"

},

{

nombre:"Teclado"

}

]



assert.true(

existeProducto(

lista,

"Mouse"

)

)

}

)



QUnit.test(

"Producto inexistente",

assert=>{

let lista=[

{

nombre:"Mouse"

}

]



assert.false(

existeProducto(

lista,

"Monitor"

)

)

}
)