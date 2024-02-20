import db from "../database/db.js";

export const getProductErrors = (req, res) => {
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

export const createProductError = (req, res) => {
  const { fecha, observaciones, codigoInt, codOEM, descripcion, stock, detalle, stockReal, imagen  } = req.body;


  // Realizar la lógica para insertar un nuevo producto en la base de datos
  db.query(
    "INSERT INTO errores (fecha, observaciones, codInterno, codOEM, `desc`, stock, det, stockReal, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [fecha, observaciones, codigoInt, codOEM, descripcion, stock, detalle, stockReal, imagen],
    function (error) {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al insertar el error." });
        return;
      }
    }
  );
};

export const deleteProductError = (req, res) => {
  const errorId = req.params.pid;

  if (!errorId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }

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

      res.status(204).json({ message: "Error eliminado correctamente." });
    }
  );
};
