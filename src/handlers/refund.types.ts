import type { Response, Request } from "express";

interface PostRefundRequestBody {
  adjustment: number;
}
interface PostRefundResponseBody {
  balance: number;
}
interface PostRefundResponse extends Response<PostRefundResponseBody, {}> {}
interface PostRefundRequest
  extends Request<{}, PostRefundResponseBody, PostRefundRequestBody, {}, {}> {}
export interface PostRefundHandler {
  (req: PostRefundRequest, res: PostRefundResponse): Promise<void>;
}

export function isPostRefundRequest(
  req: Request<any>
): req is PostRefundRequest {
  return (
    req &&
    req.body &&
    typeof req.body.adjustment === "number" &&
    req.params &&
    typeof req.params.customerId === "string"
  );
}
