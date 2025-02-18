"use client";

import { Product } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <article className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          width={500}
          height={500}
          className="w-full object-cover transition-all rounded"
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">{product.price}</span>
      </div>
    </article>
  );
};
