import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const requestBody = await request.json();
    console.log(requestBody);
    const params = new URLSearchParams({
      ...requestBody.body,
    });
    const response = await fetch(requestBody.url, {
      method: "POST",
      body: params,
      headers: {
        ...requestBody.headers,
      },
    });
    if (!response.ok) {
      return new Response(null, { status: 500 });
    }
    const responseBody = await response.json();
    return Response.json(responseBody);
  } catch (e) {
    return new Response();
  }
}
