import { z } from "zod";

const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const validateCouponBodySchema = z.object({
  code: z.string().min(2),
  total: z.number().positive(),
});

const validateCouponResponseSchema = z.object({
  id: z.string(),
  discountAmount: z.number(),
  finalTotal: z.number(),
});

const apiErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ValidateCouponBody = z.infer<typeof validateCouponBodySchema>;
export type ValidateCouponResponse = z.infer<typeof validateCouponResponseSchema>;

export async function validateCoupon(
  body: ValidateCouponBody
): Promise<ValidateCouponResponse> {
  const parsedBody = validateCouponBodySchema.parse(body);

  const response = await fetch(`${API_URL}/coupons/validate`, {
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
      : `Erro ao validar cupom (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = validateCouponResponseSchema.safeParse(raw);

  if (!parsedResponse.success) {
    throw new Error("Resposta da API inválida.");
  }

  return parsedResponse.data;
}