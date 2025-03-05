import type { Database, InternalCredit, InternalPurchases } from "../db";

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
  return extData.customers.map((customer: any) => {
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
  return extData.shipments.map((shipment: any) => {
    const products = shipment.products.map((shippedProduct: any) => {
      return extData.products.find(
        (product: any) => product.sku === shippedProduct.sku
      );
    });
    const preTaxCost = products.reduce(
      (sum: number, product: any) => sum + product.price,
      0
    );
    const tax = faker.number.float({
      min: preTaxCost,
      max: 1.4 * preTaxCost,
      multipleOf: 0.01,
    });
    return {
      id: faker.string.uuid(),
      customerId: (faker.helpers.arrayElement(extData.customers) as any)
        .id as string,
      timestamp: Math.floor(faker.date.past().getTime() / 1000),
      total: preTaxCost + tax,
      tax,
      products: [],
      shipment: {},
      events: [],
    } as InternalPurchases;
  });
}

export default data;
