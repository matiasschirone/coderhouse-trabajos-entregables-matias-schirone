const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const { Contenedor } = require("./contenedor");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

const contenedor = new Contenedor("./productos.txt");

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

app.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});
