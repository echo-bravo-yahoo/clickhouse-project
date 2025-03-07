import assert from 'assert';
import frontendSdk from "../../src/sdk/src.ts";
import frontendDb from "../../src/db.ts"
import backendDb from "../../ext/db.ts"

describe('Credits', function() {
  describe('GET', function () {
    describe('validation', function () {
      it('rejects requests for users who do not exist in the backend database', async function() {
        const call = () => { return frontendSdk.getCredit({ id: "invalid-id" }) }
        await assert.rejects(call, { message: "Credit balance not found for user." })
      });
    });
    describe('behavior', function () {
      it('returns the credit value of an account without exposing additional fields', async function() {
        const backendCustomer = backendDb.chain.get("customers").first().value()
        const balance = frontendDb.chain.get("credits").find((credit) => credit.customerId === backendCustomer.id).value().balance
        const response = await frontendSdk.getCredit({ id: backendCustomer.id })
        assert.deepEqual(response, { balance });
      });

    })
  });

  describe('PUT', function() {
    describe('validation', function () {
      it.skip('rejects requests that are missing request bodies', function() {});
      it.skip('rejects requests that are missing fields in their request bodies', function() {});
    });
    describe('behavior', function () {
      it.skip('sets the credit value to the requested amount', function() {});
      it.skip('leaves an event record on the request object', function() {});
      it.skip('upserts credit value for accounts that exist in the backend database but not the frontend database', function() {});
    });
  });

  describe('POST', function() {
    describe('validation', function () {
      it.skip('rejects requests for users who do not exist in the backend database', function() {})
      it.skip('rejects requests that are missing request bodies', function() {});
      it.skip('rejects requests that are missing fields in their request bodies', function() {});
    });
    describe('behavior', function () {
      it.skip('sets the credit value to the requested amount', function() {});
      it.skip('leaves an event record on the request object', function() {});
    });
  });
});
