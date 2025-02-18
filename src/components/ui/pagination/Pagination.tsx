"use client";

import { generatePaginationNumber } from "@/helpers/generatePaginationNumber";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searcParams = useSearchParams();

  const pageString = searcParams.get("page") ?? 1;

  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1) {
    redirect("/");
  }

  const allNumbers = generatePaginationNumber(currentPage, totalPages);

  const createPageUrl = (pageNumber: string | number) => {
    const params = new URLSearchParams(searcParams);
    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber <= 0 || isNaN(+pageString)) {
      return `${pathName}}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };
  return (
    <div className="flex items-center text-center mt-10 mb-32 justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBack size={30} />
              <span className="sr-only">Anterior</span>
            </Link>
          </li>

          {allNumbers.map((page, index) => (
            <li key={page + `${index}`} className="page-item">
              <a
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-600 hover:bg-blue-700 text-white rounded-md":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForward size={30} />
              <span className="sr-only">Siguiente</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
