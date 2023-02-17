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
