"use client";

import { useAddreesStore } from "@/store/address/address-store";

export const OrderAddressFullName = () => {
  const order = useAddreesStore((state) => state.address);
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {order.firstName} {order.lastName}
    </td>
  );
};
