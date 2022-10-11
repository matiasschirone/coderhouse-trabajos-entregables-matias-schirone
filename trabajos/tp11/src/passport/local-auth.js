import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';



/*passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
  console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));*/


/*passport.serializeUser((user, done) => {
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


const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}



export default passport;*/







