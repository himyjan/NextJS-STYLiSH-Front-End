export interface ProductData {
  category: string;
  colors: { code: string; name: string }[];
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
  variants: { color_code: string; size: string; stock: number }[];
  wash: string;
}
