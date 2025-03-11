import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getAllOrders = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debes ser administrador",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "asc",
      },
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
