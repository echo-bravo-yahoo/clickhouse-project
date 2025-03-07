import { frontend } from "../config/config.js";
import { GetCreditResponse, PostCreditRequestBody, PostCreditResponse, PutCreditRequestBody, PutCreditResponse } from "../handlers/credit.types.js";
import { GetPurchasesResponseBody, PostPurchasesRequestBody } from "../handlers/purchases.types.js";
import { PostRefundRequestBody, PostRefundResponseBody } from "../handlers/refund.types.js";
const frontendURL = `${frontend.protocol}://${frontend.url}:${frontend.port}`;

async function processResponse<T>(response: Response): Promise<T> {
  if (response.status >= 400) {
    throw new Error((await response.json()).message)
  }
  return response.json() as Promise<T>;
}

export async function getCredit({ id }: { id: string }) {
  const response = await fetch(`${frontendURL}/customers/${id}/credit`);
  return processResponse<GetCreditResponse>(response)
}

export async function postCredit({ id, credit }: { id: string, credit: PostCreditRequestBody }) {
  const response = await fetch(`${frontendURL}/customers/${id}/credit`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(credit),
  });
  return processResponse<PostCreditResponse>(response);
}

export async function putCredit({ id, credit }: { id: string, credit: PutCreditRequestBody }) {
  const response = await fetch(`${frontendURL}/customers/${id}/credit`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(credit),
  });
  return processResponse<PutCreditResponse>(response);
}

export async function getPurchases({ id }: { id: string }) {
  const response = await fetch(`${frontendURL}/products/${id}/purchases`);
  return processResponse<GetPurchasesResponseBody>(response);
}

export async function postPurchases({ id, purchase }: { id: string, purchase: PostPurchasesRequestBody }) {
  const response = await fetch(`${frontendURL}/products/${id}/purchases`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(purchase),
  });
  return processResponse<PostPurchasesRequestBody>(response);
}

export async function postRefund(shipment: PostRefundRequestBody) {
  const response = await fetch(`${frontendURL}/refunds`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(shipment),
  });
  return processResponse<PostRefundResponseBody>(response);
}

export default {
  getCredit,
  postCredit,
  putCredit,
  getPurchases,
  postPurchases,
  postRefund,
}
