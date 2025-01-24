import { NextRequest } from "next/server";
import { registerCheckout } from "@/server/stripe/stripe";

export async function POST(request: NextRequest, { params }: { params : { sessionId: string;}}): Promise<Response> {
  const sessionId = params.sessionId;
  const body = await request.json()
  const { url, error } = await registerCheckout({
    sessionId,
    returnUrl: body.returnUrl
  });
  console.log(url, error);
  if (error) {
    return new Response();
  }

  return Response.json({ url });
}
