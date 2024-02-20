import { Router } from "express";
import { getDeliveries, createDelivery } from "../controllers/delivery.controller.js";

const deliveryRouter = Router();

deliveryRouter.get("/", (req, res) => {
  getDeliveries(req, res);
});

deliveryRouter.post("/", (req, res) => {
  createDelivery(req, res);
});

export default deliveryRouter;
