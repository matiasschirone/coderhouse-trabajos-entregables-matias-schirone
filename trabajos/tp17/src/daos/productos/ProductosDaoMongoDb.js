import ContenedorMongoDB from "../../contenedores/ContenedorMongoDb";

class ProductosDaoMongoDb extends ContenedorMongoDB {
    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            foto: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
        });
    }
}

module.exports = ProductosDaoMongoDb

