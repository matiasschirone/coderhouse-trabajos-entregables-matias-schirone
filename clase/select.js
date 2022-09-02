const { options } = require('./mariaDB/conexionDB');

const knex = require('knex')(options);

knex.from('users').select('*')
    .then(resp => {
        for(obj of resp){
            console.log(`El usuario ${obj.name} tiene ${obj.edad} años su email es ${obj.email} y su password es ${obj.password}`)
        }
    })
    .catch(error => console.log(error))
    .finally(() => knex.destroy())
