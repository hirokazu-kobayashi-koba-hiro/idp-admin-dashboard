
export const usePayments = () => {
    const fetchPrices = async (productId: string) => {
        const response = await fetch(`/api/payments/products/${productId}`)
        if (!response.ok) {
            return {
                error: "error",
            }
        }
        const body = await response.json() as any;
        console.log(body)
        const prices = body.prices.map((item: any) => {
            return {
                priceId: item.id,
                name: item.nickname,
                description: item.unit_amount
            }
        })
        return {
            payload: prices
        }
    }

    return {
        fetchPrices,
    }
}