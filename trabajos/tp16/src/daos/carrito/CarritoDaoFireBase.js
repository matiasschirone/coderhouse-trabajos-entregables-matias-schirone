//const ContenedorFireBase = require('../../contenedores/ContenedorFireBase');
import ContenedorFirebase from '../../contenedores/ContenedorFireBase';

class CarritoDaoFireBase extends ContenedorFireBase {
    constructor() {
        super('productos');
    }
}

module.exports = CarritoDaoFireBase