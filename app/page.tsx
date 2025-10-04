"use client";

import {AddTodoModal} from "@/domains/todo/components/AddTodoModal";
import {TodoEntry} from "@/domains/todo/components/TodoEntry";
import {useGetTodos} from "@/domains/todo/hooks/useGetTodos";
import {useCreateTodo} from "@/domains/todo/hooks/useCreateTodo";
import {useState} from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  const {data: todos = [], isLoading, error} = useGetTodos(username);
  const {mutate: createTodo} = useCreateTodo();

  const handleAddTodo = (newTodo: {title: string; description: string}) => {
    if (!username) {
      alert("Please enter a username first");
      return;
    }
    console.log("Reached")

    createTodo({
      title: newTodo.title,
      description: newTodo.description,
      username: username,
    });
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
          {isLoading && <div className="text-center text-gray-500">Loading todos...</div>}
          {error && <div className="text-center text-red-500">Error loading todos: {error.message}</div>}
          {!isLoading && !error && todos.length === 0 && (
            <div className="text-center text-gray-500">
              {username ? "No todos found. Add one above!" : "Enter a username to see your todos."}
            </div>
          )}
          {todos.map(todo => (
            <TodoEntry key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </main>
  );
}
