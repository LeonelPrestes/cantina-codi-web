import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateProduct } from "@/api/update-products";
import type { Product } from "@/api/get-all-products";
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

function parsePrice(value: string) {
  return Number(value.trim().replace(",", "."));
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

interface UpdateProductLocationState {
  product?: Product;
}

export function UpdateProducts() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const locationState = location.state as UpdateProductLocationState | null;
  const product = locationState?.product;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [price, setPrice] = useState(
    product ? String(product.price).replace(".", ",") : ""
  );
  const [stock, setStock] = useState(product ? String(product.stock) : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedPrice = useMemo(() => parsePrice(price), [price]);
  const parsedStock = useMemo(() => Number(stock), [stock]);
  const imageUrlOk = useMemo(() => isValidUrl(imageUrl), [imageUrl]);

  const canSubmit =
    !!productId &&
    name.trim().length >= 2 &&
    description.trim().length >= 5 &&
    imageUrlOk &&
    Number.isFinite(parsedPrice) &&
    parsedPrice > 0 &&
    Number.isInteger(parsedStock) &&
    parsedStock >= 0 &&
    !isSubmitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || !productId) return;

    try {
      setIsSubmitting(true);

      await updateProduct(productId, {
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        price: parsedPrice,
        stock: parsedStock,
      });

      toast.success("Produto atualizado com sucesso.");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar produto.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!product || !productId) {
    return (
      <div className="max-w-xl w-full mx-auto space-y-5">
        <Card className="bg-zinc-900 border border-gray-700/30">
          <CardHeader>
            <CardTitle>Produto nao encontrado</CardTitle>
            <CardDescription>
              Abra esta tela pelo botao de editar no dashboard.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/dashboard">Voltar para dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-100">Editar Produto</h1>
        <p className="text-zinc-400">
          Atualize os dados do produto selecionado.
        </p>
      </div>

      <Card className="bg-zinc-900 border border-gray-700/30">
        <CardHeader>
          <CardTitle>Dados do produto</CardTitle>
          <CardDescription>
            Todos os campos sao obrigatorios para atualizacao.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-200">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex: Coxinha de frango"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-200">
                Descricao
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva o produto..."
                className="min-h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-zinc-200">
                URL da imagem
              </Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                inputMode="url"
              />
              {imageUrl.length > 0 && !imageUrlOk && (
                <p className="text-sm text-red-400">Digite uma URL valida.</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-zinc-200">
                  Preco
                </Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="0,00"
                  inputMode="decimal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-zinc-200">
                  Estoque
                </Label>
                <Input
                  id="stock"
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                />
              </div>
            </div>

            <CardFooter className="px-0 pt-2 flex flex-col gap-2">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-violet-500 hover:bg-violet-600 text-zinc-100 font-bold py-3 rounded-md cursor-pointer"
              >
                {isSubmitting ? "Atualizando..." : "Salvar alteracoes"}
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
