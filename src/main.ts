import express from "express";
import bodyParser from "body-parser";

import { getCredit, postCredit, putCredit } from "./handlers/credit.js";
import { getPurchases, postPurchases } from "./handlers/purchases.js";
import { postRefund } from "./handlers/refund.js";

const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.json());

// TODO: these don't break the build if a path param is missing
app.get("/credit", getCredit);
app.post("/credit", postCredit);
app.put("/credit", putCredit);

app.post("/purchases", postPurchases);
app.get("/purchases", getPurchases);

app.post("/refund", postRefund);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
