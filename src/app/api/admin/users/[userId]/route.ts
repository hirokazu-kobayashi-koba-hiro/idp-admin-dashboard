import { sleep } from "@/functions/sleep";
import { NextRequest } from "next/server";
import { backendUrl } from "@/app/api/backendConfig";
import { convertToCamel } from "@/functions/convertToCamel";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<Response> {
  const userId = params.userId;
  const response = await fetch(
    `${backendUrl}/api/v1/management/users/${userId}`,
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
  { params }: { params: { userId: string } },
): Promise<Response> {
  console.log(params.userId);
  await sleep(500);
  return Response.json(null);
}
