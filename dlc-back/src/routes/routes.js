import { Router } from "express";

import massiveAddRouter from "./massiveAdd.routes.js";
import movementsRouter from "./movements.routes.js";
import productErrorsRouter from "./productErrors.routes.js";
import productsRouter from "./products.routes.js";
import returnsRouter from "./returns.routes.js";
import usersRouter from "./users.routes.js";
import deliveryRouter from "./delivery.routes.js";
import costsRouter from "./costs.routes.js";
import notificationsRouter from "./notifications.routes.js";

import { swaggerUi } from "../config/swagger.js";

const routerAPI = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/massiveAdd", massiveAddRouter);
  router.use("/movements", movementsRouter);
  router.use("/productErrors", productErrorsRouter);
  router.use("/products", productsRouter);
  router.use("/returns", returnsRouter);
  router.use("/users", usersRouter);
  router.use("/delivery", deliveryRouter);
  router.use("/costs", costsRouter);
  router.use("/notifications", notificationsRouter);

  router.use('/docs', swaggerUi())
};

export default routerAPI;
