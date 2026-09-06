import { todoItems } from "@/lib/data";

export async function GET() {
  return Response.json(todoItems);
}
