import { Router } from "express";

import {
  getProducts,
  getProductsBySearchTerm,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const productsRouter = Router();

//Consultar los productos
productsRouter.get("/", (req, res) => {
  getProducts(req, res);
});

// Consultar un producto por término de búsqueda
productsRouter.get("/:query", (req, res) => {
  getProductsBySearchTerm(req, res);
});

// Crear un producto nuevo
productsRouter.post("/", (req, res) => {
  createProduct(req, res);
});

// Eliminar un producto existente
productsRouter.delete("/:pid", (req, res) => {
  deleteProduct(req, res);
});

export default productsRouter;
