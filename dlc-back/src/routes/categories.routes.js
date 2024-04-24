import { Router } from "express";
import { getCategories, updateCategories } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/", (req, res) => {
    getCategories(req, res);
})

categoriesRouter.put("/", (req, res) => {
    updateCategories(req, res);
})

export default categoriesRouter;