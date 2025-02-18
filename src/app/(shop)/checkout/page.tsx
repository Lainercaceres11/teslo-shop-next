import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={300}
                  height={300}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <h3>{product.title}</h3>
                  <p>${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5">
            <h2 className="font-bold">Dirección de entrega</h2>
            <div className="mt-10">
              <p className="text-2xl">Lainer Cáceres</p>
              <p>Quibdo, Chocó</p>
              <p>Obapo</p>
              <p>Colombia</p>
              <p>Avenida pepito</p>
              <p>Calle 123344</p>
              <p>Carreta 28a</p>
            </div>

            <div className="w-full bg-gray-400 h-0.5 my-10 rounded-md" />
            <h2 className="my-4 text-2xl">Resumen de compra </h2>

            <div className="grid grid-cols-2">
              <span>Número de productos</span>
              <span className="text-right">3</span>
              <span>Impuestos 15%</span>
              <span className="text-right">100</span>
              <span className="u-font-bold">Subtotal</span>
              <span className="text-right">100</span>
              <span className="text-2xl mt-5 font-semibold">Total</span>
              <span className="text-right mt-5 text-2xl">100</span>
            </div>

            <div className="w-full mt-5 mb-3">
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en &quot;Colocar orden&quot; acepta nuestros{" "}
                  {""}
                  <a href="#">terminos</a> y <a href="#">condiciones de uso</a>
                </span>
              </p>
              <Link
                href="/orders/122"
                className="flex btn-primary justify-center"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
