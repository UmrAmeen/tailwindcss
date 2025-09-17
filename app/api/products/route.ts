export async function GET() {
  const data = [{ id: 1, message: "hello" }];

  return Response.json({ data });
}
