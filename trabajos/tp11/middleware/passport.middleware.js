
passport.use('login', new LocalStrategy(
    (nombre, email, done) => {
        //let user = users.find()
        User.findOne({ nombre, email }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                console.log('User Not Found with nombre ' + nombre)
                return done(null, false, { message: 'Usuario no encontrado' })
            }
            if (!isValidPassword(nombre, email)) {
                console.log('Invalid Password')
                return done(null, false, { message: 'Contraseña inválida' })
            }
            return done(null, user)
        })
    })
)