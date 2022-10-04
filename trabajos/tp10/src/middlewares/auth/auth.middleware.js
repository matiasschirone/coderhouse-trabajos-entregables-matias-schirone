const authMiddleware = async (req, res, next) => {
    const { username, admin } = req.session;
    if(username == 'matias' && admin){
      return next()
    }
    return res.status(400).send(`<h1>Usuario no autenticado</h1>`)
  };
  
  module.exports = authMiddleware;
  