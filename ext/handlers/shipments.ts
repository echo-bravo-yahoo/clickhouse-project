import type { Shipment } from "../db.js";
import type { PostShipmentHandler } from "./shipments.types.js";

import { v7 as uuid } from "uuid";

import { db } from "../db.js";
import { isPostShipmentRequest } from "./shipments.types.js";

export const postShipment: PostShipmentHandler = async (req, res) => {
  if (!isPostShipmentRequest(req)) throw new Error(`Invalid input.`);

  const shipment: Shipment = {
    ...req.body,
    id: uuid(),
  };

  await db.update((data) => {
    data.shipments.push(shipment);
  });

  res.status(200).json({
    id: shipment.id,
  });
};
