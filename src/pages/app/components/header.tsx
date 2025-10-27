import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/cart-context";
import { SignInDialog } from "./sign-in-dialog";
import { SignUpDialog } from "./sign-up-dialog";

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
            className="size-8 rounded-full"
            src="/logo.jpeg"
            alt="Logo Codi Academy"
          />
        </Link>

        <div className="flex items-center gap-10">
          {cart.length > 0 && (
            <Button
              onClick={handleNavigateToCart}
              size="icon-sm"
              className="bg-violet-400 hover:bg-violet-500 cursor-pointer relative"
            >
              <ShoppingCart />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-violet-400 hover:bg-violet-500 cursor-pointer"
              >
                Login
              </Button>
            </DialogTrigger>

            <DialogContent className="dark border border-gray-800/30">
              <Tabs className="dark">
                <TabsList className="mb-4  border-b border-gray-800">
                  <TabsTrigger value="sign-in">Login</TabsTrigger>
                  <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value="sign-in">
                  <SignInDialog />
                </TabsContent>

                <TabsContent value="sign-up">
                  <SignUpDialog />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
