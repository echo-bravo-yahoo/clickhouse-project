import type { Response, Request } from "express";

interface PostRefundRequest {
  adjustment: number;
  etag?: string;
}

interface PostRefundResponse {
  balance: number;
  etag: string;
}

interface PostRefundHandler {
  (req: Request<PostRefundRequest>, res: Response<PostRefundResponse>): void;
}

function isPostRefundRequest(
  req: Request<any>
): req is Request<PostRefundRequest> {
  return (
    req &&
    req.body &&
    req.body.adjustment !== undefined &&
    typeof req.body.adjustment === "number" &&
    (req.body.etag === undefined || typeof req.body.etag === "string")
  );
}

export const postRefund: PostRefundHandler = (req, res) => {
  if (!isPostRefundRequest(req)) throw new Error(`Invalid input.`);

  res.json({
    balance: 0,
    etag: "",
  });
};
