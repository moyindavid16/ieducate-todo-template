"use client";

import {useState} from "react";
import {Plus} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Todo} from "../types";

interface AddTodoModalProps {
  onAddTodo: (todo: Omit<Todo, "id">) => void;
}

export function AddTodoModal({onAddTodo}: AddTodoModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    if (title.trim() && description.trim()) {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle("");
      setDescription("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Plus size={16} />
          Add Todo
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>Create a new todo item with a title and description.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter todo title..."
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter todo description..."
              className="w-full px-3 py-2 border rounded h-20 resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleAddTodo} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Todo
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
