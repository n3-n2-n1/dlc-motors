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
  
}
