const express = require('express');
const { Router } = express;
const routerProductos = Router();
const { getProducts, getProductsById, postProducts, putProducts, deleteProducts } = require('../controllers/controllersProductos.js');

routerProductos.get('/', getProducts);
routerProductos.get('/:id', getProductsById);
routerProductos.post('/', postProducts);
routerProductos.put('/:id', putProducts);
routerProductos.delete('/:id', deleteProducts);

module.exports = routerProductos;