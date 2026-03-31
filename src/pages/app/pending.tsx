import { Clock3 } from "lucide-react";
import { PaymentStatusView } from "./components/payment-status-view";

export function Pending() {
  return (
    <PaymentStatusView
      badgeLabel="Pagamento pendente"
      title="Seu pagamento esta em analise"
      description="A transacao foi iniciada, mas ainda depende de confirmacao do Mercado Pago. Assim que houver atualizacao, o status sera alterado."
      details={[
        "Evite criar outro pedido agora para nao gerar cobrancas duplicadas sem necessidade.",
      ]}
      icon={Clock3}
      accentClassName="border-amber-400/30 bg-amber-400/10 text-amber-300"
    />
  );
}
