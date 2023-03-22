import express from "express";
import createClient from "../controllers/clientsController.js";
import { validateClient } from "../middlewares/middlewares.js";

const clientsRouter = express.Router();

clientsRouter.post("/clients", validateClient, createClient);

export default clientsRouter;