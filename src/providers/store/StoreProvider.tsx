import { rootStore } from "../../stores/RootStore";
import { StoreContext } from "./StoreContext";

type StoreProviderProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
