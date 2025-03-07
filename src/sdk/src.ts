import { frontend } from "../config/config.js";
import { GetCreditResponse, PostCreditRequestBody, PostCreditResponse, PutCreditRequestBody, PutCreditResponse } from "../handlers/credit.types.js";
import { GetPurchasesResponseBody, PostPurchasesRequestBody } from "../handlers/purchases.types.js";
import { PostRefundRequestBody, PostRefundResponseBody } from "../handlers/refund.types.js";
const frontendURL = `${frontend.protocol}://${frontend.url}:${frontend.port}`;

export async function getCredit({ id }: { id: string }) {
  const response = await fetch(`${frontendURL}/customers/${id}/credit`);
  return response.json() as Promise<GetCreditResponse>;
}

export async function postCredit({ id, credit }: { id: string, credit: PostCreditRequestBody }) {
  const response = await fetch(`${frontendURL}/customers/${id}/credit`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(credit),
  });
  return response.json() as Promise<PostCreditResponse>;
}

export async function putCredit({ id, credit }: { id: string, credit: PutCreditRequestBody }) {
  const response = await fetch(`${frontendURL}/customers/${id}/credit`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(credit),
  });
  return response.json() as Promise<PutCreditResponse>;
}

export async function getPurchases({ id }: { id: string }) {
  const response = await fetch(`${frontendURL}/products/${id}/purchases`);
  return response.json() as Promise<GetPurchasesResponseBody>;
}

export async function postPurchases({ id, purchase }: { id: string, purchase: PostPurchasesRequestBody }) {
  const response = await fetch(`${frontendURL}/products/${id}/purchases`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(purchase),
  });
  return response.json() as Promise<PostPurchasesRequestBody>;
}

export async function postRefund(shipment: PostRefundRequestBody) {
  const response = await fetch(`${frontendURL}/refunds`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(shipment),
  });
  return response.json() as Promise<PostRefundResponseBody>;
}

export default {
  getCredit,
  postCredit,
  putCredit,
  getPurchases,
  postPurchases,
  postRefund,
}
