import express from "express";
import createClient, { getClientsOrdersById } from "../controllers/clientsController.js";
import { validateClient } from "../middlewares/middlewares.js";

const clientsRouter = express.Router();

clientsRouter.post("/clients", validateClient, createClient);
clientsRouter.get("/clients/:id/orders", getClientsOrdersById);

export default clientsRouter;