import { Router } from "express";
import {
  getBrands,
  getErrorObservations,
  getOutcomeObservations,
  getReturnObservations,
  getIncomeObservations,
  updateObservations,
  updateBrands,
} from "../controllers/observations.controllers.js";

const observationsRouter = Router();

//GET
observationsRouter.get("/brands", (req, res) => {
  getBrands(req, res);
});

observationsRouter.get("/errors", (req, res) => {
  getErrorObservations(req, res);
});

observationsRouter.get("/outcomes", (req, res) => {
  getOutcomeObservations(req, res);
});

observationsRouter.get("/returns", (req, res) => {
  getReturnObservations(req, res);
});

observationsRouter.get("/incomes", (req, res) => {
  getIncomeObservations(req, res);
});

//UPDATES
observationsRouter.put("/", (req, res) => {
  updateObservations(req, res);
});

observationsRouter.put("/brands", (req, res) => {
  updateBrands(req, res);
});

export default observationsRouter;
