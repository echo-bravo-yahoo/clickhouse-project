import express from "express";
import bodyParser from "body-parser";

import { db } from "./db.js";
import { getCustomer } from "./handlers/customers.js";
import { getProduct } from "./handlers/products.js";
import { postShipment } from "./handlers/shipments.js";
import { backend, databaseFilePath, frontend } from "./config/config.js";
import { errorHandler } from "./errorHandling.js";

const app = express();
const port = backend.port;

// parse application/json
app.use(bodyParser.json());

app.get("/customers/:customerId", getCustomer);
app.get("/products/:productId", getProduct);
app.post("/shipments", postShipment);

app.use(errorHandler);

const fs = await import("node:fs");
const path = await import("node:path");
fs.mkdirSync(path.dirname(databaseFilePath), { recursive: true });
await db.read();

const server = app.listen(port, () => {
  console.log(
    `Backend server stub listening on port ${port} with initial data:\n${JSON.stringify(db.data, null, 2)}`
  );
});

let running = true;
process.on("SIGTERM", () => cleanup("SIGTERM"));
process.on("SIGINT", () => cleanup("SIGINT"));
process.on("SIGQUIT", () => cleanup("SIGQUIT"));

function cleanup(signal: string) {
  if (!running) {
    return;
  } else {
    running = false;
  }

  console.log(`${signal} signal received. Now refusing new connections.`);
  server.close(async () => {
    console.log("All server connections closed.");
    await db.write();
    console.log("Database writes flushed.");
    console.log("Server shut down. Goodbye.");
    process.exit(0);
  });
}
