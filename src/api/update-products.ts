import { z } from "zod";

const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const updateProductParamsSchema = z.object({
  productId: z.string(),
});

const updateProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  imageUrl: z.string().url(),
});

const updateProductResponseSchema = z.object({
  message: z.string(),
});

const apiErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type UpdateProductBody = z.infer<typeof updateProductBodySchema>;
export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;

export async function updateProduct(
  productId: string,
  body: UpdateProductBody
): Promise<UpdateProductResponse> {
  const parsedParams = updateProductParamsSchema.parse({ productId });
  const parsedBody = updateProductBodySchema.parse(body);

  const response = await fetch(`${API_URL}/products/${parsedParams.productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(parsedBody),
  });

  const raw = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);
    const message = parsedError.success
      ? parsedError.data.message ?? parsedError.data.error
      : `Erro ao atualizar produto (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = updateProductResponseSchema.safeParse(raw);
  if (!parsedResponse.success) {
    throw new Error("Resposta da API invalida (formato inesperado).");
  }

  return parsedResponse.data;
}
