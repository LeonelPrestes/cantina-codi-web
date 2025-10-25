import { Plus, Search } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-100">Nossos Produtos</h2>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="bg-zinc-900 border border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-zinc-100">Produto {index}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex md:items-center md:flex-row flex-col gap-2 justify-between">
                  <p className="text-muted">R$ 99,99</p>

                  <Button
                    size="sm"
                    className="bg-violet-400 text-xs font-semibold hover:bg-violet-500 cursor-pointer"
                  >
                    <Plus className="size-4" />
                    <span>Adicionar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
