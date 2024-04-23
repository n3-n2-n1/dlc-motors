import db from "../database/db.js";
import { ProductDAO } from "./product.dao.js";
export class productErrorsDAO {
  constructor(db) {
    this.db = db;
  }

  async getProductErrors() {
    try {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM errores", (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al obtener los Errores en los productos."));
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async createProductError(
    usuario,
    fecha,
    observaciones,
    codigoInt,
    codOEM,
    descripcion,
    stock,
    detalle,
    stockReal,
    imagen
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO errores (user, fecha, observaciones, codInterno, codOEM, `desc`, stock, det, stockReal, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          usuario,
          fecha,
          observaciones,
          codigoInt,
          codOEM,
          descripcion,
          stock,
          detalle,
          stockReal,
          imagen,
        ],
        function (error, results) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al crear el Error de producto."));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async deleteProductError(errorId) {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "DELETE FROM errores WHERE codInterno = ?",
          [errorId],
          (error, results, fields) => {
            if (error) {
              console.error(
                "An error occurred while executing the query",
                error
              );
              reject(new Error("Error al eliminar el Error de producto."));
            } else {
              if (results.affectedRows === 0) {
                console.error(
                  "An error occurred while executing the query",
                  error
                );
                reject(new Error("Error de producto no encontrado."));
              }
              resolve(results);
            }
          }
        );
      } catch (error) {
        reject(new Error("Error al eliminar"));
      }
    });
  }

  async updateErrorStatus(id, estado) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE errores SET estado = ? WHERE id = ?",
        [estado, id],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el estado del error"));
          } else {
            const productDao = new ProductDAO()
            if(estado === 'En revisión'){
              const codigoInt = id;
              productDao.modifyCheck(estado, codigoInt)
            }
            resolve(results);
          }
        }
      );
    });
  }

  async updateProductError(
    fecha,
    observaciones,
    codigoInt,
    codOEM,
    descripcion,
    stock,
    detalle,
    stockReal,
    imagen
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
        UPDATE errores SET 
        fecha = COALESCE(?, fecha), 
        observaciones = COALESCE(?, observaciones), 
        codInterno = COALESCE(?, codInterno), 
        codOEM = COALESCE(?, codOEM), 
        `` desc`` = COALESCE(?, ``desc`` ), 
        stock = COALESCE(?, stock), 
        det = COALESCE(?, det), 
        stockReal = COALESCE(?, stockReal), 
        img = COALESCE(?, img) 
      WHERE 
        (
          fecha IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          observaciones IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          codInterno IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          codOEM IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          ``desc`` IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          stock IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          det IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          stockReal IS NOT NULL 
          OR ? IS NOT NULL
        ) 
        AND (
          img IS NOT NULL 
          OR ? IS NOT NULL
        );
        `,
        [
          fecha,
          observaciones,
          codigoInt,
          codOEM,
          descripcion,
          stock,
          detalle,
          stockReal,
          imagen,
        ],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al actualizar el Error de producto."));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}
