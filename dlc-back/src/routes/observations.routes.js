import { Router } from "express";
import {
  getBrands,
  getErrorObservations,
  getOutcomeObservations,
  getReturnObservations,
  getIncomeObservations,
  updateErrorObservations,
  updateIncomeObservations,
  updateOutcomeObservations,
  updateReturnObservations,
  updateBrands
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

observationsRouter.post("/errors", (req, res) => {
    updateErrorObservations(req, res);
});

observationsRouter.post("/incomes", (req, res) => {
    updateIncomeObservations(req, res);
});
observationsRouter.post("/outcomes", (req, res) => {
    updateOutcomeObservations(req, res);
});

observationsRouter.post("/returns", (req, res) => {
    updateReturnObservations(req, res);
});

observationsRouter.post("/brands", (req, res) => {
    updateBrands(req, res);
});

export default observationsRouter;
