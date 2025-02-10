import { NextRequest } from "next/server";
import { backendUrl } from "@/app/auth";
import { auth } from "@/app/auth";

export async function GET(
  request: NextRequest,
  { params }: any,
): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const id = params.id;
  const response = await fetch(
    `${backendUrl}/api/v1/management/clients/${id}`,
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
  return Response.json(body);
}

export async function DELETE(
  request: NextRequest,
  { params }: any,
): Promise<Response> {
  const id = params.id;
  const response = await fetch(
    `${backendUrl}/api/v1/management/applications/${id}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    return Response.error();
  }
  return new Response();
}
