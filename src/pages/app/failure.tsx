import { XCircle } from "lucide-react";
import { PaymentStatusView } from "./components/payment-status-view";

export function Failure() {
  return (
    <PaymentStatusView
      badgeLabel="Pagamento recusado"
      title="Nao foi possivel concluir o pagamento"
      description="O Mercado Pago informou que a transacao nao foi aprovada. Voce pode revisar os dados e tentar novamente."
      details={[
        "Verifique se o metodo de pagamento escolhido ainda esta valido.",
        "Se preferir, volte ao carrinho e faca uma nova tentativa de compra.",
      ]}
      icon={XCircle}
      accentClassName="border-red-400/30 bg-red-400/10 text-red-300"
    />
  );
}
