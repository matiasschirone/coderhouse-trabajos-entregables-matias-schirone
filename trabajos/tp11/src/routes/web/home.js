const Router = require('express')
const webAuth = require('../../auth/index.js')

const path = require('path')

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
   
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

module.exports = productosWebRouter