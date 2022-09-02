const { options} = require('./mariaDB/conexionDB');

const knex = require('knex')(options);

knex.from('users').select('*').where('password', '1234').update({
    password: '12345'
})
.then(resp => console.log(resp))
.catch(error => console.log(error))
.finally(() => knex.destroy())