"use server";

import prisma from "@/lib/prisma";

export const getCategory = async () => {
  try {
    const categories = await prisma.category.findMany({});

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
