import { Router } from "express";
import passport from "passport";
import { verifyRole } from "../middlewares/auth.js";
import { massiveAdd } from "../controllers/massiveAdd.controller.js";

const massiveAddRouter = Router();

massiveAddRouter.post("/", (req, res) => {
  massiveAdd(req, res);
});

export default massiveAddRouter;
