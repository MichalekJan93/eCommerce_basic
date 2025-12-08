import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Button from "../ui/button";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentFlag =
    i18n.language === "en" ? "/icons/en-flag.svg" : "/icons/cz-flag.svg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <img src={currentFlag} alt={i18n.language} width={20} height={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <img src="/icons/en-flag.svg" alt="English" width={20} height={20} />
          <span className="ml-2">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("cs")}>
          <img src="/icons/cz-flag.svg" alt="Česky" width={20} height={20} />
          <span className="ml-2">Česky</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
