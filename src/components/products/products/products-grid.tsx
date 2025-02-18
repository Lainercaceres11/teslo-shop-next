import { Product } from "@/interfaces/product";
import { ProductItem } from "./productItem";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <article className="grid grid-cols-2 sm:grid-cols-3 gap-10 m-5">
      {products.map((product) => (
        <ProductItem key={product.slug} product={product} />
      ))}
    </article>
  );
};
