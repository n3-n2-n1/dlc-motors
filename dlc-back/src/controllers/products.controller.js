import { productService } from "../services/services.js";

//Obtener los productitos
export const getProducts = async (req, res) => {
  try {
    // Acá podría recibir los parámetros de sorting desde la req.query, como limit, page, category, ordenamientos, etc.

    // Al getProducts() se le peuden pasar parámetros de sorting y los usa para ordenar los productos, traer menos, etc.
    const products = productService.getProducts();

    if (!products) {
      return res.status(404).send({
        status: "error",
        error: "No products found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: products,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to get products",
    });
  }
};

export const getProductsBySearchTerm = async (req, res) => {
  try {
    const searchTerm = req.params.query;

    if (!searchTerm) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const filteredProduct = productService.getProductsBySearchTerm(searchTerm);

    if (!filteredProduct || filteredProduct.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Product with query '${searchTerm}' was not found`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: filteredProduct,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to get product",
    });
  }
};

//Crear productitos
export const createProduct = async (req, res) => {
  try {
    const {
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
      picture,
    } = req.body;

    // Esto se va a usar para validar que el usuario tenga el rol necesario para realizar esta acción
    // const { jwtCookie: token } = req.cookies;

    // if (!token) {
    //   return res.status(400).send({
    //     status: "error",
    //     error: "Failed to get token",
    //   });
    // }

    
  } catch (error) {}

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
        res.status(500).json({ error: "Error al insertar el producto." });
        return;
      }

      // Get the inserted product
      db.query(
        "SELECT * FROM productos WHERE Codigo = ?",
        [pieceCode],
        function (error, results, fields) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res
              .status(500)
              .json({ error: "Error al obtener el producto insertado." });
            return;
          }

          res.status(200).json({
            message: "Producto insertado correctamente.",
            product: results[0],
          });

          console.log(results);
        }
      );
    }
  );
};

//Eliminar el productito
export const deleteProduct = (req, res) => {
  const productId = req.params.pid;

  if (!productId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }

  db.query(
    "DELETE FROM productos WHERE CodOEM = ?",
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
