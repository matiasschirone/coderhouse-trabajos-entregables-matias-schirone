const { optionSqlite3 } = require('./sqlite3/conexionSqlite3');
const { options } = require('./mariaDB/conexionDB');

const knexSqlite3 = require('knex')(optionSqlite3);
const knex = require('knex')(options);

const tablaProductos = "productos.json";
const tablaMensajes = "mensajes.json";

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