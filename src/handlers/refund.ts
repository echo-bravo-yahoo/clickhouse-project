import { isPostRefundRequest } from "./refund.types.js";
import type { PostRefundHandler } from "./refund.types.js";

// import { db } from "../db.js";

export const postRefund: PostRefundHandler = async (req, res) => {
  if (!isPostRefundRequest(req)) throw new Error(`Invalid input.`);

  const refund = {};
  // db.update(({ purchases }) => purchases.push(purchase));
  res.json({ balance: 0 });
};
