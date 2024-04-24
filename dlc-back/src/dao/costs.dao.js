import db from "../database/db.js";

export class CostDAO {
  constructor(db) {
    this.db = db;
  }

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

  async createCosts(
    descripcion,
    codigo,
    marca,
    stock,
    proveedores,
    rubro,
    sku
  ) {
    try {
      db.query(
        "INSERT INTO costos (`descripcion`, `codigo`, `marca`, `stock`, `proveedores`, `rubro`, `sku`) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [
          descripcion,
          codigo,
          marca,
          stock,
          JSON.stringify(proveedores),
          rubro,
          sku,
        ],
        function (error) {
          if (error) {
            console.error("Error", error);
            throw new Error("Error al insertar el costo");
          }
          db.query(
            "SELECT * FROM costos WHERE descripcion = ?",
            [codigo],
            function (error, results) {
              if (error) {
                console.error(
                  "An error occurred while executing the query",
                  error
                );
                throw new Error("Error al obtener el costo insertado.");
              }

              return results;
            }
          );
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateCost(proveedores, codigo) {
    const updateQuery = "UPDATE costos SET proveedores = ? WHERE codigo = ?";

    try {
      db.query(
        updateQuery,
        [JSON.stringify(proveedores), codigo],
        (updateError, updateResults) => {
          if (updateError) {
            console.error(
              "An error occurred while executing the query",
              updateError
            );
            throw new Error("Error al actualizar el costo.");
          }

          return updateResults;
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteCosts(productId) {
    try {
      db.query(
        "DELETE FROM costos WHERE codigo = ?",
        [productId],
        (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            throw new Error("Error al abrir la base de datos.");
          }

          if (results.affectedRows === 0) {
            throw new Error("Costo no encontrado.");
          }

          return results;
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
