import jwt from "jsonwebtoken";
import db from "../database/db.js";
import config from "../config/config.js";

import UserDTO from "../dao/dtos/user.dto.js";

import { isValidPassword, createHash } from "../utils/bcrypt.js";

const {
  jwt: { JWT_SECRET },
} = config;

export default class UserService {
  constructor() {}

  

  // Funcion para decodificar el JWT
  async decodeUser(token) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      });
      return decodedToken;
    } catch (error) {
      throw error;
    }
  }

  // Función para loguear al usuario generando un JWT
  loginUser(user) {
    try {
      const userDTO = new UserDTO(user);
      const jwtUser = JSON.parse(JSON.stringify(userDTO));

      const token = jwt.sign(jwtUser, JWT_SECRET, {
        expiresIn: "7d",
      });
      if (!token) throw new Error("Error al generar token de autenticación");

      return token;
    } catch (error) {
      throw error;
    }
  }

  // Función para comparar contraseñas y ver si la ingresada es correcta
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
          const usersDTO = results.map((user) => {
            const userDTO = new UserDTO(user);
            return JSON.parse(JSON.stringify(userDTO));
          });

          resolve(usersDTO);
        }
      });
    });
  }

  async getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuarios WHERE username = ?",
        [username],
        (err, results) => {
          if (err) {
            console.error(err);
            reject(new Error(`Error al obtener el usuario ${username}.`));
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }

  async registerUser(newUser) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usuarios (name, password, role, username) VALUES (?, ?, ?, ?)",
        [newUser.name, newUser.password, newUser.role, newUser.username],
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

  async editUser(userToUpdate) {
    userToUpdate.password = createHash(userToUpdate.password);

    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE usuarios
        SET 
          password = ?,
          role = ?,
          name = ?
        WHERE username = ?;`,
        [
          userToUpdate.password,
          userToUpdate.role,
          userToUpdate.name,
          userToUpdate.username,
        ],
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

  async deleteUser(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM usuarios WHERE username = ?",
        [username],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(new Error("Error al eliminar el usuario"));
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  }
}
