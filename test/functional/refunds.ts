describe('Refunds', function() {
  describe('POST', function() {
    describe('validation', function () {
      it.skip('rejects requests for users who do not exist in the backend database', function() {})
      it.skip('rejects requests that are missing request bodies', function() {});
      it.skip('rejects requests that are missing fields in their request bodies', function() {});
      it.skip('rejects requests to refund orders that do not exist', function() {});
      it.skip('rejects requests to refund SKUs that do not exist in the backend database', function() {});
      it.skip('rejects requests to refund a higher quantity of a SKU than the order includes', function() {});
    });

    describe('behavior', function () {
      it.skip('creates a refund and adjusts credit', function() {});
      it.skip('recalculates taxes based on new order amount', function() {});
      it.skip('creates an audit event on the purchase object', function() {});
    });
  });
});


