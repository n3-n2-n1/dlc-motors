import {CostDAO} from "../dao/costs.dao.js";

export default class CostsService {
  constructor() {
    this.costDAO = new CostDAO();
  }

  async getCosts() {
    try {
      return await this.costDAO.getCosts();
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }

  async updateCosts(id, proveedores) {
    try {
      console.log("id", id)
      console.log("proveedores", proveedores)


      return await this.costDAO.updateCost(proveedores, id);
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }

  async createCosts(
    descripcion,
    codigo,
    marca,
    stock,
    proveedores,
    rubro,
    sku
    ){
    try{
      return await this.costDAO.createCosts(
        descripcion,
        codigo,
        marca,
        stock,
        proveedores,
        rubro,
        sku
        );
    } catch(error){
      throw new Error("Error en el servicio" + error.message)
    }
  }

  
}
