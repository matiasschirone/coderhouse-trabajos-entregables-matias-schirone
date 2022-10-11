import { Router } from 'express'
import passport from 'passport'
import path from 'path'


const authWebRouter = new Router()

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

authWebRouter.get('/', checkAuth, (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    //const { username, password } = req.body
    if (req.isAuthenticated()) {
        let user = req.user;
        console.log('user logueado');
        res.redirect('/home');
    }else{
        console.log('no hay usuario logueado');
        res.render('login');
    }
})

authWebRouter.post('/login', passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/login',
}), (req, res) => {
    const { username, password } = req.body
    //const { user } = req.user
    res.redirect('/home');
})


authWebRouter.get('/signup', (req, res) => {
    res.render('signup')
})

authWebRouter.post('/signup', passport.authenticate('signup',{
    successRedirect: '/login',
    failureRedirect: '/signup',
}
 ),(req, res) => {
    const { username, password } = req.body
    res.redirect('/login');
})


authWebRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})






export default authWebRouter