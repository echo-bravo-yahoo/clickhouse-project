import type { Response, Request } from "express";
import type { Product } from "../db.js";

import _ from "lodash";

import { db } from "../db.js";

interface GetProductRequestBody {}
interface GetProductResponseBody extends Product {}
interface GetProductResponse extends Response<GetProductResponseBody, {}> {}
interface GetProductRequest
  extends Request<
    { id: string },
    GetProductResponseBody,
    GetProductRequestBody,
    {},
    {}
  > {}
interface GetProductHandler {
  (req: GetProductRequest, res: GetProductResponse): void;
}

function isGetProductRequest(req: Request<any>): req is GetProductRequest {
  return (
    req &&
    req.params &&
    req.params.id !== undefined &&
    typeof req.params.id === "string"
  );
}

export const getProduct: GetProductHandler = (req, res) => {
  if (!isGetProductRequest(req)) throw new Error(`Invalid input.`);

  const product = db.chain.get("products").find({ id: req.params.id }).value();

  if (product === undefined) throw new Error(`Product not found.`);

  res.json(product);
};
