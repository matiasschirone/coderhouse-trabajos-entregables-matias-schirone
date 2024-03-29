import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

//import parseArgs from 'minimist'
import minimist from 'minimist'
import cluster from 'cluster'
import http from 'http'
import { cpus } from 'os'


import { fork } from 'child_process'

import compression from 'compression'


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
import infoRouter from './routes/web/info.js'
import logger from './logs/logger.js'


const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'cluster'


if (modoCluster && cluster.isPrimary) {
  const numCPUs = cpus().length
  
  console.log(`Numero de CPUs: ${numCPUs}`)
  console.log(`PID MASTER ${process.pid}`)
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died, new Date().toLocaleString()`)
    cluster.fork()
  })
} else {

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
  
  const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

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
  
  //app.use(compression())
  
  app.use(productosApiRouter)
  
  app.use(authWebRouter)
  app.use(homeWebRouter)
  
  app.use(infoWebRouter)
  app.use(routerRandom)

  app.use((req,res,next)=>{
    logger.warn("NONE EXISTING URL");
    res.sendStatus('404')
  })


  app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
    console.log(`PID WORKER ${process.pid}`)
  })
}

/*if (mode === "fork") {
    app.use("/api/randoms", routerRandom);
    httpServer.listen(port, () => {
      console.log(
        `ESTOY CORRIENDO EN  EL MODO FORK EN EL PUERTO : http://localhost:${port}`
      );
    });
  }
  if (mode !== "fork") {
    if (cluster.isPrimary) {
      console.log(`Master ${process.pid} is running`)
      for (let i = 0; i < numCPUs; i++) {
          cluster.fork()
      }
      cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`)
      })  
    } else {
      app.use("/info", routerRandom);
      httpServer.listen(port, () => {
        console.log(
          `ESTOY CLUSTER CORRIENDO EN MODO CLUSTER EL PUERTO : http://localhost:${port}`
        );
      });
    }
}*/

/*const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))*/
