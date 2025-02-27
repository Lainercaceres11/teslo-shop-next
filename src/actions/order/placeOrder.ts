"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Size } from "@prisma/client";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeHolder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay id para la orden ",
    };
  }

  const allProductIds = await prisma.product.findMany({
    select: { id: true },
  });
  console.log(
    "IDs en la base de datos:",
    allProductIds.map((p) => p.id)
  );

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  console.log(
    "IDs recibidos:",
    productIds.map((p) => p.productId)
  );

  console.log("Productos encontrados:", products);

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;

      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    {
      subTotal: 0,
      tax: 0,
      total: 0,
    }
  );

  try {
    // Created transation
    const prismaTx = prisma.$transaction(async (tx) => {
      const updatedProductPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0)
          throw new Error("Producto no tiene cantidad definida");

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updateProducts = await Promise.all(updatedProductPromises);

      updateProducts.forEach((product) => {
        if (product.inStock <= 0) {
          throw new Error(`${product.title} no tiene inventario`);
        }
      });

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemInOrder: itemsInOrder,
          subTotal: subTotal,
          fax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Crear dirección de la orden
      const { country, ...restAddress } = address;
      const orderAddres = tx.orderAddres.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: country,
        },
      });

      return {
        order: order,
        orderAddress: orderAddres,
        updatedProduct: updateProducts,
      };
    });

    return {
      ok: true,
      order: (await prismaTx).order,
      prismaTx,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo realizar la transación, intenta de nuevo!!",
    };
  }
};
