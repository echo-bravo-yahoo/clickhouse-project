import type {
  GetCustomerResponseBody,
  GetProductResponseBody,
  PostShipmentRequestBody,
  PostShipmentResponseBody,
} from "../src/sdk/ext.types.js";

const __dirname = import.meta.dirname;
import fs from "node:fs";
import path from "node:path";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import lodash from "lodash";

import { databaseFilePath, defaultDataPath } from "./config/config.js";

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

const adapter = new JSONFile<Database>(databaseFilePath);
const defaultData: Database = JSON.parse(
  fs.readFileSync(path.join(__dirname, defaultDataPath), {
    encoding: "utf8",
  })
);

export const db = new LowWithLodash(adapter, defaultData);
export default db;
