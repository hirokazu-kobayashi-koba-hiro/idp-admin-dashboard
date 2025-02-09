import { NextRequest } from "next/server";
import { createBasicAuthHeader } from "@/functions/http";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const requestBody = await request.json();
    const basicAuth = createBasicAuthHeader({
      username: process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_CLIENT_ID || "",
      password: process.env.NEXT_IDP_ADMIN_DASHBOARD_CLIENT_SECRET || "",
    });
    console.log(requestBody);
    const params = new URLSearchParams({
      ...requestBody.body,
    });
    const response = await fetch(requestBody.url, {
      method: "POST",
      body: params,
      headers: {
        ...requestBody.headers,
        ...basicAuth,
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
