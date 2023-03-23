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

export async function getClientsOrdersById(req, res) {
    try {
      const { id } = req.params;
  
      const query = `
        SELECT 
          orders.id AS "orderId",
          orders.quantity,
          TO_CHAR(orders."createdAt", 'YYYY-MM-DD') AS "createdAt",
          orders."totalPrice" AS "totalPrice",
          cakes.name AS "cakeName"
        FROM orders
        JOIN cakes ON orders."cakeId" = cakes.id
        WHERE orders."clientId" = $1
      `;
  
      const { rows: clients } = await db.query(query, [id]);
  
      if (!clients.length) {
        return res.sendStatus(404);
      }
  
      return res.status(200).send(clients);
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
    }
  }
  

export default createClient;
