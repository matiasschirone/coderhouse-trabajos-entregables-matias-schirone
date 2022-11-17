const express = require('express');
const { Router } = express;
const routerCarrito = Router();
const { postCarrito, deleteCarrito, postbyIDCarrito, deleteByIdCarrito, getCarritoById, listarCarrito } = require('../controllers/controllersCarrito.js');

routerCarrito.post('/', postCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.post('/:id/productos/:id_prod', postbyIDCarrito);
routerCarrito.delete('/:id/productos/:id_prod', deleteByIdCarrito);
routerCarrito.get('/:id', getCarritoById);
routerCarrito.get('/:id/productos', listarCarrito);

module.exports = routerCarrito;
