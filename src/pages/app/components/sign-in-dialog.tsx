import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignInDialog() {
  return (
    <Card className="bg-zinc-900 border-0">
      <CardHeader>
        <CardTitle className="text-zinc-100">Login</CardTitle>
        <CardDescription>
          Entre com seu e-mail e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="flex items-center gap-2 bg-zinc-950 border border-gray-700/30 rounded-md p-2">
            <Mail className="size-5 text-muted-foreground" />

            <input
              className="flex-1 outline-0 text-zinc-100 bg-transparent"
              type="email"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 border border-gray-800/30 rounded-md p-2">
            <Lock className="size-5 text-muted-foreground" />

            <input
              className="flex-1 outline-0 text-zinc-100 bg-transparent"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>

          <Button className="w-full bg-violet-400 hover:bg-violet-500 text-white font-bold cursor-pointer">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
