import type { Response, Request } from "express";
import type { Shipment } from "../db.js";

import _ from "lodash";
import { v7 as uuid } from "uuid";

import { db } from "../db.js";

interface PostShipmentRequestBody {
  customerId: string;
}
interface PostShipmentResponseBody {}
interface PostShipmentResponse extends Response<PostShipmentResponseBody, {}> {}
interface PostShipmentRequest
  extends Request<
    {},
    PostShipmentResponseBody,
    PostShipmentRequestBody,
    {},
    {}
  > {}
interface PostShipmentHandler {
  (req: PostShipmentRequest, res: PostShipmentResponse): void;
}

function isPostShipmentRequest(
  req: Request<any>
): req is Request<PostShipmentRequest> {
  return req && req.body;
}

export const postShipment: PostShipmentHandler = async (req, res) => {
  if (!isPostShipmentRequest(req)) throw new Error(`Invalid input.`);

  const shipment: Shipment = {
    ...req.body,
    id: uuid(),
    timestamp: Date.now(),
  };

  await db.update((data) => {
    data.shipments.push(shipment);
  });

  res.status(200).send();
};
