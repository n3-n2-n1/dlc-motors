import db from "../database/db.js";

export default class CostsService {
  constructor() {}

  async getCosts() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM costos", (error, results) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          reject(new Error("Error al obtener el historial."));
        } else {
          resolve(results);
        }
      });
    });
  }

  
}
