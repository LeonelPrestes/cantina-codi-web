import { Search } from "lucide-react";
import { CardProduct } from "@/components/card-product";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { products } from "@/mock/data";

export function Home() {
  return (
    <div className="max-w-xl w-full mx-auto space-y-5">
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-zinc-100">Codi Cantina</h1>
        <p className="text-zinc-400">
          Abaixo você pode buscar produtos e adicionar ao carrinho.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-md border border-gray-700/30">
          <Search className="size-5 text-zinc-400" />
          <input
            className="outline-0 flex-1 bg-transparent"
            type="text"
            placeholder="Pesquise por um produto..."
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Categorias</h2>

        <div className="flex items-center gap-3 overflow-x-auto py-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Button variant="secondary" key={index}>{`Categoria ${
              index + 1
            }`}</Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-100">Nossos Produtos</h2>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          pageIndex={0}
          totalProducts={100}
          totalPages={10}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}
