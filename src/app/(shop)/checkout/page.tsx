import { Title } from "@/components";
import Link from "next/link";
import { ProductsCheckout } from "./ui/ProductCheckout";
import { PlaceHolder } from "./ui/PlaceHolder";

export default function CheckoutPage() {
  return (
    <div className="flex items-center justify-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w[1000px]">
        <Title title="Verificar compra" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Editar elementos</span>
            <Link className="underline mb-5" href="/cart">
              Editar compra
            </Link>

            <ProductsCheckout />
          </div>

          <PlaceHolder />
        </div>
      </div>
    </div>
  );
}
