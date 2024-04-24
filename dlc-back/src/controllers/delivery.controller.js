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
      stockAcumulado,
    } = req.body;

    const estado = "En camino";


    if (
      !cantidad ||
      !codOEM ||
      !codigoInt ||
      !desc ||
      !fecha ||
      !numImpo ||
      !observaciones ||
      !stockAcumulado
    ) {
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
      stockAcumulado,
      estado
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

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { numImpo, estado, cantidad, codigoInt } = req.body;

    if (!numImpo || !estado || !cantidad || !codigoInt) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete Values",
      });
    }

    const updatedDelivery = deliveryService.updateDeliveryStatus(
      numImpo,
      estado,
      cantidad,
      codigoInt
    );

    res.status(200).send({
      status: "success",
      payload: updatedDelivery,
    });

    if (!updatedDelivery || updatedDelivery.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to update delivery`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to update delivery",
    });
  }
};


export const createMultipleDelivery = async (req, res) => {
  try {

    const deliveryList = req.body;

    for (const delivery of productList) {
      const {
        cantidad,
        codOEM,
        codigoInt,
        desc,
        fecha,
        numImpo,
        observaciones,
        stock,
        stockAcumulado,
        estado
      } = delivery;


      if (!numImpo) {
        return res.status(400).send({
          status: "error",
          error: "Incomplete values (numImpo) in one or more delivery",
        });
      }
    }

    const createdDeliveries = await deliveryService.createMultipleDelivery(deliveryList);

    if (!createdDeliveries) {
      return res.status(404).send({
        status: "error",
        error: "Failed to create products",
      });
    }

    res.status(200).send({
      status: "success",
      payload: createdDeliveries,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to create products",
    });
  }

}
