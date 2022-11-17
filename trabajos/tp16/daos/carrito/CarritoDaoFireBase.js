const ContenedorFireBase = require('../../contenedores/ContenedorFireBase');

class CarritoDaoFireBase extends ContenedorFireBase {
    constructor() {
        super('productos');
    }
}

module.exports = CarritoDaoFireBase