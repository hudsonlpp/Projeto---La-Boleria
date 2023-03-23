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
        
      const createdClient = await db.query(`
        SELECT id FROM clients WHERE "id" = $1
      `, [clientId]);
      if (createdClient.rows.length <= 0) return res.sendStatus(404);
  
      const createdCake = await db.query(`
        SELECT id FROM cakes WHERE "id" = $1
      `, [cakeId]);
      if (createdCake.rows.length <= 0) return res.sendStatus(404);
  
      const createdAt = dayjs().format();
  
      await db.query(`INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`, [clientId, cakeId, quantity, totalPrice, createdAt]);
  
      return res.sendStatus(201);
    } catch (error) {
        handleInternalServerError(error, res);
    }
  }

  export async function getOrder(req, res) {
    try {
      const query = `
      SELECT 
      JSON_BUILD_OBJECT (
          'id', clients.id,
          'name', clients.name,
          'address', clients.address,
          'phone', clients.phone
      ) AS client,
      JSON_BUILD_OBJECT(
          'id', cakes.id,
          'name', cakes.name,
          'price', cakes.price,
          'description', cakes.description,
          'image', cakes.image
      ) AS cake,
      orders.id AS orderId,
      TO_CHAR(orders."createdAt", 'YYYY-MM-DD') AS createdAt,
      orders.quantity AS quantity,
      orders."totalPrice" AS totalPrice
      FROM clients
      JOIN orders ON orders."clientId" = clients.id
      JOIN cakes ON cakes.id = orders."cakeId";
      `;
      
      const { rows: orders } = await db.query(query);
      
      if (orders.length === 0) {
        return res.sendStatus(404);
      }
      
      res.status(200).send(orders);
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  }

  export async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const query = `
        SELECT
            JSON_BUILD_OBJECT(
                'client', JSON_BUILD_OBJECT(
                'id', clients.id,
                'name', clients.name,
                'address', clients.address,
                'phone', clients.phone
                ),
                'cake', JSON_BUILD_OBJECT(
                'id', cakes.id,
                'name', cakes.name,
                'price', cakes.price,
                'description', cakes.description,
                'image', cakes.image
                ),
                'orderId', orders.id,
                'createdAt', TO_CHAR(orders."createdAt", 'YYYY-MM-DD'),
                'quantity', orders.quantity,
                'totalPrice', orders."totalPrice"
            ) AS result
            FROM orders
            JOIN clients ON orders."clientId" = clients.id
            JOIN cakes ON orders."cakeId" = cakes.id
            WHERE orders.id = $1
        ;`;
    
    const { rows: orders } = await db.query(query, [id]);
    
    if (orders.length === 0) {
      return res.sendStatus(404);
    }
    
    res.status(200).send(orders[0].result);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

  