import { Router } from "express";

import {
  getProductErrors,
  createProductError,
  deleteProductError,
} from "../controllers/productErrors.controller.js";

const productErrorsRouter = Router();

productErrorsRouter.get("/", (req, res) => {
  getProductErrors(req, res);
});

productErrorsRouter.post("/", (req, res) => {
  createProductError(req, res);
});

productErrorsRouter.delete("/", (req, res) => {
  deleteProductError(req, res);
});

export default productErrorsRouter;
