import { costsService } from "../services/services.js";

export const getCosts = async (req, res) => {
  try {
    const costs = await costsService.getCosts();
    if (!costs) {
      return res.status(404).send({
        status: "error",
        error: "No cost found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: costs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get costs",
    });
  }
};

export const createCosts = async (req, res) => {
  try {
    const { descripcion, codigo, marca, stock, proveedores, rubro, sku } =
      req.body;

    if (
      !descripcion
    ) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const createdCost = costsService.createCosts(
      descripcion,
      codigo,
      marca,
      stock,
      proveedores,
      rubro,
      sku
    );

    if (!createdCost || createdCost.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to create cost with desc ${descripcion}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: createdCost,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to create product",
    });
  }
};

export const updateCosts = async (req, res) => {
  try {
    const {id, proveedores} = req.body;

    if (!id || proveedores.length === 0) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const updatedCosts = costsService.updateCosts(id, proveedores);

    if (!updatedCosts || updatedCosts.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to update cost}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: updatedCosts,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to update cost",
    });
  }
};

export const deleteCosts = async (req, res) => {
  try {
    const costId = req.params.pid;

    if (!costId) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const deletedCost = costsService.deleteCosts(costId);

    if (!deletedCost || deletedCost.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to delete cost with id ${costId}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: deletedCost,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to delete product",
    });
  }
};
