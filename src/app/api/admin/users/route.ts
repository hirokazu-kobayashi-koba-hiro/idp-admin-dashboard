import { backendUrl } from "@/app/api/backendConfig";
import { convertToCamel } from "@/functions/convertToCamel";
import {auth} from "@/app/auth";

export type User = {
  sub: string;
  name: string;
  email: string;
  givenName?: string;
  familyName?: string;
  middleName?: string;
  nickname?: string;
  preferredUsername?: string;
  profile?: string;
  picture?: string;
  website?: string;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phoneNumber?: string;
};

export async function GET(): Promise<Response> {
  const session = await auth()
  const accessToken = session?.user?.accessToken
  const response = await fetch(`${backendUrl}/api/v1/management/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    throw new Error("api is failed");
  }
  const body = await response.json();
  console.log("/123/api/v1/management/users", body);
  const converted = convertToCamel(body);
  return Response.json(converted.list);
}
