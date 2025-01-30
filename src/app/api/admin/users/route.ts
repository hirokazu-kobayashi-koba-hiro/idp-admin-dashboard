import { sleep } from "@/functions/sleep";
import { v4 as uuidv4 } from "uuid";

export type User = {
  id: string;
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

export const userList = [
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Alice", email: "alice@example.com" },
  { id: uuidv4(), name: "Bob", email: "bob@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
  { id: uuidv4(), name: "Charlie", email: "charlie@example.com" },
];

export async function GET(): Promise<Response> {
  await sleep(500);
  return Response.json(userList);
}
