import express from "express";
import bodyParser from "body-parser";

import { db } from "./db.js";
import { getCredit, postCredit, putCredit } from "./handlers/credit.js";
import { getPurchases, postPurchases } from "./handlers/purchases.js";
import { postRefund } from "./handlers/refund.js";
import { databaseFilePath, frontend } from "./config/config.js";
import { errorHandler } from "./errorHandling.js";

const app = express();
const port = frontend.port;

// parse application/json
app.use(bodyParser.json());

// TODO: these don't break the build if a path param is missing
app.get("/customers/:customerId/credit", getCredit);
app.post("/customers/:customerId/credit", postCredit);
app.put("/customers/:customerId/credit", putCredit);

app.post("/customers/:customerId/purchases", postPurchases);
app.get("/customers/:customerId/purchases", getPurchases);

app.post("/customers/:customerId/refund", postRefund);

app.use(errorHandler);

await db.read();

const server = app.listen(port, () => {
  console.log(
    `Frontend server listening on port ${port} with initial data:\n${JSON.stringify(db.data, null, 2)}`
  );
});

let running = true;
process.on("SIGTERM", () => cleanup("SIGTERM"));
process.on("SIGINT", () => cleanup("SIGINT"));
process.on("SIGINT", () => console.log(null, "lol"));
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
    const fs = await import("node:fs");
    const path = await import("node:path");
    fs.mkdirSync(path.dirname(databaseFilePath), { recursive: true });
    await db.write();
    console.log("Database writes flushed.");
    console.log("Server shut down. Goodbye.");
    process.exit(0);
  });
}
