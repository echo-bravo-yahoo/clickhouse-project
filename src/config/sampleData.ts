import type { Database, InternalCredit, InternalPurchases } from "../db";
import type {
  Shipment as BackendShipments,
  GetCustomerResponseBody as BackendCustomer,
  Product as BackendProduct,
} from "../sdk/ext.types.js";

const __dirname = import.meta.dirname;
import fs from "node:fs";
import path from "node:path";

import { faker } from "@faker-js/faker";

// by using a seeded RNG, the output is consistent across runs
faker.seed(38492);

const projectRoot = path.join(__dirname, "../../../..");
const extData = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "./ext/config/sampleData.json"), {
    encoding: "utf8",
  })
);

const data: Database = {
  credits: buildTestCredits(),
  purchases: buildTestPurchases(),
};

function buildTestCredits(): InternalCredit[] {
  return (extData.customers as BackendCustomer[]).map((customer) => {
    return {
      id: faker.string.uuid(),
      customerId: customer.id as string,
      timestamp: Math.floor(faker.date.past().getTime() / 1000),
      balance: faker.number.float({ min: 0, max: 1_000, fractionDigits: 2 }),
      events: [],
    };
  });
}

function buildTestPurchases(): InternalPurchases[] {
  // since we have shipment test data, let's go backwards and make an internally
  // consistent purchase for each shipment
  return (extData.shipments as BackendShipments[]).map((shipment) => {
    const products = shipment.products.map((shippedProduct) => {
      const matchedSku = (extData.products as BackendProduct[]).find(
        (product) => product.sku === shippedProduct.sku
      );
      return {
        ...matchedSku,
        quantity: shippedProduct.quantity,
      };
    });
    const preTaxTotal = products.reduce(
      (sum: number, product) => sum + product.price * product.quantity,
      0
    );
    const taxRate = faker.number.float({
      min: 0,
      max: 0.4,
      multipleOf: 0.01,
    });
    const tax = taxRate * preTaxTotal;
    return {
      id: faker.string.uuid(),
      customerId: faker.helpers.arrayElement(
        extData.customers as BackendCustomer[]
      ).id,
      timestamp: Math.floor(faker.date.past().getTime() / 1000),
      preTaxTotal,
      taxRate,
      total: preTaxTotal + tax,
      tax,
      products: products,
      shipment: { id: shipment.id },
      events: [],
    } as InternalPurchases;
  });
}

export default data;
