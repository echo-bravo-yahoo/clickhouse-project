import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import lodash from "lodash";

import { defaultDataPath } from "./config/config.js";

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

interface Persistable {
  id: string;
  timestamp: number;
}

interface Auditable extends Persistable {
  customerId: string;
  events: any[];
}

export interface ExternalCredit {
  balance: number;
}

interface Product {}
interface Shipment {}

export interface ExternalPurchase {
  id: string;
  total: number;
  products: Product[];
  shipment: Shipment;
  tax: number;
}

export type InternalPurchases = ExternalPurchase & Auditable;

export interface Database {
  credits: (ExternalCredit & Persistable & Auditable)[];
  purchases: InternalPurchases[];
}

const adapter = new JSONFile<Database>("./tmp/db.json");
const defaultData = await import(defaultDataPath);
export const db = new LowWithLodash(adapter, defaultData);
