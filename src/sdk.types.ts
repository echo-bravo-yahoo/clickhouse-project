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

export type GetProductResponseBody = Product;
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;
  lastModifiedAt: number;
}

export interface ProductPurchase {
  sku: string;
  quantity: number;
}

export type Shipment = PostShipmentRequestBody & PostShipmentResponseBody;

export interface PostShipmentRequestBody {
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  products: ProductPurchase[];
}

export interface PostShipmentResponseBody {
  id: string;
}
