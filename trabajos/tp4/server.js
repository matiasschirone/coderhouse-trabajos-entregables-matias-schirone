const { Router } = require('express')
const express = require('express')
const { Contenedor } = require('./contenedor')


const app = express()

const routerProductos = Router()

app.use('/api/productos', routerProductos)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


routerProductos.get('/', async(req, res) => {
    const contenedor = new Contenedor('productos.txt')
    let productos = await contenedor.getAll()
    res.send(productos)
} )

routerProductos.get('/:id', async (req, res) => {
    const contenedor = new Contenedor('productos.txt')
    const producto = await  contenedor.getById(req.params.
    id)
    res.send(producto)
} )



routerProductos.post('/', async(req, res) => {
    const objProducto = req.body
    const contenedor = new Contenedor('productos.txt')
    let producto = await contenedor.save(objProducto)
    res.send({ 
        message: 'Producto guardado',
        objProducto
     })
} )

routerProductos.put('/:id', async(req, res) => {
    const objProducto = req.body
    console.log(req.body)
    const contenedor = new Contenedor('productos.txt')
    let producto = await contenedor.updateById(req.params.id, objProducto)
    res.send({
        message: 'Producto actualizado',
        objProducto
    })
} )

routerProductos.delete('/:id', async(req, res) => {
    const { id } = req.params
    const contenedor = new Contenedor('productos.txt')
    let producto = await contenedor.delete(id)
    res.send({
        message: 'Producto eliminado',
        id
    })
} )


const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))


