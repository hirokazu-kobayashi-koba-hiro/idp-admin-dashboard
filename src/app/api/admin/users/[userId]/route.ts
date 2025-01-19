import { sleep } from "@/functions/sleep";

export async function DELETE(userId: string): Promise<Response> {
  console.log(userId);
  await sleep(500);
  return Response.json(null);
}
