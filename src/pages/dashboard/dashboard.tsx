import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products } from "@/mock/data";
import { PenBoxIcon, Trash2 } from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
      <p className="text-zinc-400">
        Aqui você pode gerenciar os produtos, categorias e pedidos da cantina.
      </p>

      <div>
        <h2 className="text-xl font-semibold text-zinc-100 mt-6">Menu</h2>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto py-2">
        <Button className="bg-zinc-900 hover:bg-zinc-800 text-muted-foreground p-2 rounded-md border border-gray-700/30">
          Criar Produto
        </Button>
        <Button className="bg-zinc-900 hover:bg-zinc-800 text-muted-foreground p-2 rounded-md border border-gray-700/30">
          Criar Categorias
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    className="size-10 rounded-2xl object-cover"
                    src={product.image}
                    alt=""
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    <PenBoxIcon />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          onPageChange={() => {}}
          pageIndex={0}
          totalPages={1}
          totalProducts={4}
        />
      </div>
    </div>
  );
}
