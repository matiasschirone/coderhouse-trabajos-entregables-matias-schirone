const { options} = require('./mariaDB/conexionDB');

const knex = require('knex')(options);

knex.from('users').where('id', '=', 8).del()
    .then(resp => console.log('tabla users borrada'))
    .catch(error => console.log(error))
    .finally(() => knex.destroy())