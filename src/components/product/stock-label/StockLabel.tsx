/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getStuckBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<null | number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const myStock = await getStuckBySlug(slug);
    setStock(myStock);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <span
          className={`${titleFont.className} antialiased text-xl bg-gray-300 animate-pulse`}
        >
          &nbsp;
        </span>
      ) : (
        <span className={`${titleFont.className} antialiased text-xl`}>
          Stock: {stock}
        </span>
      )}
    </>
  );
};
