"use server";

import prisma from "@/lib/prisma";

import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, urlName: string) => {
  if (!urlName.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar images del FS",
    };
  }

  const imagesUrl = urlName.split("/").pop()?.split("")[0] ?? "";
  try {
    await cloudinary.uploader.destroy(`teslo-shop/${imagesUrl}`);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo borrar la imagen",
    };
  }
};
