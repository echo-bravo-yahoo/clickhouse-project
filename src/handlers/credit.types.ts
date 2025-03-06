import type { Response, Request } from "express";

// shared
export interface CreditResponseBody {
  balance: number;
}

// GET /customers/:customerId/credit
type GetCreditRequestBody = undefined;
type GetCreditResponse = Response<CreditResponseBody, object>;
type GetCreditRequest = Request<
  { customerId: string },
  CreditResponseBody,
  GetCreditRequestBody,
  Record<string, never>,
  object
>;
export interface GetCreditHandler {
  (req: GetCreditRequest, res: GetCreditResponse): Promise<void>;
}
export function isGetCreditRequest(req: Request): req is GetCreditRequest {
  return req && req.params && typeof req.params.customerId === "string";
}

// POST /customers/:customerId/credit
interface PostCreditRequestBody {
  adjustment: number;
}
type PostCreditResponse = Response<CreditResponseBody, object>;
type PostCreditRequest = Request<
  { customerId: string },
  CreditResponseBody,
  PostCreditRequestBody,
  Record<string, never>,
  object
>;
export interface PostCreditHandler {
  (req: PostCreditRequest, res: PostCreditResponse): Promise<void>;
}
export function isPostCreditRequest(req: Request): req is PostCreditRequest {
  return (
    req &&
    req.body &&
    typeof req.body.adjustment === "number" &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}

// PUT /customers/:customerId/credit
interface PutCreditRequestBody {
  balance: number;
}
type PutCreditResponse = Response<CreditResponseBody, object>;
type PutCreditRequest = Request<
  { customerId: string },
  CreditResponseBody,
  PutCreditRequestBody,
  Record<string, never>,
  object
>;
export interface PutCreditHandler {
  (req: PutCreditRequest, res: PutCreditResponse): Promise<void>;
}
export function isPutCreditRequest(req: Request): req is PutCreditRequest {
  return (
    req &&
    req.body &&
    typeof req.body.balance === "number" &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}
