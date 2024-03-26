import { ReturnsDAO } from "../dao/returns.dao.js";

export default class ReturnsService {
    constructor(){
        this.ReturnsDAO = new ReturnsDAO();
    }

    async getReturns() {
        try {
          return await this.ReturnsDAO.getReturns();
        } catch (error) {
          throw new Error("Error en el servicio:" + error.message);
        }
      }

    async createReturn() {
        try {
          return await this.ReturnsDAO.createReturn();
        } catch (error) {
          throw new Error("Error en el servicio:" + error.message);
        }
      }
      
      async deleteReturn() {
        try {
          return await this.ReturnsDAO.deleteReturn();
        } catch (error) {
          throw new Error("Error en el servicio:" + error.message);
        }
      }
}