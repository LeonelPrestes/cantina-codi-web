import { z } from "zod";

/*
  Base URL da API
  - Ideal: usar variavel de ambiente (Vite: import.meta.env.VITE_API_URL)
  - Fallback: localhost
 */
const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  imageUrl: z.url(),
});

const createProductResponseSchema = z.object({
  message: z.string(),
});

const apiErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;

export async function createProduct(
  body: CreateProductBody
): Promise<CreateProductResponse> {
  const parsedBody = createProductBodySchema.parse(body);

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(parsedBody),
  });

  const raw = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);
    const message = parsedError.success
      ? parsedError.data.message ?? parsedError.data.error
      : `Erro ao criar produto (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = createProductResponseSchema.safeParse(raw);
  if (!parsedResponse.success) {
    throw new Error("Resposta da API invalida (formato inesperado).");
  }

  return parsedResponse.data;
}
