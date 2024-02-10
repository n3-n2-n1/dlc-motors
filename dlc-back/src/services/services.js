import ProductService from "./products.service.js";
import HistoryService from "./history.service.js";
import DeliveryService from "./delivery.service.js";
import CostsService from "./costs.service.js";
import MassiveAddService from "./massiveAdd.service.js";

export const productService = new ProductService();
export const historyService = new HistoryService();
export const deliveryService = new DeliveryService();
export const costsService = new CostsService();
export const massiveAddService = new MassiveAddService();