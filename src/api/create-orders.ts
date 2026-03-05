import { z } from "zod";

/*
  Base URL da API
  - Ideal: usar variável de ambiente (Vite: import.meta.env.VITE_API_URL)
  - Fallback: localhost
 */
const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

const createOrderBodySchema = z.object({
  userName: z.string(),
  userEmail: z.email(),
  items: z.array(cartItemSchema),
});

const createOrderResponseSchema = z.object({
  external_reference: z.string(),
  message: z.string(),
});

const apiErrorSchema = z.object({
  error: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;

export async function createOrder(body: CreateOrderBody): Promise<CreateOrderResponse> {
  const parsedBody = createOrderBodySchema.parse(body);

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedBody),
  });

  // 2) Tenta ler JSON se não conseguir recebe null
  const raw = await response.json().catch(() => null);

  // 3) Trata erro HTTP
  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);
    const message =
      parsedError.success
        ? parsedError.data.error
        : `Erro ao criar pedido (HTTP ${response.status})`;

    throw new Error(message);
  }

  // 4) Valida a resposta
  const parsedResponse = createOrderResponseSchema.safeParse(raw);
  if (!parsedResponse.success) {
    throw new Error("Resposta da API inválida (formato inesperado).");
  }

  return parsedResponse.data;
}