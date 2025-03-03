import type { GetProductHandler } from "./products.types.js";

import { db } from "../db.js";
import { isGetProductRequest } from "./products.types.js";

export const getProduct: GetProductHandler = (req, res) => {
  if (!isGetProductRequest(req)) throw new Error(`Invalid input.`);

  const product = db.chain
    .get("products")
    .find({ id: req.params.productId })
    .value();

  if (product === undefined) throw new Error(`Product not found.`);

  res.json(product);
};
