const dotenv = require('dotenv').config();

const express = require("express");

const { Router } = express;
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cp = require("cookie-parser");
const { fork } = require("child_process");
const numCPUs = require("os").cpus().length;



//const cp = require("cookie-parser");
//const { fork } = require("child_process");
const numCpus = require("os").cpus().length;

const routerProductos = require('./routes/productos.route.js');
const routerCarrito = require('./routes/carrito.route.js');

const app = express();

app.use(cp());
const checkAuthentication = require('./utils/checkAuthentication.js').default;
const passport = require('./utils/passportMiddleware.js');


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cp());

const checkAuthentication = require('./utils/checkAuthentication.js')
const passport = require('./utils/passportMiddleware.js')


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URL,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		}),
		secret: process.env.MONGODB_SECRETO,
		resave: false,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 90000
		}
	})
);

app.use(morgan("dev"));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// página de inicio, no dejar si no está logeado
app.get("/", checkAuthentication, async (req, res) => {
	const productos = await Productos.getAll();
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


app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

// logger
app.use((req, res, next) => {
	logger.warn("NONE EXISTING URL");
	res.sendStatus("404");
});

const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))