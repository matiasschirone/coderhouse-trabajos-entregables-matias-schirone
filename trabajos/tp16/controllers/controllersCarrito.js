const { response } = require('express');
//const { productById } = require('../daos/producto/productoDaoArchivo.js');

const CarritoDaoArchivo = require('../daos/carrito/CarritoDaoArchivo.js');
const ProductosDaoArchivo = require('../daos/productos/ProductosDaoArchivo.js');

const carritoDaoArchivo = new CarritoDaoArchivo('./archivosDB/carrito.json');

const contenedor = new ProductosDaoArchivo('./archivosDB/productos.json');

//crea carrito y devuelve su id
const postCarrito = async(req, res = response) => {
    const objProducto = req.body
    console.log(req.body)
   
    let producto = await carritoDaoArchivo.save(objProducto)
    res.send({
        message: 'Producto guardado',
        objProducto
    })
} 


//vacia un carrito y lo elimina
const deleteCarrito = async(req, res = response) => {
    const { id } = req.params
    
    let producto = await carritoDaoArchivo.deleteId(parseInt(id))
    res.send({
        message: 'Producto eliminado',
        id
    })
} 


//incorpora productos al carrito por su id
//routerCarrito.post('/:id/productos/:id_prod', async(req, res) => {
const postbyIDCarrito = async(req, res = response) => {
    const { id, id_prod } = req.params

    const productById = await contenedor.getById(parseInt(id_prod))
    console.log("productById", productById)
    const carritoById = await carritoDaoArchivo.addProductToCart(parseInt(id), productById)

    res.send({
        message: 'Producto agregado al carrito',
        carritoById
    })
} 


//elimina un producto por su id de carrito y de producto
//routerCarrito.delete('/:id/productos/:id_prod', async(req, res) => {
const deleteByIdCarrito = async(req, res = response) => {
    
    const { id, id_prod } = req.params

    let carritoById = await carritoDaoArchivo.deleteProductFromCart(parseInt(id, id_prod))

    res.send({
        message: 'Producto eliminado del carrito',
        carritoById
    })
}

//routerCarrito.get('/:id', async(req, res = response) => {
const getCarritoById = async(req, res = response) => {
    const id = req.params.id
    console.log(req.params)
    
    let productoId = await carritoDaoArchivo.getById(parseInt(id))   
    res.send(productoId)
} 

//me permite listar todos los productos listados en el carrito
//routerCarrito.get('/:id/productos', async(req, res) => {
const listarCarrito = async(req, res = response) => {
    const id = req.params.id

    let productoId = await carritoDaoArchivo.getById(parseInt(id))
    res.send(productoId)
} 


/*getCarritoError (req, res) => {
    res.send({
        error: -2,
        description: 'Ruta no encontrada'
    })
} */

module.exports = { postCarrito, deleteCarrito, postbyIDCarrito, deleteByIdCarrito, getCarritoById, listarCarrito }