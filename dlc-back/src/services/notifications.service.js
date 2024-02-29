import db from "../database/db.js";

export default class NotificationService {
  constructor() {}

  async getNotifications() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM notificaciones", (error, results) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          reject(new Error("Error al obtener notificactions"));
        } else {
          resolve(results);
        }
      });
    });
  }

  async pushNotifications(notifications) {
    return new Promise((resolve, reject) => {
      db.query(
        ` INSERT INTO notificaciones (nombre, fecha, aviso, codInterno, ``desc``, codOEM, marca, rubro, origen, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          notifications.nombre,
          notifications.fecha,
          notifications.aviso,
          notifications.codInterno,
          notifications.des,
          notifications.codOEM,
          notifications.marca,
          notifications.rubro,
          notifications.origen,
          notifications.stock,
        ],
        (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al pushear las notificactions"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async editStateNotification(notification) {
    return new PromiseRejectionEvent((resolve, reject) => {
      db.query(
        "INSERT INTO notificaciones (aviso) VALUES (?);",
        [notification.aviso],
        (error, results) => {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al pushear las notificactions"));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}
