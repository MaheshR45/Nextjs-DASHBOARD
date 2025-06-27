import { create } from "zustand";
import {Product} from "../app/products/page"


type ProductStore = {
  favItems: Product[];
  cartItems: Product[];
  toggleFav: (product: Product) => void;
  toggleCart: (product: Product) => void;
  isInFav: (product: Product) => boolean;
  isInCart: (product: Product) => boolean;
};

export const useProductStore = create<ProductStore>((set,get)=>({
    favItems: [],
    cartItems: [],
    toggleFav: (product) => {
      const { favItems } = get();
      const isAlreadyFav = favItems.some((item) => item.id === product.id);
      set({
        favItems: isAlreadyFav
          ? favItems.filter((item) => item.id !== product.id)
          : [...favItems, product],
      });
    },
    toggleCart: (product) => {
      const { cartItems } = get();
      const isAlreadyCart = cartItems.some((item) => item.id === product.id);
      set({
        cartItems: isAlreadyCart
          ? cartItems.filter((item) => item.id !== product.id)
          : [...cartItems, product],
      });
    },
    isInFav: (product) => get().favItems.some((item) => item.id === product.id),
    isInCart: (product) => get().cartItems.some((item) => item.id === product.id),
}))
