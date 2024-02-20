import { historyService } from "../services/services.js";

export const getHistory = async (req, res) => {
  try {
    const history = await historyService.getHistory();

    if (!history) {
      return res.status(404).send({
        status: "error",
        error: "No history found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: history,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to get History",
    });
  }
};

export const createHistory = (req, res) => {
  try {
    const historialData = {
      accion: "Nuevo Producto",
      descripcion: "Producto insertado.",
      fecha: "Ayer",
    };

    if (!historialData) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const history = historyService.createHistory(historialData);

    if (!history) {
      return res.status(404).send({
        status: "error",
        error: "Failed to create history",
      });
    }

    res.status(200).send({
      status: "success",
      payload: history,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to create History",
    });
  }
};
