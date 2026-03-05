import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/api/create-orders";
import { createPreference } from "@/api/create-preference";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";

export function Checkout() {
  const { cart, totalCart } = useCart();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim()),
    [userEmail]
  );

  const canPay =
    cart.length > 0 && userName.trim().length >= 2 && emailOk && !loading;

  async function handlePay() {
    if (!canPay) return;

    try {
      setLoading(true);

      // 1) cria o pedido no banco
      const order = await createOrder({
        userName: userName.trim(),
        userEmail: userEmail.trim(),
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      // 2) cria a preference no MP
      const pref = await createPreference(order.external_reference);

      // 3) redireciona pro init_point
      window.location.href = pref.init_point;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl w-full mx-auto space-y-5">
        <Card className="bg-zinc-900 border border-gray-700/30">
          <CardHeader>
            <CardTitle>Seu carrinho está vazio</CardTitle>
            <CardDescription>Adicione itens antes de finalizar.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/")} className="w-full">
              Voltar para produtos
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-zinc-100">Checkout</h1>

      <Card className="bg-zinc-900 border border-gray-700/30">
        <CardHeader>
          <CardTitle>Dados do comprador</CardTitle>
          <CardDescription>
            O comprovante será enviado para este e-mail após o pagamento ser aprovado.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-200" htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-200" htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              inputMode="email"
            />
            {!emailOk && userEmail.length > 0 && (
              <p className="text-sm text-red-400">Digite um e-mail válido.</p>
            )}
          </div>

          <div className="flex justify-between text-zinc-400">
            <span className="font-bold">Total</span>
            <span>
              {totalCart.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={handlePay}
            disabled={!canPay}
            className="w-full bg-violet-500 hover:bg-violet-600 text-zinc-100 font-bold py-3 rounded-md cursor-pointer"
          >
            {loading ? "Criando pagamento..." : "Pagar com Mercado Pago"}
          </Button>

          <Button variant="ghost" onClick={() => navigate("/cart")} className="w-full">
            Voltar para o carrinho
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
