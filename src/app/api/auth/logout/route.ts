import { issuer } from "@/app/auth";

export async function GET(): Promise<Response> {
  const response = await fetch(
    `${issuer}/api/v1/logout?client_id=${process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_CLIENT_ID}`,
  );

  if (response.status === 302) {
    const redirectUri = response.headers.get("location") || "";
    return Response.json({
      redirectUri: redirectUri,
    });
  }

  if (!response.ok) {
    return Response.error();
  }

  return Response.json({});
}
