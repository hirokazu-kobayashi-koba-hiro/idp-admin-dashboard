import { sleep } from "@/functions/sleep";
import { userList } from "@/app/api/admin/users/route";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string }}): Promise<Response> {
  await sleep(500);
  const user = userList.find((user) => user.id === params.userId);
  console.log(params.userId, user);
  if (!user) {
    return Response.error();
  }
  return Response.json(user);
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string }}): Promise<Response> {
  console.log(params.userId);
  await sleep(500);
  return Response.json(null);
}
