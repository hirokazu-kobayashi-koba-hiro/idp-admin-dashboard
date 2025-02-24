import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  console.log(body);

  return Response.json({ url: "" });
}
