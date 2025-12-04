import { useContext } from "react";
import { StoreContext } from "../providers/store/StoreContext";

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return store;
};

export const useCartStore = () => useStore().cartStore;
export const useProductStore = () => useStore().productStore;
