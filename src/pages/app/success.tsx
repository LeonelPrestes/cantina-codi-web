import { CheckCircle2 } from "lucide-react";
import { PaymentStatusView } from "./components/payment-status-view";

export function Success() {
  return (
    <PaymentStatusView
      badgeLabel="Pagamento aprovado"
      title="Pedido confirmado com sucesso"
      description="Recebemos a confirmacao do seu pagamento. Seu pedido ja pode seguir para separacao e entrega."
      details={[
        "Guarde as informacoes do pedido para acompanhar qualquer confirmacao futura.",
        "Se precisar fazer uma nova compra, voce pode voltar para a loja a qualquer momento.",
      ]}
      icon={CheckCircle2}
      accentClassName="border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
    />
  );
}
