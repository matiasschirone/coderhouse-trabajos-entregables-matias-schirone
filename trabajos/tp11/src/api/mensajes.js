const config = require('../config.js')

const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

module.exports = mensajesApi