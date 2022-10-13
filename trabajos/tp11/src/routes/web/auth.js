import { Router } from 'express'
import { appendFile } from 'fs';
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path'
import { checkAuthenticated } from '../../auth/index.js';

import User from '../../models/user.js'; 

const authWebRouter = new Router()

passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({ username: username })
    if (user) {
        return done(null, false, { message: 'El usuario ya existe' })
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
}, async (req, username, password, done) => {
    const user = await User.findOne({ username: username })
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' })
    }
    if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Contraseña incorrecta' })
    return done(null, user)
    }else{
        return done(null, user)
    }
}))



/*passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) 
                return done(err)
            if (!user) {
                console.log('User Not Found with username ' + username)
                return done(null, false)
            }
            if (!user.comparePassword(password)) {
                console.log('Invalid Password')
                return done(null, false)
            }
            return done(null, user)
        })
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Error in SignUp: ' + err)
                return done(err)
            }
            if (user) {
                console.log('User already exists with username: ' + username)
                return done(null, false)
            } else {
                const newUser = new User()
                newUser.username = username
                newUser.password = newUser.encryptPassword(password)
                newUser.save((err) => {
                    if (err) {
                        console.log('Error in Saving user: ' + err)
                        throw err
                    }
                    console.log('User Registration succesful')
                    return done(null, newUser)
                })
            }
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});*/


authWebRouter.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const { username, password } = req.body
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
    failureRedirect: '/faillogin',
}), (req, res) => {
    const { username, password } = req.body
    //const { user } = req.user
    res.redirect('/home');
})


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