
import bcrypt from 'bcrypt';

export function webAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}
export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function apiAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
}

export function validPassword(username, password) {
    return bcrypt.compareSync(password, user.password);
  }

