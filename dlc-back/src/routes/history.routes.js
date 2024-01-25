import { Router } from "express";

import {
  createHistory,
  getHistory,
} from "../controllers/history.controller.js";

const historyRouter = Router();

historyRouter.get("/", (req, res) => {
  getHistory(req, res);
});

historyRouter.post("/", (req, res) => {
  createHistory(req, res);
});

export default historyRouter;
