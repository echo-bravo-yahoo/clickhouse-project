import type { Response, Request } from "express";
import type { ExternalPurchase } from "../db.js";
import type {
  ProductPurchase as BackendProductPurchase,
  Product as BackendProduct,
} from "../sdk/ext.types.js";

type GetPurchasesRequestBody = undefined;
export type GetPurchasesResponseBody = ExternalPurchase[];
type GetPurchasesResponse = Response<GetPurchasesResponseBody, object>;
type GetPurchasesRequest = Request<
  { customerId: string },
  GetPurchasesResponseBody,
  GetPurchasesRequestBody,
  Record<string, never>,
  object
>;

export interface GetPurchasesHandler {
  (req: GetPurchasesRequest, res: GetPurchasesResponse): Promise<void>;
}

export function isGetPurchasesRequest(
  req: Request
): req is GetPurchasesRequest {
  return req && req.params && typeof req.params.customerId === "string";
}

export type RichPurchaseProduct = Exclude<
  PurchaseProduct & BackendProductPurchase & BackendProduct,
  "id"
>;

interface PurchaseProduct {
  id: string;
  quantity: number;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface PostPurchasesRequestBody {
  products: PurchaseProduct[];
  // used to 400 requests when a SKU price has changed during order
  expectedPreTaxTotal?: number;
  shippingAddress: Address;
}
export type PostPurchasesResponseBody = ExternalPurchase;
type PostPurchasesResponse = Response<PostPurchasesResponseBody, object>;
type PostPurchasesRequest = Request<
  { customerId: string },
  PostPurchasesResponseBody,
  PostPurchasesRequestBody,
  Record<string, never>,
  object
>;

export interface PostPurchasesHandler {
  (req: PostPurchasesRequest, res: PostPurchasesResponse): Promise<void>;
}

export function isPostPurchasesRequest(
  req: Request
): req is PostPurchasesRequest {
  return (
    req &&
    req.body &&
    (typeof req.body.expectedPreTaxTotal === "number" ||
      req.body.expectedPreTaxTotal === undefined) &&
    // TODO: should use a typeguard instead of just checking for length
    req.body.products.length &&
    req.body.shippingAddress &&
    typeof req.body.shippingAddress.line1 === "string" &&
    typeof req.body.shippingAddress.line2 === "string" &&
    typeof req.body.shippingAddress.city === "string" &&
    typeof req.body.shippingAddress.postalCode === "string" &&
    typeof req.body.shippingAddress.state === "string" &&
    typeof req.body.shippingAddress.country === "string" &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}
