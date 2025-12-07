import { URL_ENDPOINTS } from "@/app/Router";
import Typography from "../typography/Typography";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Typography type="H1">
      <Link to={URL_ENDPOINTS.HOME}>
        Shop<span className="text-primary">Hub</span>
      </Link>
    </Typography>
  );
};

export default Logo;
