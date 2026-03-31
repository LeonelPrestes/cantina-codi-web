import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

type PaymentStatusViewProps = {
  badgeLabel: string;
  title: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  accentClassName: string;
};

export function PaymentStatusView({
  badgeLabel,
  title,
  description,
  details,
  icon: Icon,
  accentClassName,
}: PaymentStatusViewProps) {
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");
  const merchantOrderId = searchParams.get("merchant_order_id");

  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-2xl items-center px-4 py-8">
      <Card className="w-full border-white/10 bg-zinc-900 text-zinc-100 shadow-2xl">
        <CardHeader className="space-y-4">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full border",
              accentClassName
            )}
          >
            <Icon className="size-8" />
          </div>

          <div className="space-y-2">
            <span
              className={cn(
                "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                accentClassName
              )}
            >
              {badgeLabel}
            </span>

            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
            <CardDescription className="text-base leading-relaxed text-zinc-300">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
            <p className="mb-3 text-sm font-medium text-zinc-400">
              O que fazer agora
            </p>

            <div className="space-y-2">
              {details.map(detail => (
                <p key={detail} className="text-sm leading-relaxed text-zinc-200">
                  {detail}
                </p>
              ))}
            </div>
          </div>

          {(paymentId || externalReference || merchantOrderId) && (
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-4 text-sm sm:grid-cols-3">
              {paymentId && (
                <div>
                  <p className="text-zinc-500">Pagamento</p>
                  <p className="font-medium text-zinc-100">{paymentId}</p>
                </div>
              )}

              {externalReference && (
                <div>
                  <p className="text-zinc-500">Pedido</p>
                  <p className="font-medium text-zinc-100">{externalReference}</p>
                </div>
              )}

              {merchantOrderId && (
                <div>
                  <p className="text-zinc-500">Ordem Mercado Pago</p>
                  <p className="font-medium text-zinc-100">{merchantOrderId}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="w-full sm:flex-1">
            <Link to="/">Voltar para a loja</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 sm:flex-1"
          >
            <Link to="/cart">Ir para o carrinho</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
