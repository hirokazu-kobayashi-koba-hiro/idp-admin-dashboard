import { backendUrl } from "@/app/auth";
import { auth } from "@/app/auth";

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
