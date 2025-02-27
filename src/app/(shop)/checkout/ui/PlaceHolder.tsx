"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import clsx from "clsx";

import { placeHolder } from "@/actions";
import { currencyFormat } from "@/helpers/currencyFormat";
import { useAddreesStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/product/cartProduct";

export const PlaceHolder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);

  const router = useRouter();

  const address = useAddreesStore((state) => state.address);
  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();
  const cart = useCartStore((state) => state.productCart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlaceOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const response = await placeHolder(productsToOrder, address);
    if (!response.ok) {
      setIsPlaceOrder(false);
      setErrorMessage(response.message ?? "");
      return;
    }

    clearCart();
    router.replace("/orders/" + response.order?.id);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-5">
        <h2 className="font-bold">Dirección de entrega</h2>
        <div className="mt-10">
          <p>{address.firstName}</p>
          <p>{address.lastName}</p>
          <p>
            {address.city}, {address.country}
          </p>
          <p>{address.address}</p>
          <p>{address.address2}</p>
          <p>{address.phone}</p>
          <p>{address.postalCode}</p>
        </div>

        <div className="w-full bg-gray-400 h-0.5 my-10 rounded-md" />
        <h2 className="my-4 text-2xl">Resumen de compra </h2>

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
          <span className="text-right mt-5 text-2xl">
            {currencyFormat(total)}
          </span>
        </div>

        <div className="w-full mt-5 mb-3">
          <p className="mb-5">
            <span className="text-xs">
              Al hacer click en &quot;Colocar orden&quot; acepta nuestros {""}
              <a href="#">terminos</a> y <a href="#">condiciones de uso</a>
            </span>
          </p>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            disabled={isPlaceOrder}
            onClick={onPlaceOrder}
            className={clsx({
              "btn-primary": !isPlaceOrder,
              "btn-disabled": isPlaceOrder,
            })}
          >
            Colocar orden
          </button>
        </div>
      </div>
    </>
  );
};
