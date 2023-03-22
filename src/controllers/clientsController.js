import db from "../database/db.js";
import { handleInternalServerError } from "../middlewares/middlewares.js";


async function createClient(req, res) {
    // Extrai os valores do corpo da requisição
    const { name, address, phone } = req.body;

    // Executa a query para inserir o cliente no banco de dados
    try {
        await db.query(`
            INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3) 
        `, [name, address, phone]);
        res.sendStatus(201);
    } catch (error) {
        // Chama o middleware para tratar erros internos do servidor
        handleInternalServerError(error, res);
    }
}

export default createClient;
