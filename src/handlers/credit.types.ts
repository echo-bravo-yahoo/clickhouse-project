import type { Response, Request } from "express";

// shared
export interface CreditResponseBody {
  balance: number;
}

// GET /customers/:customerId/credit
type GetCreditRequestBody = undefined;
interface GetCreditResponse extends Response<CreditResponseBody, {}> {}
interface GetCreditRequest
  extends Request<
    { customerId: string },
    CreditResponseBody,
    GetCreditRequestBody,
    {},
    {}
  > {}
export interface GetCreditHandler {
  (req: GetCreditRequest, res: GetCreditResponse): Promise<void>;
}
export function isGetCreditRequest(req: Request<any>): req is GetCreditRequest {
  return req && req.params && typeof req.params.customerId === "string";
}

// POST /customers/:customerId/credit
interface PostCreditRequestBody {
  adjustment: number;
}
interface PostCreditResponse extends Response<CreditResponseBody, {}> {}
interface PostCreditRequest
  extends Request<
    { customerId: string },
    CreditResponseBody,
    PostCreditRequestBody,
    {},
    {}
  > {}
export interface PostCreditHandler {
  (req: PostCreditRequest, res: PostCreditResponse): Promise<void>;
}
export function isPostCreditRequest(
  req: Request<any>
): req is PostCreditRequest {
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
interface PutCreditResponse extends Response<CreditResponseBody, {}> {}
interface PutCreditRequest
  extends Request<
    { customerId: string },
    CreditResponseBody,
    PutCreditRequestBody,
    {},
    {}
  > {}
export interface PutCreditHandler {
  (req: PutCreditRequest, res: PutCreditResponse): Promise<void>;
}
export function isPutCreditRequest(req: Request<any>): req is PutCreditRequest {
  return (
    req &&
    req.body &&
    typeof req.body.balance === "number" &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}
