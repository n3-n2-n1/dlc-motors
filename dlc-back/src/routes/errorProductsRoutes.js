// usuariosRoutes.js
const express = require('express');
const errorProductControllers = require('../controllers/errorProductControllers');
const router = express.Router();


router.get('/getErrorProduct', (req, res) => {
    // Aquí puedes utilizar la función definida en el controlador
    errorProductControllers.getErrorProducts(req, res);
  });

router.post('/errorProductDelete', (req, res) => {
  // Aquí puedes utilizar la función definida en el controlador
    errorProductControllers.DeleteError(req, res);
  });

router.post('/errorProductCreate', (req, res) => {
    errorProductControllers.createError(req, res);
});






module.exports = router
