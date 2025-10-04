import {Todo} from "../types";

interface TodoEntryProps {
  todo: Todo;
}

export function TodoEntry({todo}: TodoEntryProps) {
  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold">{todo.title}</h3>
      <p className="text-gray-600">{todo.description}</p>
    </div>
  );
}
