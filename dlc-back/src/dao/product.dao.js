import db from "../database/db.js";
import { CostDAO } from "./costs.dao.js";

export class ProductDAO {
  constructor(db) {
    this.db = db;
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
          } else {
            const costDAO = new CostDAO();
            const codigo = codigoInt;
            const proveedores = "";
            costDAO.createCosts(
              descripcion,
              codigo,
              marcasCompatibles,
              stock,
              proveedores,
              rubro,
              SKU,
              origen
            );
          }

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

  async addProduct(product, usuario) {
    try {
      const { codigoInt, codOEM, descripcion, stock, rubro, marcasCompatibles } = product;
  
      // Insertar el producto en la base de datos
      const results = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO productos (codigoInt, codOEM, descripcion, stock, rubro, marcasCompatibles) VALUES (?, ?, ?, ?, ?, ?)",
          [codigoInt, codOEM, descripcion, stock, rubro, marcasCompatibles],
          (error, results) => {
            if (error) {
              console.error("An error occurred while inserting the product", error);
              return reject(new Error("Error al agregar el producto."));
            }
            resolve(results);
          }
        );
      });
  
      // Instancia de MovementDAO para registrar el movimiento
      const movementDAO = new MovementDAO(db);
  
      // Creación del movimiento de tipo "Agregar Producto"
      await movementDAO.createMovementInventory(
        new Date(), // Fecha del movimiento
        codigoInt,
        codOEM,
        descripcion, // Descripción del producto
        0, // Stock inicial antes del movimiento (0 porque se está agregando)
        stock, // Stock actual después del agregado
        "Producto agregado", // Detalle del movimiento
        usuario, // Usuario que realizó el agregado
        "Agregar Producto", // Tipo de movimiento
        rubro, // Rubro del producto
        marcasCompatibles // Marcas compatibles
      );
  
      return results;
    } catch (error) {
      throw error;
    }
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
  async getProductByCodigoInt(codigoInt) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM productos WHERE codigoInt = ?",
        [codigoInt],
        (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al abrir la base de datos."));
          } else {
            resolve(results[0]);
          }
        }
      );
    });
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

  async deleteProduct(productId, usuario) {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM productos WHERE codigoInt = ?",
          [productId],
          (error, results) => {
            if (error) {
              console.error("An error occurred while executing the query", error);
              return reject(new Error("Error al abrir la base de datos."));
            }
  
            if (results.affectedRows === 0) {
              return reject(new Error("Producto no encontrado."));
            }
  
            resolve(results);
          }
        );
      });
  
      // Instancia de CostDAO y eliminación de costos asociados al producto
      const costDAO = new CostDAO();
      await costDAO.deleteCosts(productId);
  
      // Obtener información del producto eliminado para crear el movimiento
      const productDAO = new ProductDAO(db);
      const deletedProduct = await productDAO.getProductById(productId); // Asegúrate de tener este método para obtener los datos del producto
  
      // Instancia de MovementDAO para registrar el movimiento de eliminación
      const movementDAO = new MovementDAO(db);
  
      // Creación de un movimiento de tipo "Eliminación"
      await movementDAO.createMovementInventory(
        new Date(), // Fecha del movimiento
        deletedProduct.codigoInt,
        deletedProduct.codOEM,
        deletedProduct.descripcion, // Descripción del producto
        deletedProduct.stock, // Stock actual del producto
        0, // Stock tras la eliminación
        "Producto eliminado", // Detalle del movimiento o arreglo
        usuario, // Usuario que realizó la eliminación
        "Eliminación", // Tipo de movimiento (diferente de Egreso)
        deletedProduct.rubro, // Rubro del producto
        deletedProduct.marcasCompatibles // Marcas compatibles
      );
  
      return results;
    } catch (error) {
      throw error;
    }
  }
  

  async modifyStock(newStock, codigoInt) {
    if (isNaN(newStock)) {
      throw new Error("El valor de cantidad debe ser numérico");
    }

    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE productos SET stock = ? WHERE codigoInt = ?",
        [newStock, codigoInt],
        (error, results) => {
          if (error) {
            console.error("Error al modificar el stock: ", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async modifyStockOutcome(codigoInt, stockAct) {
    const newStock = stockAct;

    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE productos SET stock = stock - ? WHERE codigoInt = ?",
        [newStock, codigoInt],
        (error, results) => {
          if (error) {
            console.error("Error al modificar el stock: ", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async modifyCheck(estado, codigoInt) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE productos SET check = ? WHERE codigoInt = ?",
        [estado, codigoInt],
        (error, results) => {
          if (error) {
            console.error("Error al modificar el stock: ", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async updateFutureStock(codigoInt, newFutureStock) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE productos SET stockFuturo = ? WHERE codigoInt = ?",
        [newFutureStock, codigoInt],
        (error, results) => {
          if (error) {
            console.error("Error al modificar el stock:", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async decreaseFutureStock(newFutureStock, codigoInt) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE productos SET stockFuturo = ? WHERE codigoInt = ?",
        [newFutureStock, codigoInt],
        (error, results) => {
          if (error) {
            console.error("Error al modificar el stock", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}
