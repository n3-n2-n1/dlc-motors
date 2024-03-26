import { Router } from "express";
import passport from "passport";
import { verifyRole } from '../middlewares/auth.js';
import {
  getMovements,
  createMovementInventory,
  createIncomeOutcome,
} from "../controllers/movements.controller.js";

const movementsRouter = Router();

movementsRouter.get("/", (req, res) => {
  getMovements(req, res);
});

movementsRouter.post("/", (req, res) => {
  createIncomeOutcome(req, res);
});

movementsRouter.post("/inventario", (req, res) => {
  createMovementInventory(req, res);
});

export default movementsRouter;
