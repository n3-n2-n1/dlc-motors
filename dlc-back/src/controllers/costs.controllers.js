import db from "../database/db.js";

const getCosts = (req, res) => {
  db.query("SELECT * FROM costos", (error, results) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }

    res.json(results);
  });
};




export default {getCosts}