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

export const createSession = async ({
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
