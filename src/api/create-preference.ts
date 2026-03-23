import { z } from "zod";

const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";



const createPreferenceBodySchema = z.object({
  external_reference: z.string()
});

const createPreferenceResponseSchema = z.object({
  preference_id: z.string(),
  init_point: z.string(),
  external_reference: z.string(),
});

const apiErrorSchema = z.object({
  error: z.string(),
});

export type CreatePreferenceBody = z.infer<typeof createPreferenceBodySchema>;
export type CreatePreferenceResponse = z.infer<typeof createPreferenceResponseSchema>;

export async function createPreference(
  body: CreatePreferenceBody
): Promise<CreatePreferenceResponse> {
  const parsedBody = createPreferenceBodySchema.parse(body);

  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedBody),
  });

  const raw = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);

    const message = parsedError.success
      ? parsedError.data.error
      : `Erro ao criar preferência de pagamento (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = createPreferenceResponseSchema.safeParse(raw);

  if (!parsedResponse.success) {
    throw new Error("Resposta da API inválida (formato inesperado).");
  }

  return parsedResponse.data;
}