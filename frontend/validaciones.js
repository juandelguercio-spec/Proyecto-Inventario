// ================================
// VALIDAR CANTIDAD
// ================================

function validarCantidad(cantidad){

return Number.isInteger(cantidad)

&&

cantidad>0

}



// ================================
// VALIDAR PRECIO
// ================================

function validarPrecio(precio){

return precio>0

}



// ================================
// VALIDAR NOMBRE
// ================================

function validarNombre(nombre){

return nombre.trim()!==""

}



// ================================
// VALIDAR CATEGORÍA
// ================================

function validarCategoria(categoria){

return categoria.trim()!==""

}



// ================================
// BUSCAR PRODUCTO DUPLICADO
// ================================

function existeProducto(lista,nombre){

return lista.some(

p=>

p.nombre.toLowerCase()

===

nombre.toLowerCase()

)

}