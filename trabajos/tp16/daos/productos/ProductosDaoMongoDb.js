import ContenedorMongoDB from "../../contenedores/ContenedorMongoDb";

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            categoria: { type: String, required: true },
            imagen: { type: String, required: true },
        });
    }
}

module.exports = ProductosDaoMongoDb

