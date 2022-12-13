
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
