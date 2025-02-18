"use server"

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";

export const getStuckBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true },
    });

    return product?.inStock ?? 0;
  } catch (error) {
    return 0;
  }
};
