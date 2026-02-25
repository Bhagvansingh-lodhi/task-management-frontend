import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-4xl font-bold">Task Manager</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}