import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: any,
): Promise<Response> {
  console.log(request, params);
  return Response.json({ url: "" });
}
