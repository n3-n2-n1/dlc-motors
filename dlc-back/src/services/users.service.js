import jwt from "jsonwebtoken";

import db from "../database/db.js";

import { isValidPassword } from "../utils/bcrypt.js";

const secretKey = "12233"; // Debes cambiar esto y utilizar una clave segura

export default class UserService {
  constructor() {}

  // Función para generar un token de sesión (deberías implementar esta función)
  generateSessionToken(userId) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
    return token;
  }

  // Función para comparar contraseñas
  passwordValidate(user, password) {
    return isValidPassword(user, password);
  }

  async getUsers() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuarios", (error, results) => {
        if (error) {
          console.error("Error al obtener los usuarios", error);
          reject(new Error("Error al obtener los usuarios."));
        } else {
          resolve(results);
        }
      });
    });
  }

  async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuarios WHERE Email = ?",
        [email],
        (err, results) => {
          if (err) {
            console.error(err.message);
            reject(new Error(`Error al obtener el usuario ${email}.`));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async registerUser(newUser) {
    // Verificar que el usuario no exista
    // const result = await this.getUserByEmail(newUser.email);
    // if (result.length > 0) {
    //     throw new Error(`El usuario ${newUser.email} ya existe.`);
    // }
    console.log(newUser);
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usuarios (name, password, role) VALUES (?, ?, ?)",
        [newUser.name, newUser.password, newUser.role],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al crear el usuario"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async createDelivery() {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO delivery (fecha, observacion, numImpo, cantidad, codInt, descripcion, oem, productos, stockDeposito, stockAcumulados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [historialData.accion, historialData.descripcion, historialData.fecha],
        (error, results) => {
          if (error) {
            reject(new Error("Error al crear los pedidos/delivery"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}
