import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: any,
): Promise<Response> {
  const subscriptionId = params.subscriptionId;
  console.log(subscriptionId);

  return Response.json({});
}
