// usuariosRoutes.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsControllers')


//Enviar producto creado
router.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;

  // Validar datos aca? 
  productosController.createProducts(nombre, precio);
  res.send('Producto creado exitosamente.');
});



//Consultar los productos
router.get('/productos', (req, res) => {
  productosController.getProducts(req, res);
});



module.exports = router
