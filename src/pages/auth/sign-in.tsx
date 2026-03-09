import { type FormEvent, useMemo, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authenticate } from "@/api/authenticate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.trim().length > 0 && !isSubmitting;
  }, [email, password, isSubmitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      await authenticate({
        email: email.trim(),
        password: password.trim(),
      });

      toast.success("Login realizado com sucesso.");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao autenticar.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-xl mx-auto w-full space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-100">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Acesse sua conta para continuar.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-5 border border-gray-800/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-300" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <Mail className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pl-9 bg-zinc-950 border-gray-800 text-zinc-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <Lock className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pl-9 bg-zinc-950 border-gray-800 text-zinc-100"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full font-semibold cursor-pointer"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
