import db from "../database/db.js";
import xlsx from "xlsx";

export default class MassiveAddService {
  constructor() {}

  async massiveAdd(data) {
    try {
      const workbook = xlsx.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Suponiendo que solo hay una hoja en el archivo Excel
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Itera sobre las filas del archivo Excel y guárdalas en la base de datos
      for (const row of sheetData) {
        db.query(
          "INSERT INTO productos (Codigo, Producto, Rubro, CodBarras, Stock, Image, Origen, SKU, CodOEM, marcasCompatibles, Devoluciones, Kit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            row.Codigo,
            row.Producto,
            row.Rubro,
            row.CodBarras,
            row.Stock,
            row.Image,
            row.Origen,
            row.SKU,
            row.CodOEM,
            row.marcasCompatibles,
            row.Devoluciones,
            row.Kit,
          ]
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
