import { createContext } from "react";
import { RootStore, rootStore } from "../../stores/RootStore";

export const StoreContext = createContext<RootStore>(rootStore);
