const express = require('express')

const app = express()
//console.log(app)

app.get('/', (req, res) => {
    res.send('<h1 style{color:#000066}>Hola Mundo</h1>')
})

let count = 0
app.get('/visitas', (req, res) => {
    count ++
    res.send(`Visitas: ${count}`)
})

app.get('/fyh', (req, res) => {
    const fyh = new Date()
    res.send(`La Fecha y Hora: ${fyh}`)
})

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))

