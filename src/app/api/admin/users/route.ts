import { sleep } from "@/functions/sleep";

export type User = {
  id: string;
  name: string;
  email: string;
};

export const userList = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

export async function GET(): Promise<Response> {
  await sleep(500);
  return Response.json(userList);
}
