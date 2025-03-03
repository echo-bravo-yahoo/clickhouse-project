import type { Response, Request } from "express";
import type { Customer } from "../db.js";

import _ from "lodash";

import { db } from "../db.js";

interface GetCustomerRequestBody {}
interface GetCustomerResponseBody extends Customer {}
interface GetCustomerResponse extends Response<GetCustomerResponseBody, {}> {}
interface GetCustomerRequest
  extends Request<
    { id: string },
    GetCustomerResponseBody,
    GetCustomerRequestBody,
    {},
    {}
  > {}
export interface GetCustomerHandler {
  (req: GetCustomerRequest, res: GetCustomerResponse): void;
}

function isGetCustomerRequest(req: Request<any>): req is GetCustomerRequest {
  return (
    req &&
    req.params &&
    req.params.id !== undefined &&
    typeof req.params.id === "string"
  );
}

export const getCustomer: GetCustomerHandler = (req, res) => {
  if (!isGetCustomerRequest(req)) throw new Error(`Invalid input.`);

  const customer = db.chain
    .get("customers")
    .find({ id: req.params.id })
    .value();

  if (customer === undefined) throw new Error(`User not found.`);

  res.json(customer);
};
