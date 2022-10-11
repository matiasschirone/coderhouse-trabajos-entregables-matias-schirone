import { Router } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path'

//import user from '../../models/user';

const authWebRouter = new Router()

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err)

            return done(err);

            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }

            if (user.password !== password) {
                console.log('Invalid Password');
                return done(null, false, { message: 'Invalid Password' });  
            }

            return done(null, user);
        });
    }
));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {

            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }

            if (user) {
                console.log('El usuario ya existe');
                return done(null, false)
            }

            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
            };
        

            user.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log(user);
                console.log('User Registration succesful');
                return done(null, userWithId);
            });
        });
    })
);



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