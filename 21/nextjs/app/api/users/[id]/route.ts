import { users } from "@/lib/data";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/users/[id]">
) {
  const { id } = await context.params;
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(user);
}
