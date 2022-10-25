import * as dotenv from 'dotenv' 
dotenv.config()

//const cluster = require('cluster')
//const http = require('http')
//const numCPUs = require('os').cpus().length
import cluster from 'cluster'
import http from 'http'
import { cpus } from 'os'


import { fork } from 'child_process'

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './config.js'


import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routes/web/auth.js'
import homeWebRouter from './routes/web/home.js'
import infoWebRouter from './routes/web/info.js'
import routerRandom from './routes/web/ramdom.js'
import productosApiRouter from './routes/api/productos.js'

import addProductosHandlers from './routes/ws/productos.js'
import addMensajesHandlers from './routes/ws/mensajes.js'

const cpu = cpus().length

const PORT = process.argv[2] || 8080
const PID = process.pid

const args = process.argv.slice(2)

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

io.on('connection', async socket => {

    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(session({
    Mongostore: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig }),
    client: 'mongodb',
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 50000
    }
}))


app.use(productosApiRouter)

app.use(authWebRouter)
app.use(homeWebRouter)
app.use(infoWebRouter)
app.use(routerRandom)

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < cpus; i++) {
      cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
  })
} else {
  http.createServer((req, res) => {
      res.writeHead(200)
  }).listen(8080)
  
  console.log(`Worker ${process.pid} started`)
}


/*const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))*/
