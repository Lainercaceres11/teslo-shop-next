"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store/product/cartProduct";
import { currencyFormat } from "@/helpers/currencyFormat";

export const ProductsCheckout = () => {
  const productsInCart = useCartStore((state) => state.productCart);
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
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={300}
            height={300}
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>
            <span>
              <h3>
                {" "}
                {product.size} - {product.title}
              </h3>
            </span>
            <p>
              ${product.price} * {currencyFormat(product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
