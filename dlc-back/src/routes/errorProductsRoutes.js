// usuariosRoutes.js
const express = require('express');
const errorProductControllers = require('../controllers/errorProductControllers');
const router = express.Router();


router.get('/errorProduct', (req, res) => {
    // Aquí puedes utilizar la función definida en el controlador
    errorProductControllers.getErrorProducts
  });
module.exports = router
