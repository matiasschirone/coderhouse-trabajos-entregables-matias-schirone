import * as dotenv from 'dotenv' 
dotenv.config()

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'


import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routes/web/auth.js'
import homeWebRouter from './routes/web/home.js'
import productosApiRouter from './routes/api/productos.js'
import routerCarrito from './routes/web/carrito.route.js'
import routerProductos from './routes/web/productos.route.js'

import addProductosHandlers from './routes/ws/productos.js'
import addMensajesHandlers from './routes/ws/mensajes.js'

import checkAuthentication from './utils/checkAuthentication.js'
import passport from './utils/passportMiddleware.js'


const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

io.on('connection', async socket => {

    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(session({
    Mongostore: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig }),
    client: 'mongodb',
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 50000
    }
}))


// Passport
app.use(passport.initialize());
app.use(passport.session());

// página de inicio, no dejar si no está logeado
app.get("/", checkAuthentication, async (req, res) => {
	const productos = await productos.getAll();
	res.render("index", { productos });
});

// -------- LOGIN-INICIO ------------
// render login
app.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user;
		console.log("usuario logueado");
		res.render("index");
	} else {
		console.log("user no logueado");
		res.render("login");
	}
});
// post de login
app.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "faillogin"
	}),

	(req, res) => {
		res.render("/", { username: req.body.username });
	}
);
// -------- LOGIN-FIN --------------

// -------- REGISTER-INICIO --------
// render register
app.get("/register", (req, res) => {
	res.render("register");
});
// post para registrarse
app.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "failregister",
		successRedirect: "login"
	}),
	(req, res) => {
		res.render("/login", { username: req.body.username });
	}
);
// -------- REGISTER-FIN -----------

// error de registro
app.get("/failregister", (req, res) => {
	console.error("Error de registro");
	// now redirect to failregister.hbs
	res.render("failregister");
});

// error de login
app.get("/faillogin", (req, res) => {
	console.error("Error de login");
	res.render("faillogin");
});

// logout
app.get("/logout", async (req, res = response, next) => {
	req.logout(err => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

// logger
app.use((req, res, next) => {
	logger.warn("NONE EXISTING URL");
	res.sendStatus("404");
});

app.use(productosApiRouter)

app.use(authWebRouter)
app.use(homeWebRouter)
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
