type CartItem = { productID: string; quantity: number };

type CreateOrderBody = {
    userName: string;
    userEmail: string;
    items: CartItem[];
}

type CreateOrderResponse = {
    external_reference: string;
    message: string;
}

export async function createOrder(body: CreateOrderBody) {
    console.log('Criando pedido com os seguintes dados:', body);
    const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(data?.error ?? `Erro ao criar pedido (HTTP ${response.status})`)
    }
    return data as CreateOrderResponse;
}


