import { NextRequest } from "next/server";
import { backendUrl } from "@/app/api/backendConfig";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  const id = params.id;
  const response = await fetch(
    `${backendUrl}/api/v1/management/clients/${id}`,
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
