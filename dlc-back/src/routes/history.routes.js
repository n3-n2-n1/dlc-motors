import { Router } from "express";

import {
  getHistorial,
  createHistorial,
} from "../controllers/history.controller.js";

const historyRouter = Router();

historyRouter.get("/", (req, res) => {
  getHistorial(req, res);
});

historyRouter.post("/", (req, res) => {
  createHistorial(req, res);
});

export default historyRouter;
