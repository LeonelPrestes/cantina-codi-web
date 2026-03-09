import { z } from "zod";

const API_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() ?? "http://localhost:8080";

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const authenticateResponseSchema = z.object({
  token: z.string(),
});

const apiErrorSchema = z.object({
  message: z.string(),
});

export type AuthenticateBody = z.infer<typeof authenticateBodySchema>;
export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;

export async function authenticate(
  body: AuthenticateBody
): Promise<AuthenticateResponse> {
  const parsedBody = authenticateBodySchema.parse(body);

  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(parsedBody),
  });

  const raw = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw);
    const message = parsedError.success
      ? parsedError.data.message
      : `Erro ao autenticar (HTTP ${response.status})`;

    throw new Error(message);
  }

  const parsedResponse = authenticateResponseSchema.safeParse(raw);
  if (!parsedResponse.success) {
    throw new Error("Resposta da API invalida (formato inesperado).");
  }

  return parsedResponse.data;
}
