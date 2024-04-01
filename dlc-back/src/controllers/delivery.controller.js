// import db from "../database/db.js";
import { deliveryService } from "../services/services.js";

export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await deliveryService.getDeliveries();

    if (!deliveries || deliveries.length === 0) {
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

export const createDelivery = async (req, res) => {
  try {
    const {
      cantidad,
      codOEM,
      codigoInt,
      desc,
      fecha,
      numImpo,
      observaciones,
      stock,
    } = req.body;

    console.log(req.body)

    if (!cantidad || !codOEM || !codigoInt || !desc || !fecha || !numImpo || !observaciones) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete Values",
      });
    }

    const createdDelivery = deliveryService.createDelivery(
      cantidad,
      codOEM,
      codigoInt,
      desc,
      fecha,
      numImpo,
      observaciones,
      stock,
    );

    res.status(200).send({
      status: "success",
      payload: createdDelivery,
    });

    if (!createdDelivery || createdDelivery.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to create delivery with code ${desc}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to create deliveries",
    });
  }
};
