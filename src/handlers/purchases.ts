import { v7 as uuid } from "uuid";

import { InternalPurchases, db } from "../db.js";

import type {
  GetPurchasesHandler,
  PostPurchasesHandler,
} from "./purchases.types.js";
import {
  isGetPurchasesRequest,
  isPostPurchasesRequest,
} from "./purchases.types.js";

export const getPurchases: GetPurchasesHandler = async (req, res) => {
  if (!isGetPurchasesRequest(req)) throw new Error(`Invalid input.`);

  const purchases = db.chain
    .get("purchases")
    .find({ customerId: req.params.customerId })
    .value();

  if (purchases === undefined)
    throw new Error(`Purchase history not found for user.`);

  res.json(purchases);
};

export const postPurchases: PostPurchasesHandler = async (req, res) => {
  if (!isPostPurchasesRequest(req)) throw new Error(`Invalid input.`);

  const purchase: InternalPurchases = {
    id: uuid(),
    customerId: req.params.customerId,
    total: 0,
    products: [],
    shipment: {},
    tax: 0,
    events: [],
    timestamp: Date.now(),
  };
  db.update(({ purchases }) => purchases.push(purchase));

  res.status(200).send();
};
