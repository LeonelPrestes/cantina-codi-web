import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createProduct } from "@/api/create-products";
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
    // valida URL absoluta (http/https)
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedPrice = useMemo(() => parsePrice(price), [price]);
  const parsedStock = useMemo(() => Number(stock), [stock]);
  const imageUrlOk = useMemo(() => isValidUrl(imageUrl), [imageUrl]);

  const canSubmit =
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

    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      await createProduct({
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        price: parsedPrice,
        stock: parsedStock,
      });

      toast.success("Produto criado com sucesso.");

      setName("");
      setDescription("");
      setImageUrl("");
      setPrice("");
      setStock("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar produto.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl w-full mx-auto space-y-5 text-zinc-100">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Cadastrar Produto</h1>
        <p className="text-zinc-400">
          Preencha os dados abaixo para adicionar um novo item ao cardapio.
        </p>
      </div>

      <Card className="bg-zinc-900 border border-gray-700/30 text-zinc-100">
        <CardHeader>
          <CardTitle>Novo produto</CardTitle>
          <CardDescription>
            Todos os campos sao obrigatorios para cadastro.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
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
              <Label htmlFor="description">
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
              <Label htmlFor="imageUrl">
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
                <Label htmlFor="price">
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
                <Label htmlFor="stock">
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
                className="w-full bg-violet-500 hover:bg-violet-600 font-bold py-3 rounded-md cursor-pointer text-white"
              >
                {isSubmitting ? "Salvando..." : "Salvar produto"}
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
