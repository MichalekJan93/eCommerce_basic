import StoreProvider from "@/providers/store/StoreProvider";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
}
