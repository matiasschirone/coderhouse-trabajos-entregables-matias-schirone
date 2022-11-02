import { Router } from 'express'

import crypto from 'crypto'

import path from 'path'

const authWebRouter = new Router()

const users = {}

/*authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})*/

authWebRouter.get('/getUsers', (req, res) => {
    res.json({ users })
})

authWebRouter.get('/newUser', (req, res) => {
    const username = req.query.username || ""
    const password = req.query.password || ""

    username = username.replace(/[!@#$%^&*]/g, "")

    if (!username || !password || users[username]) {
        return res.sendStatus(401)
    }

    const salt = crypto.randomBytes(128).toString('base64')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

    users[username] = { salt, hash }

    res.sendStatus(200)
})

authWebRouter.get("/auth-bloq", (req, res) => {
    const username = req.query.username || ""
    const password = req.query.password || ""

    username = username.replace(/[!@#$%^&*]/g, "")

    if (!username || !password || !users[username]) {
        process.exit(1)
        //return res.sendStatus(401)
    }

    const { salt, hash } = users[username]
    const encrypthash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

    if (crypto.timingSafeEqual(hash, encrypthash)) {
        res.sendStatus(200)
    } else {
        process.exit(1)
        //res.sendStatus(401)
    }
})

authWebRouter.get("/auth-nobloq", (req, res) => {
    const username = req.query.username || ""
    const password = req.query.password || ""

    username = username.replace(/[!@#$%^&*]/g, "")

    if (!username || !password || !users[username]) {
        process.exit(1)
        //return res.sendStatus(401)
    }

    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
        if (users[username].hash.toString() === hash.toString()) {
            res.sendStatus(200)
        } else {
            process.exit(1)
            //res.sendStatus(401)
        }
    })
})



authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})



export default authWebRouter