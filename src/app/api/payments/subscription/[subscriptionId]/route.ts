import { NextRequest } from "next/server";
import { fetchSubscriptionDetail } from "@/server/stripe/stripe";

export async function GET(
  request: NextRequest,
  { params }: { params: { subscriptionId: string } },
): Promise<Response> {
  const subscriptionId = params.subscriptionId;
  const { subscription, error } = await fetchSubscriptionDetail(subscriptionId);
  console.log(subscription, error);
  if (error) {
    return new Response(null, { status: 500 });
  }

  return Response.json({ ...subscription });
}
