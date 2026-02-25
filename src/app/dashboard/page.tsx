"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { Task } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        `/tasks?page=${page}&limit=5&status=${status}&search=${search}`
      );
      setTasks(data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, search]);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <TaskForm refresh={fetchTasks} />

        <div className="flex gap-4 my-4">
          <input
            placeholder="Search..."
            className="border p-2 flex-1"
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="border p-2"
            onChange={e => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <TaskList tasks={tasks} refresh={fetchTasks} />

        <Pagination page={page} setPage={setPage} />
      </div>
    </>
  );
}