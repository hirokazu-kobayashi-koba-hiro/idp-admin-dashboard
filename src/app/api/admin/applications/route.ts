import { backendUrl } from "@/app/api/backendConfig";
import { auth } from "@/app/auth";

export async function GET(): Promise<Response> {
  const session = await auth();
  const accessToken = session?.accessToken;
  const response = await fetch(`${backendUrl}/api/v1/management/clients`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const body = await response.json();
  console.log("/123/api/v1/management/clients", body);
  return Response.json(body);
}
