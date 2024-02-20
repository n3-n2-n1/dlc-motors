import db from "../database/db.js";

export default class HistoryService {
  constructor() {}

  async getHistory() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM historial", (error, results) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          reject(new Error("Error al obtener el historial."));
        } else {
          resolve(results);
        }
      });
    });
  }

  async createHistory() {
    try {
      db.query(
        "INSERT INTO historial (accion, descripcion, fecha) VALUES (?, ?, ?)",
        [historialData.accion, historialData.descripcion, historialData.fecha],
        (error, results) => {
          if (error) {
            console.error(
              "Error al registrar la acción en el historial:",
              error
            );
            throw new Error("Error al registrar la acción en el historial");
          }

          return results;
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
