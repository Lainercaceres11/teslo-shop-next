"use client";

import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoPrintOutline,
  IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const closeMenu = async () => {
    redirect("/auth/login");
  };

  return (
    <div className="overflow-auto">
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 bg-black w-screen z-10 h-screen opacity-30" />
      )}

      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur"
        />
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w[500px]  h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSidebarOpen,
          }
        )}
      >
        {isAuthenticated && (
          <>
            <IoCloseOutline
              size="50"
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => closeSidebar()}
            />

            <div className="relative mt-14">
              <IoSearchOutline size={30} className="absolute top-1 left-2" />
              <input
                type="text"
                placeholder="Buscar"
                className="w-full bg-gray-50 rounded pl-10 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <Link
              href="/profile"
              onClick={() => closeSidebar()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => closeSidebar()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => closeSidebar()}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAuthenticated && (
          <button
            onClick={closeMenu}
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        <div className="w-full h-px bg-gray-300 rounded-md" />

        {isAdmin && (
          <>
            <Link
              href={`/admin/products`}
              onClick={() => closeSidebar()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
            >
              <IoPrintOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href={`/admin/orders`}
              onClick={() => closeSidebar()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href={`/admin/users`}
              onClick={() => closeSidebar()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all "
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
