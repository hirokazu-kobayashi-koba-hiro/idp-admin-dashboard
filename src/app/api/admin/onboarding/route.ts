import { backendUrl } from "@/app/auth";
import { auth } from "@/app/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const requestBody = await request.json();

  const response = await fetch(`${backendUrl}/api/v1/management/onboarding`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    return Response.error();
  }
  console.log(response.status);
  const body = await response.json();
  return Response.json(body);
}
