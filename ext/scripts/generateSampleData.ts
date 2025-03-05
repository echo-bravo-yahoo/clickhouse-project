#!/usr/bin/env tsx

import type { Customer, Database, Product, Shipment } from "../db";

const __dirname = import.meta.dirname;

import fs from "node:fs";
import path from "node:path";

import { faker } from "@faker-js/faker";

// by using a seeded RNG, the output is consistent across runs
faker.seed(38492);

const data: Database = {
  customers: [],
  products: [],
  shipments: [],
};

data.customers = iterate(buildTestCustomer, 3);
data.products = iterate(buildTestProduct, 5);
data.shipments = iterate(buildTestShipment, 2);

function iterate<T>(fn: () => T, count: number) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(fn());
  }
  return array;
}

function buildTestCustomer(): Customer {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    billingAddress: {
      line1: faker.location.streetAddress(),
      line2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
      state: faker.location.state(),
      country: faker.location.country(),
    },
    shippingAddress: {
      line1: faker.location.streetAddress(),
      line2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
      state: faker.location.state(),
      country: faker.location.country(),
    },
    email: faker.internet.email(),
    createdAt: Math.floor(faker.date.past().getTime() / 1000),
    lastModifiedAt: Math.floor(faker.date.past().getTime() / 1000),
  };
}

function buildTestProduct(): Product {
  return {
    id: faker.string.uuid(),
    sku: faker.string.numeric({ allowLeadingZeros: false, length: 12 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 4, max: 500, fractionDigits: 2 }),
    createdAt: Math.floor(faker.date.past().getTime() / 1000),
    lastModifiedAt: Math.floor(faker.date.past().getTime() / 1000),
  };
}

function buildTestShipment(): Shipment {
  // by selecting random subsets of the existing test data, we know that
  // this will be internally consistent - this shipment will point to
  // other existing customers and products
  const customer = faker.helpers.arrayElement(data.customers);
  const products = faker.helpers.arrayElements(data.products, {
    min: 1,
    max: 3,
  });

  const skus = products.map((product) => {
    return {
      sku: product.sku,
      quantity: faker.number.int({ min: 1, max: 10 }),
    };
  });

  return {
    id: faker.string.uuid(),
    shippingAddress: customer.shippingAddress,
    products: skus,
  };
}

fs.writeFileSync(
  path.join(__dirname, "../config/sampleData.json"),
  JSON.stringify(data, null, 2),
  { encoding: "utf8" }
);
