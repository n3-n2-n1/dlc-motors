import { Router } from "express";

import {
  getMovements,
  createMovement,
} from "../controllers/movements.controller.js";

const movementsRouter = Router();

movementsRouter.get("/", (req, res) => {
  getMovements(req, res);
});

movementsRouter.post("/", (req, res) => {
  createMovement(req, res);
});

export default movementsRouter;
