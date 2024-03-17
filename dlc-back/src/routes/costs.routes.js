import { Router } from "express";
import passport from "passport";
import { verifyRole } from "../middlewares/auth.js";
import {getCosts} from "../controllers/costs.controllers.js";

const costsRouter = Router();

costsRouter.get("/", (req, res) => {
  getCosts(req, res);
});

export default costsRouter;
