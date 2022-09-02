const { options } = require('./sqlite3/conexionDB');

const knex = require('knex')(options);

const createTable = async (user) => {
    try {
        await knex.schema.createTable(user, table => {
            table.increments('id');
            table.string('name');
            table.string('email');
            table.string('password');
            table.integer('edad');
        });
        console.log('Tabla creada');
    } catch (error) {
        console.log(error);
    }
}

createTable('users');


