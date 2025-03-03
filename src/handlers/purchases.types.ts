import type { Response, Request } from "express";
import type { ExternalPurchase } from "../db.js";

type GetPurchasesRequestBody = undefined;
interface GetPurchasesResponseBody extends ExternalPurchase {}
interface GetPurchasesResponse extends Response<GetPurchasesResponseBody, {}> {}
interface GetPurchasesRequest
  extends Request<
    { customerId: string },
    GetPurchasesResponseBody,
    GetPurchasesRequestBody,
    {},
    {}
  > {}

export interface GetPurchasesHandler {
  (req: GetPurchasesRequest, res: GetPurchasesResponse): Promise<void>;
}

export function isGetPurchasesRequest(
  req: Request<any>
): req is GetPurchasesRequest {
  return req && req.params && typeof req.params.customerId === "string";
}

type PostPurchasesRequestBody = undefined;
type PostPurchasesResponseBody = undefined;
interface PostPurchasesResponse
  extends Response<PostPurchasesResponseBody, {}> {}
interface PostPurchasesRequest
  extends Request<
    { customerId: string },
    PostPurchasesResponseBody,
    PostPurchasesRequestBody,
    {},
    {}
  > {}

export interface PostPurchasesHandler {
  (req: PostPurchasesRequest, res: PostPurchasesResponse): Promise<void>;
}

export function isPostPurchasesRequest(
  req: Request<any>
): req is PostPurchasesRequest {
  return (
    req &&
    req.body &&
    typeof req.body.adjustment === "number" &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}
