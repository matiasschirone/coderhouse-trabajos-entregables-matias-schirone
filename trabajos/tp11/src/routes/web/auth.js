import { Router } from 'express'
import { appendFile } from 'fs';
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path'
import { checkAuthenticated, validPassword } from '../../auth/index.js';
import bcrypt from 'bcrypt';

import User from '../../models/user.js'; 
import { createHash } from 'crypto';
import user from '../../models/user.js';

const authWebRouter = new Router()

/*const validPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}*/

passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({ username: username })
    if (user) {
        console.log(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'El usuario ya existe' })
    }
    const newUser = {
        username,
        email,
        //password: createHash (passport),
        password
    }

    User.push(newUser)
    console.log(`Usuario ${username} creado`)
    return done(null, newUser.id)
    }
))

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {   
            
            if (!user) {
                console.log('no existe el usuario')
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            /*if (!validPassword(user, password)) {
                console.log('contraseña incorrecta')
                return done(null, false);
            }*/
            return done(null, user);
        });
    }
));
            


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
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