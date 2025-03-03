import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import lodash from "lodash";
import { v7 as uuid } from "uuid";

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

const customerId = uuid();
const defaultData: Data = {
  customers: [
    {
      id: customerId,
      timestamp: Date.now(),
    },
  ],
  products: [
    {
      id: uuid(),
      timestamp: Date.now(),
    },
  ],
  shipments: [
    {
      id: uuid(),
      customerId: customerId,
      timestamp: Date.now(),
    },
  ],
};

interface Persistable {
  id: string;
  timestamp: number;
}

export interface Customer extends Persistable {}

export interface Product extends Persistable {}

export interface Shipment extends Persistable {
  customerId: string;
}

interface Data {
  customers: Customer[];
  products: Product[];
  shipments: Shipment[];
}

const adapter = new JSONFile<Data>("./tmp/db.json");
export const db = new LowWithLodash(adapter, defaultData);
