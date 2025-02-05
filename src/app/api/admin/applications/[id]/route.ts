import { NextRequest } from "next/server";
import { backendUrl } from "@/app/api/backendConfig";
import { auth } from "@/app/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  const session = await auth()
  const accessToken = session?.user?.accessToken
  const id = params.id;
  const response = await fetch(
    `${backendUrl}/api/v1/management/clients/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
  );
  if (!response.ok) {
    return Response.error();
  }
  const body = await response.json();
  return Response.json(body);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  const id = params.id;
  const response = await fetch(
      `${backendUrl}/api/v1/management/applications/${id}`,
      {
        method: "DELETE"
      }
  );
  if (!response.ok) {
    return Response.error();
  }
  return new Response();
}
