import type {
  GetCustomerResponseBody,
  GetProductResponseBody,
  PostShipmentRequestBody,
  PostShipmentResponseBody,
} from "../src/sdk.types.js";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import lodash from "lodash";

import { defaultDataPath } from "./config/config.js";

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

// borrow the types from the other project
export type Customer = GetCustomerResponseBody;
export type Product = GetProductResponseBody;
export type Shipment = PostShipmentRequestBody & PostShipmentResponseBody;

export interface Database {
  customers: Customer[];
  products: Product[];
  shipments: Shipment[];
}

const adapter = new JSONFile<Database>("./tmp/db.json");
const defaultData = (await import(defaultDataPath)).default;

export const db = new LowWithLodash(adapter, defaultData);
