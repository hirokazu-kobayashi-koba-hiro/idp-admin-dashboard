const stripe = require("stripe")(process.env.NEXT_STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "idp-admin-dashboard",
    version: "0.0.1",
  },
});

export const createCustomer = async () => {
  const response = await stripe.customers.create({
    email: "customer@example.com",
  });

  console.log(response);
};

export const createCheckoutSession = async ({
  priceId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancelUrl}`,
      // automatic_tax: { enabled: true }
    });

    return {
      url: session.url,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

export const registerCheckout = async ({
  sessionId,
  returnUrl,
}: {
  sessionId: string;
  returnUrl: string;
}) => {
  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    return {
      url: portalSession.url,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

export const fetchPrices = async ({ productId }: { productId: string }) => {
  try {
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    return {
      prices,
    };
  } catch (e) {
    console.error(e);
    return {
      error: e,
    };
  }
};

export const fetchSubscriptionDetail = async ({
  subscriptionId,
}: {
  subscriptionId: string;
}) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return {
      subscription,
    };
  } catch (e) {
    console.error(e);
    return {
      error: e,
    };
  }
};

export const fetchPaymentMethods = async ({
  customerId,
  limit = 5,
}: {
  customerId: string;
  limit: number;
}) => {
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      customerId,
      {
        limit,
      },
    );
    return {
      paymentMethods,
    };
  } catch (e) {
    console.error(e);
    return {
      error: e,
    };
  }
};
