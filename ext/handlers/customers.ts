import type { GetCustomerHandler } from "./customers.types.js";

import { isGetCustomerRequest } from "./customers.types.js";
import { db } from "../db.js";

export const getCustomer: GetCustomerHandler = (req, res) => {
  if (!isGetCustomerRequest(req)) throw new Error(`Invalid input.`);

  const customer = db.chain
    .get("customers")
    .find({ id: req.params.customerId })
    .value();

  if (customer === undefined) throw new Error(`User not found.`);

  res.json(customer);
};
