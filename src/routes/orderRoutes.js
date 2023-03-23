import { Router } from 'express';
import { createOrder } from '../controllers/orderControllers.js';
import { validateOrder } from '../middlewares/middlewares.js';

const orderRouter = Router();

orderRouter.post("/order", validateOrder, createOrder);
// orderRouter.get("/order", getOrder);
// orderRouter.get("/order/:id", getOrderById);

export default orderRouter;