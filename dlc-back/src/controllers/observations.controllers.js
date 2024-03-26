import { observationsService } from "../services/services.js";


export const updateErrorObservations = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "error obs updated" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", errror: "Failed to update error obs" });
  }
};

export const updateIncomeObservations = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "Income obs updated" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", errror: "Failed to update obs" });
  }
};

export const updateOutcomeObservations = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "outcome obs updated" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", errror: "Failed to update outcome obs" });
  }
};

export const updateReturnObservations = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "Income obs updated" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", errror: "Failed to update obs" });
  }
};


export const updateBrands = async (req, res) => {
    try {
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
