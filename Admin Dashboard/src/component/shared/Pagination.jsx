import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  loading,
  current,
  total,
}) => {
  const activePage = current ?? page ?? 1;
  const activeTotalPages = total ?? totalPages ?? 0;

  if (activeTotalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold">{activePage}</span> of{" "}
        <span className="font-semibold">{activeTotalPages}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(activePage - 1)}
          disabled={activePage === 1 || loading}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, activeTotalPages) }, (_, i) => {
            let pageNum;
            if (activeTotalPages <= 5) {
              pageNum = i + 1;
            } else if (activePage <= 3) {
              pageNum = i + 1;
            } else if (activePage >= activeTotalPages - 2) {
              pageNum = activeTotalPages - 4 + i;
            } else {
              pageNum = activePage - 2 + i;
            }
            return pageNum;
          }).map((num) => (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`px-3 py-1 rounded-lg border transition-colors ${
                num === activePage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              disabled={loading}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(activePage + 1)}
          disabled={activePage === activeTotalPages || loading}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
