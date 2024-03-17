import { ProductDAO } from "../dao/product.dao.js";

export default class ProductService {
  constructor() {
    this.productDAO = new ProductDAO();
  }
  

  async createMultipleProducts(productList) {
    try {
      return await this.productDAO.createMultipleProducts(productList);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async getProducts() {
    try {
      return await this.productDAO.getProducts();
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }

  async getProductsBySearchTerm(searchTerm) {
    try {
      return await this.productDAO.getProductsBySearchTerm(searchTerm);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
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
      return await this.productDAO.createProduct(
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
      );
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
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
      return await this.productDAO.editProduct(
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
      );
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      return await this.productDAO.deleteProduct(productId);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }
}
