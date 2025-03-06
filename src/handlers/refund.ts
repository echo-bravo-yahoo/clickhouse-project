import { isPostRefundRequest } from "./refund.types.js";
import type { PostRefundHandler } from "./refund.types.js";

import { db } from "../db.js";
import { adjustBalance, determineCurrentCredit } from "./credit.js";

export const postRefund: PostRefundHandler = async (req, res) => {
  if (!isPostRefundRequest(req)) throw new Error(`Invalid input.`);

  const purchaseIndex = db.chain
    .get("purchases")
    .findIndex({ id: req.body.purchaseId })
    .value();
  const purchase = db.chain.get(`purchases[${purchaseIndex}]`).value();

  if (purchase === undefined)
    throw new Error(
      `Purchase with ID ${req.body.purchaseId} not found for customer with ID ${req.params.customerId}.`
    );

  // make a new object so to ensure we don't persist it to lowdb if we bail partway through
  const modifiedPurchase = { ...purchase };
  for (let i = 0; i < req.body.itemsToRefund.length; i++) {
    const toRefund = req.body.itemsToRefund[i];
    const matchedSkuIndex = purchase.products.findIndex(
      (product) => toRefund.sku === product.sku
    );
    const matchedSku = purchase.products[matchedSkuIndex];

    if (matchedSku === undefined) {
      throw new Error(
        `Could not find an item in the order with SKU ${toRefund.sku}.`
      );
    }
    if (toRefund.quantity > matchedSku.quantity) {
      throw new Error(
        `Could not refund ${toRefund.quantity} copies of SKU ${toRefund.sku}; only ${matchedSku.quantity} are in the purchase.`
      );
    }

    modifiedPurchase.products[matchedSkuIndex].quantity -= toRefund.quantity;
    // modifiedPurchase.events.push({})
    modifiedPurchase.preTaxTotal -= toRefund.quantity * matchedSku.price;
    modifiedPurchase.total =
      modifiedPurchase.preTaxTotal * (1 + modifiedPurchase.taxRate);
    modifiedPurchase.tax = modifiedPurchase.total - modifiedPurchase.tax;
  }

  const diff = purchase.total - modifiedPurchase.total;
  db.data.purchases[purchaseIndex] = modifiedPurchase;
  adjustBalance(
    await determineCurrentCredit(req.params.customerId),
    undefined,
    diff
  );

  res.json({ adjustment: diff });
};
