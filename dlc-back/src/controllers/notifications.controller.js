import { notificationsService } from "../services/services.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationsService.getNotifications();

    if (!notifications || notifications.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No notif found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: notifications,
    });
  } catch (error) {
    onsole.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get notifications",
    });
  }
};

export const pushNotifications = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "Notifications registered" });
  } catch (error) {
    return res
      .status(500)
      .send({
        status: "error",
        error: `Failed to register notifications: ${error}`,
      });
  }
};

export const editNotification = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "Notification state edited" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "Fallo al editar la notificacion" });
  }
};
