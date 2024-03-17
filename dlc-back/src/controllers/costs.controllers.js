import { costsService } from "../services/services.js";

export const getCosts = async (req, res) => {
  try {
    const costs = await costsService.getCosts();
    if(!costs){
      return res.status(404).send({
        status: "error",
        error: "No cost found",
      })
    }

    res.status(200).send({
      status: "success",
      payload: costs

    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get costs"
    })
  }
};


