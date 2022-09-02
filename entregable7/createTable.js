const { optionSqlite3 } = require('./sqlite3/conexionSqlite3');
const { options } = require('./mariaDB/conexionDB');

const knexSqlite3 = require('knex')(optionSqlite3);
const knex = require('knex')(options);

const products =[
    {
      "nombre": "jugo",
      "precio": 50,
      "categoria": "bebida",
      "id": 1
    },
    {
      "nombre": "cafe",
      "precio": 80,
      "categoria": "bebida",
      "id": 2
    },
    {
      "nombre": "galletitas",
      "precio": 120,
      "categoria": "comestible",
      "id": 3
    },
    {
      "nombre": "agua",
      "precio": "100",
      "categoria": "bebida",
      "id": 4
    },
    {
      "nombre": "chocolate",
      "precio": "350",
      "categoria": "comida",
      "id": 5
    }
];

const tablaProductos = "products";

const batchMariaDB = async () => {
    try {
        await knex.schema.createTable(tablaProductos, table => {
            table.increments("id");
            table.string("nombre");
            table.float("precio");
            table.string("categoria");
        });

        console.log("generando tabla");
        await knex(tablaProductos).insert(products); 
    } catch (error) {
        console.log(`error creando tabla ${error}`);
    } finally {
        knex.destroy();
    }
};

const messagges = [
    {
        "id": 1,
        "mail": "gato@gmail.com",
        "mensaje": "hola",
        "fecha": "1:57:42 AM"
    },
    {
        "id": 2,
        "mail": "fghjk@gmail",
        "mensaje": "como estas",
        "fecha": "1:57:42 AM"
    },
    {
        "id": 3,
        "mail": "jhhjiuyui@gmail.com",
        "mensaje": "hi",
        "fecha": "1:57:42 AM"
    }
]

const tablaMensajes = "messagges";

const batchSqlite3 = async () => {
	try {
		console.log("Creando tabla Mensajes...");
		await knexSqlite3.schema.createTable(tablaMensajes, table => {
			table.increments("id");
			table.string("mail");
			table.string("mensaje");
			table.float("fecha");
		});

		console.log("generando mensajes...");
		await knexSqlite3(tablaMensajes).insert(messagges); 
	} catch (error) {
		console.log(error);
	} finally {
		knexSqlite3.destroy();
	}
};

batchMariaDB();
batchSqlite3();