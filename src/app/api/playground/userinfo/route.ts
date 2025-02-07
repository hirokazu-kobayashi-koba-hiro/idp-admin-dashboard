import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const requestBody = await request.json();
    const response = await fetch(requestBody.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${requestBody.accessToken}`,
      },
    });

    if (!response.ok) {
      return Response.error();
    }
    const responseBody = await response.json();
    console.log(responseBody);
    return Response.json(responseBody);
  } catch (e) {
    return new Response();
  }
}
