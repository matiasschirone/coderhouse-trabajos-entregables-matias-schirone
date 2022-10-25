import * as dotenv from 'dotenv' 
dotenv.config()

//import parseArgs from 'minimist'
import minimist from 'minimist'
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

//const args = parseArgs(process.argv.slice(2))
const argv = process.argv.slice(2);
const parsed = minimist(argv, {
  alias: { p: "port", mo: "mode" },
  default: {
    port: 8080,
    mode: "fork",
  },
});

const { port, mode } = parsed;

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

if (mode === "fork") {
    app.use("/api", routerRandom);
    httpServer.listen(port, () => {
      console.log(
        `ESTOY FORK CORRIENDO EN MODO FORK EL PUERTO : http://localhost:${port}`
      );
    });
  }
  if (mode === "cluster") {
    if (isMaster) {
      for (let i = 0; i < cpus; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker) => {
        console.log(`Process with id: ${worker.process.pid} finished`);
      });
    } else {
      app.use("/test", routerCluster);
      httpServer.listen(port, () => {
        console.log(
          `ESTOY CLUSTER CORRIENDO EN MODO CLUSTER EL PUERTO : http://localhost:${port}`
        );
      });
    }
}

/*const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))*/
