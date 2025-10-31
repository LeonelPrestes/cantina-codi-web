import { Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardProductsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

export function CardProduct({ product }: CardProductsProps) {
  const { addToCart } = useCart();

  return (
    <Card className="bg-zinc-900 border border-gray-700/30">
      <CardHeader>
        <div className="flex gap-2">
          <img
            className="size-14 rounded-xl object-cover"
            src={product.image}
            alt=""
          />
          <CardTitle className="text-zinc-100 text-sm flex-1">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex md:items-center md:flex-row flex-col gap-2 justify-between">
          <p className="text-muted-foreground ">
            R$ {product.price.toFixed(2)}
          </p>

          <Button
            onClick={() => addToCart(product)}
            size="sm"
            className="bg-violet-400 text-xs font-semibold text-white hover:bg-violet-500 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
