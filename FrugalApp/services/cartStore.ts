import { create as createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { singleItem } from "@/constants/Types";

type CartState = {
  cart: singleItem[];
  addToCart: (item: singleItem) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
};

const useCartStore = createStore<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: singleItem) => set((state) => ({ cart: [...state.cart, genUniqueKey(item)] })),
      removeFromCart: (key: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.key !== key),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

const genUniqueKey = (item: singleItem) => {
  const key = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return { ...item, key };
};

export default useCartStore;
