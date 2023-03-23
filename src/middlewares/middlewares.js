import db from "../database/db.js";
import cakeSchema from "../schemas/cakeSchema.js";
import clientSchema from "../schemas/clientSchema.js";
import orderSchema from "../schemas/orderSchema.js";


function handleInternalServerError(error, res) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}

async function validateCake(req, res, next) {
  const { error } = cakeSchema.validate(req.body);
  const { name } = req.body;

  const existingCakeSQL = `
    SELECT id FROM cakes WHERE name=$1
  `;

  const { rowCount: existingCakeCount } = await db.query(existingCakeSQL, [name]);

  if (existingCakeCount > 0) {
    return res.status(409).send("Já existe um bolo com esse nome.");
  }

  if (error) {
    const isImageError = error.details.some((detail) => detail.path[0] === "image");

    return res.status(isImageError ? 422 : 400).send(error);
  }

  return next();
}

async function validateClient(req, res, next) {
  const { error } = clientSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  return next();
}

async function validateOrder(req, res, next) {
  try {
    const { clientId, cakeId } = req.body;
    const existingClient = await db.query('SELECT id FROM clients WHERE id = $1', [clientId]);
    const existingCake = await db.query('SELECT id FROM cakes WHERE id = $1', [cakeId]);

    if (existingClient.rows.length === 0) {
      return res.status(404).send('Não existe um cliente com esse id.');
    }

    if (existingCake.rows.length === 0) {
      return res.status(404).send('Não existe um bolo com esse id.');
    }

    const { error } = orderSchema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).send(error);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocorreu um erro ao validar a ordem.');
  }
}


export { handleInternalServerError, validateCake, validateClient, validateOrder };
