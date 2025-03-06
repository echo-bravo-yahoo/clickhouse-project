import type { Response, Request } from "express";
import type { Customer } from "../db.js";

type GetCustomerRequestBody = undefined;
type GetCustomerResponseBody = Customer;
type GetCustomerResponse = Response<GetCustomerResponseBody, object>;
type GetCustomerRequest = Request<
  { customerId: string },
  GetCustomerResponseBody,
  GetCustomerRequestBody,
  Record<string, never>,
  object
>;
export interface GetCustomerHandler {
  (req: GetCustomerRequest, res: GetCustomerResponse): void;
}

export function isGetCustomerRequest(req: Request): req is GetCustomerRequest {
  return req && req.params && typeof req.params.customerId === "string";
}
