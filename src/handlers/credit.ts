import type { Response, Request } from "express";

interface GetCreditRequest {}

interface GetCreditResponse {
  balance: number;
  etag: string;
}

interface GetCreditHandler {
  (req: Request<GetCreditRequest>, res: Response<GetCreditResponse>): void;
}

function isGetCreditRequest(
  req: Request<any>
): req is Request<GetCreditRequest> {
  return true;
}

export const getCredit: GetCreditHandler = (req, res) => {
  if (!isGetCreditRequest(req)) throw new Error(`Invalid input.`);

  res.json({
    balance: 0,
    etag: "",
  });
};

interface PostCreditRequest {
  adjustment: number;
  etag?: string;
}

interface PostCreditResponse {
  balance: number;
  etag: string;
}

interface PostCreditHandler {
  (req: Request<PostCreditRequest>, res: Response<PostCreditResponse>): void;
}

function isPostCreditRequest(
  req: Request<any>
): req is Request<PostCreditRequest> {
  return (
    req &&
    req.body &&
    req.body.adjustment !== undefined &&
    typeof req.body.adjustment === "number" &&
    (req.body.etag === undefined || typeof req.body.etag === "string")
  );
}

export const postCredit: PostCreditHandler = (req, res) => {
  if (!isPostCreditRequest(req)) throw new Error(`Invalid input.`);

  res.json({
    balance: 0,
    etag: "",
  });
};

function isPutCreditRequest(
  req: Request<any>
): req is Request<PutCreditRequest> {
  return (
    req &&
    req.body &&
    req.body.balance !== undefined &&
    typeof req.body.balance === "number" &&
    (req.body.etag === undefined || typeof req.body.etag === "string")
  );
}

interface PutCreditRequest {
  balance: number;
  etag?: string;
}

interface PutCreditResponse {
  balance: number;
  etag: string;
}

interface PutCreditHandler {
  (req: Request<PutCreditRequest>, res: Response<PutCreditResponse>): void;
}

export const putCredit: PutCreditHandler = (req, res) => {
  if (!isPutCreditRequest(req)) throw new Error(`Invalid input.`);

  res.json({
    balance: req.body.balance,
    etag: "",
  });
};
