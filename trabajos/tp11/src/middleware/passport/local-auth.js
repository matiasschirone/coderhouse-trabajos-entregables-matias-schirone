import passport from "passport";
import { Strategy } from "passport-local";

import { User } from "../models/user.js";

const LocalStrategy = Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-singup', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'email',
    passReqToCallback: true
}, async (req, nombre, email, done) => {
    console.log(req.body)
    const user = new User({ nombre, email })
    user.nombre = nombre;
    user.email = email;
    await user.save()
    done(null, user)
}))