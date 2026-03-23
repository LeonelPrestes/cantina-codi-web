import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import  logo  from "../../../../public/logo.jpeg"


export function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();

  function handleNavigateToCart() {
    navigate("/cart");
  }

  return (
    <header className="fixed top-0 left-0 p-4 w-full backdrop-blur bg-black/40 z-20 border-b border-white/10">
      <div className="max-w-xl w-full mx-auto flex items-center justify-between">
        <Link to="/">
          <img
            className="size-12 rounded-full"
            src={logo}
            alt="Logo Codi Academy" 
          />
        </Link>

        <div className="flex items-center gap-10">
          {cart.length > 0 && (
            <Button
              onClick={handleNavigateToCart}

              className="w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white cursor-pointer relative"
            >
              <ShoppingCart className="w-7! h-7!" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
