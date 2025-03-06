import type { Response, Request } from "express";
import { ExternalPurchaseProduct } from "../db";

interface PostRefundRequestBody {
  purchaseId: string;
  itemsToRefund: ExternalPurchaseProduct[];
}
interface PostRefundResponseBody {
  adjustment: number;
}
type PostRefundResponse = Response<PostRefundResponseBody, object>;
type PostRefundRequest = Request<
  { customerId: string },
  PostRefundResponseBody,
  PostRefundRequestBody,
  Record<string, never>,
  object
>;
export interface PostRefundHandler {
  (req: PostRefundRequest, res: PostRefundResponse): Promise<void>;
}

export function isPostRefundRequest(req: Request): req is PostRefundRequest {
  return (
    req &&
    req.body &&
    typeof req.body.purchaseId === "string" &&
    // TODO: replace with real type guard
    req.body.itemsToRefund.length !== undefined &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}
