import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cakesRouter from "./routes/cakeRoutes.js";
import clientsRouter from "./routes/clientRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([cakesRouter, clientsRouter, orderRouter])

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})