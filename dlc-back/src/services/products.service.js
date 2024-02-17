import db from "../database/db.js";

export default class ProductService {
  constructor() {}

  async getProducts() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM productos", (error, results) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          reject(new Error("Error al obtener los productos."));
        } else {
          resolve(results);
        }
      });
    });
  }

  async getProductsBySearchTerm(searchTerm) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM productos WHERE Producto LIKE ?",
        [`%${searchTerm}%`],
        (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al abrir la base de datos."));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  

  async createProduct(
    pieceCode,
    OEMCode,
    tangoCode,
    description,
    category,
    origin,
    compatibleBrands,
    stock,
    hasStock,
    brokenOrReturned,
    kit,
    tag,
    price,
    picture
  ) {
    try {
      const compatibleBrandsStr = compatibleBrands.join(", ");

      // Realizar la lógica para insertar un nuevo producto en la base de datos
      db.query(
        "INSERT INTO productos (Codigo, Producto, Rubro, CodBarras, Precio, Stock, hasStock, Image, Origen, CodTango, CodOEM, marcasCompatibles, Devoluciones, Kit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          pieceCode,
          description,
          category,
          tag,
          price,
          stock,
          hasStock,
          picture,
          origin,
          tangoCode,
          OEMCode,
          compatibleBrandsStr,
          brokenOrReturned,
          kit,
        ],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            throw new Error("Error al insertar el producto.");
          }

          // Get the inserted product
          db.query(
            "SELECT * FROM productos WHERE Codigo = ?",
            [pieceCode],
            function (error, results) {
              if (error) {
                console.error(
                  "An error occurred while executing the query",
                  error
                );
                throw new Error("Error al obtener el producto insertado.");
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

  async deleteProduct(productId) {
    try {
      db.query(
        "DELETE FROM productos WHERE Codigo = ?",
        [productId],
        (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            throw new Error("Error al abrir la base de datos.");
          }

          if (results.affectedRows === 0) {
            throw new Error("Producto no encontrado.");
          }

          return results;
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
