import db from "../database/db.js";

export class ProductDAO {
  constructor(db) {
    this.db = db;
  }

  async createMultipleProducts(productList) {
    try {
      const values = productList.map((product) => [
        product.codigoInt,
        product.codOEM,
        product.SKU,
        product.descripcion,
        product.rubro,
        product.origen,
        Array.isArray(product.marcasCompatibles)
          ? product.marcasCompatibles.join(", ")
          : product.marcasCompatibles,
        product.stock,
        typeof product.imagen === "object"
          ? JSON.stringify(product.imagen)
          : product.imagen,
        product.contadorDevoluciones,
        Array.isArray(product.kit) ? product.kit.join(", ") : product.kit,
        product.check,
      ]);

      const query =
        "INSERT INTO productos (codigoInt, codOEM, SKU, descripcion, rubro, origen, marcasCompatibles, stock, imagen, contadorDevoluciones, kit, `check`) VALUES ?";

      return new Promise((resolve, reject) => {
        db.query(query, [values], function (error, results) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al obtener los productos."));
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }

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
        "SELECT * FROM productos WHERE descripcion LIKE ?",
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
    codigoInt,
    codOEM,
    SKU,
    descripcion,
    rubro,
    origen,
    marcasCompatibles,
    stock,
    imagen,
    contadorDevoluciones,
    kit
  ) {
    try {
      const marcasCompatiblesString = marcasCompatibles.join(", ");
      let kitString = kit;
      if (Array.isArray(kit)) {
        kitString = kit.join(", ");
      }

      // Realizar la lógica para insertar un nuevo producto en la base de datos
      db.query(
        "INSERT INTO productos (codigoInt, codOEM, SKU, descripcion, rubro, origen, marcasCompatibles, stock, imagen, contadorDevoluciones, kit) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          codigoInt,
          codOEM,
          SKU,
          descripcion,
          rubro,
          origen,
          marcasCompatiblesString,
          stock,
          imagen,
          contadorDevoluciones,
          kitString,
        ],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            throw new Error("Error al insertar el producto.");
          }

          // Get the inserted product
          db.query(
            "SELECT * FROM productos WHERE codigoInt = ?",
            [codigoInt],
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

  async editProduct(
    codigoInt,
    codOEM,
    SKU,
    descripcion,
    rubro,
    origen,
    marcasCompatibles,
    stock,
    imagen,
    contadorDevoluciones,
    kit
  ) {
    try {
      const marcasCompatiblesString = marcasCompatibles.join(", ");
      const kitString = kit.join(", ");

      return new Promise((resolve, reject) => {
        db.query(
          `UPDATE productos
              SET 
                codOEM = ?,
                SKU = ?,
                descripcion = ?,
                rubro = ?,
                origen = ?,
                marcasCompatibles = ?,
                stock = ?,
                imagen = ?,
                contadorDevoluciones = ?,
                kit = ?
              WHERE codigoInt = ?;`,
          [
            codOEM,
            SKU,
            descripcion,
            rubro,
            origen,
            marcasCompatiblesString,
            stock,
            imagen,
            contadorDevoluciones,
            kitString,
            codigoInt,
          ],
          (error, results) => {
            if (error) {
              console.error(error);
              reject(new Error("Error al editar el producto"));
            } else {
              resolve(results);
            }
          }
        );
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      db.query(
        "DELETE FROM productos WHERE codigoInt = ?",
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
