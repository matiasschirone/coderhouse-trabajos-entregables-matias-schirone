//const { ContenedorArchivo } = require('../../contenedores/ContenedorArchivo.js');
import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./archivosDB/carrito.json');
    }

        
}

module.exports = CarritoDaoArchivo 