import { categoryService } from "../services/services.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    if (!categories) {
      return res.status(404).send({ status: "error", error: "No categories" });
    }
    res.status(200).send({
      status: "success",
      payload: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "failed to get error obs",
    });
  }
};
export const updateCategories = async (req, res) => {
  try {
    const categories = req.body;

    if (!categories) {
      return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
    }
    
    const updatedCategories = await categoryService.updateCategories(categories)

    if (!updatedCategories) {
      return res
      .status(404)
      .send({ status: "error", error: "categories failed to update" });
    }

    return res
      .status(201)
      .send({ status: "success", message: "categories updated" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "categories failed to update" });
  }
};
