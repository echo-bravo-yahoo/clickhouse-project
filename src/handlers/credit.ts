import type {
  CreditResponseBody,
  GetCreditHandler,
  PostCreditHandler,
  PutCreditHandler,
} from "./credit.types.js";
import type { InternalCredit } from "../db.js";

import { v7 as uuid } from "uuid";

import {
  isGetCreditRequest,
  isPostCreditRequest,
  isPutCreditRequest,
} from "./credit.types.js";
import { db } from "../db.js";

function validateTransaction(customerId: string) {
  const credit = db.chain.get("credits").find({ customerId }).value();

  if (credit === undefined)
    throw new Error(`Credit balance not found for user.`);

  return credit;
}

const recordTransaction = async ({
  customerId,
  balance,
  adjustment,
  requireAccountExists = true,
}: {
  customerId: string;
  balance?: number;
  adjustment?: number;
  requireAccountExists?: boolean;
}) => {
  let credit: InternalCredit | undefined;
  try {
    credit = validateTransaction(customerId);
  } catch (e) {
    if (requireAccountExists) {
      throw e;
    } else {
      credit = {
        id: uuid(),
        balance: 0,
        timestamp: Date.now(),
        customerId,
        events: [],
      };
      db.data.credits.push(credit);
    }
  }

  let newBalance;
  if (balance !== undefined && adjustment !== undefined) {
    throw new Error(`Invalid input.`);
  } else if (balance !== undefined) {
    newBalance = balance;
  } else if (adjustment !== undefined) {
    newBalance = credit.balance + adjustment;
  } else {
    throw new Error(`Invalid input.`);
  }

  const diff = newBalance - credit.balance;

  credit.balance = newBalance;
  credit.events.push({
    diff,
    timestamp: Date.now(),
  });
  await db.write();

  return { balance: credit.balance } as CreditResponseBody;
};

export const getCredit: GetCreditHandler = async (req, res) => {
  if (!isGetCreditRequest(req)) throw new Error(`Invalid input.`);

  res.json(validateTransaction(req.params.customerId));
};

export const postCredit: PostCreditHandler = async (req, res) => {
  if (!isPostCreditRequest(req)) throw new Error(`Invalid input.`);

  res.json(
    await recordTransaction({
      customerId: req.params.customerId,
      adjustment: req.body.adjustment,
    })
  );
};

export const putCredit: PutCreditHandler = async (req, res) => {
  if (!isPutCreditRequest(req)) throw new Error(`Invalid input.`);

  res.json(
    await recordTransaction({
      customerId: req.params.customerId,
      balance: req.body.balance,
      requireAccountExists: false,
    })
  );
};
