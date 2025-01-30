import { fetchSubscriptionDetail } from "@/server/stripe/stripe";
import {SubscriptionDetail} from "@/types/subscription";
import {convertToCamel} from "@/functions/convertToCamel";

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

  const fetchSubscriptionDetail = async (subscriptionId: string): Promise<{payload?: SubscriptionDetail, error?: any}> => {
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
      const transformed  = transformSubscription(body)
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

  return {
    fetchPrices,
    postSessionCreation,
    fetchSubscriptionDetail,
  };
};

const transformSubscription = (response: any): SubscriptionDetail => {
  const converted = convertToCamel(response)
  return {
    ...converted,
    currentPeriodStart: new Date(converted.currentPeriodStart * 1000).toLocaleDateString(),
    currentPeriodEnd: new Date(converted.currentPeriodEnd * 1000).toLocaleDateString(),
  }
}

const formatPrice = (amount: number, currency: string) => `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;

const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString();
