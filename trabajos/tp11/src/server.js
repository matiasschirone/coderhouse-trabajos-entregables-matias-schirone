const dotenv = require('dotenv')
dotenv.config()

const morgan = require('morgan')

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

//routes
const authWebRouter = require('./routes/web/auth.js')
const homeWebRouter = require('./routes/web/home.js')
const productosApiRouter = require('./routes/api/productos.js')

const addProductosHandlers = require('./routes/ws/productos.js')
const addMensajesHandlers = require('./routes/ws/mensajes.js')


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

app.set('view engine', 'ejs')

app.use(morgan('dev'))

//app.use(passport.initialize())
//app.use(passport.session())

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

//start server
const connectedServer = httpServer.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
