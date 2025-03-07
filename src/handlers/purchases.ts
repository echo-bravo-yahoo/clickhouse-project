import { v7 as uuid } from "uuid";

import {
  ExternalPurchaseProduct,
  InternalPurchaseProduct,
  InternalPurchases,
  db,
} from "../db.js";

import type {
  Address,
  GetPurchasesHandler,
  PostPurchasesHandler,
  RichPurchaseProduct,
} from "./purchases.types.js";
import {
  isGetPurchasesRequest,
  isPostPurchasesRequest,
} from "./purchases.types.js";
import { getProduct, postShipment } from "../sdk/ext.js"
import { adjustBalance, determineCurrentCredit } from "./credit.js";
import { PostShipmentResponseBody } from "../sdk/ext.types.js"

export const getPurchases: GetPurchasesHandler = async (req, res) => {
  if (!isGetPurchasesRequest(req)) throw new Error(`Invalid input.`);

  const purchases = db.chain
    .get("purchases")
    .filter({ customerId: req.params.customerId })
    .value();

  if (purchases === undefined)
    throw new Error(`Purchase history not found for user.`);

  res.json(purchases);
};

async function determineTaxRate(_address: Address) {
  return 0;
}

function sanitizeRichProduct(
  product: RichPurchaseProduct
): ExternalPurchaseProduct {
  return {
    quantity: product.quantity,
    sku: product.sku,
    price: product.price,
    name: product.name,
    description: product.description,
  };
}

function simplifyRichProduct(
  product: RichPurchaseProduct
): InternalPurchaseProduct {
  return {
    id: product.id,
    quantity: product.quantity,
    sku: product.sku,
    price: product.price,
    name: product.name,
    description: product.description,
  };
}
export const postPurchases: PostPurchasesHandler = async (req, res) => {
  if (!isPostPurchasesRequest(req)) throw new Error(`Invalid input.`);

  let products: RichPurchaseProduct[];
  try {
    const productPromises: Promise<RichPurchaseProduct>[] = [];
    req.body.products.forEach((product) => {
      productPromises.push(
        getProduct({ id: product.id }).then((partialProduct) => {
          return {
            ...partialProduct,
            quantity: product.quantity,
          };
        })
      );
    });

    products = await Promise.all(productPromises);
  } catch (_e) {
    throw new Error(`Product not found.`);
  }
  const preTaxTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  if (
    req.body.expectedPreTaxTotal !== undefined &&
    preTaxTotal !== req.body.expectedPreTaxTotal
  )
    throw new Error(`Actual total did not match expected total.`);

  // ecommerce typically uses shipping address as the point of sale / tax rate
  const taxRate = await determineTaxRate(req.body.shippingAddress);
  const total = preTaxTotal * (1 + taxRate);
  const tax = total - preTaxTotal;

  await adjustBalance(
    await determineCurrentCredit(req.params.customerId),
    undefined,
    -total
  );

  let shipmentResponse: PostShipmentResponseBody | undefined;
  try {
    const payload = {
      shippingAddress: req.body.shippingAddress,
      products: products.map((richProduct) => {
        return { sku: richProduct.sku, quantity: richProduct.quantity };
      }),
    };

    shipmentResponse = await postShipment(payload);
    if (shipmentResponse.id === undefined) throw new Error("");
  } catch (_e) {
    throw new Error(`Error creating shipment.`);
  }

  const purchase: InternalPurchases = {
    id: uuid(),
    customerId: req.params.customerId,
    taxRate,
    preTaxTotal,
    total,
    products: products.map(simplifyRichProduct),
    shipment: shipmentResponse,
    tax,
    events: [],
    timestamp: Date.now(),
  };
  db.update(({ purchases }) => purchases.push(purchase));

  res.status(200).json({
    id: purchase.id,
    preTaxTotal: purchase.preTaxTotal,
    total: purchase.total,
    products: products.map(sanitizeRichProduct),
    shipment: purchase.shipment,
    tax: purchase.tax,
    taxRate: purchase.taxRate,
  });
};
