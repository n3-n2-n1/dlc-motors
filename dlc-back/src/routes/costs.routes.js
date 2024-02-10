import { Router } from "express";
import getCosts from '../controllers/costs.controllers.js';


const costsRouter = Router();

costsRouter.get("/", (req, res) => {
  getCosts(req, res);
});



export default costsRouter;
