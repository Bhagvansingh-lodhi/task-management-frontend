"use client";

import { useState, useEffect } from "react";
import API from "@/lib/axios";
import toast from "react-hot-toast";
import { Task } from "@/types/task";

interface Props {
  refresh: () => void;
  editTask?: Task | null;
  clearEdit?: () => void;
}

export default function TaskForm({ refresh, editTask, clearEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, {
          title,
          description
        });
        toast.success("Task updated");
        clearEdit?.();
      } else {
        await API.post("/tasks", { title, description });
        toast.success("Task created");
      }

      setTitle("");
      setDescription("");
      refresh();
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-3">
      <h2 className="text-lg font-semibold">
        {editTask ? "Edit Task" : "Create Task"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={description}
        required
        onChange={e => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : editTask ? "Update" : "Create"}
      </button>
    </form>
  );
}