import express from "express";
import createCake from "../controllers/cakesController.js";
import { validateCake } from "../middlewares/middlewares.js";

const cakesRouter = express.Router();

cakesRouter.post("/cakes", validateCake, createCake);

export default cakesRouter;