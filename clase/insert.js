const { options } = require('./mariaDB/conexionDB');

const knex = require('knex')(options);

const tabla =[
    {
        name: 'Juan',
        email: 'toto@gmail.com',
        password: '1234',
        edad: 20
    },
    {
        name: 'Pedro',
        email: 'gatogamil.com',
        password: '1234',
        edad: 19
    },
    {
        name: 'Maria',
        email: 'maria@gmail.com',
        password: '1234',
        edad: 25
    },

]

//const insert = async (nombreTabla, data) => {

knex ('users').insert(tabla)
.then(resp => console.log(resp))
.catch(error => console.log(error))
.finally(() => knex.destroy())




