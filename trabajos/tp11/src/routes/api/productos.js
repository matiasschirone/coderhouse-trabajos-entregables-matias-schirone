const Router = require('express')
const createNFakeProducts = require('../../mocks/productos.js')

const productosApiRouter = new Router()

productosApiRouter.get('/api/productos-test', (req, res) => { res.json(createNFakeProducts(5)) })

module.exports = productosApiRouter