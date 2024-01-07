// usuariosRoutes.js
const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productsControllers");

//Consultar los productos
router.get("/productos", (req, res) => {
  productosController.getProducts(req, res);
});

// Consultar un producto por término de búsqueda
router.get("/productos/:query", (req, res) => {
  productosController.getProductsBySearchTerm(req, res);
});

// Crear un producto nuevo
router.post("/productos", (req, res) => {
  productosController.createProduct(req, res);
});

// Eliminar un producto existente
router.delete("/productos/:pid", (req, res) => {
  productosController.deleteProduct(req, res);
});

module.exports = router;
