import { SubscriptionDetail } from "@/types/subscription";
import { convertToCamel } from "@/functions/convertToCamel";

export const usePayments = () => {
  const fetchPrices = async (productId: string) => {
    try {
      const response = await fetch(`/api/payments/products/${productId}`);

      if (!response.ok) {
        return {
          error: "Network response was not ok",
        };
      }

      const body = (await response.json()) as any;
      console.log("fetchPrices", body);
      const prices = body.prices.map((item: any) => {
        return {
          priceId: item.id,
          name: item.nickname,
          description: item.unit_amount,
        };
      });

      return {
        payload: prices,
      };
    } catch (e) {
      console.error(e);
      return {
        error: e,
      };
    }
  };

  const postSessionCreation = async ({
    priceId,
    successUrl,
    cancelUrl,
  }: {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }) => {
    try {
      const response = await fetch("/api/payments/subscription/session", {
        method: "POST",
        body: JSON.stringify({
          priceId,
          successUrl,
          cancelUrl,
        }),
      });

      if (!response.ok) {
        return {
          error: "Network response was not ok",
        };
      }

      const body = await response.json();
      return {
        payload: body,
      };
    } catch (e) {
      console.error(e);
      return {
        error: e,
      };
    }
  };

  const fetchSubscriptionDetail = async (
    subscriptionId: string,
  ): Promise<{ payload?: SubscriptionDetail; error?: any }> => {
    try {
      const response = await fetch(
        `/api/payments/subscription/${subscriptionId}`,
      );
      if (!response.ok) {
        return {
          error: "Network response was not ok",
        };
      }

      const body = await response.json();
      const transformed = transformSubscription(body);
      return {
        payload: transformed,
      };
    } catch (e) {
      console.error(e);
      return {
        error: e,
      };
    }
  };

  const fetchPaymentMethods = async (
    customerId: string,
  ): Promise<{ payload?: any; error?: any }> => {
    try {
      const response = await fetch(
        `/api/payments/customers/${customerId}/payment_methods`,
      );
      if (!response.ok) {
        return {
          error: "Network response was not ok",
        };
      }

      const body = await response.json();
      return {
        payload: convertToCamel(body.data),
      };
    } catch (e) {
      console.error(e);
      return {
        error: e,
      };
    }
  };

  return {
    fetchPrices,
    postSessionCreation,
    fetchSubscriptionDetail,
    fetchPaymentMethods,
  };
};

const transformSubscription = (response: any): SubscriptionDetail => {
  const converted = convertToCamel(response);
  return {
    ...converted,
    currentPeriodStart: formatDate(converted.currentPeriodStart),
    currentPeriodEnd: formatDate(converted.currentPeriodEnd),
    items: converted.items.data.map((item: any) => {
      return {
        ...item,
        price: {
          ...item.price,
          unitAmount: item.price.unitAmount / 100,
        },
      };
    }),
  };
};

const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString();
