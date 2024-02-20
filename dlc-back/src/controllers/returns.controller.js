import db from "../database/db.js";

export const getReturns = (req, res) => {
  db.query("SELECT * FROM devoluciones", (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }

    res.json(results);
  });
};

export const createReturn = (req, res) => {
  const {
    fecha, observaciones, codInterno, codOEM, desc, stock, det, cantidad, kit,
  } = req.body;

  // Realizar la lógica para insertar un nuevo producto en la base de datos
  db.query(
    "INSERT INTO devoluciones (fecha, observaciones, codInterno, codOEM, desc, stock, det, cantidad, kit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      fecha, observaciones, codInterno, codOEM, desc, stock, det, cantidad, kit,
    ],
    function (error) {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al insertar la query.", error });
        return;
      }

      // Get the inserted product
      db.query(
        "SELECT * FROM devoluciones WHERE codInterno = ?",
        [productCode],
        function (error, results, fields) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res
              .status(500)
              .json({ error: "Error al obtener la devolucion insertado." });
            return;
          }

          res.status(200).json({
            message: "Devolucion insertado correctamente.",
          });

        }
      );
    }
  );
};

export const deleteReturn = (req, res) => {
  const productId = req.params.pid;

  if (!productId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }

  db.query(
    "DELETE FROM productos WHERE codOEM = ?",
    [productId],
    (error, results, fields) => {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al abrir la base de datos." });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Producto no encontrado." });
        return;
      }

      res.status(200).json({ message: "Producto eliminado correctamente." });
      console.log("Borrado joya padre");
    }
  );
};
