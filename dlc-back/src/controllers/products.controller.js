import { productService } from "../services/services.js";


export const createMultipleProducts = async (req, res) => {
  try {
    const productList = req.body;

    // Validar que productList no esté vacío y cada producto tenga los campos necesarios
    if (!Array.isArray(productList)) {
      return res.status(400).send({
        status: "error",
        error: "No products provided",
      });
    }

    for (const product of productList) {
      const {
        codigoInt,
        codOEM,
        SKU,
        descripcion,
        rubro,
        origen,
        marcasCompatibles,
        stock,
        check,
        contadorDevoluciones,
        kit
      } = product;

      if (
        !codigoInt
      ) {
        return res.status(400).send({
          status: "error",
          error: "Incomplete values in one or more products",
        });
      }
    }

    // Llama a un método que procesa la inserción masiva de los productos
    const createdProducts = await productService.createMultipleProducts(productList);

    if (!createdProducts) {
      return res.status(404).send({
        status: "error",
        error: "Failed to create products",
      });
    }

    

    res.status(200).send({
      status: "success",
      payload: createdProducts,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to create products",
    });
  }
};

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
      kit,
    } = req.body;

    if (

      !codigoInt ||
      !codOEM ||
      !SKU ||
      !descripcion ||
      !rubro ||
      !origen ||
      !marcasCompatibles ||
      !stock
    ) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const createdProduct = productService.createProduct(
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
      kit,
    );

    if (!createdProduct || createdProduct.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to create product with code ${codigoInt}`,
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

//Crear productitos
export const editProduct = async (req, res) => {
  try {
    const {
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
      kit,
    } = req.body;

    if (
      !codigoInt ||
      !codOEM ||
      !SKU ||
      !descripcion ||
      !rubro ||
      !origen ||
      !marcasCompatibles ||
      !stock
    ) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const updatedProduct = productService.editProduct(
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
      kit,
    );

    if (!updatedProduct || updatedProduct.length === 0) {
      return res.status(404).send({
        status: "error",
        error: `Failed to edit product with code ${codigoInt}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: updatedProduct,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: "Failed to edit product",
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
