import { Router } from "express";
import passport from "passport";
import { verifyRole } from '../middlewares/auth.js';

import {
  getProductErrors,
  createProductError,
  deleteProductError,
  updateProductError,
  updateErrorStatus,
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

productErrorsRouter.delete("/update/", (req, res) => {
  updateProductError(req, res);
});

productErrorsRouter.put("/", (req, res) => {
  updateErrorStatus(req, res);
});



export default productErrorsRouter;
