import * as dotenv from 'dotenv' 
dotenv.config()

import morgan from 'morgan'

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

//import passport from './passport/local-auth.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routes/web/auth.js'
import homeWebRouter from './routes/web/home.js'
import productosApiRouter from './routes/api/productos.js'

import addProductosHandlers from './routes/ws/productos.js'
import addMensajesHandlers from './routes/ws/mensajes.js'

import passport from 'passport'

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
    secret: 'secret',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('dev'))

app.use(productosApiRouter)

app.use(authWebRouter)
app.use(homeWebRouter)

const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
