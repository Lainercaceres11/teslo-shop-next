import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-country";

async function main() {
  await prisma.orderAddres.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, user } = initialData;

  await prisma.user.createMany({ data: user });

  await prisma.country.createMany({ data: countries });

  //Categories
  const categoriesData = categories.map((name) => ({
    name,
  }));

  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB?.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const productData = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
        gender: rest.gender === "kid" ? "kids" : rest.gender,
      },
    });

    const imagesData = images.map((img) => ({
      url: img,
      producId: productData.id,
    }));

    await prisma.productImage.createMany({ data: imagesData });
  });
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
