import db from "../database/db.js";

export class ReturnsDAO {
  constructor(db) {
    this.db = db;
  }

  async getReturns() {
    try {
      return new Promise((resolve, reject) => {   
        db.query("SELECT * FROM devoluciones", (error, results, fields) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al obtener las Devoluciones"));
          } else {
            resolve(results);
          }
        });
        })
    } catch (error) {
      throw error;
    }
  }

  async createReturn(
    fecha,
    observaciones,
    codInterno,
    codOEM,
    desc,
    stock,
    det,
    cantidad,
    kit) {
      try {
    return new Promise((resolve, reject) => {
      
      db.query(
        "INSERT INTO devoluciones (fecha, observaciones, codInterno, codOEM, desc, stock, det, cantidad, kit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          fecha,
          observaciones,
          codInterno,
          codOEM,
          desc,
          stock,
          det,
          cantidad,
          kit,
        ],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al crear la Devolucion"));
          } else {
            resolve(results);
          }
  
          // Get the inserted product
          db.query(
            "SELECT * FROM devoluciones WHERE codInterno = ?",
            [productCode],
            function (error, results, fields) {
              if (error) {
                console.error(
                  "An error occurred while executing the query",
                  error
                );
                reject(new Error("Error al obtener la Devolucion recien creada"));
              } else {
                resolve(results);
              }
            }
          );
        }
      );
      })
      } catch (error) {
        throw error;
      }
  }

  async deleteReturn() {
    try {
      return new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM productos WHERE codOEM = ?",
          [productId],
          (error, results, fields) => {
            if (error) {
              console.error("An error occurred while executing the query", error);
              reject(new Error("Error al eliminar la Devolución"));
            } else {
              if (results.affectedRows === 0) {
                console.error("An error occurred while executing the query", error);
                reject(new Error("Devolución no encontrada."));
              }
              resolve(results);
            }
          }
        );
      })
    } catch (error) {
      throw error;
    }
  }
}
