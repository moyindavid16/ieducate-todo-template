"use client";

import { AddTodoModal } from "@/domains/todo/components/AddTodoModal";
import { TodoEntry } from "@/domains/todo/components/TodoEntry";
import { defaultTodos } from "@/domains/todo/data";
import { Todo } from "@/domains/todo/types";
import {useState} from "react";


export default function Home() {
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);

  const handleAddTodo = (newTodo: Omit<Todo, "id">) => {
    const todo: Todo = {
      id: Date.now().toString(),
      ...newTodo,
    };
    setTodos([...todos, todo]);
  };

  return (
    <main className="min-h-screen p-4">
      {/* Username Input */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username..."
          className="px-3 py-2 border rounded"
        />
      </div>

      {/* Todos List */}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Todos</h2>
          <AddTodoModal onAddTodo={handleAddTodo} />
        </div>
        <div className="space-y-4">
          {todos.map(todo => (
            <TodoEntry key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </main>
  );
}
