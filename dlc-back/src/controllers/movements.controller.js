import { movementService } from "../services/services.js";

export const getMovements = async (req, res) => {
  try {
    const moves = await movementService.getMovements();

    if (!moves || moves.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No moves found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: moves,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get moves",
    });
  }
};

export const createMovementInventory = async (req, res) => {
  try {
    const movement = req.body;


    const moves = await movementService.createMovementInventory(movement);


    if (!moves || moves.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No moves found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: moves,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to create move",
    });
  }
};

export const createIncomeOutcome = async (req, res) => {
  try {
    const movement = req.body;
    const moves = await movementService.createIncomeOutcome(movement);

    if (!moves || moves.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No moves found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: moves,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to create move",
    });
  }
};
