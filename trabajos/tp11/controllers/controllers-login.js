import { response } from "express";

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user;
        console.log('user logueado');
        res.render('login', { user });
    } else {
        console.log('no hay usuario logueado');
        res.render('login');
    }
}

const getSignup = (req, res) => {
    res.render('signup');
}

const postLogin = (req, res) => {
    let user = req.user;
    res. render('login', { user });
}

const postSignup = (req, res) => {
    let user = req.user;
    res.render('signup', { user });
}

const getFailLogin = (req, res) => {
    console.log('login failed');
    res.render('login', { message: 'login failed' });
}

const getFailSignup = (req, res) => {
    console.log('signup failed');
    res.render('signup', { message: 'signup failed' });
}

const getLogout = (req, res) => {
    req.logout();
    res.redirect('/home');
}

const failRoute = (req, res) => {
    res.status(404).render('routing-error', { message: '404 - Page not found' });
}


export default {
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getFailLogin,
    getFailSignup,
    getLogout,
    failRoute
}



