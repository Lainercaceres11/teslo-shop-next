import Image from "next/image";

import { getOrdeById } from "@/actions";
import { PayPalButton, PayPalStatus, Title } from "@/components";
import { currencyFormat } from "@/helpers/currencyFormat";
import OrderAddres from "../../checkout/ui/OrderAddres";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const { order } = await getOrdeById(id);

  return (
    <div className="flex items-center justify-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w[1000px]">
        <Title title={`Orden ${id.split("-").at(3)} `} />

        <PayPalStatus isPaid={order?.isPaid ?? false} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            {order?.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + `${item.size}`}
                className="flex"
              >
                <Image
                  src={`/products/${item?.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={300}
                  height={300}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <h3>{item.product.title}</h3>
                  <p>
                    ${item?.price} x {item.quantity}
                  </p>
                  <p>Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5">
            <h2 className="font-bold">Dirección de entrega</h2>
            <OrderAddres />

            <div className="w-full bg-gray-400 h-0.5 my-10 rounded-md" />
            <h2 className="my-4 text-2xl">Resumen de compra </h2>

            <div className="grid grid-cols-2">
              <span>Número de productos</span>
              <span className="text-right">
                {order?.itemInOrder === 1
                  ? "1 articulo"
                  : `${order?.itemInOrder} articulos`}
              </span>
              <span>Impuestos 15%</span>
              <span className="text-right">
                {currencyFormat(order?.fax ?? 0)}
              </span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order?.subTotal ?? 0)}
              </span>
              <span className="text-2xl mt-5 font-semibold">Total</span>
              <span className="text-right mt-5 text-2xl">
                {currencyFormat(order?.total ?? 0)}
              </span>
            </div>

            {order?.isPaid ? (
              <PayPalStatus isPaid={order?.isPaid ?? false} />
            ) : (
              <PayPalButton amount={order!.total} orderId={order!.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
