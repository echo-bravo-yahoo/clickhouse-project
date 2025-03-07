describe('Purchases', function() {
  describe('GET', function () {
    describe('validation', function () {
      it.skip('rejects requests for users who do not have any purchases', function() {});
    });
    describe('behavior', function () {
      it.skip('returns the list of purchases for the customer', function() {});
      it.skip('does not include purchases from other users', function() {});

    })
  });

  describe('POST', function() {
    describe('validation', function () {
      it.skip('rejects requests for users who do not exist in the backend database', function() {})
      it.skip('rejects requests that are missing request bodies', function() {});
      it.skip('rejects requests that are missing fields in their request bodies', function() {});
      it.skip('rejects requests for product SKUs that do not exist in the backend database', function() {});
    });
    describe('behavior', function () {
      it.skip('creates a purchase, adjusts credit, and creates a shipment', function() {});
      it.skip('calculates tax rate based on shipping address', function() {});
      it.skip('can optimistically lock if client provides expected total', function() {});
      it.skip('does not deduct credit or create a purchase if creating a shipment fails', function() {});
      it.skip('does not expose the backend error if an error occurs reaching the backend', function() {});
    });
  });
});

