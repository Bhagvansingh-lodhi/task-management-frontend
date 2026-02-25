interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="font-semibold">Page {page}</span>

      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
}