import { massiveAddService } from "../services/services.js";

export const massiveAdd = async (req, res) => {
  try {
    const data = req.body.data;

    if (!data) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    await massiveAddService.massiveAdd(data);

    res.status(200).send({
      status: "success",
      message: "Data successfully inserted into database",
    });
    
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: `Failed to insert xlsx workbook into database with error: ${error}`,
    });
  }
};
