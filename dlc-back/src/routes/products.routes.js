import { Router } from "express";
import passport from "passport";
import { verifyRole } from "../middlewares/auth.js";

import {
  getProducts,
  getProductsBySearchTerm,
  createProduct,
  editProduct,
  deleteProduct,
  createMultipleProducts,
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

productsRouter.put("/:username", (req, res) => {
  editProduct(req, res);
});

// Eliminar un producto existente
productsRouter.delete("/:pid", (req, res) => {
  deleteProduct(req, res);
});

productsRouter.post("/createMultiple", (req, res) => {
  createMultipleProducts(req, res);
});

export default productsRouter;
