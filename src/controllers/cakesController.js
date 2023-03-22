import db from "../database/db.js";
import { handleInternalServerError } from "../middlewares/middlewares.js";

async function createCake(req, res) {
  try {
    const { name, price, description, image } = req.body;

    const cake = {
      name,
      price,
      image,
      description,
    };

    const result = await db.query(
      `INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)`,
      [name,
        price,
        image,
        description,]
    );

    res.status(201).send();
  } catch (error) {
    handleInternalServerError(error, res);
  }
}

export default createCake;
