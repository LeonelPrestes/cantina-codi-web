import { z } from "zod";

const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const createCouponBodySchema = z
  .object({
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(200).optional(),
    discount: z.number().positive().min(1).optional(),
    percentDiscount: z.number().positive().max(100).optional(),
    quantity: z.number().int().positive().min(1),
  })
  .refine((data) => data.discount || data.percentDiscount, {
    message: "É necessário informar um desconto fixo ou percentual.",
  });

const createCouponResponseSchema = z.object({
  message: z.string(),
});

const apiErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type CreateCouponBody = z.infer<typeof createCouponBodySchema>;
export type CreateCouponResponse = z.infer<typeof createCouponResponseSchema>;

export async function createCoupon(
  body: CreateCouponBody
): Promise<CreateCouponResponse> {
  const parsedBody = createCouponBodySchema.parse(body);

  const response = await fetch(`${API_URL}/coupons`, {
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
      : `Erro ao criar cupom (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = createCouponResponseSchema.safeParse(raw);

  if (!parsedResponse.success) {
    throw new Error("Resposta da API inválida (formato inesperado).");
  }

  return parsedResponse.data;
}