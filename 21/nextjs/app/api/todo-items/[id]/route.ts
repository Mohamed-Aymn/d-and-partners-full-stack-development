import { todoItems } from "@/lib/data";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/todo-items/[id]">
) {
  const { id } = await context.params;
  const item = todoItems.find((t) => t.id === Number(id));

  if (!item) {
    return Response.json({ error: "Todo item not found" }, { status: 404 });
  }

  return Response.json(item);
}
