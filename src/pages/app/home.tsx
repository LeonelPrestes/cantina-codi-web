import { useEffect, useState } from "react";
import { CardProduct } from "@/components/card-product";
import { Pagination } from "@/components/pagination";
import { getAllProducts, type Product } from "@/api/get-all-products";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-xl w-full mx-auto space-y-5">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-100">Nossos Produtos</h2>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <CardProduct
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl || "",
                quantity: product.stock,
              }}
            />
          ))}
        </div>

        <Pagination
          pageIndex={0}
          totalProducts={100}
          totalPages={10}
          onPageChange={() => { }}
        />
        
      </div>
    </div>
  );
}
