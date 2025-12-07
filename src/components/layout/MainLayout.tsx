// components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useProductStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";

const MainLayout = observer(() => {
  const store = useProductStore();

  if (!store.isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[1500px] mx-auto w-full px-2 sm:px-4">
        <Header />
        <main className="grow">
          <Outlet />
        </main>
      </div>
      <div className="bg-primary mt-auto">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
});

export default MainLayout;
