/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}
export const getProductPaginationWithImage = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },

      where: {
        gender: gender,
      },
    });

    const totalProducts = await prisma.product.count({
      where: {
        gender: gender,
      },
    });
    const totalPages = Math.ceil(totalProducts / take);

    return {
      currentPage: page,
      totalPage: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image?.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudieron cargar los productos");
  }
};
