import todoDAL from "../dals/todoDAL";
import {Todo} from "../../todo/types";

async function getTodos(username: string): Promise<Todo[]> {
  // For now, just call the DAL directly
  // Future business logic can be added here (validation, filtering, etc.)
  return await todoDAL.getTodos(username);
}

async function createTodo(todo: Omit<Todo, "id" | "created_at">): Promise<Todo> {
  // For now, just call the DAL directly
  // Future business logic can be added here (validation, sanitization, etc.)
  return await todoDAL.createTodo(todo);
}

const todoManager = {
  getTodos,
  createTodo,
};

export default todoManager;
