import { ShoppingBasket } from "lucide-react";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outline" size="icon" onClick={() => navigate("/cart")}>
      <ShoppingBasket className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default Cart;
