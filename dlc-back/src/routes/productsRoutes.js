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

// Consultar un producto por término de búsqueda
router.get('/productos/:query', (req, res) => {
  const searchTerm = req.params.query;
  console.log(searchTerm)
  const filteredProducts = productosController.getProductsBySearchTerm(searchTerm);

  console.log(filteredProducts)

  return res.status(200).send({
    status: 'success',
    payload: filteredProducts
  })
});

module.exports = router
