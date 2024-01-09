import db from "../database/db.js";

export default class ProductService {
  constructor() {}

  async getProducts() {
    try {
      db.query("SELECT * FROM productos", (error, results, fields) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          res.status(500).json({ error: "Error al abrir la base de datos." });
          return;
        }

        // console.log(results);
        res.json(results);
      });
    } catch (error) {}
  }
}
