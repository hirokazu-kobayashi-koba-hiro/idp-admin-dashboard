import { backendUrl } from "@/app/api/backendConfig";

export async function GET(): Promise<Response> {
  const response = await fetch(`${backendUrl}/api/v1/management/clients`);
  const body = await response.json();
  console.log("/123/api/v1/management/clients", body);
  return Response.json(body);
}
