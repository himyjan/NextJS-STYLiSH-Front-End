export interface Colors {
  code: string;
  name: string;
}

export interface Variants {
  color_code: string;
  size: string;
  stock: number;
}

export interface ProductData {
  category: string;
  colors: Colors[];
  description: string;
  id: number;
  images: string[];
  main_image: string;
  note: string;
  place: string;
  price: number;
  sizes: string[];
  story: string;
  texture: string;
  title: string;
  variants: Variants[];
  wash: string;
}

export interface Cart {
  id: string;
  colorCode: string;
  colorName: string;
  size: string;
  quantity: number;
  curStock: number;
  title: string;
  price: number;
  main_image: string;
}

export interface CartStore {
  items: Cart[];
  totalQuantity: number;
  amount: number;
  changed: boolean;
  orderNumber: string;
}

export interface CartPostData {
  prime: any;
  order: {
    shipping: string;
    payment: string;
    subtotal: number;
    freight: number;
    total: number;
    recipient: {
      name: string;
      email: string;
      phone: string;
      address: string;
      time: string;
    };
    list: {
      id: number | string;
      name: string;
      price: string | number;
      color: {
        code: string;
        name: string;
      };
      size: string;
      qty: number | string;
    }[];
  };
}

export interface FbAuthResponse {
  authResponse: {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    graphDomain: string;
    signedRequest: string;
    userID: string;
  };
  status: string;
}
