import ContenedorFireBase from "../../contenedores/ContenedorFireBase";

class ProductosDaoFireBase extends ContenedorFireBase {
    constructor() {
        super('productos');
    }
}

module.exports = ProductosDaoFireBase