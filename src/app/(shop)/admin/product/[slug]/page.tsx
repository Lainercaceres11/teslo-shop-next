import { Title } from "@/components";
import { ProductForm } from "../ui/ProductForm";
import { getCategory, getProductBySlug } from "@/actions";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductAdminPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategory(),
  ]);

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <>
      <Title title={title} />
      <ProductForm
        product={product ?? { ProductImage: [] }}
        categories={categories}
      />
    </>
  );
}
