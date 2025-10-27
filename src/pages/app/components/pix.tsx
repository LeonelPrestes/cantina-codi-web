import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface PixPaymentProps {
  pixCode: string;
  amount?: number;
  description?: string;
}

export function PIX({ pixCode, amount, description }: PixPaymentProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast.success("O código PIX foi copiado para sua área de transferência.");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Não foi possível copiar o código. Tente novamente.");
    }
  }

  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader className="text-center pb-4 px-0">
        {description && (
          <CardDescription className="text-base mt-2">
            {description}
          </CardDescription>
        )}
        {amount && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Valor</p>
            <p className="text-3xl font-bold text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount)}
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <div className="flex justify-center p-6 bg-white rounded-lg">
          <QRCode
            value={pixCode}
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>

        <div className="space-y-3">
          <div className="relative">
            <div className="p-3 bg-zinc-800 border-zinc-700 rounded-lg border break-all text-sm font-mono">
              {pixCode}
            </div>
          </div>

          <Button
            onClick={handleCopy}
            className="w-full h-12 text-base font-semibold transition-all"
            size="lg"
          >
            {copied ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Código Copiado!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" />
                Copiar Código PIX
              </>
            )}
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-center text-muted-foreground">
            Abra o app do seu banco, escolha pagar com PIX e cole o código acima
            ou escaneie o QR code
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
