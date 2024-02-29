import { Router } from "express";
import passport from "passport";
import { verifyRole } from "../middlewares/auth.js";
import {
  pushNotifications,
  getNotifications,
  editNotification,
} from "../controllers/notifications.controller.js";

const notificationsRouter = Router();

notificationsRouter.get("/", (req, res) => {
  getNotifications(req, res);
});

notificationsRouter.post("/:notification", (req, res) => {
  editNotification(req, res);
});

notificationsRouter.post("/uploadNotifications", (req, res) => {
  pushNotifications(req, res);
});

export default notificationsRouter;
