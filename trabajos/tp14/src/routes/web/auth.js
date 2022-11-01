import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.query.nombre || " "
    const password = req.query.password || " "

    nombre = nombre.replace(/[!@#$%^&*]/g, "")

    if (!nombre || !password || users[nombre]) {
        return res.sendStatus(401)
    }

    const salt = crypto.randomBytes(128).toString('base64')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

    users[nombre] = { salt, hash }

    res.sendStatus(200)
})

authWebRouter.get("/auth-bloq", (req, res) => {
    const nombre = req.query.nombre || " "
    const password = req.query.password || " "

    nombre = nombre.replace(/[!@#$%^&*]/g, "")

    if (!nombre || !password || !users[nombre]) {
        process.exit(1)
        //return res.sendStatus(401)
    }

    const { salt, hash } = users[nombre]
    const encrypthash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

    if (crypto.timingSafeEqual(hash, encrypthash)) {
        res.sendStatus(200)
    } else {
        process.exit(1)
        //res.sendStatus(401)
    }
})

authWebRouter.get("/auth-nobloq", (req, res) => {
    const nombre = req.query.nombre || " "
    const password = req.query.password || " "

    nombre = nombre.replace(/[!@#$%^&*]/g, "")

    if (!nombre || !password || !users[nombre]) {
        process.exit(1)
        //return res.sendStatus(401)
    }

    crypto.pbkdf2(password, users[nombre].salt, 10000, 512, 'sha512', (err, hash) => {
        if (users[nombre].hash.toString() === hash.toString()) {
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