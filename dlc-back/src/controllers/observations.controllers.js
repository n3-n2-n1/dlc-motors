import { observationsService } from "../services/services.js";

export const updateObservations = async (req, res) => {
  try {
    const {
      errorsObservations,
      incomesObservations,
      outcomesObservations,
      returnsObservations,
    } = req.body;

    if (
      !errorsObservations.length === 0 ||
      !incomesObservations.length === 0 ||
      !outcomesObservations.length === 0 ||
      !returnsObservations.length === 0
    ) {
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    }

    const updatedErrorsObservations =
      await observationsService.updateErrorObservations(errorsObservations);

    if (!updatedErrorsObservations) {
      return res.status(404).send({
        status: "error",
        error: "Failed to update error observations",
      });
    }

    const updatedIncomesObservations =
      await observationsService.updateIncomeObservations(incomesObservations);

    if (!updatedIncomesObservations) {
      return res.status(404).send({
        status: "error",
        error: "Failed to update income observations",
      });
    }

    const updatedOutcomesObservations =
      await observationsService.updateOutcomeObservations(outcomesObservations);

    if (!updatedOutcomesObservations) {
      return res.status(404).send({
        status: "error",
        error: "Failed to update outcome observations",
      });
    }

    const updatedReturnsObservations =
      await observationsService.updateReturnObservations(returnsObservations);

    if (!updatedReturnsObservations) {
      return res.status(404).send({
        status: "error",
        error: "Failed to update return observations",
      });
    }

    return res.status(201).send({
      status: "success",
      message: "Observations updated",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", errror: "Failed to update observations" });
  }
};

export const updateBrands = async (req, res) => {
  try {
    const brands = req.body;

    if (!brands.length === 0) {
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    }

    const updatedBrands = await observationsService.updateBrands(brands);

    if (!updatedBrands) {
      return res
        .status(404)
        .send({ status: "error", error: "Failed to update brands" });
    }

    return res
      .status(201)
      .send({ status: "success", message: "brands updated" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", errror: "brands update obs" });
  }
};

export const getErrorObservations = async (req, res) => {
  try {
    const observations = await observationsService.getErrorObservations();
    if (!observations || observations.length === 0) {
      return res
        .status(404)
        .send({ status: "error", error: "No observations" });
    }
    res.status(200).send({
      status: "success",
      payload: observations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "failed to get error obs",
    });
  }
};

export const getIncomeObservations = async (req, res) => {
  try {
    const observations = await observationsService.getIncomeObservations();
    if (!observations || observations.length === 0) {
      return res
        .status(404)
        .send({ status: "error", error: "No observations" });
    }
    res.status(200).send({
      status: "success",
      payload: observations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "failed to get income obs",
    });
  }
};

export const getReturnObservations = async (req, res) => {
  try {
    const observations = await observationsService.getReturnObservations();
    if (!observations || observations.length === 0) {
      return res
        .status(404)
        .send({ status: "error", error: "No observations" });
    }
    res.status(200).send({
      status: "success",
      payload: observations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "failed to get Return obs",
    });
  }
};

export const getOutcomeObservations = async (req, res) => {
  try {
    const observations = await observationsService.getOutcomeObservations();
    if (!observations || observations.length === 0) {
      return res
        .status(404)
        .send({ status: "error", error: "No observations" });
    }
    res.status(200).send({
      status: "success",
      payload: observations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "failed to get outcome obs",
    });
  }
};

export const getBrands = async (req, res) => {
  try {
    const observations = await observationsService.getBrands();
    if (!observations || observations.length === 0) {
      return res
        .status(404)
        .send({ status: "error", error: "No observations" });
    }
    res.status(200).send({
      status: "success",
      payload: observations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "failed to get brands",
    });
  }
};
