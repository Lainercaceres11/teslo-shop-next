"use client";

import { QuantitySelector, SizesSelector } from "@/components";
import { CartProduct, Product, ValidSizes } from "@/interfaces/product";
import { useCartStore } from "@/store/product/cartProduct";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ValidSizes | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCartProduct = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const productItem: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size: size,
      quantity: quantity,
      image: product.images[0],
    };

    addToCartProduct(productItem);
  };
  return (
    <>
      {posted && !size && (
        <span className="text-red-500 mt-2 fade-in">
          Debes seleccionar una talla.
        </span>
      )}

      <SizesSelector
        onSizeChange={setSize}
        selectedSize={size}
        vailableSizes={product.sizes}
      />

      <QuantitySelector onQuantityChange={setQuantity} quantity={quantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
