import { Router } from "express";

import { massiveAdd } from "../controllers/massiveAdd.controller.js";

const massiveAddRouter = Router();

massiveAddRouter.post("/", (req, res) => {
  massiveAdd(req, res);
});

export default massiveAddRouter;
