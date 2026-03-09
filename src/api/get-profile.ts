import { z } from "zod";

const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const getProfileResponseSchema = z.object({
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.email(),
    })
    .nullable(),
});

const apiErrorSchema = z.object({
  message: z.string(),
});

export type GetProfileResponse = z.infer<typeof getProfileResponseSchema>;

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const raw = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);
    const message = parsedError.success
      ? parsedError.data.message
      : `Nao autorizado (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = getProfileResponseSchema.safeParse(raw);
  if (!parsedResponse.success) {
    throw new Error("Resposta da API invalida (formato inesperado).");
  }

  return parsedResponse.data;
}
