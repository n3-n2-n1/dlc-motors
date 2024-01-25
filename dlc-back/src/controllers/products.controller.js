import { productService } from "../services/services.js";

//Obtener los productitos
export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();

    if (!products || products.length === 0) {
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
    console.error(error);
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

    // Usa 'await' para esperar a que la promesa se resuelva
    const filteredProduct = await productService.getProductsBySearchTerm(searchTerm);

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
    console.log(filteredProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
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

    if (
      !pieceCode ||
      !OEMCode ||
      !tangoCode ||
      !description ||
      !category ||
      !origin ||
      !compatibleBrands ||
      !stock ||
      !hasStock ||
      !brokenOrReturned ||
      !kit ||
      !tag ||
      !price ||
      !picture
    ) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    // Esto se va a usar para validar que el usuario tenga el rol necesario para realizar esta acción
    // const { jwtCookie: token } = req.cookies;

    // if (!token) {
    //   return res.status(400).send({
    //     status: "error",
    //     error: "Failed to get token",
    //   });
    // }

    const createdProduct = productService.createProduct(
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
    );

    if (!createdProduct || createdProduct.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to create product with code ${pieceCode}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: createdProduct,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to create product",
    });
  }
};

//Eliminar el productito
export const deleteProduct = (req, res) => {
  try {
    const productId = req.params.pid;

    if (!productId) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const deletedProduct = productService.deleteProduct(productId);

    if (!deletedProduct || deletedProduct.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to delete product with id ${productId}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: deletedProduct,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to delete product",
    });
  }
};
