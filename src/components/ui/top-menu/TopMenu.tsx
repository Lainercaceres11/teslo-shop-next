"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store/product/cartProduct";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoCartOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSidebar = useUiStore((state) => state.openSidebar);
  const getItemInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`antialiased font-bold ${titleFont.className} `}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link
          className="px-2 mx-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="px-2 mx-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="px-2 mx-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kids"
        >
          Niños
        </Link>
      </div>

      <div className="flex items-center">
        

        <Link
          href={loaded && getItemInCart === 0 ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
              {loaded && getItemInCart > 0 && getItemInCart}
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSidebar}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
