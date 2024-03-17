import { returnsService } from "../services/services.js";

export const getReturns =  async (req, res) => {
try {
  const returns = await returnsService.getReturns();
  
  if (!returns) {
    return res.status(404).send({
      status: "error",
      error: "No returns found",
    });
  }

  res.status(200).send({
    status: "success",
    payload: returns,
  });
} catch (error) {
  

  console.error(error);
  return res.status(500).send({
    status: "error",
    error: "Failed to get errors",
  });

}
};

export const createReturn = async (req, res) => {
 try {
  const returns = await returnsService.createReturn();
  if (!returns || returns.length === 0) {
    return res.status(404).send({
      status: "error",
      error: "No error found",
    });
  }

  res.status(200).send({
    status: "success",
    payload: returns,
  });

} catch (error) {

  console.error(error);
  return res.status(500).send({
    status: "error",
    error: "Failed to create returns",
  });


}
};

export const deleteReturn = async (req, res) => {
  try {
    // ! Acá se toma el id de la Devolución a eliminar y se envía al service

    const returns = await returnsService.deleteReturn();
    
    if (!returns || returns.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No error found",
      });
    }
  
    res.status(200).send({
      status: "success",
      payload: returns,
    });
  
  } catch (error) {
  
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to delete returns",
    });
  
  }
};
