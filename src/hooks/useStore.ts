import { createContext, useContext } from "react";
import { RootStore } from "../stores/RootStore";

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return store;
};

// Convenience hooks
export const useCartStore = () => useStore().cartStore;
export const useProductStore = () => useStore().productStore;
