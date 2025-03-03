import { NextRequest } from "next/server";
import { backendUrl } from "@/app/auth";
import { convertToCamel } from "@/functions/convertToCamel";
import { auth } from "@/app/auth";

export async function GET(
  request: NextRequest,
  { params }: any,
): Promise<Response> {
  console.log(request, params);
  const session = await auth();
  const accessToken = session?.accessToken;
  const tenantId = session?.tenantId;
  const userId = params.userId;
  const response = await fetch(
    `${backendUrl}/api/v1/management/tenants/${tenantId}/users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    return Response.error();
  }
  const body = await response.json();
  const converted = convertToCamel(body);
  return Response.json(converted);
}

export async function DELETE(
  request: NextRequest,
  { params }: any,
): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const tenantId = session?.tenantId;
  const userId = params.userId;
  const response = await fetch(
    `${backendUrl}/api/v1/management/tenants/${tenantId}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    return Response.error();
  }
  return Response.json(null);
}
