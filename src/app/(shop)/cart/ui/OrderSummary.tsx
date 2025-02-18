"use client";

import { currencyFormat } from "@/helpers/currencyFormat";
import { useCartStore } from "@/store/product/cartProduct";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) return <p>Cargando...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>Número de productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}
      </span>
      <span>Impuestos 15%</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>
      <span className="text-2xl mt-5 font-semibold">Total</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>
  );
};
