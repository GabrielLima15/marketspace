export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_images: Productimage[];
  payment_methods: Paymentmethod[];
  user?: {
    avatar?: string;
    name?: string;
  };
}

interface Paymentmethod {
  key: string;
  name: string;
}

interface Productimage {
  path: string;
  id: string;
}