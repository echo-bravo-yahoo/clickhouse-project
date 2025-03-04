import {
  GetCustomerResponseBody,
  GetProductResponseBody,
  PostShipmentRequestBody,
  PostShipmentResponseBody,
} from "./sdk.types";

import { backendURL } from "./config/config.js";

export async function getCustomer({ id }: { id: string }) {
  const response = await fetch(`${backendURL}/customers/${id}`);
  return response.json() as Promise<GetCustomerResponseBody>;
}

export async function getProduct({ id }: { id: string }) {
  const response = await fetch(`${backendURL}/products/${id}`);
  return response.json() as Promise<GetProductResponseBody>;
}

export async function postShipment(shipment: PostShipmentRequestBody) {
  const response = await fetch(`${backendURL}/shipments`, {
    method: "POST",
    body: JSON.stringify(shipment),
  });
  return response.json() as Promise<PostShipmentResponseBody>;
}
