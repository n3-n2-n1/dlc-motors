import { productErrorsDAO } from "../dao/productErrors.dao.js";

export default class ErrorService {
  constructor() {
    this.productErrorsDAO = new productErrorsDAO();
  }

  async getProductErrors() {
    try {
      return await this.productErrorsDAO.getProductErrors();
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async createProductError(
    usuario,
    fecha,
    observaciones,
    codigoInt,
    codOEM,
    descripcion,
    stock,
    detalle,
    stockReal,
    imagen,
    origen,
    rubro,
    marcasCompatibles,
  ) {
    try {
      return await this.productErrorsDAO.createProductError(
        usuario,
        fecha,
        observaciones,
        codigoInt,
        codOEM,
        descripcion,
        stock,
        detalle,
        stockReal,
        imagen,
        origen,
        rubro,
        marcasCompatibles,
      );
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async deleteProductError(errorId) {
    try {
      return await this.productErrorsDAO.deleteProductError(errorId);
    } catch (error) {
      throw new Error("Error en el servicio", +error.message);
    }
  }

  async updateErrorStatus(id, estado) {
    try {
      return await this.productErrorsDAO.updateErrorStatus(id, estado);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async updateProductError(
    fecha,
    observaciones,
    codigoInt,
    codOEM,
    descripcion,
    stock,
    detalle,
    stockReal,
    imagen
  ) {
    try {
      return await this.productErrorsDAO.updateProductError(
        fecha,
        observaciones,
        codigoInt,
        codOEM,
        descripcion,
        stock,
        detalle,
        stockReal,
        imagen
      );
    } catch (error) {
      throw new Error("Error en el servicio");
    }
  }
}
