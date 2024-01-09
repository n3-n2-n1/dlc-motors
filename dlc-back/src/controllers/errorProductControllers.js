// productosController.js
const db = require("../database/db");

const getErrorProducts = (req, res) => {
  db.query("SELECT * FROM errores", (queryErr, rows) => {
    if (queryErr) {
      console.error(queryErr.message);
      res
        .status(500)
        .json({ error: "Error en la consulta a la base de datos." });
      return;
    }

    res.json(rows);
  });
};

const createError = (req, res) => {
  const {
    cantidad,
    detalle,
    observaciones,
    oemProducto,
  } = req.body;

  console.log(
    `cantidad: ${cantidad}, detalle: ${detalle}, observaciones: ${observaciones}, oemProducto: ${oemProducto}`
  );

  // Realizar la lógica para insertar un nuevo producto en la base de datos
  db.query(
    "INSERT INTO errores (cantidad, detalle, observaciones, oemProducto) VALUES (?, ?, ?, ?)",
    [
      cantidad,
      detalle,
      observaciones,
      oemProducto,
    ],
    function (error) {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al insertar el error." });
        return;
      }
    }
  );
};

const DeleteError = (req, res) => {
  const errorId = req.params.pid;

  if (!errorId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }

  db.query(
    "DELETE FROM errores WHERE Codigo = ?",
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

      res.status(204).json({ message: "Error eliminado correctamente." });
    }
  );
};

module.exports = {
  getErrorProducts,
  createError,
  DeleteError,
};
