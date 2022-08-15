const express = require('express')
const { Contenedor } = require('./contenedor')

const app = express()

const contenedor = new Contenedor('./productos.txt')

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll();
    console.log(producto)
	res.render("index", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/productos", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("product", {
		titulo: "inventario de productos",
		list: producto,
		listExist: true,
		producto: true
	});
});

app.post('/productos', async(req, res) => {
    const objProducto = req.body
    console.log(objProducto)
    const contenedor = new Contenedor('productos.txt')
    let producto = await contenedor.save(objProducto)
    const listExist = true
    res.redirect('/productos');
} );


const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))
