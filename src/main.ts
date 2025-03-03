import express from "express";

import { getCredit, postCredit, putCredit } from "./handlers/credit.js";
import { getPurchases, postPurchases } from "./handlers/purchases.js";
import { postRefund } from "./handlers/refund.js";

const app = express();
const port = 3000;

app.get("/credit", getCredit);
app.post("/credit", postCredit);
app.put("/credit", putCredit);

app.post("/purchases", postPurchases);
app.get("/purchases", getPurchases);

app.post("/refund", postRefund);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
