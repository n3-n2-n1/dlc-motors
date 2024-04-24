import { Router } from "express";
import {createCosts, getCosts, updateCosts} from "../controllers/costs.controllers.js";

const costsRouter = Router();

costsRouter.get("/", (req, res) => {
  getCosts(req, res);
});

costsRouter.post("/", (req, res) => {
  createCosts(req, res);
})

costsRouter.put("/", (req, res) => {
  updateCosts(req, res);
});

export default costsRouter;
