import { Fragment, useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { getAllProducts, type Product } from "@/api/get-all-products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);

        const data = await getAllProducts({ pageIndex });

        setProducts(data.products);
        setTotalProducts(data.metas.totalProducts);
        setTotalPages(Math.max(data.metas.totalPages, 1));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao buscar produtos.";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [pageIndex]);

  function handlePageChange(nextPageIndex: number) {
    if (nextPageIndex < 0 || nextPageIndex >= totalPages) return;
    setPageIndex(nextPageIndex);
  }

  return (
    <div className="max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
      <p className="text-zinc-400">
        Aqui voce pode gerenciar os produtos da cantina.
      </p>

      <div>
        <h2 className="text-xl font-semibold text-zinc-100 mt-6">Menu</h2>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto py-2">
        <Button
          asChild
          className="bg-zinc-900 hover:bg-zinc-800 text-muted-foreground p-2 rounded-md border border-gray-700/30"
        >
          <Link to="/dashboard/create-product">Criar Produto</Link>
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Qnt</TableHead>
              <TableHead>Preco</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-400">
                  Carregando produtos...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && products.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-400">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              products.map((product) => (
                <Fragment key={product.id}>
                  <TableRow className="border-b-0 hover:bg-transparent">
                    <TableCell rowSpan={2} className="align-top">
                      <div className="h-16 w-16 min-w-16 overflow-hidden rounded-xl bg-zinc-800">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={product.imageUrl || "/logo.jpeg"}
                          alt={product.name}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3} className="pt-0">
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link
                            to={`/dashboard/update-product/${product.id}`}
                            state={{ product }}
                          >
                            <PenBoxIcon />
                            Editar
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 />
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
          </TableBody>
        </Table>

        <Pagination
          onPageChange={handlePageChange}
          pageIndex={pageIndex}
          totalPages={totalPages}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
}
