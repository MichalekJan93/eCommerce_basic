import { Menu } from "lucide-react";
import Button from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import MobileMenuItem from "./MobileMenuItem";
import { LanguageSwitcher } from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import { useProductStore } from "@/hooks/useStore";

const MobileNavBar = () => {
  const { categories } = useProductStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[calc(100vh-5rem)]">
          <nav className="mt-6 flex flex-col gap-2">
            {categories.map((item) => (
              <MobileMenuItem
                key={item.titleIntlId}
                titleIntlId={item.titleIntlId}
                categories={item.subCategories}
              />
            ))}
          </nav>
          <div className="flex justify-between">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
