import { sleep } from "@/functions/sleep";
import { v4 as uuidv4 } from "uuid";
import { backendUrl } from "@/app/api/backendConfig";
import { convertToCamel } from "@/functions/convertToCamel";

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
  const response = await fetch(`${backendUrl}/api/v1/management/users`);
  if (!response.ok) {
    throw new Error("api is failed");
  }
  const body = await response.json();
  console.log("/123/api/v1/management/users", body);
  const converted = convertToCamel(body);
  return Response.json(converted.list);
}
