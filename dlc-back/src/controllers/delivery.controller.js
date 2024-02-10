// import db from "../database/db.js";
import { deliveryService } from "../services/services.js";

export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await deliveryService.getDeliveries();

    if (!products || products.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No deliveries found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: deliveries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get deliveries",
    });
  }
};

const createDelivery = async (req, res) => {
  try {
    const { cantidad, codigoInt, fecha, movementType, numeroImportacion, observaciones } = req.body;

    if (!cantidad || !codigoInt || !fecha || !movementType || !numeroImportacion || !observaciones) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const createdDelivery = await deliveryService.createDelivery(cantidad, codigoInt, fecha, movementType, numeroImportacion, observaciones);

    if (!createdDelivery || createdProduct.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to create delivery with code ${pieceCode}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: createdDelivery,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to create delivery",
    });
  }
};

export default { getDeliveries, createDelivery };
