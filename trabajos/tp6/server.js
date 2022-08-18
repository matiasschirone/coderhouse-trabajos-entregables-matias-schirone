const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require("express-handlebars");
const { Contenedor } = require("./contenedor");


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.use(express.static('public'));

const contenedor = new Contenedor("./productos.txt");
const mensajes = new Contenedor("./mensajes.json");

/*app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
})*/

/*io.on('connection', (socket) => {
    //console.log('New user connected');
    const mensaje = {
        mensaje: 'ok',
        productos
    }

    socket.emit('mensaje-servidor', mensaje)

    socket.on('producto-nuevo', (producto, cb) => {
        productos.push(producto)
        const mensaje = {
            mensaje: 'producto agregado',
            productos
        }
        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', mensaje)
        cb(id)
    } )
} );*/

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

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

io.on('connection', async (socket) => {
    let mensajesChat = await mensajes.getAll();
    console.log('Nueva conexión');

    const chat = {
        mensaje: 'Bienvenido al chat',
        mensajesChat
    }
    socket.emit("mensaje-servidor", mensaje)

    socket.on('mensaje-cliente', async (msg,cb) => {
        mensajesChat.push(msg);
        const mensaje = {
            mensaje: "Mensaje recibido",
            mensajesChat
        }

        const id = new Date().getTime();
        io.sockets.emit("mensaje-servidor", mensaje);
        cb(id);
        await mensajes.save({
            id,
            email: msg.email,
            mensaje: msg.mensaje
        })
    } )
} )

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
