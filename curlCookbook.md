```bash
# get credit
curl -sS -X GET localhost:3000/customers/8ab0a9f2-3dd9-4a12-bb4c-d5fb772376b9/credit

# list purchases
curl -sS -X GET localhost:3000/customers/8ab0a9f2-3dd9-4a12-bb4c-d5fb772376b9/purchases

# add credit
curl -sS -X POST localhost:3000/customers/8ab0a9f2-3dd9-4a12-bb4c-d5fb772376b9/credit --data '{ "adjustment": 300 }' --header 'Content-Type: application/json'

# set credit
curl -sS -X PUT localhost:3000/customers/8ab0a9f2-3dd9-4a12-bb4c-d5fb772376b9/credit --data '{ "balance": 1500 }' --header 'Content-Type: application/json'

# refund purchase
curl -sS -X POST localhost:3000/customers/a6035c3d-0ccb-4994-b139-86801c114085/refunds --data '{ "purchaseId": "5a584453-ede6-493f-ab61-235c9789c64e", "itemsToRefund": [ { "sku": "709610277655", "quantity": 2 }, { "sku": "747592892460", "quantity": 1 } ] }' --header 'Content-Type: application/json'

# create purchase
curl -sS -X POST localhost:3000/customers/8ab0a9f2-3dd9-4a12-bb4c-d5fb772376b9/purchases --data '{ "shippingAddress": { "line1": "32 SW 10th St", "line2": "", "city": "Seattle", "state": "Washington", "postalCode": "98111", "country": "US" }, "products": [{ "id": "3ba3129e-1a7b-4393-94bb-c1339239cc61", "quantity": 2 }, { "id": "ebf48ba4-2e55-400e-af3b-dd50eb35fa5d", "quantity": 1 }] }' --header 'Content-Type: application/json'

```
