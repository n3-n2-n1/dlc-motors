// usuariosRoutes.js
const express = require("express");
const router = express.Router();
const historialControllers = require("../controllers/historialControllers");



router.get('/historial', (req, res) => {
    historialControllers.getHistorial(req, res);
});


router.post('/historial', (req, res) => {
    historialControllers.createHistorial(req,res);
})


module.exports = router
