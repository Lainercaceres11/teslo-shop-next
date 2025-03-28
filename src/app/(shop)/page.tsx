/* eslint-disable @typescript-eslint/no-unused-vars */
export const revalidate = 60;

import { getProductPaginationWithImage } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page?: string }>;
}
export default async function Home({ searchParams }: Props) {
  const pageParam = await searchParams;
  const page = pageParam.page ? parseInt(pageParam.page) : 1;

  const { products, currentPage, totalPage } =
    await getProductPaginationWithImage({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title="Todos los productos"
        subtitle="Productos"
        className="mt-3"
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPage} />
    </>
  );
}
