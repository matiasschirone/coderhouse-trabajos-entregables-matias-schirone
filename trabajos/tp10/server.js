const express = require("express");
const handlebars = require("express-handlebars");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const { Contenedor } = require("./utils/contenedor");
const { generadorProductos } = require("./utils/generadorProducto");
const exec = require("child_process").exec;


const productosRandoms = generadorProductos();
const leerComentarios = new Contenedor("./ecommerce/chat.json");
const guardarComentarios = new Contenedor(
	"./ecommerce/mensajesSinNormalizar.json"
);

const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})


io.on("connection", async socket => {
	let mensajesChat = await leerComentarios.getAll();
	console.log("Se contectó un usuario");
	
	const mensaje = {
		mensaje: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", mensaje);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const mensaje = {
			mensaje: "mensaje nuevo",
			mensajesChat
		};

		io.sockets.emit("mensaje-servidor", mensaje);
		await guardarComentarios.save({
			author: msg.author,
			text: msg.text
		});
		/*exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
			if (err !== null) {
				console.error(`error de exec: ${err}`);
			}
			return (mensajesChat = await leerComentarios.getAll());
		});*/
	});
});

app.get("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const productoById = await productos.getById(id);
	productoById
		? res.json(productoById)
		: res.json({ error: "Producto no encontrado" });
});

app.put("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const respuesta = await guardarComentarios.updateById(id, req.body);
	res.json(respuesta);
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.delete("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await guardarComentarios.deleteById(id));
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.delete("/api/texts", async (req, res) => {
	res.json(await guardarComentarios.deleteAll());
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

app.get("/api/productos-test", async (req, res) => {
	const producto = await productosRandoms;
	res.render("productos", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/", async (req, res) => {
	const producto = await productosRandoms;
	res.render("index", {
		titulo: "Productos de Crud",
		list: producto,
		listExist: true,
		producto: true
	});
});


const port = process.env.PORT || 8080;

httpServer.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});