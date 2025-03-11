"use server";

import prisma from "@/lib/prisma";

export const setTransaction = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const transaction = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    });

    if (!transaction) {
      return {
        ok: false,
        message: `No se encontro la orden ${orderId} `,
      };
    }

    return {
      ok: true,
      message: "Transacción realizada",
    };
  } catch {
    return {
      ok: false,
      message: "No se pudo realizar la transacción",
    };
  }
};
