import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import lodash from "lodash";

import { databaseFilePath, defaultDataPath } from "./config/config.js";

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

export type InternalCredit = ExternalCredit & Persistable & Auditable;

export interface ExternalPurchaseProduct {
  quantity: number;
  sku: string;
  price: number;
  name: string;
  description: string;
}

export interface InternalPurchaseProduct extends ExternalPurchaseProduct {
  id: string;
}
interface Shipment {}

export interface ExternalPurchase {
  id: string;
  preTaxTotal: number;
  taxRate: number;
  total: number;
  products: ExternalPurchaseProduct[];
  shipment: Shipment;
  tax: number;
}

export type InternalPurchases = ExternalPurchase &
  Auditable & { products: InternalPurchaseProduct[] };

export interface Database {
  credits: InternalCredit[];
  purchases: InternalPurchases[];
}

const adapter = new JSONFile<Database>(databaseFilePath);
const defaultData = (await import(defaultDataPath)).default;
export const db = new LowWithLodash(adapter, defaultData);
