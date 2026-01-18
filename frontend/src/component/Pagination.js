import React, { useState } from "react";

function Pagination({ onPageChange }) {
  const [page, setPage] = useState(1);

  const changePage = (newPage) => {
    setPage(newPage); // update local UI
    onPageChange(newPage); // 🔥 send data to parent
  };

  return (
    <div className="h-20 flex justify-center items-center gap-2">
      {page > 1 && (
        <button
          onClick={() => changePage(Math.max(page - 1, 1))}
          className="px-3 py-1 border rounded"
        >
          {page - 1}
        </button>
      )}

      <button className="px-3 py-1 border rounded bg-blue-500 text-white">
        {page}
      </button>

      <button
        onClick={() => changePage(page + 1)}
        className="px-3 py-1 border rounded"
      >
        {page + 1}
      </button>

      <button
        onClick={() => changePage(page + 2)}
        className="px-3 py-1 border rounded"
      >
        {page + 2}
      </button>
    </div>
  );
}

export default Pagination;
