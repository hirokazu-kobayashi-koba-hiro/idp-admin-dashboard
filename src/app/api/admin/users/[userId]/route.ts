import { sleep } from "@/functions/sleep";
import { NextRequest } from "next/server";
import { backendUrl } from "@/app/api/backendConfig";
import { convertToCamel } from "@/functions/convertToCamel";
import {auth} from "@/app/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<Response> {
  const session = await auth()
  const accessToken = session?.user?.accessToken
  const userId = params.userId;
  const response = await fetch(
    `${backendUrl}/api/v1/management/users/${userId}`,
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
