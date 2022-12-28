const { ContenedorMongoDb } = require("../../contenedores/ContenedorMongoDb");
const mongoose = require("mongoose");


class CarritoDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            categoria: { type: String, required: true },
            imagen: { type: String, required: true },
        });
    }
}

module.exports = CarritoDaoMongoDb
