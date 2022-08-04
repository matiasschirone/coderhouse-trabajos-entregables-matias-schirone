const { Router } = require('express')
const express = require('express')
const { Contenedor } = require('./contenedor')
const { response } = require('express')


const app = express()

const routerProductos = Router()



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*routerProductos.get('/', (req, res) => {
    const contenedor = new Contenedor('productos.txt')
    const productos = contenedor.getAll()
    res.send(productos)
} )*/

/*routerProductos.get('/:id', (req, res) => {
    const contenedor = new Contenedor('productos.txt')
    const producto = contenedor.getById(req.params.
    id)
    res.send(producto)
} )*/



routerProductos.post('/', (req, res) => {
    const objProducto = req.body
    const contenedor = new Contenedor('productos.txt')
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
    const contenedor = new Contenedor('./productos.txt')
    contenedor.updateById({id: parseInt(id), ...objProducto})
    //const respuesta = updateById({id, nombre, precio, categoria})
    //res.json(respuesta)
   
})

app.use('/api/productos', routerProductos)

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))


