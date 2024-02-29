import db from "../database/db.js";

export default class ErrorService {
  constructor() { }

  async getProductErrors() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM errores", (queryErr, rows) => {
        if (queryErr) {
          console.queryError(queryErr.message);
          res.status(500)
            .json({ error: "Error en la consulta a la base de datos." });
          reject(new Error('Error en la consultita.'))
        }
        else { resolve(rows) }
      });});}


  async createProductError(fecha, observaciones, codigoInt, codOEM, descripcion, stock, detalle, stockReal, imagen) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO errores (fecha, observaciones, codInterno, codOEM, `desc`, stock, det, stockReal, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [fecha, observaciones, codigoInt, codOEM, descripcion, stock, detalle, stockReal, imagen],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res.status(500).json({ error: "Error al insertar el error." });
            return;
          }
          else {
            resolve(results);
          }
        });})}


  async deleteProductError(errorId) {
    try {
      db.query(
        "DELETE FROM errores WHERE codInterno = ?",
        [errorId],
        (error, results, fields) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res.status(500).json({ error: "Error al abrir la base de datos." });
            return;
          }
          if (results.affectedRows === 0) {
            res.status(404).json({ error: "Error no encontrado." });
            return;
          }
          res.status(200).json({ message: "Error eliminado correctamente." });
        }
      )
    } catch (error) {
      reject(new Error("Error al eliminar"));
    }}


  async updateProductError(fecha, observaciones, codigoInt, codOEM, descripcion, stock, detalle, stockReal, imagen) {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
        UPDATE errores SET 
        fecha = COALESCE(?, fecha), 
        observaciones = COALESCE(?, observaciones), 
        codInterno = COALESCE(?, codInterno), 
        codOEM = COALESCE(?, codOEM), 
        `` desc` ` = COALESCE(?, ` `desc`` ), 
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
          ` `desc` ` IS NOT NULL 
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
        `, [fecha, observaciones, codigoInt, codOEM, descripcion, stock, detalle, stockReal, imagen],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res.status(500).json({ error: "Error al actualizar el error." });
            return;
          }
          else {
            resolve(results);
          }})})}



}