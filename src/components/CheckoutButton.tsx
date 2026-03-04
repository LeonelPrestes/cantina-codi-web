import { useState } from "react"
import { createOrder } from "@/api/create-orders";
import { createPreference } from "@/api/create-preference";
import { Button } from "./ui/button";

type CartItem = { productID: string; quantity: number };

export function CheckoutButton({ cartItems }: { cartItems: CartItem[] }) {
    const [loading, setIsLoading] = useState(false);

    async function handleCheckout() {
        try {
            setIsLoading(true);

            const userName = "leonel"
            const userEmail = "leonel@email.com"

            const order = await createOrder({
                userName,
                userEmail,
                items: cartItems
            })
            const preference = await createPreference(order.external_reference)
            window.location.href = preference.init_point;
        } catch (error) {
            alert(error instanceof Error ? error.message : "Erro desconhecido ao processar o checkout.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Button onClick={handleCheckout} disabled={loading || cartItems.length === 0}>
            {loading ? "Iniciando pagamento..." : "Pagar com Mercado Pago"}
        </Button>
    )
}
