import { StoreProvider } from "../hooks/useStore";
import { rootStore } from "../stores/RootStore";

export function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider value={rootStore}>{children}</StoreProvider>;
}
