import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createCoupon } from "@/api/create-coupon";
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
import { Textarea } from "@/components/ui/textarea";

function parseMoney(value: string) {
  return Number(value.trim().replace(",", "."));
}

export function CreateCoupon() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [percentDiscount, setPercentDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedDiscount = useMemo(() => parseMoney(discount), [discount]);
  const parsedPercentDiscount = useMemo(
    () => Number(percentDiscount),
    [percentDiscount]
  );
  const parsedQuantity = useMemo(() => Number(quantity), [quantity]);

  const hasDiscount = discount.trim().length > 0;
  const hasPercentDiscount = percentDiscount.trim().length > 0;

  const canSubmit =
    title.trim().length >= 2 &&
    Number.isInteger(parsedQuantity) &&
    parsedQuantity > 0 &&
    ((hasDiscount && Number.isFinite(parsedDiscount) && parsedDiscount > 0) ||
      (hasPercentDiscount &&
        Number.isFinite(parsedPercentDiscount) &&
        parsedPercentDiscount > 0 &&
        parsedPercentDiscount <= 100)) &&
    !(hasDiscount && hasPercentDiscount) &&
    !isSubmitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      await createCoupon({
        title: title.trim(),
        description: description.trim() || undefined,
        quantity: parsedQuantity,
        discount: hasDiscount ? parsedDiscount : undefined,
        percentDiscount: hasPercentDiscount ? parsedPercentDiscount : undefined,
      });

      toast.success("Cupom criado com sucesso.");

      setTitle("");
      setDescription("");
      setDiscount("");
      setPercentDiscount("");
      setQuantity("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar cupom.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl w-full mx-auto space-y-5 text-zinc-100">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Cadastrar Cupom</h1>
        <p className="text-zinc-400">
          Crie cupons de desconto para os alunos usarem na cantina.
        </p>
      </div>

      <Card className="bg-zinc-900 border border-gray-700/30 text-zinc-100">
        <CardHeader>
          <CardTitle>Novo cupom</CardTitle>
          <CardDescription>
            Informe desconto em reais ou porcentagem, nunca os dois.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex: CANTINA10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descricao</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ex: Cupom de boas-vindas"
                className="min-h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade disponível</Label>
              <Input
                id="quantity"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                type="number"
                min={1}
                step={1}
                placeholder="Ex: 10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto em R$</Label>
                <Input
                  id="discount"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                  placeholder="Ex: 5,00"
                  inputMode="decimal"
                  disabled={hasPercentDiscount}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="percentDiscount">Desconto em %</Label>
                <Input
                  id="percentDiscount"
                  value={percentDiscount}
                  onChange={(event) => setPercentDiscount(event.target.value)}
                  type="number"
                  min={1}
                  max={100}
                  step={1}
                  placeholder="Ex: 10"
                  disabled={hasDiscount}
                />
              </div>
            </div>

            {hasDiscount && hasPercentDiscount && (
              <p className="text-sm text-red-400">
                Informe apenas um tipo de desconto.
              </p>
            )}

            <CardFooter className="px-0 pt-2 flex flex-col gap-2">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-violet-500 hover:bg-violet-600 font-bold py-3 rounded-md cursor-pointer text-white"
              >
                {isSubmitting ? "Salvando..." : "Salvar cupom"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="w-full"
              >
                Voltar para dashboard
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}