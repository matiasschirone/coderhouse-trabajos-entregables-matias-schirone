const Contenedor = require("./contenedor");

const express = require("express");

const app = express();

const contenedor = new Contenedor( './productos.txt')

app.get("/productos", async (req, res) => {
    let productos = await contenedor.getAll();
    res.send(productos);
    });

app.get("/productosRandom", async (req, res) => {
    let productos = await contenedor.getAll();
    let productoRandom = productos[Math.floor(Math.random() * productos.length)];
    res.send(productoRandom);
    });

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
}
)
server.on('error', err=> console.log(err))

//contenedor.save({nombe: 'galletitas', precio: 120, categoria: 'comestible'});

//contenedor.getById(7)

// contenedor.getAll()

//contenedor.delete(3)

//contenedor.deleteAll()