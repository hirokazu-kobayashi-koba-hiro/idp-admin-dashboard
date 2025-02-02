import { NextRequest } from "next/server";
import { fetchPaymentMethods } from "@/server/stripe/stripe";

export async function GET(
  request: NextRequest,
  { params }: { params: { customerId: string } },
): Promise<Response> {
  const customerId = params.customerId;
  const { paymentMethods, error } = await fetchPaymentMethods({
    limit: 5,
    customerId,
  });
  console.log(paymentMethods, error);
  if (error) {
    return new Response();
  }

  return Response.json({ ...paymentMethods });
}
