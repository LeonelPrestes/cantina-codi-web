import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header>
      <div className="max-w-xl w-full mx-auto flex items-center justify-between">
        <img
          className="size-8 rounded-full"
          src="/logo.jpeg"
          alt="Logo Codi Academy"
        />

        <Button
          size="sm"
          className="bg-violet-400 hover:bg-violet-500 font-bold uppercase text-xs cursor-pointer"
        >
          Entrar
        </Button>
      </div>
    </header>
  );
}
