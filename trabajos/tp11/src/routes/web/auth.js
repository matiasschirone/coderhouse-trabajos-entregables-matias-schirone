import { Router } from 'express'
import { appendFile } from 'fs';
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path'
import { checkAuthenticated, validPassword } from '../../auth/index.js';
import bcrypt from 'bcrypt';

import User from '../../models/user.js'; 

const authWebRouter = new Router()

passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({ username: username })
    if (user) {
        return done(null, false)
    }else{
        const newUser = new User({
            username: username,
            password: password
        })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        done(null, newUser)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},  async (req, username, password, done) => {
    const user = await User.findOne({ username: username })
    if (!user) {
        return done(null, false)
    }
    if (!user.comparePassword(password)) {
        return done(null, false)
    }
    return done(null, user)
}))



passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})


authWebRouter.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    res.render('login')
})

authWebRouter.post('/login', passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/faillogin',
    failureFlash: true
}))


authWebRouter.get('/signup', (req, res) => {
    res.render('signup')
})

authWebRouter.post('/signup', async(req, res) => {
    const { username, email, password } = req.body
    const user = new User({ username, email, password })
    await user.save()
    res.redirect('/login')  
})

authWebRouter.get('/faillogin', (req, res) => {
    res.render('faillogin')
})

authWebRouter.get('/failRegister', (req, res) => {
    res.render('failRegister')
})



authWebRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})






export default authWebRouter