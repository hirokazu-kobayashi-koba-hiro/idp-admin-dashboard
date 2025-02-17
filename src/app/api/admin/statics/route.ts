export type Statics = {
  totalUsers: number;
  dau: number;
};

export async function GET(): Promise<Response> {
  return Response.json({
    totalUsers: 0,
    dau: 0,
  });
}
