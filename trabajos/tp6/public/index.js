//console.log('Hello World');

const server = io().connect()

const render = (mensajesChat) => {
    let listado = document.getElementById('chat')
    let html = productos.map(mensagge => {
        return `<li>
        <span>Nombre: ${msg.email}</span>
        <span>Precio: ${msg.mensaje}</span>
        </li>`
            
    }).join(' ')
    chat.innerHTML = html
}

const addMensagge = (evt) => {
    const email = document.getElementById('email').value
    const mensaje = document.getElementById('mensaje').value

    const textChat = {email, mensaje}
    //console.log(textChat)
    server.emit('producto-nuevo', textChat, (id) => {
        console.log(id)
        //producto.id = id
    })
    return false
}

server.on('mensaje-servidor', mensaje => {
    //console.log('mensaje-servidor' ,mensaje)
    render(mensaje.mensajesChat)
})
