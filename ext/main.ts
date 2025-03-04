import express from "express";
import bodyParser from "body-parser";

import { db } from "./db.js";
import { getCustomer } from "./handlers/customers.js";
import { getProduct } from "./handlers/products.js";
import { postShipment } from "./handlers/shipments.js";
import { backend } from "./config/config.js";

const app = express();
const port = backend.port;

// parse application/json
app.use(bodyParser.json());

app.get("/customers/:customerId", getCustomer);
app.get("/products/:productId", getProduct);
app.post("/shipments", postShipment);

await db.read();

app.listen(port, () => {
  console.log(
    `Backend server stub listening on port ${port} with initial data:\n${JSON.stringify(db.data, null, 2)}`
  );
});
