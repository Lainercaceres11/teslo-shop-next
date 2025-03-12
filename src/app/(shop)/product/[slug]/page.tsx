/* eslint-disable @typescript-eslint/no-unused-vars */
export const revalidate = 6004800;

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizesSelector,
} from "@/components";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2 bg-red-300">
        <ProductMobileSlideShow
          className="block md:hidden"
          title={product.title}
          images={product.images}
        />
        <ProductSlideShow
          className="hidden md:block"
          title={product.title}
          images={product.images}
        />
      </div>
      <div
        className={`${titleFont.className} text-xl antialiased font-bold px-5`}
      >
        <StockLabel slug={product.slug} />
        <h1>{product?.title}</h1>
        <p className="mb-5 text-3xl">${product?.price}</p>

        <AddToCart product={product} />

        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product?.description}</p>
      </div>
    </article>
  );
}
