import { errorService } from "../services/services.js";

export const getProductErrors = async (req, res) => {
  try {
    const errors = await errorService.getProductErrors();
    if (!errors) {
      return res.status(404).send({
        status: "error",
        error: "No error found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: errors,
    });

  } catch (error) {

    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get errors",
    });


  }
};

export const createProductError = async (req, res) => {
  try {
    const { fecha, observaciones, codInterno, codOEM, desc, stock, det, stockReal, img } = req.body;
    if (!fecha) {
      return res.status(400).send({ status: "error", error: "Incomplete values" })
    }
    res.status(200).send({
      status: "success",
      payload: createdError,
    });
    const createdError = await ErrorService.createProductError(fecha, observaciones, codInterno, codOEM, desc, stock, det, stockReal, img)
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to create error",
    });
  }
};

export const deleteProductError = async (req, res) => {
  const errorId = req.params.pid;
  const deletedError = await ErrorService.deleteProductError(errorId)

  if (!errorId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }
  else {
    res.status(200).json({ message: "Eliminado correctamente", payload: deletedError })
  }
};



export const updateProductError = async (req, res) => {
  try {
    const { fecha, observaciones, codInterno, codOEM, desc, stock, det, stockReal, img } = req.body;
    const updatedError = await ErrorService.updateProductError(fecha, observaciones, codInterno, codOEM, desc, stock, det, stockReal, img)

    res.status(200).send({
      status: "success",
      payload: updatedError,
    });


  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to update error",
    });
  }

}


export const updateErrorStatus = async (req, res) => {
  try {
    const { id, estado } = req.body;
    
    if (!id || !estado || id === 0) {
      return res.status(400).send({ status: "error", error: "Incomplete values" })
    }

    const updatedError = await errorService.updateErrorStatus(id, estado)

    res.status(200).send({
      status: "success",
      payload: updatedError,
    });


  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to update error",
    });
  }

}
