import { Title } from "@/components";
import { ProductForm } from "../ui/ProductForm";
import { getCategory, getProductBySlug } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductAdminPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategory(),
  ]);

  // if (slug !== "new") {
  //   redirect("/admin/products");
  // }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
