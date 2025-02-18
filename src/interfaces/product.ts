export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  //TODO type: ValidTypes;
  gender: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  size: ValidSizes;
  quantity: number;
  image: string;
}

export type Category = "men" | "women" | "kid" | "unisex";
export type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";
