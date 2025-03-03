import * as expressModule from "express";
const { default: express } = expressModule;

import { getCredit, postCredit, putCredit } from "./handlers/credit";
import { getPurchases, postPurchases } from "./handlers/purchases";
import { postRefund } from "./handlers/refund";

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
