import { CartProduct } from "@/interfaces/product";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  productCart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductCart: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
}

export const useCartStore = create<State>()(
  persist<State>(
    (set, get) => ({
      productCart: [],

      //Methods

      getTotalItems: () => {
        const { productCart } = get();
        return productCart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { productCart } = get();
        const subTotal = productCart.reduce(
          (subTotal, item) => item.quantity * item.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = productCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return { subTotal, tax, total, itemsInCart };
      },
      addProductToCart: (product: CartProduct) => {
        const { productCart } = get();

        const productInCart = productCart.some(
          (item: CartProduct) =>
            item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ productCart: [...productCart, product] });
          return;
        }

        const updateCartProducts = productCart.map((element) => {
          if (element.id === product.id && element.size === product.size) {
            return {
              ...element,
              quantity: element.quantity + product.quantity,
            };
          }
          return element;
        });

        set({ productCart: updateCartProducts });
      },

      updateProductCart: (product: CartProduct, quantity: number) => {
        const { productCart } = get();

        const updateCartProducts = productCart.map((element) => {
          if (element.id === product.id && element.size === product.size) {
            return {
              ...element,
              quantity,
            };
          }
          return element;
        });

        set({ productCart: updateCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { productCart } = get();
        const removeProduct = productCart.filter(
          (item: CartProduct) =>
            item.id !== product.id || item.size !== product.size
        );
        set({ productCart: removeProduct });
      },
      clearCart: () => {
        set({ productCart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
