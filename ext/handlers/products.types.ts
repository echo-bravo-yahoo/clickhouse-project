import type { Response, Request } from "express";
import type { Product } from "../db.js";

type GetProductRequestBody = undefined;
type GetProductResponseBody = Product;
type GetProductResponse = Response<GetProductResponseBody, object>;
type GetProductRequest = Request<
  { productId: string },
  GetProductResponseBody,
  GetProductRequestBody,
  Record<string, never>,
  object
>;

export interface GetProductHandler {
  (req: GetProductRequest, res: GetProductResponse): void;
}

export function isGetProductRequest(req: Request): req is GetProductRequest {
  return req && req.params && typeof req.params.productId === "string";
}
