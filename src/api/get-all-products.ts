import { z } from "zod";

/**
 * Base URL da API
 */
const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

/**
 * Schemas
 */

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  imageUrl: z.string().nullable(),
});

const metasSchema = z.object({
  totalProducts: z.number(),
  totalPages: z.number(),
});

const getAllProductsResponseSchema = z.object({
  products: z.array(productSchema),
  metas: metasSchema,
});

const apiErrorSchema = z.object({
  error: z.string(),
});

/**
 * Query schema (opcional, mas mantém padrão e evita mandar coisa errada)
 * - pageIndex default 0
 * - name opcional
 */
const getAllProductsQuerySchema = z.object({
  pageIndex: z.number().min(0).default(0),
  name: z.string().optional(),
});

/**
 * Tipos inferidos do Zod
 */
export type Product = z.infer<typeof productSchema>;
export type GetAllProductsResponse = z.infer<typeof getAllProductsResponseSchema>;
export type GetAllProductsQuery = z.infer<typeof getAllProductsQuerySchema>;

/**
 * Função de API: Get All Products
 */
export async function getAllProducts(
  query?: Partial<GetAllProductsQuery>
): Promise<GetAllProductsResponse> {
  // 1) valida/normaliza query (aplica default)
  const parsedQuery = getAllProductsQuerySchema.parse({
    pageIndex: query?.pageIndex ?? 0,
    name: query?.name?.trim() || undefined,
  });

  // 2) monta querystring (não manda name vazio)
  const params = new URLSearchParams();
  params.set("pageIndex", String(parsedQuery.pageIndex));
  if (parsedQuery.name) params.set("name", parsedQuery.name);

  const response = await fetch(`${API_URL}/products?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const raw = await response.json().catch(() => null);

  // 3) erro padronizado
  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);

    const message = parsedError.success
      ? parsedError.data.error
      : `Erro ao buscar produtos (HTTP ${response.status})`;

    throw new Error(message);
  }

  // 4) valida resposta
  const parsedResponse = getAllProductsResponseSchema.safeParse(raw);
  if (!parsedResponse.success) {
    throw new Error("Resposta da API inválida (formato inesperado).");
  }

  return parsedResponse.data;
}