const express = require("express");

const cookiesRoutes = require('./cookies/cookies.routes')
const sessionRoutes = require('./session/session.routes')

const router = express.Router();

router.get("/health", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Health Up!",
  });
})
//.use('/cookies', cookiesRoutes)
.use('/session', sessionRoutes)

module.exports = router;