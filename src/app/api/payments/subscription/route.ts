import { NextRequest } from "next/server";
import { createSession } from "@/server/stripe/stripe";

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  console.log(body);
  const { url, error } = await createSession({
    priceId: body.priceId,
    successUrl: body.successUrl,
    cancelUrl: body.cancelUrl,
  });
  console.log(url, error);
  if (error) {
    return new Response();
  }

  return Response.json({ url });
}
