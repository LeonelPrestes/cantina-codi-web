type CreatePreferenceResponse = {
    preference_id: string;
    init_point: string;
    external_reference: string;
}

export async function createPreference(external_reference: string) {
    const response = await fetch("http://localhost:8080/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ external_reference }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(
            data?.error ?? `Erro ao criar preferência de pagamento (HTTP ${response.status})`
        )
    } 

    return data as CreatePreferenceResponse;
}