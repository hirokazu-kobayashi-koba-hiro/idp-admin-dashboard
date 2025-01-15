export type Statics = {
  totalUsers: number;
  dau: number;
};

export async function GET(): Promise<Response> {
  return Response.json({
    totalUsers: 1000,
    dau: 100,
  });
}
