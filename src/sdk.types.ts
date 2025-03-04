export interface GetCustomerResponseBody {
  id: string;
  name: string;
  billingAddress: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  email: string;
  createdAt: number;
  lastModifiedAt: number;
}

export interface GetProductResponseBody {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;
  lastModifiedAt: number;
}

export interface PostShipmentRequestBody {
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  products: Array<{ sku: string; quantity: number }>;
}

export interface PostShipmentResponseBody {
  id: string;
}
