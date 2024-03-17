import db from "../database/db.js";

export default class ObservationService {
  async getReturnObservations() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM returnsObservations", (error, results) => {
        if (error) {
          console.error("Error al obtener Return Observations");
          reject(new Error("Error al obtener Return Obs."));
        } else {
          resolve(results);
        }
      });
    });
  }

  async getErrorObservations() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM errorObservations", (error, results) => {
        if (error) {
          console.error("Error al obtener Error obs.");
          reject(new Error("Error al obtener Error obs"));
        } else {
          resolve(results);
        }
      });
    });
  }

  async getIncomeObservations() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM incomeObservations", (error, results) => {
        if (error) {
          console.error("Error al obtener Income obs.");
          reject(new Error("Error al obtener Income Obs."));

        } else {
          console.log(results)
          resolve(results);
        }
      });
    });
  }

  async getBrands() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM marcas", (error, results) => {
        if (error) {
          console.error("Error al obtener las marcas");
          reject(new Error("Error al obtener marcas"));

        } else {
          resolve(results);
        }
      });
    });
  }

  async getOutcomeObservations() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM outcomeObservations", (error, results) => {
        if (error) {
          console.error("Error");
          reject(new Error("Error al obtener Income Obs."));
          
        } else {
          resolve(results);
          
        }
      });
    });
  }

  async updateOutcomeObservations() {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE outcomeObservations SET ... WHERE ---",
        [updatedObservation],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  async updateIncomeObservations() {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE incomeObservations SET ... WHERE ---",
        [updatedObservation],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async updateErrorObservations() {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE errorObservations SET ... WHERE ---",
        [updatedObservation],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async updateReturnObservations() {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE returnObservations SET ... WHERE ---",
        [updatedObservation],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async updateBrands() {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE marcas SET ... WHERE ---",
        [updatedObservation],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }


}
