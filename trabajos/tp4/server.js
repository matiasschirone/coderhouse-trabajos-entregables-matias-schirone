const { Router } = require('express')
const express = require('express')
const { Contenedor } = require('./contenedor')
const { response } = require('express')


const app = express()

const routerProductos = Router()

const contenedor = new Contenedor('productos.txt')

app.use('/api/productos', routerProductos)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


routerProductos.get('/', (req, res) => {
    const contenedor = new Contenedor('productos.txt')
    let productos = contenedor.getAll()
    res.send(productos)
} )

routerProductos.get('/:id',  (req, res) => {
    const producto =  contenedor.getById(req.params.
    id)
    res.send(producto)
} )



routerProductos.post('/', (req, res) => {
    const objProducto = req.body
    contenedor.save(objProducto)
    res.json({ 
        message: 'Producto guardado',
        objProducto
     })
} )

routerProductos.put ('/:id', (req, res) => {
    const { id } = req.params
    const objProducto = req.body
    console.log(objProducto)
    contenedor.updateById({id: parseInt(id), ...objProducto})
    const respuesta = updateById({id, nombre, precio, categoria})
    res.json(respuesta)
   
})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    contenedor.delete(id)
    res.json({ message: 'Producto eliminado' })
} )

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))


