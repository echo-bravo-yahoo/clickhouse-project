import * as expressModule from "express";
const { default: express } = expressModule;
import * as bodyParserModule from "body-parser";
const { default: bodyParser } = bodyParserModule;

import { db } from "./db.js";
import { getCustomer } from "./handlers/customers.js";
import { getProduct } from "./handlers/products.js";
import { postShipment } from "./handlers/shipments.js";

const app = express();
const port = 3001;

// parse application/json
app.use(bodyParser.json());

app.get("/customers/:customerId", getCustomer);
app.get("/products/:productId", getProduct);
app.post("/shipments", postShipment);

await db.read();

app.listen(port, () => {
  console.log(
    `External API stub listening on port ${port} with initial data:\n${JSON.stringify(db.data, null, 2)}`
  );
});
