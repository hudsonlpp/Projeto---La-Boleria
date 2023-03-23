import db from "../database/db.js";
import { handleInternalServerError } from "../middlewares/middlewares.js";
import dayjs from 'dayjs';

export async function createOrder(req, res) {  
    try {
        const {
            clientId,
            cakeId,
            quantity,
            totalPrice
          } = req.body;
        
    //   const createdClient = await db.query(`
    //     SELECT id FROM clients WHERE "id" = $1
    //   `, [clientId]);
    //   if (createdClient.rows.length <= 0) return res.sendStatus(404);
  
    //   const createdCake = await db.query(`
    //     SELECT id FROM cakes WHERE "id" = $1
    //   `, [cakeId]);
    //   if (createdCake.rows.length <= 0) return res.sendStatus(404);
  
      const createdAt = dayjs().format();
  
      await db.query(`INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`, [clientId, cakeId, quantity, totalPrice, createdAt]);
  
      return res.sendStatus(201);
    } catch (error) {
        handleInternalServerError(error, res);
    }
  }