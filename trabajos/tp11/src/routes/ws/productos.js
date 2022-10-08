const productosApi = require('../../api/productos.js')

module.exports = async function configurarSocket(socket, sockets) {
    socket.emit('productos', await productosApi.listarAll());

    socket.on('update', async producto => {
        await productosApi.guardar(producto)
        sockets.emit('productos', await productosApi.listarAll());
    })
}