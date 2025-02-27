"use client";

import { useAddreesStore } from "@/store/address/address-store";

export default function OrderAddres() {
  const address = useAddreesStore((state) => state.address);
  return (
    <div className="mt-10">
      <p>{address.firstName}</p>
      <p>{address.lastName}</p>
      <p>
        {address.city}, {address.country}
      </p>
      <p>{address.address}</p>
      <p>{address.address2}</p>
      <p>{address.phone}</p>
      <p>{address.postalCode}</p>
    </div>
  );
}
