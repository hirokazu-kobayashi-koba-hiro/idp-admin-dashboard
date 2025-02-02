import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const response = await fetch(body.url);
    console.log(response.url);
    return Response.json({ url: response.url });
  } catch (e) {
    return new Response();
  }
}
