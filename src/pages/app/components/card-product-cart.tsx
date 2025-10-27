import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

interface CardProductsCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  };
}

export function CardProductCart({ product }: CardProductsCartProps) {
  const { addToCart, decrementItemCart, removeAllQuantityOfItem } = useCart();
  return (
    <div className="flex  justify-between gap-4 items-center bg-zinc-900 p-4 rounded-md border border-gray-700/30">
      <div className="flex items-center gap-2 flex-1">
        <img
          className="size-14 rounded-xl object-cover"
          src={product.image}
          alt="Imagem do produto"
        />

        <div>
          <h2 className="text-lg font-semibold text-zinc-100">
            {product.name}
          </h2>
          <p className="text-zinc-400">R$ {product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div>
          <Button
            onClick={() => decrementItemCart(product)}
            size="icon-sm"
            variant="secondary"
            className="bg-zinc-600 hover:bg-zinc-500 text-muted"
          >
            <Minus />
          </Button>

          <span className="mx-2 text-zinc-100">{product.quantity}</span>

          <Button
            onClick={() => addToCart(product)}
            size="icon-sm"
            variant="secondary"
            className="bg-zinc-600 hover:bg-zinc-500 text-muted"
          >
            <Plus />
          </Button>
        </div>

        <Button
          onClick={() => removeAllQuantityOfItem(product.id)}
          size="icon-sm"
          variant="secondary"
          className="bg-red-600 text-muted hover:bg-red-500"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
