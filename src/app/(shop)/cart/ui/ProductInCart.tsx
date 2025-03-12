"use client";

import React, { useEffect, useState } from "react";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store/product/cartProduct";
import Link from "next/link";

export const ProductInCart = () => {
  const productsInCart = useCartStore((state) => state.productCart);
  const updateProductCart = useCartStore((state) => state.updateProductCart);
  const removeProductInCart = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className="flex">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            styles={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>
            <Link
              className="hover:text-blue-700 cursor-pointer"
              href={`/product/${product.slug}`}
            >
              <h3>
                {" "}
                {product.size} - {product.title}
              </h3>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              onQuantityChange={(quantity) =>
                updateProductCart(product, quantity)
              }
              quantity={product.quantity}
            />
            <button
              onClick={() => removeProductInCart(product)}
              className="underline mt-3"
            >
              Eliminar producto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
