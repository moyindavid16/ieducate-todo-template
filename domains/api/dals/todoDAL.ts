import {createClient} from "@/lib/supabase/server";
import {Todo} from "../../todo/types";

async function getTodos(username: string): Promise<Todo[]> {
  const supabase = await createClient();

  const {data, error} = await supabase
    .from("todos")
    .select("*")
    .eq("username", username)
    .order("created_at", {ascending: false});

  if (error) {
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }

  return data || [];
}

async function createTodo(todo: Omit<Todo, "id" | "created_at">): Promise<Todo> {
  const supabase = await createClient();

  const {data, error} = await supabase.from("todos").insert([todo]).select().single();

  if (error) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }

  return data;
}

const todoDAL = {
  getTodos,
  createTodo,
};

export default todoDAL;
