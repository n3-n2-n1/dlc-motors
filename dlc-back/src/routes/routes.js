import { Router } from "express";

import historyRouter from "./history.routes.js";
import massiveAddRouter from "./massiveAdd.routes.js";
import movementsRouter from "./movements.routes.js";
import productErrorsRouter from "./productErrors.routes.js";
import productsRouter from "./products.routes.js";
import returnsRouter from "./returns.routes.js";
import usersRouter from "./users.routes.js";
import deliveryRouter from "./delivery.routes.js";
import costsRouter from "./costs.routes.js";

const routerAPI = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/history", historyRouter);
  router.use("/massiveAdd", massiveAddRouter);
  router.use("/movements", movementsRouter);
  router.use("/productErrors", productErrorsRouter);
  router.use("/products", productsRouter);
  router.use("/returns", returnsRouter);
  router.use("/users", usersRouter);
  router.use("/delivery", deliveryRouter);
  router.use("/costs", costsRouter);
};

export default routerAPI;
