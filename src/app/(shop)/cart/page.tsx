import { Title } from "@/components";

import Link from "next/link";
import { ProductInCart } from "./ui/ProductInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  return (
    <div className="flex items-center justify-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w[1000px]">
        <Title title="Carrito de compras" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link className="underline mb-5" href="/">
              Continua comprando
            </Link>

            <ProductInCart />
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5 h-fit">
            <h2 className="my-4 text-2xl">Resumen de compra </h2>

            <OrderSummary />

            <div className="w-full mt-5 mb-3">
              <Link
                href="/checkout/address"
                className="flex btn-primary justify-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
