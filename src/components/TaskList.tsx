"use client";

import { useState } from "react";
import API from "@/lib/axios";
import toast from "react-hot-toast";
import { Task } from "@/types/task";

interface Props {
  tasks: Task[];
  refresh: () => void;
}

export default function TaskList({ tasks, refresh }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const deleteTask = async (id: string) => {
    try {
      setLoadingId(id);
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  const toggleStatus = async (task: Task) => {
    try {
      setLoadingId(task._id);
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending"
      });
      toast.success("Status updated");
      refresh();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoadingId(null);
    }
  };

  if (!tasks.length) {
    return <p className="text-center text-gray-500 mt-6">No tasks found</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      {tasks.map(task => (
        <div
          key={task._id}
          className="bg-white shadow p-4 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <span
              className={`text-sm ${
                task.status === "completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleStatus(task)}
              disabled={loadingId === task._id}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Toggle
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              disabled={loadingId === task._id}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}