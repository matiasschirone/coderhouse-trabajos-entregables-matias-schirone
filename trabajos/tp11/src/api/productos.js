const config = require('../config.js')

const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

const productosApi = new ContenedorArchivo(`${config.fileSystem.path}/productos.json`)

module.exports = productosApi