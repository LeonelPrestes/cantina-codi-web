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
    <Card className="bg-white border-gray-700/30 shadow-amber-50">
      <CardHeader>
        <div className="flex flex-col items-center gap-2 text-center min-h-34 ">
          <img
            className="size-20 rounded-xl object-cover"
            src={product.image}
            alt=""
          />
          <CardTitle className="text-gray-900 text-base flex-1">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex md:items-center md:flex-row flex-col gap-2 justify-between">
          <p className="text-muted-foreground text-lg">
            R$ {product.price.toFixed(2)}
          </p>

          <Button
            onClick={() => addToCart(product)}
            size="sm"
            className="bg-primary text-xs font-semibold text-white hover:bg-primary-hover cursor-pointer"
          >
            <Plus className="size-4" />
            <span className="text-base">Adicionar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
