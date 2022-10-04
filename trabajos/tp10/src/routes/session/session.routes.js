const express = require("express");
const { path } = require("path");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const counterMiddleware = require('../../middlewares/count/count.middleware')

const router = express.Router();

router.get("/", counterMiddleware, (req, res) => {
  res.redirect("/home");
});

router.get("/login", counterMiddleware, (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
    res.redirect("/");
  }else{
    res.sendFile(path.join(process.cwd(), '/views/login'))
  }
});

router.get("/logout", counterMiddleware, (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
    req.session.destroy(err => {
      if (err) {
        res.render(path.join(process.cwd(), '/views/pages/logout'), {nombre})
      } else {
        res.redirect("/");
      }
    });
  }else{
    res.redirect("/");
  }
});

router.post("/login", counterMiddleware, (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
});



/*router.get("/", authMiddleware, counterMiddleware, async (req, res) => {
  try {
    res.status(200).send(`<h1>Hola ${req.session.username}, Como estas?, esta es tu visita numero ${req.session.visits}</h1>`)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/login", async (req, res) => {
  try {
    const { username, password } = req.query;
    if (username == "matias" && password == "123456") {
      req.session.username = username;
      req.session.admin = true;
      return res.status(200).send(`<h1>Usuario autenticado exitosamente</h1>`);
    }
    return res.status(400).send(`<h1>Datos incorrectos</h1>`);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


router.get("/logout", authMiddleware, async (req, res) => {
  try {
    req.session.destroy(err => {
        if(err){
            return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
        }
    })
    return res.status(200).send(`<h1>Hasta la vuelta</h1>`)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})*/



module.exports = router;

