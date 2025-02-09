import { NextRequest } from "next/server";
import { fetchPrices } from "@/server/stripe/stripe";

export async function GET(
  request: NextRequest,
  { params } : any,
): Promise<Response> {
  const productId = params.productId;
  const { prices, error } = await fetchPrices({
    productId,
  });
  console.log(prices, error);
  if (error) {
    return new Response(null, { status: 500 });
  }

  return Response.json({ prices: prices.data });
}
