import { backendUrl } from "@/app/auth";
import { auth } from "@/app/auth";
import {NextRequest} from "next/server";

export async function GET(): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const response = await fetch(`${backendUrl}/api/v1/management/tenants`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const body = await response.json();
  console.log("/api/v1/management/tenants", body);
  return Response.json(body);
}

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const requestBody = await request.json();

  const response = await fetch(`${backendUrl}/api/v1/management/tenants`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody)
  });
  const body = await response.json();
  console.log("/api/v1/management/tenants", body);
  return Response.json(body);
}
