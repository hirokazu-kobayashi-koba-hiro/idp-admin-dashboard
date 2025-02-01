export type SubscriptionItem = {
  id: string;
  plan: {
    product: string;
  };
  price: {
    unitAmount: number;
  };
  quantity: number;
};

export type SubscriptionDetail = {
  id: string;
  status: string;
  customer: string;
  currency: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  collectionMethod: string;
  latestInvoice: string;
  items: SubscriptionItem[];
};

export type Address = {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postalCode: string | null;
  state: string | null;
};

export type BillingDetails = {
  address: Address;
  email: string | null;
  name: string | null;
  phone: string | null;
};

export type CardChecks = {
  addressLine1Check: string | null;
  addressPostalCodeCheck: string | null;
  cvcCheck: string | null;
};

export type CardNetworks = {
  available: string[];
  preferred: string | null;
};

export type ThreeDSecureUsage = {
  supported: boolean;
};

export type Card = {
  brand: string;
  checks: CardChecks;
  country: string;
  expMonth: number;
  expYear: number;
  fingerprint: string;
  funding: "credit" | "debit" | "prepaid" | "unknown";
  generatedFrom: string | null;
  last4: string;
  networks: CardNetworks;
  threeDSecureUsage: ThreeDSecureUsage;
  wallet: string | null;
};

export type PaymentMethod = {
  id: string;
  object: "payment_method";
  billingDetails: BillingDetails;
  card?: Card; // Optional because not all payment methods are cards
  created: number;
  customer: string | null;
  livemode: boolean;
  metadata: Record<string, any>;
  redaction: string | null;
  type: "card" | "us_bank_account"; // Extendable if more types are needed
  usBankAccount?: {
    accountHolderType: "individual" | "company";
    accountType: "checking" | "savings";
    bankName: string;
    financialConnectionsAccount: string | null;
    fingerprint: string;
    last4: string;
    routingNumber: string;
    networks: {
      preferred: "ach" | null;
      supported: string[];
    };
  };
};
