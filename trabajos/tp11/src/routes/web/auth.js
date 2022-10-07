import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/singup', (req, res) => {
    const { nombre, email } = req.session
    if (nombre && email) {
        res.redirect('/login')
    } else {
        res. sendFile(path.join(process.cwd(), '/views/singup.html'))
    }
})

authWebRouter.post('/singup', (req, res) => {
    console.log(req.body)
    res.send('recibido')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
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





export default authWebRouter