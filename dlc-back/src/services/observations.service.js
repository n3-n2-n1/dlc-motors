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

  async updateErrorObservations(errorsObservations) {
    return new Promise((resolve, reject) => {
      const errorsObservation = Object.values(errorsObservations).join(', ');
      db.query(
        "UPDATE errorObservations SET observaciones = ?",
        [errorsObservation],
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

  async updateIncomeObservations(incomesObservations) {
    return new Promise((resolve, reject) => {
      const incomeObservation = Object.values(incomesObservations).join(', ');
      db.query(
        "UPDATE incomeObservations SET observaciones = ?",
        [incomeObservation],
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

  async updateOutcomeObservations(outcomesObservations) {
    return new Promise((resolve, reject) => {
      const outcomesObservation = Object.values(outcomesObservations).join(', ');

      db.query(
        "UPDATE outcomeObservations SET observaciones = ?",
        [outcomesObservation],
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

  async updateReturnObservations(returnsObservations) {
    return new Promise((resolve, reject) => {
      const returnObservation = Object.values(returnsObservations).join(', ');

      db.query(
        "UPDATE returnsObservations SET observaciones = ?",
        [returnObservation],
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

  async updateBrands(brands) {
    return new Promise((resolve, reject) => {
      const brand = Object.values(brands).join(', ');
      db.query(
        "UPDATE marcas SET marcas = ?",
        [brand],
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
