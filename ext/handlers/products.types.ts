import type { Response, Request } from "express";
import type { Product } from "../db.js";

type GetProductRequestBody = undefined;
interface GetProductResponseBody extends Product {}
interface GetProductResponse extends Response<GetProductResponseBody, {}> {}
interface GetProductRequest
  extends Request<
    { productId: string },
    GetProductResponseBody,
    GetProductRequestBody,
    {},
    {}
  > {}

export interface GetProductHandler {
  (req: GetProductRequest, res: GetProductResponse): void;
}

export function isGetProductRequest(
  req: Request<any>
): req is GetProductRequest {
  return req && req.params && typeof req.params.productId === "string";
}
