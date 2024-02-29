import { Router } from "express";
import passport from "passport";
import { verifyRole } from '../middlewares/auth.js';

import {
  getReturns,
  createReturn,
  deleteReturn,
} from "../controllers/returns.controller.js";

const returnsRouter = Router();

returnsRouter.get("/", (req, res) => {
  getReturns(req, res);
});

returnsRouter.post("/", (req, res) => {
  createReturn(req, res);
});

returnsRouter.delete("/", (req, res) => {
  deleteReturn(req, res);
});

export default returnsRouter;