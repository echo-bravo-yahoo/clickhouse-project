import type { Response, Request } from "express";
import type {
  PostShipmentRequestBody,
  PostShipmentResponseBody,
} from "../../src/sdk.types";

type PostShipmentResponse = Response<PostShipmentResponseBody, object>;
type PostShipmentRequest = Request<
  Record<string, never>,
  PostShipmentResponseBody,
  PostShipmentRequestBody,
  Record<string, never>,
  object
>;

export interface PostShipmentHandler {
  (req: PostShipmentRequest, res: PostShipmentResponse): void;
}

function isProduct(
  maybeProduct: any // eslint-disable-line @typescript-eslint/no-explicit-any
): maybeProduct is { sku: string; quantity: number } {
  return (
    maybeProduct &&
    maybeProduct.sku &&
    typeof maybeProduct.sku === "string" &&
    maybeProduct.quantity &&
    typeof maybeProduct.quantity === "number"
  );
}

export function isPostShipmentRequest(
  req: Request
): req is PostShipmentRequest {
  return (
    req &&
    req.body &&
    req.body.shippingAddress &&
    typeof req.body.shippingAddress.line1 === "string" &&
    typeof req.body.shippingAddress.line2 === "string" &&
    typeof req.body.shippingAddress.city === "string" &&
    typeof req.body.shippingAddress.postalCode === "string" &&
    typeof req.body.shippingAddress.state === "string" &&
    typeof req.body.shippingAddress.country === "string" &&
    req.body.products.every &&
    req.body.products.every(isProduct)
  );
}
