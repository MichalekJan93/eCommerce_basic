import Logo from "../basic/logo/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import MobileNavBar from "./mobile/MobileNavBar";
import Navbar from "./Navbar";
import ThemeSwitcher from "./ThemeSwitcher";
import Cart from "./Cart";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-2 gap-4">
      <Logo />
      <div className="flex-1 gap-4">
        <div className="hidden lg:block">
          <Navbar />
        </div>
      </div>
      <div className="hidden gap-4 lg:flex">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Cart />
      </div>
      <div className="lg:hidden flex gap-4">
        <Cart />
        <MobileNavBar />
      </div>
    </header>
  );
};

export default Header;
