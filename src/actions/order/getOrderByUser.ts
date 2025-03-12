"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdeByUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Not have session",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        OrderAddres: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return {
      ok: true,
      order: orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Orden no found",
    };
  }
};
