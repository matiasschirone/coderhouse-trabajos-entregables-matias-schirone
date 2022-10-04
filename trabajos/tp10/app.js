const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session')
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require('./src/routes/index')

const MongoStore = require("connect-mongo");
const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const app = express();

app.use(logger('dev'));

app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl:'mongodb+srv://matias:Coder1234@cluster0.sngjgjx.mongodb.net/?retryWrites=true&w=majority', mongoOptions: mongoConfig })
}))

app.use(cookieParser(process.env.COOKIES_SECRET || '123456'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(indexRouter)

module.exports = app;