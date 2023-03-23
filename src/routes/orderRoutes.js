import { Router } from 'express';
import { createOrder, getOrder, getOrderById } from '../controllers/orderControllers.js';
import { validateOrder } from '../middlewares/middlewares.js';

const orderRouter = Router();

orderRouter.post("/order", validateOrder, createOrder);
orderRouter.get("/order", getOrder);
orderRouter.get("/orders/:id", getOrderById);

export default orderRouter;