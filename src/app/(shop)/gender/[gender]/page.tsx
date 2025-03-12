/* eslint-disable @typescript-eslint/no-unused-vars */
export const revalidate = 60;

import { getProductPaginationWithImage } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Category } from "@/interfaces/product";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ gender: Category }>;
  searchParams: Promise<{ page?: string }>;
}

const labels: Record<string, string> = {
  women: "para Mujeres",
  men: "para Hombres",
  kid: "para Niños",
  unisex: "para todos",
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const pageParam = await searchParams;
  const page = pageParam.page ? parseInt(pageParam.page) : 1;

  const { products, currentPage, totalPage } =
    await getProductPaginationWithImage({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      {" "}
      <Title
        title={`Productos ${labels[gender]}`}
        subtitle="Productos"
        className="mt-3"
      />{" "}
      <ProductsGrid products={products} />;
      <Pagination totalPages={totalPage} />
    </>
  );
}
