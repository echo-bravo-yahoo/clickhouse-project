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
import { getCustomer } from "../sdk.js";

export async function determineCurrentCredit(
  customerId: string,
  requireAccountExists: boolean = true
) {
  try {
    await validateBackendState(customerId);
  } catch (e) {
    throw new Error(`User not found`);
  }

  let credit = db.chain.get("credits").find({ customerId }).value();

  if (credit === undefined) {
    if (requireAccountExists) {
      throw new Error(`Credit balance not found for user.`);
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

  return credit;
}

async function validateBackendState(customerId: string) {
  try {
    await getCustomer({ id: customerId });
  } catch (e) {
    throw new Error(`Customer does not exist.`);
  }
}

export async function adjustBalance(
  credit: InternalCredit,
  balance?: number,
  adjustment?: number
) {
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

  if (newBalance < 0)
    throw new Error(
      `Insufficient credit balance of ${credit.balance} while attempting to adjust by ${adjustment}.`
    );
  credit.balance = newBalance;
  credit.events.push({
    diff,
    timestamp: Date.now(),
  });
  await db.write();
}

const recordTransaction = async ({
  customerId,
  balance,
  adjustment,
  requireAccountExists,
}: {
  customerId: string;
  balance?: number;
  adjustment?: number;
  requireAccountExists?: boolean;
}) => {
  const credit = await determineCurrentCredit(customerId, requireAccountExists);
  await adjustBalance(credit, balance, adjustment);

  return { balance: credit.balance } as CreditResponseBody;
};

export const getCredit: GetCreditHandler = async (req, res) => {
  if (!isGetCreditRequest(req)) throw new Error(`Invalid input.`);

  const { balance } = await determineCurrentCredit(req.params.customerId);
  res.json({ balance });
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
