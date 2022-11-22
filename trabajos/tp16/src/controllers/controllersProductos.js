const { response } = require('express');

const ProductosDaoArchivo = require('../daos/productos/ProductosDaoArchivo.js')

const productosDaoArchivo = new ProductosDaoArchivo('./archivosDB/productos.json')

//const { productosDao: productosApi } = require('../daos/index.js')
const administrador = true;

const getProducts = async(req, res = response) => {
   
    let productos = await productosDaoArchivo.getAll()
    res.send(productos)
} 

const getProductsById = async(req, res = response) => {
    const id = req.params.id
  
    let productoId = await productosDaoArchivo.getById(parseInt(id))
    res.send(productoId)
} 

const postProducts = async(req, res = response) => {
    if (administrador) {
        
        let producto = await productosDaoArchivo.save(req.body)
        res.send(producto)
    } else {
        res.send({ error: "No tienes permisos para agregar productos" })
    }
} 

const putProducts = async(req, res = response) => {
    if (administrador) {
      
        let producto = await productosDaoArchivo.updateById( parseInt(req.params.id, req.body))
        res.send(producto)
    } else {
        res.send({ error: "No tienes permisos para actualizar productos" })
    }
} 

const deleteProducts = async(req, res = response) => {
    if (administrador) {
     
        let producto = await productosDaoArchivo.deleteById( parseInt(req.params.id))
        res.send(producto)
    } else {
        res.send({ error: "No tienes permisos para eliminar productos" })
    }
} 


module.exports = {
    getProducts,
    getProductsById,
    postProducts,
    putProducts,
    deleteProducts
  
}