import { backendUrl } from "@/app/auth";
import { auth } from "@/app/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const tenantId = session?.tenantId;
  const requestBody = await request.json();

  const response = await fetch(
    `${backendUrl}/api/v1/management/tenants/${tenantId}/clients`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    },
  );
  const body = await response.json();
  return Response.json(body);
}

export async function GET(): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const tenantId = session?.tenantId;
  const response = await fetch(
    `${backendUrl}/api/v1/management/tenants/${tenantId}/clients`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const body = await response.json();
  return Response.json(body);
}
