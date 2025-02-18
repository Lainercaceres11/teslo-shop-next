import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="flex items-center justify-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w[1000px]">
        <Title title={`Orden ${id} `} />

        <div
          className={clsx(
            "flex items-center rounded-md py-2 px-3.5 text-xs font-bold text-white mb-5",
            {
              "bg-red-500": false,
              "bg-green-700": true,
            }
          )}
        >
          <IoCardOutline size={30} />
          {/* <span className="mx-2">Pendiente de pago</span> */}
          <span className="mx-2">Pagado</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
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
              <div
                className={clsx(
                  "flex items-center rounded-md py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
