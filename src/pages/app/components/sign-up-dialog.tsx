import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignUpDialog() {
  return (
    <Card className="bg-zinc-900 border-0">
      <CardHeader>
        <CardTitle className="text-zinc-100">Cadastrar</CardTitle>
        <CardDescription>
          Crie sua conta para começar a usar a Cantina Codi.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="flex items-center gap-2 bg-zinc-950 border border-gray-700/30 rounded-md p-2">
            <User className="size-5 text-muted-foreground" />

            <input
              className="flex-1 outline-0 text-zinc-100 bg-transparent"
              type="text"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 border border-gray-700/30 rounded-md p-2">
            <Mail className="size-5 text-muted-foreground" />

            <input
              className="flex-1 outline-0 text-zinc-100 bg-transparent"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="off"
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

          <Button className="w-full bg-violet-500 hover:bg-violet-600 font-bold cursor-pointer">
            Criar conta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
