import { NextRequest } from "next/server";
import { fetchBalanceTransactions } from "@/server/stripe/stripe";

export async function GET(
  request: NextRequest,
  { params }: { params: { customerId: string } },
): Promise<Response> {
  const customerId = params.customerId;
  const { customerBalanceTransactions, error } = await fetchBalanceTransactions(
    {
      limit: 5,
      customerId,
    },
  );
  console.log(customerBalanceTransactions, error);
  if (error) {
    return new Response(null, { status: 500 });
  }

  return Response.json({ ...customerBalanceTransactions });
}
