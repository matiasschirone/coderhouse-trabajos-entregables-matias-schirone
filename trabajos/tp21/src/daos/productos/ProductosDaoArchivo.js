const { ContenedorArchivo } = require('../../contenedores/ContenedorArchivo.js');

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./archivosDB/productos.json');	
    }
}

module.exports = ProductosDaoArchivo 