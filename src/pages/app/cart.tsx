import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { CardProductCart } from "./components/card-product-cart";

export function Cart() {
  const { cart, totalCart } = useCart();

  const navigate = useNavigate();

  function handleCheckout() {
    navigate("/checkout");
  }
  return (
    <div className="max-w-xl w-full mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-zinc-100">Carrinho</h1>

      <div className="space-y-2">
        {cart.map((item) => (
          <CardProductCart key={item.id} product={item} />
        ))}
      </div>

      <Card className="bg-zinc-900 border border-gray-700/30">
        <CardHeader>
          <CardTitle className="text-muted">Resumo do pedido</CardTitle>
          <CardDescription>
            Abaixo você pode ver o resumo do pedido
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-zinc-400">
              <span className="font-bold">Total</span>
              <span>
                {totalCart.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleCheckout}
            className="w-full bg-violet-500 text-zinc-100 font-bold py-3 rounded-md hover:bg-violet-600 transition-colors"
          >
            Finalizar Pedido
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
