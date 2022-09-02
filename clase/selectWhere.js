const { options } = require('./mariaDB/conexionDB');

const knex = require('knex')(options);

knex.from('users').select('*').where('edad', '>', 19).orderBy('edad', 'desc')
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
    .finally(() => knex.destroy())