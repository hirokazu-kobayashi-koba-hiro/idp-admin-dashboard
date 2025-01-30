
export type SubscriptionItem = {
    id: string;
    plan: {
        product: string;
    };
    price: {
        unitAmount: number;
    };
    quantity: number;
}

export type SubscriptionDetail = {
    id: string;
    status: string;
    customer: string;
    currency: string;
    currentPeriodStart: number;
    currentPeriodEnd: number;
    collectionMethod: string;
    latestInvoice: string;
    items: {
        data: SubscriptionItem[];
    };
}


