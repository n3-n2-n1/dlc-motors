import db from "../database/db.js";

export default class CategoryService {
  async getCategories() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM categorias", (error, results) => {
        if (error) {
          console.error("Error al obtener categorias");
          reject(new Error("Error al obtener categorias"));
        } else {
          resolve(results);
        }
      });
    });
  }

  async updateCategories(categories) {
    return new Promise((resolve, reject) => {
      const category = Object.values(categories).join(', ');
      db.query(
        "UPDATE categorias SET categorias = ?",
        [category],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async deleteCategories(categories) {
    return new Promise((resolve, reject) => {
      const category = Object.values(categories).join(', ');
      db.query(
        "DELETE categorias WHERE categorias = ?",
        [category],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al editar el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }


  
}
