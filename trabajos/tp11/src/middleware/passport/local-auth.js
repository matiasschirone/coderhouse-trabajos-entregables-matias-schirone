const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await user.findById(id);
    done(null, user);
});

passport.use('local-singup', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'email',
    passReqToCallback: true
}, async (req, nombre, email, done) => {
    console.log(req.body)
    const user = new user({ nombre, email })
    user.nombre = nombre;
    user.email = email;
    await user.save()
    done(null, user)
}))