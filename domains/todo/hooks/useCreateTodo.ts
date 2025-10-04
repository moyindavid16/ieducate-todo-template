"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "../types";

// API function
async function createTodo(todo: Omit<Todo, "id" | "created_at">): Promise<Todo> {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  const data = await response.json();
  return data.todo;
}

// Hook
export function useCreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: newTodo => {
      // Invalidate and refetch todos for the specific username
      queryClient.invalidateQueries({
        queryKey: ["todos", newTodo.username],
      });
    },
  });

  return mutation;
}
