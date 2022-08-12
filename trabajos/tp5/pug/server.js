const express = require('express')
const { Contenedor } = require('./contenedor')

const app = express()
app.use(express.json())

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {
    const contenedor = new Contenedor('productos.txt')
    let productos = await contenedor.getAll()
    res.render('index', { productos })
} )

app.post('/', async(req, res) => {
    const objProducto = req.body
    const contenedor = new Contenedor('productos.txt')
    await contenedor.save(objProducto)
    res.redirect('/productos')

} )

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))

