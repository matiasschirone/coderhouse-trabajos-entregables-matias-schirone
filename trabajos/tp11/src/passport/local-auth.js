import session from express-session;
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

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
                return done(null, false,
                    req.flash('message', 'User Not found.'));
            }

            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false,
                    req.flash('message', 'Invalid Password'));
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
                id: user.length + 1,
                username,
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


const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}



export default passport;







