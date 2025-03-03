import type { Response, Request } from "express";
import type { Customer } from "../db.js";

type GetCustomerRequestBody = undefined;
interface GetCustomerResponseBody extends Customer {}
interface GetCustomerResponse extends Response<GetCustomerResponseBody, {}> {}
interface GetCustomerRequest
  extends Request<
    { customerId: string },
    GetCustomerResponseBody,
    GetCustomerRequestBody,
    {},
    {}
  > {}
export interface GetCustomerHandler {
  (req: GetCustomerRequest, res: GetCustomerResponse): void;
}

export function isGetCustomerRequest(
  req: Request<any>
): req is GetCustomerRequest {
  return req && req.params && typeof req.params.customerId === "string";
}
