import { useContext } from "react";
import { StoreContext } from "../providers/store/StoreContext";

/**
 * Hook for accessing stores
 * @returns RootStore
 */
export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return store;
};

/**
 * Hook for accessing cart store
 * @returns UseCartStore
 */
export const useCartStore = () => useStore().cartStore;

/**
 * Hook for accessing product store
 * @returns UseProductStore
 */
export const useProductStore = () => useStore().productStore;
