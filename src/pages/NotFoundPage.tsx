import Typography from "@/components/basic/typography/Typography";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { URL_ENDPOINTS } from "@/app/Router";
import { useTranslate } from "@/utils/translate";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const translate = useTranslate();

  return (
    <div className="py-16 sm:py-24 flex flex-col items-center justify-center text-center">
      <Typography
        type="H1"
        className="text-6xl sm:text-8xl font-bold text-muted-foreground"
      >
        404
      </Typography>
      <Typography type="H2" className="mt-4" intlId="common:not_found_title" />
      <Typography
        type="muted"
        className="mt-2 max-w-md"
        intlId="common:not_found_description"
      />
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {translate("common:not_found_go_back")}
        </Button>
        <Button onClick={() => navigate(URL_ENDPOINTS.HOME)}>
          <Home className="w-4 h-4 mr-2" />
          {translate("common:not_found_go_home")}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
