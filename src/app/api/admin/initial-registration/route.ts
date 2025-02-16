import { backendUrl } from "@/app/auth";
import { auth } from "@/app/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const requestBody = await request.json();

  const response = await fetch(
    `${backendUrl}/api/v1/management/initial-registration`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );
  console.log(response.status);
  return Response.json(null);
}
