import type { Response, Request } from "express";

interface GetPurchasesRequest {}

interface GetPurchasesResponse {
  balance: number;
  etag: string;
}

interface GetPurchasesHandler {
  (
    req: Request<GetPurchasesRequest>,
    res: Response<GetPurchasesResponse>
  ): void;
}

function isGetPurchasesRequest(
  req: Request<any>
): req is Request<GetPurchasesRequest> {
  return true;
}

export const getPurchases: GetPurchasesHandler = (req, res) => {
  if (!isGetPurchasesRequest(req)) throw new Error(`Invalid input.`);

  res.json({
    balance: 0,
    etag: "",
  });
};

interface PostPurchasesRequest {
  adjustment: number;
  etag?: string;
}

interface PostPurchasesResponse {
  balance: number;
  etag: string;
}

interface PostPurchasesHandler {
  (
    req: Request<PostPurchasesRequest>,
    res: Response<PostPurchasesResponse>
  ): void;
}

function isPostPurchasesRequest(
  req: Request<any>
): req is Request<PostPurchasesRequest> {
  return (
    req &&
    req.body &&
    req.body.adjustment !== undefined &&
    typeof req.body.adjustment === "number" &&
    (req.body.etag === undefined || typeof req.body.etag === "string")
  );
}

export const postPurchases: PostPurchasesHandler = (req, res) => {
  if (!isPostPurchasesRequest(req)) throw new Error(`Invalid input.`);

  res.json({
    balance: 0,
    etag: "",
  });
};
