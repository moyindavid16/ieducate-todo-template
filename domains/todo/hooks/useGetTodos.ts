"use client";

import {useQuery} from "@tanstack/react-query";
import {Todo} from "../types";

// API function
async function fetchTodos(username: string): Promise<Todo[]> {
  const response = await fetch(`/api/todos?username=${encodeURIComponent(username)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const data = await response.json();
  return data.todos;
}

// Hook
export function useGetTodos(username: string) {
  return useQuery({
    queryKey: ["todos", username],
    queryFn: () => fetchTodos(username),
    enabled: !!username, // Only run query if username exists
  });
}
