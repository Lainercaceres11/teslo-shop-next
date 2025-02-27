/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  setAddress: (address: State["address"]) => void;
}

export const useAddreesStore = create<State>()(
  persist(
    (set, get) => ({
      setAddress: (address: State["address"]) => set({ address }),
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
    }),
    { name: "address-store" }
  )
);
