import ProductService from "./products.service.js";
import HistoryService from "./history.service.js";
import DeliveryService from "./delivery.service.js";
import CostsService from "./costs.service.js";
import MassiveAddService from "./massiveAdd.service.js";
import UserService from "./users.service.js";
import ErrorService from "./productErrors.service.js";
import NotificationService from "./notifications.service.js";
import MovementService from "./movements.service.js";

export const productService = new ProductService();
export const historyService = new HistoryService();
export const deliveryService = new DeliveryService();
export const costsService = new CostsService();
export const massiveAddService = new MassiveAddService();
export const userService = new UserService();
export const errorService = new ErrorService();
export const notificationsService = new NotificationService();
export const movementService = new MovementService();